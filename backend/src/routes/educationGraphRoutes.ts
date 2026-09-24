import { Router, Request, Response, NextFunction } from 'express';
import { protect as requireAuth } from '../middleware/authMiddleware.js';
import EducationPathRelation from '../models/EducationPathRelation.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Degree from '../models/Degree.js';
import Exam from '../models/Exam.js';
import Career from '../models/Career.js';

const router = Router();

// Helper to populate generic nodes based on type
const getPopulatedNode = async (type: string, id: any) => {
  switch (type) {
    case 'Pathway': return await Pathway.findById(id).select('name slug icon');
    case 'Stream': return await Stream.findById(id).select('name slug icon');
    case 'SubjectCombination': return await SubjectCombination.findById(id).select('name slug');
    case 'Degree': return await Degree.findById(id).select('name slug category');
    case 'Exam': return await Exam.findById(id).select('name slug examLevel');
    case 'Career': return await Career.findById(id).select('title slug industry');
    default: return { _id: id, name: 'Unknown' };
  }
};

// Route: /api/education-paths/graph
// Method: GET
// Description: Fetches the holistic education knowledge graph
router.get('/graph', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
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
router.get('/node/:type/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, id } = req.params;

    // Get the core node
    const coreNode = await getPopulatedNode(type, id);

    // Get what this node REQUIRES or is BLOCKED_BY (Parents/Prerequisites)
    const prerequisites = await EducationPathRelation.find({ targetId: id, targetType: type }).lean();
    
    // Get what this node ENABLES, LEADS_TO, etc. (Children/Downstream)
    const downstream = await EducationPathRelation.find({ sourceId: id, sourceType: type }).lean();

    // Populate the names for the UI
    const resolveEdges = async (edges: any[], isSource: boolean) => {
      return Promise.all(edges.map(async (edge) => {
        const targetType = isSource ? edge.targetType : edge.sourceType;
        const targetId = isSource ? edge.targetId : edge.sourceId;
        const resolved = await getPopulatedNode(targetType, targetId);
        return {
          ...edge,
          resolvedNode: resolved
        };
      }));
    };

    const populatedPrereqs = await resolveEdges(prerequisites, false);
    const populatedDownstream = await resolveEdges(downstream, true);

    res.json({
      success: true,
      node: coreNode,
      nodeType: type,
      prerequisites: populatedPrereqs,
      downstream: populatedDownstream
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
router.post('/simulate-combo', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subjects } = req.body; // e.g. ['Physics', 'Chemistry', 'Biology']
    
    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of subject names.' });
    }

    // Attempt to resolve this to a known SubjectCombination in DB
    const combos = await SubjectCombination.find({ name: { $regex: subjects[0].substring(0, 3), $options: 'i' } }); // Fuzzy match for now
    
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

export default router;
