import { User } from '../models/User.js';
import AssessmentResult from '../models/AssessmentResult.js';
import StudentRoadmap, { IRoadmapStep, ISkillGap } from '../models/StudentRoadmap.js';
import Career from '../models/Career.js';
import Course from '../models/Course.js';

export const analyzeProfileAndGenerateRoadmap = async (userId: string) => {
  // 1. Load Student Profile
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (user.profileCompletion !== undefined && user.profileCompletion < 30) {
    throw new Error('INCOMPLETE_PROFILE');
  }

  // 2. Load Aptitude Result (if any)
  const aptitude = await AssessmentResult.findOne({ userId }).sort({ createdAt: -1 });

  // 3. Determine Target Career
  let targetCareerId = null;
  let targetCareerName = '';
  let requiredSkills: string[] = [];
  let targetCareerDoc: any = null;

  if (user.careerGoal) {
    targetCareerDoc = await Career.findOne({ name: { $regex: new RegExp(user.careerGoal, 'i') } });
    if (targetCareerDoc) {
      targetCareerId = targetCareerDoc._id;
      targetCareerName = targetCareerDoc.name;
      requiredSkills = targetCareerDoc.skills || [];
    }
  }

  if (!targetCareerId && aptitude && aptitude.topMatches && aptitude.topMatches.length > 0) {
    const topMatch = aptitude.topMatches[0];
    targetCareerId = topMatch.careerId;
    targetCareerName = topMatch.careerName;
    targetCareerDoc = await Career.findById(targetCareerId);
    if (targetCareerDoc) {
      requiredSkills = targetCareerDoc.skills || [];
    }
  }

  if (!targetCareerId) {
    targetCareerDoc = await Career.findOne();
    if (targetCareerDoc) {
      targetCareerId = targetCareerDoc._id;
      targetCareerName = targetCareerDoc.name;
      requiredSkills = targetCareerDoc.skills || [];
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
        gapDescription: `Required for ${targetCareerName}.`
      });
    }
  });

  // 5. Build Personalized Roadmap Steps based on Education Stage
  const steps: IRoadmapStep[] = [];
  const eduStageRaw = user.intelligenceProfile?.educationStage?.toLowerCase() || user.educationLevel?.toLowerCase() || '10th';
  let stepIdCounter = 1;

  const isUG = eduStageRaw.includes('ug') || eduStageRaw.includes('bachelor') || eduStageRaw.includes('undergrad') || eduStageRaw.includes('degree') || eduStageRaw.includes('engineering') || eduStageRaw.includes('be') || eduStageRaw.includes('btech');
  const is12th = eduStageRaw.includes('12') || eduStageRaw.includes('puc') || eduStageRaw.includes('diploma');
  const is10th = eduStageRaw.includes('10') || eduStageRaw.includes('high school');

  // 10th Stage
  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: '10th Standard',
    type: 'Foundation',
    description: 'Secondary School Education.',
    status: (is12th || isUG) ? 'COMPLETED' : 'CURRENT',
    whyRecommended: 'Foundation for all higher education paths.',
  });

  // 12th / PUC Stage
  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: user.stream ? `12th / PUC (${user.stream})` : '12th / PUC / Diploma',
    type: 'Foundation',
    description: `Higher secondary education aligned with ${targetCareerName}.`,
    status: isUG ? 'COMPLETED' : (is12th ? 'CURRENT' : 'NEXT'),
    whyRecommended: `Required to pursue a degree related to ${targetCareerName}.`,
  });

  // Entrance Exam
  let recommendedExams: string[] = [];
  if (targetCareerDoc && targetCareerDoc.industry) {
      if (targetCareerDoc.industry.toLowerCase().includes('engineering') || targetCareerDoc.industry.toLowerCase().includes('technology')) recommendedExams = ['JEE Main', 'KCET', 'COMEDK'];
      if (targetCareerDoc.industry.toLowerCase().includes('healthcare') || targetCareerDoc.industry.toLowerCase().includes('medicine')) recommendedExams = ['NEET'];
      if (targetCareerDoc.industry.toLowerCase().includes('law')) recommendedExams = ['CLAT', 'LSAT'];
      if (targetCareerDoc.industry.toLowerCase().includes('design')) recommendedExams = ['NID DAT', 'UCEED'];
  }
  
  if (recommendedExams.length > 0) {
      steps.push({
        stepId: `step_${stepIdCounter++}`,
        title: 'Entrance Examinations',
        type: 'Exam',
        description: `Prepare for ${recommendedExams.join(', ')}.`,
        status: isUG ? 'COMPLETED' : (is12th ? 'NEXT' : 'RECOMMENDED'),
        whyRecommended: 'Crucial for getting admission into top colleges.',
        recommendedExams,
        estimatedDuration: '6-12 Months'
      });
  }

  // Undergraduate Degree
  const userCourseName = user.course || 'Undergraduate Degree';
  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: isUG ? `${userCourseName}` : (targetCareerDoc.relatedDegrees?.[0] || 'Undergraduate Degree'),
    type: 'Degree',
    description: `Enroll in a Bachelor's degree program focusing on core fundamentals for ${targetCareerName}.`,
    status: isUG ? 'CURRENT' : 'RECOMMENDED',
    whyRecommended: `Minimum educational qualification required for most ${targetCareerName} roles.`,
    recommendedCourses: targetCareerDoc.relatedDegrees || [],
    estimatedDuration: '3-4 Years'
  });

  // Skills & Certifications
  if (skillGaps.length > 0) {
      steps.push({
        stepId: `step_${stepIdCounter++}`,
        title: 'Skill Development & Certifications',
        type: 'Skill',
        description: `Master industry-required skills.`,
        status: isUG ? 'NEXT' : 'RECOMMENDED',
        whyRecommended: 'Bridging the skill gap makes you highly employable.',
        requiredSkills: skillGaps.map(g => g.skillName),
        estimatedDuration: '3-6 Months'
      });
  }

  // Projects & Internships
  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: 'Projects & Internships',
    type: 'Project',
    description: 'Apply your skills in real-world scenarios through capstone projects and internships.',
    status: 'RECOMMENDED',
    whyRecommended: 'Practical experience is highly valued by recruiters.',
    estimatedDuration: '3-6 Months'
  });

  // Career Goal
  steps.push({
    stepId: `step_${stepIdCounter++}`,
    title: `Target: ${targetCareerName}`,
    type: 'Career',
    description: `Launch your career as a ${targetCareerName}.`,
    status: 'LOCKED',
    whyRecommended: 'Your primary career objective.',
    requiredSkills: requiredSkills
  });

  // 6. Deactivate old roadmaps
  await StudentRoadmap.updateMany({ studentId: userId, isActive: true }, { $set: { isActive: false } });

  let completedSteps = steps.filter(s => s.status === 'COMPLETED').length;
  let overallProgress = Math.round((completedSteps / steps.length) * 100);
  if (isUG && overallProgress < 60) overallProgress = 60;

  // 7. Create New Roadmap
  const newRoadmap = await StudentRoadmap.create({
    studentId: userId,
    targetCareerId,
    targetCareerName,
    currentPhase: steps.find(s => s.status === 'CURRENT' || s.status === 'IN_PROGRESS')?.title || 'Foundation',
    overallProgress,
    skillGaps: skillGaps.slice(0, 5), // Top 5 gaps
    steps,
    isActive: true,
    generatedAt: new Date(),
    lastUpdated: new Date()
  });

  return newRoadmap;
};
