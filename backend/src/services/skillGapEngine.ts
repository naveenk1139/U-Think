import { IUser } from '../models/User.js';

export interface ISkillGap {
  skillName: string;
  currentLevel: string; // 'None', 'Beginner', 'Intermediate', 'Advanced', 'Expert'
  requiredLevel: string;
  gapSeverity: 'Low' | 'Medium' | 'High'; // How big is the gap?
  priority: 'High' | 'Medium' | 'Low'; // How critical is this skill to the career?
}

export interface ISkillGapReport {
  targetName: string;
  overallReadiness: number; // 0 to 100
  gaps: ISkillGap[];
  learningPlan: string[]; // High-level actionable steps
}

const levelValues: Record<string, number> = {
  'None': 0,
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3,
  'Expert': 4
};

/**
 * Calculates the exact delta between a student's current skill levels 
 * and a target career/course's required skill levels.
 */
export const calculateSkillGaps = (
  user: IUser, 
  targetName: string, 
  requiredSkills: { name: string, level?: string, critical?: boolean }[]
): ISkillGapReport => {
  const report: ISkillGapReport = {
    targetName,
    overallReadiness: 0,
    gaps: [],
    learningPlan: []
  };

  const studentSkills = user.intelligenceProfile?.structuredSkills || [];
  
  // Create a fast lookup map for student skills
  const studentSkillMap = new Map<string, string>();
  studentSkills.forEach(s => {
    studentSkillMap.set(s.skillName.toLowerCase().trim(), s.skillLevel);
  });

  let totalScore = 0;
  let maxPossibleScore = 0;

  for (const reqSkill of requiredSkills) {
    const skillKey = reqSkill.name.toLowerCase().trim();
    const reqLevel = reqSkill.level || 'Intermediate'; // Default requirement
    const reqValue = levelValues[reqLevel] || 2;
    
    maxPossibleScore += reqValue * (reqSkill.critical ? 1.5 : 1);

    const currentLevel = studentSkillMap.get(skillKey) || 'None';
    const currentValue = levelValues[currentLevel] || 0;

    // Calculate contribution to overall readiness
    const contribution = Math.min(currentValue, reqValue);
    totalScore += contribution * (reqSkill.critical ? 1.5 : 1);

    // If there is a gap
    if (currentValue < reqValue) {
      const difference = reqValue - currentValue;
      
      let severity: 'Low' | 'Medium' | 'High' = 'Low';
      if (difference >= 3) severity = 'High';
      else if (difference === 2) severity = 'Medium';

      report.gaps.push({
        skillName: reqSkill.name,
        currentLevel,
        requiredLevel: reqLevel,
        gapSeverity: severity,
        priority: reqSkill.critical ? 'High' : (severity === 'High' ? 'Medium' : 'Low')
      });
    }
  }

  report.overallReadiness = maxPossibleScore > 0 
    ? Math.min(100, Math.round((totalScore / maxPossibleScore) * 100)) 
    : 100;

  // Generate a basic Learning Plan based on gaps
  const highPriorityGaps = report.gaps.filter(g => g.priority === 'High');
  const mediumPriorityGaps = report.gaps.filter(g => g.priority === 'Medium');

  if (highPriorityGaps.length > 0) {
    report.learningPlan.push(`URGENT: Master foundational knowledge in ${highPriorityGaps.map(g => g.skillName).join(', ')}.`);
  }
  
  if (mediumPriorityGaps.length > 0) {
    report.learningPlan.push(`NEXT: Level up from your current standing in ${mediumPriorityGaps.map(g => g.skillName).join(', ')}.`);
  }

  if (report.gaps.length === 0) {
    report.learningPlan.push(`You have successfully acquired the required skills for ${targetName}. Focus on practical projects and internships next.`);
  }

  // Sort gaps by priority
  report.gaps.sort((a, b) => {
    const pVals = { 'High': 3, 'Medium': 2, 'Low': 1 };
    return pVals[b.priority] - pVals[a.priority];
  });

  return report;
};
