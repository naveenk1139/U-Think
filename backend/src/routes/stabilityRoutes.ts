import { Router, Request, Response, NextFunction } from 'express';
import { protect as requireAuth } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import StabilityAnalysis from '../models/StabilityAnalysis.js';
import { generateGeminiResponse } from '../services/geminiService.js';

const router = Router();

// Route: /api/stability/analyze
// Method: POST
router.post('/analyze', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { targetCareer } = req.body;

    if (!targetCareer) {
       res.status(400).json({ error: 'targetCareer is required.' });
       return;
    }

    const user = await User.findById(userId);
    const userProfile = {
      skills: user?.skills || [],
      academicProfile: user?.academicProfile || {},
      interests: user?.interests || []
    };

    const prompt = `
      You are the "AI Disagreement & Recommendation Stability Engine".
      Your job is to act as a rigorous Devil's Advocate for a student's chosen career path.
      
      Student Profile Context:
      - Skills: ${userProfile.skills.join(', ')}
      - Academics: ${JSON.stringify(userProfile.academicProfile)}
      - Interests: ${JSON.stringify(userProfile.interests)}
      
      Chosen Target Career: "${targetCareer}"
      
      Analyze how STABLE this choice is based on their profile. 
      What are the strong matching factors? 
      CRITICALLY: What are the severe risks, mismatches, or "disagreements" where their profile conflicts with the demands of this career?
      Provide a stability score (0-100).
      
      Return ONLY a JSON object matching this schema exactly:
      {
        "stabilityScore": number,
        "confidenceLevel": "High|Medium|Low",
        "supportingFactors": ["string"],
        "riskFactors": ["string (Devil's advocate arguments)"],
        "alternativeSuggestion": "string (A better matched career, if applicable)"
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Stability response:", geminiResponse);
      res.status(500).json({ error: 'Failed to analyze stability. AI returned invalid format.' });
      return;
    }

    // Save to DB
    const analysis = new StabilityAnalysis({
      studentId: userId,
      targetCareer,
      ...parsedData
    });
    await analysis.save();

    res.json({ success: true, analysis });
  } catch (err) {
    console.error('Stability Analysis Error:', err);
    next(err);
  }
});

// Route: /api/stability/history
// Method: GET
router.get('/history', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history = await StabilityAnalysis.find({ studentId: req.user?.id }).sort({ analyzedAt: -1 });
    res.json({ history });
  } catch (err) {
    next(err);
  }
});

export default router;
