import { Router, Request, Response, NextFunction } from 'express';
import { protect as requireAuth } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import SkillEvidenceGraph from '../models/SkillEvidenceGraph.js';
import DocumentAnalysis from '../models/DocumentAnalysis.js';
import { generateGeminiResponse } from '../services/geminiService.js';

const router = Router();

// Route: /api/skill-evidence
// Method: GET
router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    let graph = await SkillEvidenceGraph.findOne({ studentId: userId });
    
    // If no graph exists, return empty structure (UI will show empty state or prompt sync)
    if (!graph) {
      res.json({ graph: { nodes: [] } });
      return;
    }
    
    res.json({ graph });
  } catch (err) {
    next(err);
  }
});

// Route: /api/skill-evidence/sync
// Method: POST
// Goal: Use AI to construct the skill graph from user profile and their document analysis history.
router.post('/sync', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    
    // Gather data context
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const analyses = await DocumentAnalysis.find({ studentId: userId });
    const documentContext = analyses.map(doc => {
      return `Document [${doc.documentType}]: ${doc.summary}. Strengths: ${doc.keyStrengths?.join(', ')}. Analyzed on ${doc.analyzedAt}`;
    }).join('\n');

    const profileSkills = user.skills || [];

    const prompt = `
      You are an expert academic and skill assessor. 
      I am building a "Skill Evidence Graph" for a student.
      
      Here are the skills they claim to have: ${profileSkills.join(', ')}
      Here is evidence extracted from their academic documents:
      ${documentContext}
      
      Synthesize this into a list of verified skill nodes. Infer related skills based on their profile.
      For each skill, determine a strengthScore (0-100) based on the evidence available.
      If there is document evidence, list it in the 'evidence' array. If they just claimed it but there is no document, add a "MANUAL" evidence source.
      
      Return ONLY a JSON object matching this exact schema:
      {
        "nodes": [
          {
            "skillName": "string",
            "category": "string (e.g. Technical, Soft Skill, Academic)",
            "level": "Beginner|Intermediate|Advanced|Expert",
            "strengthScore": number (0-100),
            "evidence": [
              {
                "type": "DOCUMENT|COURSE|PROJECT|ASSESSMENT|MANUAL",
                "name": "string (Description of the evidence)",
                "verified": boolean (true if from a document, false if manual)
              }
            ],
            "relatedSkills": ["string"]
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
      console.error("Failed to parse Skill Evidence response:", geminiResponse);
      res.status(500).json({ error: 'Failed to generate Skill Graph. AI returned invalid format.' });
      return;
    }

    // Upsert the graph
    const updatedGraph = await SkillEvidenceGraph.findOneAndUpdate(
      { studentId: userId },
      {
        nodes: parsedData.nodes || [],
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, graph: updatedGraph });
  } catch (err) {
    console.error('Skill Evidence Sync Error:', err);
    next(err);
  }
});

export default router;
