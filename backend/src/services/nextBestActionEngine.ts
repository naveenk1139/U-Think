import { User, IUser } from '../models/User.js';
import Exam from '../models/Exam.js';
import Recommendation from '../models/Recommendation.js';

export interface INextBestAction {
  id: string;
  type: 'URGENT_DEADLINE' | 'PROFILE_INCOMPLETE' | 'SKILL_GAP' | 'RECOMMENDATION_REVIEW' | 'PATHWAY_EXPLORATION';
  title: string;
  description: string;
  actionText: string;
  actionUrl: string;
  priority: number; // 100 is highest
}

export const generateNextBestActions = async (userId: string): Promise<INextBestAction[]> => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const actions: INextBestAction[] = [];

  // 1. Profile Completion Check (Highest Priority if critical fields missing)
  if (!user.interests || user.interests.length === 0) {
    actions.push({
      id: 'nba_profile_interests',
      type: 'PROFILE_INCOMPLETE',
      title: 'Complete Your Intelligence Profile',
      description: 'We cannot generate accurate AI recommendations without knowing your career interests.',
      actionText: 'Update Interests',
      actionUrl: '/settings?tab=interests',
      priority: 95
    });
  }

  if (!user.educationLevel) {
    actions.push({
      id: 'nba_profile_edu',
      type: 'PROFILE_INCOMPLETE',
      title: 'Set Your Education Level',
      description: 'Tell us where you are in your academic journey so we can map your next steps.',
      actionText: 'Update Education',
      actionUrl: '/settings?tab=education',
      priority: 100
    });
  }

  // 2. Urgent Deadlines Check
  // We check if the user has saved exams with upcoming application deadlines.
  if (user.savedExams && user.savedExams.length > 0) {
    const upcomingExams = await Exam.find({
      _id: { $in: user.savedExams },
      // Assuming applicationDates is an array of strings, we'd ideally parse this or have a structured date.
      // For this Engine, we'll just flag any saved exam as a high priority review item if it's active.
      status: 'ACTIVE'
    }).limit(2);

    upcomingExams.forEach(exam => {
      actions.push({
        id: `nba_exam_${exam._id}`,
        type: 'URGENT_DEADLINE',
        title: `Upcoming Exam: ${exam.exam_name}`,
        description: `You saved this exam. Check the official website for application deadlines so you don't miss out.`,
        actionText: 'View Exam Details',
        actionUrl: `/exams/${exam.canonical_slug}`,
        priority: 85
      });
    });
  }

  // 3. Unreviewed AI Recommendations and Skill Gaps
  const unreviewedRecs = await Recommendation.find({
    studentId: user._id,
    status: 'Active'
  }).sort({ matchScore: -1 }).populate('entityId');

  if (unreviewedRecs.length > 0) {
    const topRec = unreviewedRecs[0];
    const entity = topRec.entityId as any;
    const name = entity?.name || entity?.title || 'a new path';
    
    actions.push({
      id: `nba_rec_${topRec._id}`,
      type: 'RECOMMENDATION_REVIEW',
      title: `AI Matched You with ${name}`,
      description: `Based on your latest profile update, we have a ${topRec.matchScore}% match for you. Review the skill gap report now.`,
      actionText: 'Review Match',
      actionUrl: '/dashboard', // User can view it in the widget
      priority: 75
    });

    // Check for Skill Gaps in top recommendations
    const gapRec = unreviewedRecs.find(r => r.missingFactors && r.missingFactors.length > 0);
    if (gapRec) {
      actions.push({
        id: `nba_skill_gap_${gapRec._id}`,
        type: 'SKILL_GAP',
        title: `Upskill Required: ${gapRec.missingFactors[0]}`,
        description: `You are missing '${gapRec.missingFactors[0]}' which is critical for your matched goal. Take a course to bridge this gap.`,
        actionText: 'Find Courses',
        actionUrl: '/professional-courses', // Direct to professional courses
        priority: 80
      });
    }
  }

  // 4. Educational Pathway Mapping for High Schoolers
  if (user.educationLevel === '10th' || user.educationLevel === '11th') {
    actions.push({
      id: `nba_pathway_explore`,
      type: 'PATHWAY_EXPLORATION',
      title: `Map Your Future Stream`,
      description: `Students in ${user.educationLevel} should explore available streams (Science, Commerce, Arts) to align with their future goals.`,
      actionText: 'Explore Pathways',
      actionUrl: '/pathways/after-10th',
      priority: 60
    });
  }

  // Sort by priority descending
  actions.sort((a, b) => b.priority - a.priority);

  // Return Top 3 Actions
  return actions.slice(0, 3);
};
