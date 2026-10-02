import { User } from '../models/User.js';
import AssessmentResult from '../models/AssessmentResult.js';
import StudentRoadmap, { IRoadmapStep, ISkillGap } from '../models/StudentRoadmap.js';
import Career from '../models/Career.js';
import Course from '../models/Course.js';

export const analyzeProfileAndGenerateRoadmap = async (userId: string) => {
  // 1. Load Student Profile
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // If profile completion is very low, we might not want to generate a roadmap.
  // We'll let the controller handle that or we just generate a baseline one.
  if (user.profileCompletion !== undefined && user.profileCompletion < 30) {
    throw new Error('INCOMPLETE_PROFILE');
  }

  // 2. Load Aptitude Result (if any)
  const aptitude = await AssessmentResult.findOne({ userId }).sort({ createdAt: -1 });

  // 3. Determine Target Career
  let targetCareerId = null;
  let targetCareerName = '';
  let requiredSkills: string[] = [];

  // Try from user profile first
  if (user.careerGoal) {
    const career = await Career.findOne({ name: { $regex: new RegExp(user.careerGoal, 'i') } });
    if (career) {
      targetCareerId = career._id;
      targetCareerName = career.name;
      requiredSkills = career.skills || [];
    }
  }

  // Fallback to aptitude
  if (!targetCareerId && aptitude && aptitude.topMatches && aptitude.topMatches.length > 0) {
    const topMatch = aptitude.topMatches[0];
    targetCareerId = topMatch.careerId;
    targetCareerName = topMatch.careerName;
    const career = await Career.findById(targetCareerId);
    if (career) {
      requiredSkills = career.skills || [];
    }
  }

  // Absolute fallback
  if (!targetCareerId) {
    const defaultCareer = await Career.findOne();
    if (defaultCareer) {
      targetCareerId = defaultCareer._id;
      targetCareerName = defaultCareer.name;
      requiredSkills = defaultCareer.skills || [];
    } else {
      throw new Error('No career targets available in database');
    }
  }

  // 4. Calculate Skill Gaps
  const studentSkills = user.intelligenceProfile?.structuredSkills || [];
  const skillGaps: ISkillGap[] = [];

  requiredSkills.forEach(reqSkill => {
    const hasSkill = studentSkills.find((s: any) => s.skillName.toLowerCase() === reqSkill.toLowerCase());
    if (!hasSkill || hasSkill.skillLevel === 'Beginner') {
      skillGaps.push({
        skillName: reqSkill,
        currentLevel: hasSkill ? hasSkill.skillLevel : 'None',
        requiredLevel: 'Advanced',
        gapDescription: `Required for ${targetCareerName}. You need to develop this skill.`
      });
    }
  });

  // 5. Build Personalized Roadmap Steps based on Education Stage
  const steps: IRoadmapStep[] = [];
  const educationStage = user.intelligenceProfile?.educationStage?.toLowerCase() || user.educationLevel?.toLowerCase() || '10th';
  let stepIdCounter = 1;

  if (educationStage.includes('10') || educationStage.includes('high school')) {
    steps.push({
      stepId: `step_${stepIdCounter++}`,
      title: '12th / PUC / Diploma',
      type: 'Foundation',
      description: `Complete higher secondary education (Science/Commerce/Arts) aligned with ${targetCareerName}.`,
      status: 'IN_PROGRESS'
    });
    steps.push({
      stepId: `step_${stepIdCounter++}`,
      title: 'Entrance Examinations',
      type: 'Exam',
      description: 'Prepare and appear for relevant national/state-level entrance exams.',
      status: 'PENDING'
    });
  } else if (educationStage.includes('12') || educationStage.includes('puc') || educationStage.includes('diploma')) {
    steps.push({
      stepId: `step_${stepIdCounter++}`,
      title: 'Entrance Examinations',
      type: 'Exam',
      description: 'Prepare and appear for relevant national/state-level entrance exams.',
      status: 'IN_PROGRESS'
    });
  }

  // Degree
  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: 'Undergraduate Degree',
    type: 'Degree',
    description: `Enroll in a relevant Bachelor's degree program focusing on core fundamentals for ${targetCareerName}.`,
    status: educationStage.includes('ug') || educationStage.includes('bachelor') ? 'IN_PROGRESS' : 'PENDING'
  });

  // Skills
  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: 'Specialization & Upskilling',
    type: 'Skill',
    description: `Master industry-required skills: ${skillGaps.map(g => g.skillName).join(', ')}.`,
    status: 'PENDING'
  });

  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: 'Internships & Projects',
    type: 'Project',
    description: 'Apply your skills in real-world scenarios through internships and capstone projects.',
    status: 'PENDING'
  });

  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: `Launch Career: ${targetCareerName}`,
    type: 'Career',
    description: 'Apply for roles and begin your professional journey.',
    status: 'PENDING'
  });

  // 6. Deactivate old roadmaps
  await StudentRoadmap.updateMany({ studentId: userId, isActive: true }, { $set: { isActive: false } });

  // 7. Create New Roadmap
  const newRoadmap = await StudentRoadmap.create({
    studentId: userId,
    targetCareerId,
    targetCareerName,
    currentPhase: steps.find(s => s.status === 'IN_PROGRESS')?.title || 'Foundation',
    overallProgress: educationStage.includes('ug') ? 60 : educationStage.includes('12') ? 30 : 10,
    skillGaps: skillGaps.slice(0, 5), // Top 5 gaps
    steps,
    isActive: true,
    generatedAt: new Date(),
    lastUpdated: new Date()
  });

  return newRoadmap;
};
