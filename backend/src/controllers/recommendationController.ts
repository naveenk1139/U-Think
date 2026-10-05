import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { generateAllRecommendations, explainRecommendation } from '../services/recommendationService.js';
import Recommendation from '../models/Recommendation.js';
import { User } from '../models/User.js';

/**
 * Trigger generation of career recommendations
 */
export const generateForUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const recommendations = await generateAllRecommendations(userId);
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
    const currentProfileVersion = user.profileUpdatedAt ? user.profileUpdatedAt.getTime() : 0;

    const filter: any = { studentId: userId, status: 'Active' };
    if (type) filter.recommendationType = type;

    let recommendations = await Recommendation.find(filter).populate('entityId').sort({ matchScore: -1 });

    // If recommendations exist but are based on an outdated profile, regenerate them in background
    if (recommendations.length > 0 && (recommendations[0].profileVersion < currentProfileVersion)) {
      // Profile changed. Return existing immediately for fast UI, but recalculate in background.
      generateAllRecommendations(userId)
        .then(() => console.log(`Background recommendations generated for ${userId}`))
        .catch(err => console.error('Background recommendation generation failed', err));
    } else if (recommendations.length === 0) {
      // No recommendations exist at all, must block to generate
      await generateAllRecommendations(userId);
      recommendations = await Recommendation.find(filter).populate('entityId').sort({ matchScore: -1 });
    }

    // Generate explanations dynamically via the Presentation Layer ONLY if not already cached
    const explainedRecommendations = await Promise.all(
      recommendations.map(async (rec: any) => {
        try {
          const prefLang = user.preferredLanguage || 'en';
          if (rec.presentation && rec.presentationLanguage === prefLang) {
             return rec.toJSON();
          }
          const presentation = await explainRecommendation(rec._id.toString(), prefLang);
          rec.presentation = presentation;
          rec.presentationLanguage = prefLang;
          await rec.save();
          return rec.toJSON();
        } catch (err) {
          return rec.toJSON ? rec.toJSON() : rec;
        }
      })
    );

    res.json(explainedRecommendations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Phase 14 & 15: Recommendation Feedback & Continuous Personalization
 * Update the status of a recommendation and train user preferences implicitly
 */
export const updateRecommendationFeedback = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    const { action } = req.body; // 'accept', 'dismiss', 'save'

    const recommendation = await Recommendation.findOne({ _id: id, studentId: userId });
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (action === 'dismiss' || action === 'accept') {
      recommendation.status = action === 'dismiss' ? 'Dismissed' : 'Accepted';

      // --- PHASE 15: Continuous Personalization ---
      try {
        const EntityModel = mongoose.model(recommendation.entityType);
        const entity: any = await EntityModel.findById(recommendation.entityId);
        
        if (entity) {
          // Extract keywords safely
          const keywords = new Set<string>();
          
          if (recommendation.entityType === 'Career') {
            if (entity.industry) keywords.add(entity.industry);
            if (entity.skills && Array.isArray(entity.skills)) entity.skills.slice(0, 3).forEach((s: string) => keywords.add(s));
          } else if (recommendation.entityType === 'College') {
            if (entity.categories && Array.isArray(entity.categories)) entity.categories.forEach((c: string) => keywords.add(c));
            if (entity.programs && Array.isArray(entity.programs)) entity.programs.slice(0, 2).forEach((p: string) => keywords.add(p));
          } else if (recommendation.entityType === 'Course') {
            if (entity.category) keywords.add(entity.category);
            if (entity.tags && Array.isArray(entity.tags)) entity.tags.slice(0, 3).forEach((t: string) => keywords.add(t));
          }

          if (keywords.size > 0) {
            if (!user.settings) user.settings = {};
            if (!user.settings.aiCounselor) user.settings.aiCounselor = {};
            if (!user.settings.aiCounselor.implicitLikes) user.settings.aiCounselor.implicitLikes = [];
            if (!user.settings.aiCounselor.implicitDislikes) user.settings.aiCounselor.implicitDislikes = [];

            const targetArray = action === 'accept' ? user.settings.aiCounselor.implicitLikes : user.settings.aiCounselor.implicitDislikes;
            
            keywords.forEach(kw => {
              if (kw && !targetArray.includes(kw)) {
                targetArray.push(kw);
              }
            });

            // Keep arrays bounded to prevent bloating
            if (targetArray.length > 20) {
              targetArray.splice(0, targetArray.length - 20);
            }

            await user.save();
          }
        }
      } catch (mlErr) {
        console.error("Continuous Personalization Error:", mlErr);
        // Fail silently for ML tuning so we don't break the user flow
      }

      // Record detailed feedback for analytics and explicit context
      const { RecommendationFeedback } = await import('../models/RecommendationFeedback.js');
      try {
        await RecommendationFeedback.findOneAndUpdate(
          { studentId: userId, recommendationId: id },
          { 
            $set: {
              entityId: recommendation.entityId,
              entityType: recommendation.entityType,
              feedbackType: action === 'accept' ? 'INTERESTED' : 'NOT_INTERESTED'
            }
          },
          { upsert: true }
        );
      } catch (fbErr) {
        console.error("Feedback Recording Error:", fbErr);
      }
    }
    
    await recommendation.save();
    
    res.json({ success: true, status: recommendation.status });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
