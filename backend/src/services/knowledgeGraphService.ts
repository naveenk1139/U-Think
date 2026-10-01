import mongoose from 'mongoose';
import EducationPathRelation from '../models/EducationPathRelation.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Degree from '../models/Degree.js';
import Exam from '../models/Exam.js';
import Career from '../models/Career.js';
export interface IGraphNode {
  type: string;
  id: string;
}

export interface IGraphPath {
  nodes: IGraphNode[];
  relations: string[]; // e.g., ['REQUIRES', 'LEADS_TO']
  totalWeight: number; // For ranking
}

// Helper to populate generic nodes based on type
export const getPopulatedNode = async (type: string, id: any) => {
  switch (type) {
    case 'Pathway': return await Pathway.findById(id).select('name slug icon');
    case 'Stream': return await Stream.findById(id).select('name slug icon');
    case 'SubjectCombination': return await SubjectCombination.findById(id).select('name slug');
    case 'Degree': return await Degree.findById(id).select('name slug category');
    case 'Course': return await Degree.findById(id).select('name slug category'); // Assuming Course maps to Degree or similar
    case 'Exam': return await Exam.findById(id).select('name slug examLevel');
    case 'Career': return await Career.findById(id).select('title slug industry');
    default: return { _id: id, name: 'Unknown' };
  }
};

/**
 * Builds a 1-depth contextual graph around a specific node (Core, Parents, Children).
 * It merges explicit Edges (EducationPathRelation) with Implicit Model references.
 */
export const buildNodeContext = async (type: string, id: string) => {
  const coreNode = await getPopulatedNode(type, id);
  if (!coreNode) return null;

  const parents: any[] = [];
  const children: any[] = [];

  // 1. Fetch EXPLICIT Edges from Knowledge Graph Collection
  const explicitParents = await EducationPathRelation.find({ targetId: id, targetType: type }).lean();
  const explicitChildren = await EducationPathRelation.find({ sourceId: id, sourceType: type }).lean();

  for (const edge of explicitParents) {
    const resolved = await getPopulatedNode(edge.sourceType, edge.sourceId);
    if (resolved) parents.push({ ...edge, resolvedNode: resolved });
  }

  for (const edge of explicitChildren) {
    const resolved = await getPopulatedNode(edge.targetType, edge.targetId);
    if (resolved) children.push({ ...edge, resolvedNode: resolved });
  }

  // 2. Fetch IMPLICIT Edges based on the entity type
  if (type === 'Career') {
    const career = await Career.findById(id).lean();
    if (career && career.pathwayRefs && career.pathwayRefs.length > 0) {
      for (const pRef of career.pathwayRefs) {
        const resolved = await getPopulatedNode('Pathway', pRef);
        if (resolved) parents.push({ sourceType: 'Pathway', relationType: 'LEADS_TO', resolvedNode: resolved });
      }
    }
  } else if (type === 'Exam') {
    const exam = await Exam.findById(id).lean();
    // Exams lead to degrees/courses
    if (exam && exam.target_courses && exam.target_courses.length > 0) {
      for (const courseSlug of exam.target_courses) {
        // Attempt to find degree by slug
        const degree = await Degree.findOne({ slug: courseSlug }).select('name slug category').lean();
        if (degree) children.push({ targetType: 'Degree', relationType: 'ENABLES_ADMISSION', resolvedNode: degree });
      }
    }
  } else if (type === 'Degree') {
    const degree = await Degree.findById(id).lean();
    // Degree leads to Career
    if (degree && degree.slug) {
      const relatedCareers = await Career.find({ related_degrees: degree.slug }).select('title slug industry').lean();
      for (const career of relatedCareers) {
        children.push({ targetType: 'Career', relationType: 'QUALIFIES_FOR', resolvedNode: career });
      }
    }
  } else if (type === 'Pathway') {
    const pathway = await Pathway.findById(id).lean() as any;
    if (pathway && pathway.options) {
      for (const opt of pathway.options) {
        if (opt.ref_id && opt.type) {
           const typeStr = opt.type.charAt(0).toUpperCase() + opt.type.slice(1);
           const resolved = await getPopulatedNode(typeStr, opt.ref_id);
           if (resolved) children.push({ targetType: typeStr, relationType: 'CONTAINS', resolvedNode: resolved });
        }
      }
    }
  }

  // Deduplicate by ID
  const uniqueParents = Array.from(new Map(parents.map(p => [p.resolvedNode?._id?.toString(), p])).values());
  const uniqueChildren = Array.from(new Map(children.map(c => [c.resolvedNode?._id?.toString(), c])).values());

  return {
    coreNode,
    nodeType: type,
    prerequisites: uniqueParents,
    downstream: uniqueChildren
  };
};

/**
 * Knowledge Graph Engine for generating explainable multi-step recommendation paths.
 * Uses BFS to traverse the EducationPathRelation graph.
 */
export const findRecommendationPath = async (
  source: IGraphNode,
  target: IGraphNode,
  maxDepth: number = 3
): Promise<IGraphPath | null> => {
  // Edge case: Same node
  if (source.type === target.type && source.id === target.id) {
    return { nodes: [source], relations: [], totalWeight: 0 };
  }

  // Queue stores: { currentNode, pathSoFar, relationsSoFar }
  const queue: { node: IGraphNode; path: IGraphNode[]; rels: string[] }[] = [
    { node: source, path: [source], rels: [] }
  ];
  
  const visited = new Set<string>();
  visited.add(`${source.type}:${source.id}`);

  let currentDepth = 0;

  while (queue.length > 0 && currentDepth <= maxDepth) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const { node: currentNode, path, rels } = queue.shift()!;

      // Find all outward edges from currentNode
      const edges = await EducationPathRelation.find({
        sourceType: currentNode.type,
        sourceId: new mongoose.Types.ObjectId(currentNode.id)
      }).lean();

      for (const edge of edges) {
        const targetType = edge.targetType;
        const targetIdStr = edge.targetId.toString();
        const nodeKey = `${targetType}:${targetIdStr}`;

        // If we found the target
        if (targetType === target.type && targetIdStr === target.id) {
          return {
            nodes: [...path, target],
            relations: [...rels, edge.relationType],
            totalWeight: path.length // simple weight based on steps
          };
        }

        // If not visited, add to queue
        if (!visited.has(nodeKey)) {
          visited.add(nodeKey);
          queue.push({
            node: { type: targetType, id: targetIdStr },
            path: [...path, { type: targetType, id: targetIdStr }],
            rels: [...rels, edge.relationType]
          });
        }
      }
    }
    currentDepth++;
  }

  // Path not found within maxDepth
  return null;
};

/**
 * Retrieves all immediate prerequisite nodes (the "What do I need to reach this?")
 */
export const getPrerequisites = async (target: IGraphNode) => {
  return EducationPathRelation.find({
    targetType: target.type,
    targetId: new mongoose.Types.ObjectId(target.id),
    relationType: { $in: ['REQUIRES', 'PREREQUISITE'] }
  }).lean();
};

/**
 * Retrieves all immediate subsequent opportunities (the "Where does this lead?")
 */
export const getNextSteps = async (source: IGraphNode) => {
  return EducationPathRelation.find({
    sourceType: source.type,
    sourceId: new mongoose.Types.ObjectId(source.id),
    relationType: { $in: ['ENABLES', 'LEADS_TO', 'ELIGIBLE_FOR', 'NEXT_STEP'] }
  }).lean();
};
