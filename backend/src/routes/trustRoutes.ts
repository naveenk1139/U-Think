import { Router, Request, Response } from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware.js';
import { generateGeminiResponse } from '../services/aiService.js';
import Review from '../models/Review.js';
import { DataImportRun } from '../models/DataImportRun.js';

const router = Router();

// POST /api/trust/verify-review
// Analyzes a review for fakeness/spam before saving it
router.post('/verify-review', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { targetId, targetType, content, rating } = req.body;
    
    if (!content || !targetId || !targetType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = `
      You are the "U-Think Fake Review Analyzer".
      Analyze the following review for authenticity, spam, toxicity, or generated fluff.
      Review Text: "${content}"
      Rating: ${rating}/5

      Output ONLY valid JSON matching this schema:
      {
        "isAuthentic": boolean,
        "confidenceScore": number (0-100),
        "flags": ["string"],
        "reasoning": "string"
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    let parsedData;
    try {
      parsedData = JSON.parse(geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch(e) {
      return res.status(500).json({ error: 'AI Verification Failed' });
    }

    const status = parsedData.isAuthentic && parsedData.confidenceScore > 60 ? 'VERIFIED' : 'REJECTED';

    const review = await Review.create({
      user: req.user?.id,
      targetId,
      targetType,
      content,
      rating,
      verificationStatus: status,
      aiConfidenceScore: parsedData.confidenceScore,
      flags: parsedData.flags || []
    });

    res.json({ 
      success: true, 
      review, 
      analysis: parsedData 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// GET /api/trust/scraper-health
// Returns recent data import runs to prove data freshness
router.get('/scraper-health', async (req: Request, res: Response) => {
  try {
    const recentRuns = await DataImportRun.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
      
    res.json({ success: true, health: recentRuns });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

export default router;
