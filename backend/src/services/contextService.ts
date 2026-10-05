import { Types } from 'mongoose';
import { User } from '../models/User.js';
import { StudentActivity } from '../models/StudentActivity.js';
import Conversation from '../models/Conversation.js';

export interface IStudentContext {
  profile: any;
  activities: any[];
  recentConversations: any[];
  profileVersion: number;
}

export class ContextService {
  /**
   * Retrieves the comprehensive student context for the AI Orchestrator.
   * This ensures we only send relevant, condensed context to the LLM, avoiding token waste.
   */
  static async getStudentContext(studentId: string | Types.ObjectId): Promise<IStudentContext> {
    const profile = await User.findById(studentId).lean();
    if (!profile) throw new Error('Student not found');

    // Get recent activities (e.g. last 10)
    const activities = await StudentActivity.find({ studentId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Get recent conversation summaries or context
    const recentConversations = await Conversation.find({ studentId })
      .sort({ updatedAt: -1 })
      .limit(3)
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 5 } // Only latest 5 messages per conversation
      })
      .lean();

    return {
      profile: this.condenseProfile(profile),
      activities: activities.map(a => ({
        type: a.activityType,
        entityType: a.entityType,
        date: a.createdAt
      })),
      recentConversations: recentConversations.map(c => ({
        topic: c.title,
        lastMessages: (c as any).messages?.map((m: any) => ({
          role: m.role,
          content: m.content
        })).reverse()
      })),
      profileVersion: (profile as any).profileVersion || 1
    };
  }

  /**
   * Condense the profile to only the facts necessary for AI Reasoning
   */
  private static condenseProfile(user: any) {
    return {
      educationLevel: user.educationLevel,
      classOrYear: user.classOrYear,
      stream: user.stream,
      careerGoal: user.careerGoal,
      location: user.city ? `${user.city}, ${user.state}` : user.state,
      academicProfile: user.academicProfile,
      intelligenceProfile: {
        budgetRange: user.intelligenceProfile?.budgetRange,
        institutionPreference: user.intelligenceProfile?.institutionPreference,
        structuredSkills: user.intelligenceProfile?.structuredSkills
      },
      interests: user.interests,
      preferredCareer: user.preferredCareer
    };
  }

  /**
   * Convert the context object into a system prompt string for the LLM
   */
  static formatContextForPrompt(context: IStudentContext): string {
    return `
### STUDENT PROFILE (v${context.profileVersion})
Education: ${context.profile.educationLevel} ${context.profile.classOrYear} (${context.profile.stream})
Career Goal: ${context.profile.careerGoal || 'Not specified'}
Location: ${context.profile.location || 'Not specified'}
Interests: ${context.profile.interests?.join(', ') || 'None'}
Skills: ${context.profile.intelligenceProfile?.structuredSkills?.map((s:any) => `${s.skillName} (${s.skillLevel})`).join(', ') || 'None'}

### ACADEMICS
10th: ${context.profile.academicProfile?.tenthPercentage || 'N/A'}%
12th: ${context.profile.academicProfile?.twelfthPercentage || 'N/A'}%

### RECENT ACTIVITY
${context.activities.map(a => `- ${a.type} a ${a.entityType}`).join('\n') || 'No recent activity.'}
`;
  }
}
