import mongoose from 'mongoose';
import { User, IUser } from '../models/User.js';
import Career from '../models/Career.js';
import Exam from '../models/Exam.js';
import College from '../models/College.js';
import Recommendation from '../models/Recommendation.js';
import { buildNodeContext } from './knowledgeGraphService.js';
import { detectEducationStage } from './educationStageService.js';
import { extractMLFeatures, IMLFeatureVector } from './featureEngineeringService.js';
import { checkEligibility } from './eligibilityEngine.js';
import { calculateSkillGaps } from './skillGapEngine.js';
import { generateGeminiResponse } from './geminiService.js';

/**
 * Calculates a heuristic similarity score between the student's ML features and a Career's requirements.
 * In a true Python microservice, this would be `model.predict(features)`.
 */
function computeMLMatchScore(features: IMLFeatureVector, career: any, user: IUser): number {
  let score = 0;
  let maxPossible = 0;

  // 1. Skill Matching (Dot Product logic)
  const careerSkills = (career.skills || []).map((s: string) => s.toLowerCase().trim());
  if (careerSkills.length > 0) {
    maxPossible += 40; // Skills account for 40% of the score
    let skillScore = 0;
    careerSkills.forEach((reqSkill: string) => {
      // Check if student has skill in their vector (weighted 0.25 to 1.0)
      const studentSkillWeight = features.skill_vector[reqSkill];
      if (studentSkillWeight) {
        skillScore += studentSkillWeight; 
      }
    });
    // Normalize skill score
    score += Math.min(40, (skillScore / careerSkills.length) * 40);
  }

  // 2. Interest / Industry Match
  if (career.industry) {
    maxPossible += 30; // Interests account for 30%
    const careerInd = career.industry.toLowerCase().trim();
    const hasInterest = features.interest_vector.some(i => i.toLowerCase().trim() === careerInd);
    if (hasInterest) {
      score += 30;
    }
  }

  // 3. Academic Baseline
  maxPossible += 30;
  if (features.academic_score > 0.5) {
    score += 30 * features.academic_score; // Reward high academic scores
  }

  // Normalize final score to 0-100
  if (maxPossible === 0) return 0;
  let finalScore = (score / maxPossible) * 100;

  // 4. Phase 15: Implicit Feedback Calibration
  const implicitLikes = user.settings?.aiCounselor?.implicitLikes || [];
  const implicitDislikes = user.settings?.aiCounselor?.implicitDislikes || [];

  const careerTags = [
    career.industry?.toLowerCase(),
    ...(career.skills || []).map((s: string) => s.toLowerCase())
  ].filter(Boolean);

  let implicitBonus = 0;
  let implicitPenalty = 0;

  careerTags.forEach(tag => {
    if (implicitLikes.some(like => like.toLowerCase() === tag)) implicitBonus += 5;
    if (implicitDislikes.some(dislike => dislike.toLowerCase() === tag)) implicitPenalty += 10;
  });

  // Apply bound penalties and bonuses
  finalScore = finalScore + Math.min(implicitBonus, 15) - Math.min(implicitPenalty, 25);

  return Math.max(0, Math.min(100, Math.round(finalScore)));
}

/**
 * Phase 7 & 8: ML Recommendation Engine & Ranking with Knowledge Graph
 */
