import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { generateCareerRecommendations, explainRecommendation } from '../services/recommendationService.js';
import Recommendation from '../models/Recommendation.js';
import { User } from '../models/User.js';

/**
 * Trigger generation of career recommendations
 */
export const generateForUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const recommendations = await generateCareerRecommendations(userId);
    res.json({ success: true, count: recommendations.length, recommendations });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all active recommendations for a user, translated based on preference
 */
export const getUserRecommendations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const type = req.query.type as string; // e.g. 'career', 'college'
    
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const filter: any = { studentId: userId, status: 'Active' };
    if (type) filter.recommendationType = type;

    const recommendations = await Recommendation.find(filter).populate('entityId').sort({ matchScore: -1 });

    // Generate explanations dynamically via the Presentation Layer
    const explainedRecommendations = await Promise.all(
      recommendations.map(async (rec) => {
        try {
          const presentation = await explainRecommendation(rec._id.toString(), user.preferredLanguage || 'en');
          return {
            ...rec.toJSON(),
            presentation
          };
        } catch (err) {
          return rec.toJSON();
        }
      })
    );

    res.json(explainedRecommendations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
