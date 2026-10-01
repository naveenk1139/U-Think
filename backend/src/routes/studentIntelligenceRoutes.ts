import { Router, Response, NextFunction } from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { detectEducationStage } from '../services/educationStageService.js';
import { extractMLFeatures } from '../services/featureEngineeringService.js';

const router = Router();

router.use(protect);

// GET /student/intelligence/profile
router.get('/profile', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select('intelligenceProfile profileCompletion');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user.intelligenceProfile || {});
  } catch (err) {
    next(err);
  }
});

// PUT /student/intelligence/profile (Smart Onboarding updates)
router.put('/profile', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const updates = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Merge intelligenceProfile updates
    user.intelligenceProfile = {
      ...user.intelligenceProfile,
      ...updates
    };

    await user.save(); // triggers profileCompletion hook
    res.json(user.intelligenceProfile);
  } catch (err) {
    next(err);
  }
});

// POST /student/intelligence/analyze
// In later phases, this will trigger the ML/Rule engines to compute careerReadinessScore, etc.
router.post('/analyze', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Run Education Stage Detection (Phase 3)
    const stageInfo = detectEducationStage(user);
    
    // Placeholder for Phase 4+ feature engineering and analysis
    if (!user.intelligenceProfile) {
      user.intelligenceProfile = {};
    }
    
    // Save the detected stage back to the profile
    user.intelligenceProfile.educationStage = stageInfo.readableStage;

    // Run Feature Engineering (Phase 4)
    const mlFeatures = extractMLFeatures(user, stageInfo.stageId);

    // Example naive rule computation (to be replaced by real AI/Rule Engine)
    let readinessScore = 30; // base score
    if (user.intelligenceProfile.cgpa && user.intelligenceProfile.cgpa > 7.0) readinessScore += 20;
    if (user.intelligenceProfile.structuredSkills && user.intelligenceProfile.structuredSkills.length > 0) readinessScore += 20;
    if (user.intelligenceProfile.projectCount && user.intelligenceProfile.projectCount > 0) readinessScore += 20;
    if (user.intelligenceProfile.backlogs && user.intelligenceProfile.backlogs === 0) readinessScore += 10;

    user.intelligenceProfile.careerReadinessScore = Math.min(100, readinessScore);
    
    if (user.intelligenceProfile.backlogs && user.intelligenceProfile.backlogs > 2) {
      user.intelligenceProfile.academicRiskLevel = 'High';
    } else if (user.intelligenceProfile.backlogs && user.intelligenceProfile.backlogs > 0) {
      user.intelligenceProfile.academicRiskLevel = 'Medium';
    } else {
      user.intelligenceProfile.academicRiskLevel = 'Low';
    }

    await user.save();
    res.json({
      message: 'Intelligence profile analyzed successfully.',
      stage: stageInfo,
      mlFeatures: mlFeatures,
      intelligenceProfile: user.intelligenceProfile
    });
  } catch (err) {
    next(err);
  }
});

export default router;