export async function generateAllRecommendations(userId: string) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const profileVersion = user.__v || 1;

  // Phase 3 & 4
  const stageInfo = detectEducationStage(user);
  const mlFeatures = extractMLFeatures(user, stageInfo.stageId);

  // Fetch Candidates (Only Active Careers)
  const careers = await Career.find({ active: true }).lean();
  const newRecommendations = [];

  for (const career of careers) {
    // Phase 5: Hard Factual Filter (Eligibility)
    const eligibility = await checkEligibility(user, career._id.toString(), 'Career');

    // If hard blocked, we do not recommend this career (or score it zero).
    if (eligibility.status === 'Not Eligible') {
      continue; 
    }

    // Phase 7: ML Scoring
    const mlScore = computeMLMatchScore(mlFeatures, career, user);

    // Filter out completely irrelevant careers
    if (mlScore < 20) {
      continue;
    }

    // Combine ML Score and Eligibility state
    let label = 'VERIFIED MATCH';
    if (mlScore < 50 || eligibility.status === 'Action Required') {
      label = eligibility.status === 'Action Required' ? 'REQUIRES ACTION' : 'PARTIAL MATCH';
    }

    // Merge eligibility factors with ML factors
    const matchedFactors = [...new Set([...eligibility.matchedFactors])];
    const missingFactors = [...new Set([...eligibility.missingFactors])];
    
    // Check specific skill gaps for explanation
    (career.skills || []).forEach((s: string) => {
      const sk = s.toLowerCase().trim();
      if (!mlFeatures.skill_vector[sk]) {
        missingFactors.push(`Missing skill: ${s}`);
      } else {
        matchedFactors.push(`Matches skill: ${s}`);
      }
    });

    // Phase 8: Recommendation Ranking & Construction
    newRecommendations.push({
      updateOne: {
        filter: { studentId: user._id, entityId: career._id, recommendationType: 'career' },
        update: {
          $set: {
            entityType: 'Career',
            reason: 'HYBRID_AI_ENGINE_V2',
            matchedFactors,
            missingFactors,
            eligibilityStatus: eligibility.status,
            matchScore: mlScore,
            confidence: mlScore > 70 ? 90 : 60, // Confidence based on data density/score
            priority: mlScore > 75 ? 'High' : (mlScore > 50 ? 'Medium' : 'Low'),
            profileVersion: profileVersion,
            status: 'Active',
            recommendationLabel: label,
            sourceReferences: [{
              sourceName: 'U-Think Hybrid Engine',
              lastVerifiedAt: new Date(),
              verificationStatus: 'Verified'
            }]
          }
        },
        upsert: true
      }
    });
  }

  // ----------------------------------------------------
  // Phase 8 (Graph Expansion): Find Exams & Colleges via Knowledge Graph
  // ----------------------------------------------------
  const topCareers = newRecommendations.filter(r => r.updateOne.update.$set.matchScore >= 60);
  
  for (const careerRec of topCareers) {
    const careerId = careerRec.updateOne.filter.entityId.toString();
    const context = await buildNodeContext('Career', careerId);
    
    // Prereqs of Career = Degrees/Pathways
    if (context && context.prerequisites) {
      for (const req of context.prerequisites) {
        if (req.sourceType === 'Degree') {
           // Find Exams that lead to this Degree
           const degreeContext = await buildNodeContext('Degree', req.resolvedNode._id.toString());
           if (degreeContext && degreeContext.prerequisites) {
             for (const degreeReq of degreeContext.prerequisites) {
               if (degreeReq.sourceType === 'Exam') {
                 // We found an Exam that leads to a Degree that leads to a top Career!
                 newRecommendations.push({
                   updateOne: {
                     filter: { studentId: user._id, entityId: degreeReq.resolvedNode._id, recommendationType: 'exam' },
                     update: {
                       $set: {
                         entityType: 'Exam',
                         reason: 'KNOWLEDGE_GRAPH_PATHWAY',
                         matchedFactors: [`Leads to recommended career: ${careerRec.updateOne.update.$set.matchedFactors[0] || 'Strong Match'}`],
                         missingFactors: [],
                         eligibilityStatus: 'Eligible',
                         matchScore: Math.round(careerRec.updateOne.update.$set.matchScore * 0.9), // Slightly lower confidence due to depth
                         confidence: 80,
                         priority: 'High',
                         profileVersion: profileVersion,
                         status: 'Active',
                         recommendationLabel: 'VERIFIED MATCH',
                         sourceReferences: [{
                           sourceName: 'U-Think Knowledge Graph',
                           lastVerifiedAt: new Date(),
                           verificationStatus: 'Verified'
                         }]
                       }
                     },
                     upsert: true
                   }
                 });
               }
             }
           }
        }
      }
    }
  }

  // Bulk Write Transaction
  if (newRecommendations.length > 0) {
    // Expire old recommendations for this profile version (for all types)
    await Recommendation.updateMany(
      { studentId: user._id, profileVersion: { $lt: profileVersion } },
      { $set: { status: 'Expired' } }
    );
    await Recommendation.bulkWrite(newRecommendations as any);
  }

  // Return the newly ranked active recommendations (all types)
  return await Recommendation.find({ 
    studentId: user._id, 
    status: 'Active' 
  }).sort({ matchScore: -1 }).populate('entityId');
}

