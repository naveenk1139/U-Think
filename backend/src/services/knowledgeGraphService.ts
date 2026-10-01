import mongoose from 'mongoose';
import EducationPathRelation from '../models/EducationPathRelation.js';

export interface IGraphNode {
  type: string;
  id: string;
}

export interface IGraphPath {
  nodes: IGraphNode[];
  relations: string[]; // e.g., ['REQUIRES', 'LEADS_TO']
  totalWeight: number; // For ranking
}

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
