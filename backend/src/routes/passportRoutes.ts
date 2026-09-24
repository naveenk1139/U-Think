import { Router, Request, Response, NextFunction } from 'express';
import { protect as requireAuth } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import SkillEvidenceGraph from '../models/SkillEvidenceGraph.js';
import StudentRoadmap from '../models/StudentRoadmap.js';
import StabilityAnalysis from '../models/StabilityAnalysis.js';

const router = Router();

// Route: /api/passport
// Method: GET
// Description: Aggregates verified data to create the Career Passport
router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    
    // Fetch core user
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Fetch verified skills graph
    const skillGraph = await SkillEvidenceGraph.findOne({ studentId: userId });
    
    // Fetch latest active roadmap
    const roadmap = await StudentRoadmap.findOne({ studentId: userId, status: 'active' }).sort({ updatedAt: -1 });

    // Fetch latest stability analysis
    let stability = null;
    if (roadmap) {
      stability = await StabilityAnalysis.findOne({ studentId: userId, targetCareer: roadmap.targetCareerName }).sort({ analyzedAt: -1 });
    }

    // Assemble the passport
    const passportData = {
      profile: {
        name: user.name,
        email: user.email,
        academicProfile: user.academicProfile,
        profileCompletion: user.profileCompletion,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
      },
      verifiedSkills: skillGraph ? skillGraph.nodes : [],
      activeTarget: roadmap ? {
        careerName: roadmap.targetCareerName,
        currentPhase: roadmap.currentPhase,
        totalSteps: roadmap.steps.length,
        completedSteps: roadmap.steps.filter((s: any) => s.status === 'completed').length,
        skillGaps: roadmap.skillGaps
      } : null,
      stabilityScore: stability ? {
        score: stability.stabilityScore,
        confidence: stability.confidenceLevel,
        date: stability.analyzedAt
      } : null,
      issuedAt: new Date(),
      passportId: `PASS-${userId.substring(0, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`
    };

    res.json({ success: true, passport: passportData });
  } catch (err) {
    console.error('Passport Aggregation Error:', err);
    next(err);
  }
});

export default router;
