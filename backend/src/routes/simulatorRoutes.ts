import { Router, Request, Response, NextFunction } from 'express';
import { protect as requireAuth } from '../middleware/authMiddleware.js';
import { generateGeminiResponse } from '../services/geminiService.js';

const router = Router();

// Route: /api/simulator/fork
// Method: POST
// Body: { pathA: string, pathB: string }
router.post('/fork', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pathA, pathB } = req.body;

    if (!pathA || !pathB) {
       res.status(400).json({ error: 'Both pathA and pathB are required for comparison.' });
       return;
    }

    const prompt = `
      You are the "Career Fork & Opportunity Cost Simulator" for a student in India.
      The student is deciding between two paths:
      Path A: "${pathA}"
      Path B: "${pathB}"
      
      Compare them directly across Time Investment, Financial Cost, Earning Potential, Job Market Growth, and the core Opportunity Cost (what they give up by choosing one over the other).
      Return ONLY a valid JSON object exactly matching this schema:
      {
        "pathA": {
          "name": "string (The formatted name)",
          "timeInvestment": "string (e.g. 4 Years)",
          "timeInvestmentScore": number (1-100, where 100 means very high time required),
          "financialCost": "string (e.g. ₹5 Lakhs - ₹10 Lakhs)",
          "financialCostScore": number (1-100, where 100 is very expensive),
          "earningPotential": "string (e.g. ₹6L - ₹12L per annum)",
          "earningPotentialScore": number (1-100, where 100 is highest earning),
          "jobGrowth": "string (e.g. High Demand, 15% YoY)",
          "jobGrowthScore": number (1-100),
          "opportunityCost": "string (What they lose by taking this path)"
        },
        "pathB": {
          "name": "string",
          "timeInvestment": "string",
          "timeInvestmentScore": number,
          "financialCost": "string",
          "financialCostScore": number,
          "earningPotential": "string",
          "earningPotentialScore": number,
          "jobGrowth": "string",
          "jobGrowthScore": number,
          "opportunityCost": "string"
        },
        "verdict": "string (A neutral summary comparing the tradeoffs)"
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Simulator response:", geminiResponse);
      res.status(500).json({ error: 'Failed to simulate opportunity cost. AI returned invalid format.' });
      return;
    }

    res.json({ success: true, simulation: parsedData });
  } catch (err) {
    console.error('Simulator Sync Error:', err);
    next(err);
  }
});

export default router;