/**
 * Phase 10 & 11: LLM Multilingual Presentation Layer
 * Uses Gemini to generate an explainable, empathetic recommendation rationale based on facts.
 */
export async function explainRecommendation(recommendationId: string, language: string = 'en') {
  const rec = await Recommendation.findById(recommendationId).populate('entityId').populate('studentId');
  if (!rec) throw new Error('Recommendation not found');

  const career = rec.entityId as any;
  const user = rec.studentId as any as IUser;

  // Run Phase 9: Skill Gap Analysis dynamically to get the learning plan
  const reqSkills = (career.skills || []).map((s: string) => ({ name: s, level: 'Advanced' }));
  const gapReport = calculateSkillGaps(user, career.name, reqSkills);

  // Construct context for the LLM
  const prompt = `You are the U-THINK AI Student Mentor. Your goal is to explain to a student why a specific career is recommended to them.
DO NOT hallucinate facts. DO NOT invent skills. Use ONLY the data provided below.
Provide a warm, encouraging, but realistic explanation.

LANGUAGE: ${language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English'}

STUDENT TARGET CAREER: ${career.name}
MATCH SCORE: ${rec.matchScore}%
MATCHED FACTORS (Why they are a fit): ${rec.matchedFactors.join(', ')}
MISSING FACTORS (What they need to learn): ${rec.missingFactors.join(', ')}
RECOMMENDED ACTION PLAN: ${gapReport.learningPlan.join(' ')}

FORMAT REQUIREMENT:
Return ONLY valid JSON matching this schema:
{
  "title": "string (localized career title)",
  "explanation": "string (1-2 paragraph personalized explanation)",
  "score": number,
  "action": "string (a short 1-sentence next step)",
  "missing": ["string"],
  "matched": ["string"],
  "learningPlan": ["string"]
}`;

  try {
    const aiResponseStr = await generateGeminiResponse(prompt);
    // Attempt to parse JSON. Sometimes LLMs wrap in markdown ```json
    const cleanedJson = aiResponseStr.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedResponse = JSON.parse(cleanedJson);
    return parsedResponse;
  } catch (error) {
    console.error('LLM Explanation Failed, falling back to static strings:', error);
    
    // Fallback if API fails or parsing fails
    if (language === 'kn') {
      return {
        title: `ಶಿಫಾರಸು ಮಾಡಿದ ವೃತ್ತಿ: ${career.name}`,
        explanation: `ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಅರ್ಹತೆಗಳ ಆಧಾರದ ಮೇಲೆ, ಈ ವೃತ್ತಿಯು ${rec.matchScore}% ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.`,
        score: rec.matchScore,
        action: 'ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳನ್ನು ಸುಧಾರಿಸಿ',
        missing: rec.missingFactors,
        matched: rec.matchedFactors,
        learningPlan: gapReport.learningPlan
      };
    }

    return {
      title: `Recommended Career: ${career.name}`,
      explanation: `Based on your profile, this career is a ${rec.matchScore}% match.`,
      score: rec.matchScore,
      action: 'Improve your missing skills',
      missing: rec.missingFactors,
      matched: rec.matchedFactors,
      learningPlan: gapReport.learningPlan
    };
  }
}
