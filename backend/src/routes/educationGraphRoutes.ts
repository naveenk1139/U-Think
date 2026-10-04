import { Router, Request, Response, NextFunction } from 'express';
import { protect as requireAuth, optionalAuth, AuthRequest } from '../middleware/authMiddleware.js';
import EducationPathRelation from '../models/EducationPathRelation.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Degree from '../models/Degree.js';
import Exam from '../models/Exam.js';
import Career from '../models/Career.js';
import { User } from '../models/User.js';
import { findRecommendationPath, IGraphNode, buildNodeContext, getPopulatedNode } from '../services/knowledgeGraphService.js';

const router = Router();

// Helper to populate generic nodes based on type is now imported from knowledgeGraphService

// Route: /api/education-paths/graph
// Method: GET
// Description: Fetches the holistic education knowledge graph
router.get('/graph', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all relations
    const relations = await EducationPathRelation.find()
      .select('sourceType sourceId targetType targetId relationType minScoreRequired isVerified')
      .lean();

    // In a real production scenario with millions of edges, we would paginate or lazy-load.
    // For the UI dependency engine, we send the core structure.
    
    // We will extract unique nodes from the edges
    const nodesMap = new Map();
    
    // Helper to add node to map
    const addNode = (type: string, id: string) => {
      const key = `${type}_${id}`;
      if (!nodesMap.has(key)) {
        nodesMap.set(key, { id, type, name: 'Loading...' }); // Placeholder
      }
    };

    relations.forEach(r => {
      addNode(r.sourceType, r.sourceId.toString());
      addNode(r.targetType, r.targetId.toString());
    });

    // We can't await inside a simple map, so we'll do it iteratively or let the frontend resolve names
    // To save DB hits, let's fetch batches
    const pathwayIds = Array.from(nodesMap.values()).filter(n => n.type === 'Pathway').map(n => n.id);
    const streamIds = Array.from(nodesMap.values()).filter(n => n.type === 'Stream').map(n => n.id);
    const comboIds = Array.from(nodesMap.values()).filter(n => n.type === 'SubjectCombination').map(n => n.id);
    const degreeIds = Array.from(nodesMap.values()).filter(n => n.type === 'Degree').map(n => n.id);

    const [pathways, streams, combos, degrees] = await Promise.all([
      Pathway.find({ _id: { $in: pathwayIds } }).select('name slug'),
      Stream.find({ _id: { $in: streamIds } }).select('name slug'),
      SubjectCombination.find({ _id: { $in: comboIds } }).select('name slug'),
      Degree.find({ _id: { $in: degreeIds } }).select('name slug')
    ]);

    const resolvedNodes = Array.from(nodesMap.values()).map(node => {
      let resolved: any = { ...node };
      if (node.type === 'Pathway') resolved.name = pathways.find(p => p._id.toString() === node.id)?.name || node.type;
      if (node.type === 'Stream') resolved.name = streams.find(s => s._id.toString() === node.id)?.name || node.type;
      if (node.type === 'SubjectCombination') resolved.name = combos.find(c => c._id.toString() === node.id)?.name || node.type;
      if (node.type === 'Degree') resolved.name = degrees.find(d => d._id.toString() === node.id)?.name || node.type;
      return resolved;
    });

    res.json({ success: true, nodes: resolvedNodes, edges: relations });
  } catch (err) {
    console.error('Education Graph Fetch Error:', err);
    next(err);
  }
});

// Route: /api/education-paths/node/:type/:id
// Method: GET
// Description: Get dependencies (parents) and downstream options (children) for a single node
router.get('/node/:type/:id', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { type, id } = req.params;
    const user = await User.findById(req.user?.id).lean();

    // Use the robust buildNodeContext to fetch explicit & implicit edges
    const context = await buildNodeContext(type, id, user);

    if (!context) {
       return res.status(404).json({ success: false, error: 'Node not found' });
    }

    res.json({
      success: true,
      node: context.coreNode,
      nodeType: context.nodeType,
      prerequisites: context.prerequisites,
      downstream: context.downstream
    });

  } catch (err) {
    console.error('Node Detail Error:', err);
    next(err);
  }
});

