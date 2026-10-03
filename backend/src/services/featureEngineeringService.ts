import { IUser } from '../models/User.js';

export interface IMLFeatureVector {
  // Numeric Features
  academic_score: number; // 0.0 to 1.0
  cgpa: number; // raw value
  backlog_count: number;
  project_count: number;
  internship_count: number;
  certification_count: number;
  hackathon_count: number;
  career_readiness_score: number;
  
  // Encoded Categorical / Ordinal
  education_stage_encoded: number; // 1 to 6 (10th to PG)
  semester_encoded: number; // 1 to 8+
  
  // Vector / Array representations
  skill_vector: Record<string, number>; // e.g., { 'Python': 0.8, 'React': 0.5 }
  interest_vector: string[];
  subject_strength_vector: string[];
  subject_weakness_vector: string[];
  
  // Goal & Constraints
  budget_preference: number; // 1: Low, 2: Medium, 3: High, 0: Unknown
  location_preference_count: number;
  higher_study_goal_encoded: number; // 1: Job, 2: Masters, 3: Research
}

/**
 * Maps skill levels to numerical weights
 */
const mapSkillLevelToWeight = (level: string): number => {
  const mapping: Record<string, number> = {
    'Beginner': 0.25,
    'Intermediate': 0.5,
    'Advanced': 0.75,
    'Expert': 1.0
  };
  return mapping[level] || 0.1; // Default slightly above 0 if unknown
};

/**
 * Encodes the education stage into an ordinal feature for ML
 */
const encodeEducationStage = (stageId: string): number => {
  const mapping: Record<string, number> = {
    '10th': 1,
    '11th': 2,
    '12th': 3,
    'iti': 3,
    'diploma': 4,
    'degree': 5,
    'pg': 6,
    'working': 7
  };
  return mapping[stageId] || 0;
};

/**
 * Extracts privacy-safe, purely analytical ML features from a student profile.
 * Strips all PII (Name, Email, Mobile, etc.)
 */
export const extractMLFeatures = (user: IUser, stageId: string): IMLFeatureVector => {
  const profile = user.intelligenceProfile || {};
  
  // 1. Process Skills into a weighted vector dictionary
  const skill_vector: Record<string, number> = {};
  if (profile.structuredSkills && Array.isArray(profile.structuredSkills)) {
    profile.structuredSkills.forEach(skill => {
      skill_vector[skill.skillName.toLowerCase().trim()] = mapSkillLevelToWeight(skill.skillLevel);
    });
  } else if (user.skills && Array.isArray(user.skills)) {
    // Fallback to legacy string skills
    user.skills.forEach(skill => {
      skill_vector[skill.toLowerCase().trim()] = 0.5; // Assume intermediate if legacy
    });
  }

  // 2. Academic Score Normalization (Heuristic: CGPA vs Backlogs)
  let cgpa = profile.cgpa || 0;
  if (!cgpa && user.academicProfile) {
    if (stageId === '10th' && user.academicProfile.tenthPercentage) cgpa = user.academicProfile.tenthPercentage / 9.5;
    else if (stageId === '12th' && user.academicProfile.twelfthPercentage) cgpa = user.academicProfile.twelfthPercentage / 9.5;
    else if (stageId === 'diploma' && user.academicProfile.diplomaPercentage) cgpa = user.academicProfile.diplomaPercentage / 9.5;
  }
  
  let backlogs = profile.backlogs || 0;
  let academic_score = cgpa > 0 ? (cgpa / 10) : 0; // Baseline 0 to 1
  
  // Penalty for backlogs
  if (backlogs > 0) {
    academic_score = Math.max(0, academic_score - (backlogs * 0.05));
  }

  // 3. Budget encoding
  let budget_preference = 0;
  const rawBudget = (profile.budgetRange || '').toLowerCase();
  if (rawBudget.includes('low') || rawBudget.includes('economy')) budget_preference = 1;
  else if (rawBudget.includes('medium') || rawBudget.includes('mid')) budget_preference = 2;
  else if (rawBudget.includes('high') || rawBudget.includes('premium')) budget_preference = 3;

  // 4. Higher study goal encoding
  let higher_study_goal_encoded = 0;
  const rawGoal = (profile.higherStudyGoal || '').toLowerCase();
  if (rawGoal.includes('job') || rawGoal.includes('work')) higher_study_goal_encoded = 1;
  else if (rawGoal.includes('master') || rawGoal.includes('m.tech') || rawGoal.includes('ms')) higher_study_goal_encoded = 2;
  else if (rawGoal.includes('phd') || rawGoal.includes('research')) higher_study_goal_encoded = 3;

    const derivedStrengths = new Set<string>(profile.subjectStrengths?.map(s => s.toLowerCase().trim()) || []);
    const derivedWeaknesses = new Set<string>(profile.subjectWeaknesses?.map(s => s.toLowerCase().trim()) || []);

    // Dynamically add strengths/weaknesses from Marks Card
    if (user.academicProfile && user.academicProfile.subjects) {
      user.academicProfile.subjects.forEach(sub => {
        if (sub.subjectName && sub.marksObtained != null && sub.maximumMarks != null && sub.maximumMarks > 0) {
          const percentage = (sub.marksObtained / sub.maximumMarks) * 100;
          const subName = sub.subjectName.toLowerCase().trim();
          if (percentage >= 75) {
            derivedStrengths.add(subName);
            derivedWeaknesses.delete(subName);
          } else if (percentage < 60) {
            derivedWeaknesses.add(subName);
            derivedStrengths.delete(subName);
          }
        }
      });
    }

    return {
      academic_score: Number(academic_score.toFixed(2)),
      cgpa,
      backlog_count: backlogs,
      project_count: profile.projectCount || 0,
      internship_count: profile.internshipCount || 0,
      certification_count: profile.certificationCount || 0,
      hackathon_count: profile.hackathonsAttended || 0,
      career_readiness_score: profile.careerReadinessScore || 0,
      
      education_stage_encoded: encodeEducationStage(stageId),
      semester_encoded: profile.currentSemester || 0,
      
      skill_vector,
      interest_vector: user.interests || [],
      subject_strength_vector: Array.from(derivedStrengths),
      subject_weakness_vector: Array.from(derivedWeaknesses),
    
    budget_preference,
    location_preference_count: (user.preferredLocation || []).length,
    higher_study_goal_encoded
  };
};
