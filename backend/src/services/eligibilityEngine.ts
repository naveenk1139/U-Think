import mongoose from 'mongoose';
import { IUser } from '../models/User.js';
import EducationPathRelation from '../models/EducationPathRelation.js';

export interface IEligibilityResult {
  isEligible: boolean;
  status: 'Eligible' | 'Not Eligible' | 'Action Required' | 'Unknown';
  matchedFactors: string[];
  missingFactors: string[];
  blockers: string[];
}

/**
 * Deterministic Rule Engine for checking a student's factual eligibility 
 * against verified constraints in the Education Knowledge Graph.
 * ML and LLM must NEVER override these results.
 */
export const checkEligibility = async (
  user: IUser, 
  targetEntityId: string, 
  targetEntityType: string
): Promise<IEligibilityResult> => {
  const result: IEligibilityResult = {
    isEligible: true,
    status: 'Unknown',
    matchedFactors: [],
    missingFactors: [],
    blockers: []
  };

  const profile = user.intelligenceProfile || {};

  try {
    // 1. Fetch all 'REQUIRES' or 'PREREQUISITE' relationships pointing to the target entity
    // This represents the hard rules for the target.
    const rules = await EducationPathRelation.find({
      targetId: new mongoose.Types.ObjectId(targetEntityId),
      targetType: targetEntityType,
      relationType: { $in: ['REQUIRES', 'PREREQUISITE'] }
    });

    if (!rules || rules.length === 0) {
      // If no hard rules exist, we default to Unknown or Eligible depending on strictness policy.
      // For a recommendation engine, lack of rules means it's generally open.
      result.status = 'Eligible';
      result.matchedFactors.push('No strict prerequisites found for this path.');
      return result;
    }

    // 2. Evaluate each rule deterministically
    let passedAll = true;

    for (const rule of rules) {
      // Rule A: Minimum Score (CGPA or Percentage)
      if (rule.minScoreRequired) {
        // Convert rule score to 10-point scale if it's a percentage (e.g. 60% -> 6.0)
        const requiredScore10Point = rule.minScoreRequired > 10 ? rule.minScoreRequired / 9.5 : rule.minScoreRequired;
        const studentScore = profile.cgpa || 0;
        
        if (studentScore === 0) {
          passedAll = false;
          result.missingFactors.push(`Requires minimum score of ${rule.minScoreRequired}, but your academic score is not provided.`);
        } else if (studentScore < requiredScore10Point) {
          passedAll = false;
          result.blockers.push(`Your academic score (${studentScore}) is below the required ${requiredScore10Point}.`);
        } else {
          result.matchedFactors.push(`Meets minimum score requirement of ${rule.minScoreRequired}.`);
        }
      }

      // Rule B: Specific Subjects Required
      if (rule.specificSubjectsRequired && rule.specificSubjectsRequired.length > 0) {
        const studentStrengths = new Set(profile.subjectStrengths?.map(s => s.toLowerCase().trim()) || []);
        
        // Dynamically add strengths from Marks Card
        if (user.academicProfile && user.academicProfile.subjects) {
          user.academicProfile.subjects.forEach(sub => {
            if (sub.subjectName && sub.marksObtained != null && sub.maximumMarks != null && sub.maximumMarks > 0) {
              const percentage = (sub.marksObtained / sub.maximumMarks) * 100;
              if (percentage >= 60) { // 60% minimum to be considered eligible for a subject prerequisite
                studentStrengths.add(sub.subjectName.toLowerCase().trim());
              }
            }
          });
        }
        
        for (const reqSubject of rule.specificSubjectsRequired) {
          // Also check for partial matches like 'math' vs 'mathematics'
          const reqSub = reqSubject.toLowerCase().trim();
          let hasSubject = false;
          for (const s of studentStrengths) {
            if (s.includes(reqSub) || reqSub.includes(s)) {
              hasSubject = true;
              break;
            }
          }

          if (!hasSubject) {
            passedAll = false;
            result.missingFactors.push(`Requires background in ${reqSubject} (minimum 60% marks).`);
          } else {
            result.matchedFactors.push(`Has required background in ${reqSubject}.`);
          }
        }
      }

      // Rule C: Entrance Exam Required
      if (rule.entranceExamRequired) {
        // For now, check if they expressed interest in an exam, or if they have written it.
        // In a fully built graph, we'd check if they passed the exam object.
        const examInterests = profile.entranceExamInterest || [];
        if (examInterests.length === 0) {
          passedAll = false;
          result.missingFactors.push('Requires an entrance examination.');
        } else {
          result.matchedFactors.push('Student is tracking entrance examinations.');
        }
      }
    }

    if (!passedAll) {
      result.isEligible = false;
      // If there are hard blockers, they are not eligible.
      // If it's just missing factors (like no exam yet), they require action.
      if (result.blockers.length > 0) {
        result.status = 'Not Eligible';
      } else {
        result.status = 'Action Required';
      }
    } else {
      result.status = 'Eligible';
    }

    return result;
  } catch (error) {
    console.error('Eligibility Check Failed:', error);
    result.isEligible = false;
    result.status = 'Unknown';
    result.blockers.push('Failed to evaluate eligibility rules due to system error.');
    return result;
  }
};