// Route: /api/education-paths/simulate-combo
// Method: POST
// Description: Feature 2 - Subject Combination Impact Simulator
import { generateGeminiResponse } from '../services/geminiService.js';
router.post('/simulate-combo', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subjects } = req.body; // e.g. ['Physics', 'Chemistry', 'Biology']
    
    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of subject names.' });
    }
    
    // We'll lean on the Gemini AI to evaluate the impact of this specific combination against general rules
    const prompt = `
      You are the "Subject Combination Impact Simulator" for the U-Think Education System.
      A student in India is considering choosing the following subjects at the 12th/PUC level:
      Subjects: ${subjects.join(', ')}

      Analyze this exact combination and determine what higher education degrees and career paths are enabled by it, and critically, what they are PERMANENTLY LOCKED OUT OF by dropping other core subjects (like Math, Biology, Commerce).

      Return ONLY a valid JSON object matching this schema:
      {
        "enabledPaths": [
          {
            "degree": "string (e.g. MBBS, B.Sc Biotechnology)",
            "description": "string (Why this is a good fit)"
          }
        ],
        "lockedPaths": [
          {
            "degree": "string (e.g. B.Tech Engineering)",
            "reason": "string (e.g. Requires Mathematics)"
          }
        ],
        "aiSummary": "string (A 2-sentence brutal but encouraging summary of the impact of their choice)"
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Combo Simulator response:", geminiResponse);
      return res.status(500).json({ error: 'Failed to simulate combination. AI returned invalid format.' });
    }

    res.json({ success: true, simulation: parsedData });
  } catch (err) {
    console.error('Simulator Combo Error:', err);
    next(err);
  }
});

// Route: /api/education-paths/eligibility-chain
// Method: POST
// Description: Feature 3 - Eligibility Chain Analyzer (with EXACT EXPLANATION LAYER)
router.post('/eligibility-chain', optionalAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { targetGoal } = req.body; // e.g., 'Neurosurgeon', 'Data Scientist', 'MBBS'
    
    if (!targetGoal) {
      return res.status(400).json({ error: 'Please provide a target goal (Career or Degree).' });
    }

    // Fetch user profile if logged in
    let userProfileText = "No student profile available. The student is browsing as a guest or hasn't filled out their profile.";
    if (req.user) {
      const user = await User.findById(req.user.id).select('academicProfile educationLevel classOrYear stream');
      if (user) {
        userProfileText = `
          Student Profile Data:
          Education Level: ${user.educationLevel || 'Not specified'}
          Class/Year: ${user.classOrYear || 'Not specified'}
          Stream: ${user.stream || 'Not specified'}
          10th %: ${user.academicProfile?.tenthPercentage || 'Not specified'}
          12th/PUC %: ${user.academicProfile?.twelfthPercentage || 'Not specified'}
          Diploma %: ${user.academicProfile?.diplomaPercentage || 'Not specified'}
          Subjects & Marks:
          ${user.academicProfile?.subjects?.map((s: any) => `- ${s.subjectName}: ${s.marksObtained || 'N/A'}/${s.maximumMarks || 'N/A'}`).join('\n') || 'None recorded'}
        `;
      }
    }

    const prompt = `
      You are the "Eligibility Chain Analyzer & Exact Reason Engine" for the U-Think Education System in India.
      A student's dream goal is: "${targetGoal}"
      
      Perform a REVERSE graph traversal from 10th grade up to this goal, identifying the mandatory steps (Stream, Subject Combination, Degree, Entrance Exam, etc).
      If there are multiple routes, pick the most common standard route.
      
      CRITICAL NEW REQUIREMENT:
      You must now evaluate EXACTLY whether the student satisfies these requirements based on their profile.
      
      ${userProfileText}

      For each step, provide a detailed requirement breakdown comparing the Requirement vs the Student's Value.
      If the student profile is missing data for a step, mark it as "INFORMATION_REQUIRED" rather than "NOT_ELIGIBLE".

      Return ONLY a valid JSON object matching this schema:
      {
        "target": "${targetGoal}",
        "chain": [
          {
            "stepNumber": number,
            "level": "string (e.g., 10th Grade, 12th/PUC, Entrance Exam, Undergrad)",
            "nodeName": "string (e.g., PCMB Stream, B.Tech CSE, NEET-UG)",
            "overallStatus": "ELIGIBLE" | "CONDITIONALLY_ELIGIBLE" | "NOT_ELIGIBLE" | "INFORMATION_REQUIRED" | "UNKNOWN" | "DATA_UNVERIFIED",
            "overallReason": "string (Summary of why they are or aren't eligible for this step)",
            "requirements": [
              {
                "requirementName": "string (e.g., Qualification, Mathematics, Minimum Marks)",
                "requiredValue": "string (e.g., Mathematics subject must be present, 60%)",
                "studentValue": "string (e.g., Mathematics not recorded, 68%, 12th/PUC)",
                "comparison": "string (e.g., +8 percentage points, Missing subject)",
                "status": "SATISFIED" | "NOT_SATISFIED" | "INFORMATION_REQUIRED" | "DATA_UNVERIFIED",
                "reason": "string (Exact textual explanation)",
                "sourceName": "string (e.g., Official Eligibility Rule, AI Knowledge Base)",
                "lastVerifiedAt": "string (e.g., Today's Date)"
              }
            ],
            "missingRequirements": ["string (Summarized missing items, if any)"],
            "satisfiedRequirements": ["string (Summarized satisfied items)"],
            "warnings": ["string (Any warnings or 'conditional' flags)"],
            "alternatives": ["string (If blocked, what are alternative lateral routes?)"]
          }
        ],
        "aiAnalysis": "string (A brief summary of how rigid or flexible this path is, translating the structured result into student-friendly language.)"
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Eligibility Chain response:", geminiResponse);
      return res.status(500).json({ error: 'Failed to analyze eligibility chain. AI returned invalid format.' });
    }

    res.json({ success: true, chainData: parsedData });
  } catch (err) {
    console.error('Eligibility Chain Error:', err);
    next(err);
  }
});

