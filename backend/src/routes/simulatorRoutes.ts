import { Router, Request, Response, NextFunction } from 'express';
import { protect as requireAuth } from '../middleware/authMiddleware.js';
import { generateGeminiResponse } from '../services/geminiService.js';

import Course from '../models/Course.js';

const router = Router();

// Route: /api/simulator/timeline/:courseSlug
// Method: GET
router.get('/timeline/:courseSlug', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseSlug } = req.params;
    const course = await Course.findOne({ slug: courseSlug });
    
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    const prompt = `
      You are the "Future Simulator" for a student in India who just chose: ${course.name}.
      Project a realistic 10-year career timeline for them.
      Return ONLY a valid JSON object matching this schema:
      {
        "timeline": [
          {
            "period": "Years 1-2",
            "title": "Initial Study",
            "description": "What they learn (focus on ${course.subjects?.[0] || 'core subjects'})",
            "color": "blue",
            "icon": "BookOpen"
          },
          {
            "period": "Years 3-6",
            "title": "Higher Education / Specialization",
            "description": "Likely degrees like ${course.higherEducation?.[0] || 'Bachelor degree'}",
            "color": "purple",
            "icon": "GraduationCap"
          },
          {
            "period": "Year 7+",
            "title": "Career Entry",
            "description": "First jobs like ${course.careers?.[0] || 'Entry Level Professional'}",
            "color": "emerald",
            "icon": "Briefcase"
          }
        ]
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Timeline response:", geminiResponse);
      // Fallback
      parsedData = {
        timeline: [
          { period: "Years 1-2", title: "PUC/Diploma", description: "Foundational studies in " + course.name, color: "blue", icon: "BookOpen" },
          { period: "Years 3-6", title: "Undergraduate Degree", description: "Advanced studies and internships", color: "purple", icon: "GraduationCap" },
          { period: "Year 7+", title: "Career", description: "Entry-level professional roles", color: "emerald", icon: "Briefcase" }
        ]
      };
    }

    res.json({ success: true, ...parsedData });
  } catch (err) {
    console.error('Timeline Sync Error:', err);
    next(err);
  }
});

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

// Route: /api/simulator/eligibility/check
// Method: POST
// Body: { courseSlug: string, score: number }
router.post('/eligibility/check', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseSlug, score } = req.body;
    const course = await Course.findOne({ slug: courseSlug });
    
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    // Dynamic AI Eligibility Check
    const prompt = `
      You are an Indian Education Eligibility Checker.
      The student has scored ${score}% in their 10th standard board exams.
      They want to join the course: "${course.name}" (Type: ${course.type || 'Course'}, Pathway: ${course.category}).
      The standard eligibility is: "${course.eligibility || 'Class 10 Pass'}".
      
      Does the student meet the eligibility?
      Return ONLY a valid JSON object matching this schema:
      {
        "status": "pass" | "fail",
        "message": "A short encouraging or informative message explaining the result based on their score and course requirements."
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Eligibility response:", geminiResponse);
      parsedData = {
        status: score >= 35 ? 'pass' : 'fail',
        message: score >= 35 ? 'You meet the minimum passing criteria!' : 'Most institutions require at least 35% passing marks.'
      };
    }

    res.json({ success: true, ...parsedData });
  } catch (err) {
    console.error('Eligibility Check Error:', err);
    next(err);
  }
});

export default router;
