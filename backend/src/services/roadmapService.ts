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

  const eduStageRaw = user.intelligenceProfile?.educationStage?.toLowerCase() || user.educationLevel?.toLowerCase() || '10th';
  const isUG = eduStageRaw.includes('ug') || eduStageRaw.includes('bachelor') || eduStageRaw.includes('undergrad') || eduStageRaw.includes('degree') || eduStageRaw.includes('engineering') || eduStageRaw.includes('be') || eduStageRaw.includes('btech');

  // 5. RAG / LLM Layer: Generate Personalized Roadmap
  const prompt = `You are an expert U-THINK AI Career & Education Mentor.
Create a highly personalized, step-by-step roadmap for a student.

STUDENT CONTEXT:
Education Stage: ${eduStageRaw}
Target Career: ${targetCareerName}
Identified Skill Gaps: ${skillGaps.map(g => g.skillName).join(', ')}
Industry: ${targetCareerDoc?.industry || 'General'}

Generate a logical progression of steps (minimum 5, maximum 8) to reach the Target Career.
Use the following format for each step. Return ONLY valid JSON array of step objects, without any markdown wrapping (no \`\`\`json).

[
  {
    "stepId": "unique_string_id",
    "title": "Clear, actionable title",
    "type": "Foundation" | "Exam" | "Degree" | "Skill" | "Project" | "Career",
    "description": "Short explanation of what to do",
    "status": "COMPLETED" | "CURRENT" | "NEXT" | "RECOMMENDED" | "LOCKED",
    "whyRecommended": "Why this step is vital for the target career",
    "estimatedDuration": "e.g., 6 Months"
  }
]

RULES:
- Ensure steps naturally flow from the current education stage to the career.
- The student's current stage should be marked 'CURRENT'.
- Past stages must be marked 'COMPLETED'.
- Future stages are 'NEXT', 'RECOMMENDED', or 'LOCKED'.
- The final step MUST be type: 'Career' targeting ${targetCareerName}.`;

  let steps: IRoadmapStep[] = [];
  try {
    const { generateGeminiResponse } = await import('./geminiService.js');
    const aiResponseStr = await generateGeminiResponse(prompt);
    
    // Clean and parse JSON
    const cleanedJson = aiResponseStr.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedSteps = JSON.parse(cleanedJson);
    
    if (Array.isArray(parsedSteps) && parsedSteps.length > 0) {
      steps = parsedSteps;
    } else {
      throw new Error("Invalid format returned by LLM");
    }
  } catch (error) {
    console.error("LLM Roadmap Generation failed, falling back to static rules.", error);
    // Fallback static steps if LLM fails
    let stepIdCounter = 1;
    steps.push({
      stepId: `step_${stepIdCounter++}`,
      title: 'Current Education Phase',
      type: 'Foundation',
      description: `Complete your current education focusing on fundamentals.`,
      status: 'CURRENT',
      whyRecommended: 'Foundation for higher education.',
    });
    steps.push({
      stepId: `step_${stepIdCounter++}`,
      title: `Skill Building`,
      type: 'Skill',
      description: `Master industry-required skills: ${skillGaps.map(g=>g.skillName).join(', ')}`,
      status: 'NEXT',
      whyRecommended: 'Bridging the skill gap makes you employable.',
      estimatedDuration: '6 Months'
    });
    steps.push({
      stepId: `step_${stepIdCounter++}`,
      title: `Target: ${targetCareerName}`,
      type: 'Career',
      description: `Launch your career as a ${targetCareerName}.`,
      status: 'LOCKED',
      whyRecommended: 'Your primary career objective.',
    });
  }

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