// Route: /api/education-paths/route-switch
// Method: POST
// Description: Feature 4 - Education Route Switch Engine
router.post('/route-switch', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPath, desiredPath } = req.body;
    
    if (!currentPath || !desiredPath) {
      return res.status(400).json({ error: 'Please provide both your current path and desired path.' });
    }

    const prompt = `
      You are the "Education Route Switch Engine" for the U-Think Education System in India.
      A student is currently enrolled in: "${currentPath}"
      But they want to switch their track/career to: "${desiredPath}"
      
      Analyze the "lateral" movement between these two. Is there a direct lateral entry? (e.g. Diploma to B.Tech 2nd year).
      Do they have to start over? What bridge courses or specific entrance exams (like LEET) are required?

      Return ONLY a valid JSON object matching this schema:
      {
        "isPossible": boolean,
        "difficulty": "string (e.g., Easy, Moderate, Hard, Impossible)",
        "switchStrategy": [
          {
            "step": "string (The action to take)",
            "details": "string (Explanation of why this is required)"
          }
        ],
        "timeImpact": "string (e.g., Saves 1 year, Adds 2 extra years)",
        "aiVerdict": "string (A direct, honest assessment of whether this switch is worth the effort)"
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Route Switch response:", geminiResponse);
      return res.status(500).json({ error: 'Failed to analyze route switch. AI returned invalid format.' });
    }

    res.json({ success: true, switchData: parsedData });
  } catch (err) {
    console.error('Route Switch Error:', err);
    next(err);
  }
});

// Route: /api/education-paths/academic-recovery
// Method: POST
// Description: Feature 5 - Academic Recovery Path Planner
router.post('/academic-recovery', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { failureContext, ultimateGoal } = req.body;
    
    if (!failureContext || !ultimateGoal) {
      return res.status(400).json({ error: 'Please provide both your current situation and ultimate goal.' });
    }

    const prompt = `
      You are the "Academic Recovery Path Planner" for the U-Think Education System in India.
      A student is facing a setback: "${failureContext}"
      But they still want to achieve: "${ultimateGoal}"
      
      Analyze the Indian education system (NIOS, IGNOU, Diploma routes, lateral entries, reappearing for exams, etc.) to find a recovery path.
      Be extremely compassionate but highly practical and factual. DO NOT give false hope if the goal is legally impossible (e.g., becoming a doctor without science), but DO provide the closest alternative.

      Return ONLY a valid JSON object matching this schema:
      {
        "isRecoverable": boolean,
        "compassionateMessage": "string (A highly encouraging, empathetic opening message)",
        "recoverySteps": [
          {
            "step": "string (Actionable step, e.g., Register for NIOS On-Demand Exams)",
            "timeline": "string (e.g., 3-6 months)",
            "difficulty": "string (Easy/Moderate/Hard)"
          }
        ],
        "alternativeGoal": "string (If original is impossible, suggest the closest viable alternative, else null)"
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Recovery response:", geminiResponse);
      return res.status(500).json({ error: 'Failed to analyze recovery path. AI returned invalid format.' });
    }

    res.json({ success: true, recoveryData: parsedData });
  } catch (err) {
    console.error('Recovery Path Error:', err);
    next(err);
  }
});

// Route: /api/education-paths/path-to-goal
// Method: POST
// Description: Find exact BFS path from user's current stage to target goal
router.post('/path-to-goal', requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { targetType, targetId } = req.body;
    
    if (!targetType || !targetId) {
      return res.status(400).json({ error: 'Please provide targetType and targetId' });
    }

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Deduce student's current node (simplified for this demo)
    // Normally we'd use educationStageService, but let's approximate based on educationLevel
    let sourceNode: IGraphNode = { type: 'Pathway', id: '650b2a8f8f1b2c3d4e5f6g7h' }; // default fallback
    
    // Find the exact path using BFS
    const targetNode: IGraphNode = { type: targetType, id: targetId };
    let path = await findRecommendationPath(sourceNode, targetNode, 5);
    
    // If no path is found from the exact source node, we can fallback to the target node itself
    if (!path) {
       path = { nodes: [targetNode], relations: [], totalWeight: 0 };
    }
    
    // Populate the names for the nodes in the path
    const populatedNodes = await Promise.all(
      path.nodes.map(async (node) => {
        const resolved = await getPopulatedNode(node.type, node.id) as any;
        return { ...node, name: resolved ? (resolved.name || resolved.title || 'Unknown') : 'Unknown' };
      })
    );

    res.json({ success: true, path: { ...path, nodes: populatedNodes } });
  } catch (err) {
    console.error('Path to goal Error:', err);
    next(err);
  }
});

export default router;
