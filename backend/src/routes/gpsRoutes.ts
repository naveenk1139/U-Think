import { Router, Request, Response, NextFunction } from 'express';
import { protect as requireAuth } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import StudentRoadmap from '../models/StudentRoadmap.js';
import { generateGeminiResponse } from '../services/geminiService.js';

const router = Router();

// Route: /api/gps/calculate
// Method: POST
// Body: { targetCareer: string }
router.post('/calculate', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { targetCareer } = req.body;

    if (!targetCareer) {
       res.status(400).json({ error: 'Target career is required.' });
       return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const currentProfile = user.profile || {};
    const academicLevel = currentProfile.academic_level || '10th / SSLC';

    // Construct the prompt for the Career GPS Engine
    const prompt = `
      You are the "Career GPS Engine", an expert AI academic and career counselor.
      A student wants to reach the destination career of "${targetCareer}".
      Their current academic phase is: "${academicLevel}".
      
      Generate a step-by-step turn-by-turn roadmap (GPS style) to get from their current phase to the target career.
      Also identify 2-3 key skill gaps they will need to bridge.
      
      Return ONLY a JSON object matching this schema, with no markdown formatting or extra text:
      {
        "steps": [
          {
            "stepId": "step-1",
            "title": "Short step title (e.g., 12th PCM)",
            "type": "Foundation|Eligibility|Exam|Degree|Skill|Project|Career",
            "description": "Clear instruction for this phase."
          }
        ],
        "skillGaps": [
          {
            "skillName": "Name of skill",
            "currentLevel": "None|Beginner",
            "requiredLevel": "Intermediate|Advanced",
            "gapDescription": "How to bridge this gap."
          }
        ]
      }
    `;

    // Call Gemini
    const geminiResponse = await generateGeminiResponse(prompt);
    
    // Parse the JSON safely
    let gpsData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      gpsData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Gemini GPS response:", geminiResponse);
      res.status(500).json({ error: 'Failed to generate GPS route. AI returned invalid format.' });
      return;
    }

    // Save to Database (Upsert for the user)
    const updatedRoadmap = await StudentRoadmap.findOneAndUpdate(
      { studentId: userId },
      {
        targetCareerName: targetCareer,
        currentPhase: academicLevel,
        steps: gpsData.steps || [],
        skillGaps: gpsData.skillGaps || [],
        isActive: true,
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, roadmap: updatedRoadmap });
  } catch (err) {
    console.error('GPS Engine Error:', err);
    next(err);
  }
});

// Route: /api/gps/current
// Method: GET
router.get('/current', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const roadmap = await StudentRoadmap.findOne({ studentId: userId, isActive: true });
    
    if (!roadmap) {
       res.json({ roadmap: null });
       return;
    }
    
    res.json({ roadmap });
  } catch (err) {
    next(err);
  }
});

export default router;
