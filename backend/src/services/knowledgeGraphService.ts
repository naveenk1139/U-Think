import mongoose from 'mongoose';
import EducationPathRelation from '../models/EducationPathRelation.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Degree from '../models/Degree.js';
import Exam from '../models/Exam.js';
import Career from '../models/Career.js';
import Course from '../models/Course.js';
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
  const isObjectId = mongoose.Types.ObjectId.isValid(id);
  const query = isObjectId ? { _id: id } : { slug: id };

  switch (type) {
    case 'Pathway': return await Pathway.findOne(query).lean();
    case 'Stream': return await Stream.findOne(query).lean();
    case 'SubjectCombination': return await SubjectCombination.findOne(query).lean();
    case 'Degree': return await Degree.findOne(query).lean();
    case 'Course': return await mongoose.model('Course').findOne(query).lean();
    case 'Exam': return await Exam.findOne(query).lean();
    case 'Career': return await Career.findOne(query).lean();
    case 'JobRole': return await mongoose.model('JobRole').findOne(query).lean();
    case 'Skill': return await mongoose.model('Skill').findOne(query).lean();
    default: return { _id: id, name: 'Unknown' };
  }
};

/**
 * Builds a 1-depth contextual graph around a specific node (Core, Parents, Children).
 * It merges explicit Edges (EducationPathRelation) with Implicit Model references.
 */
export const buildNodeContext = async (type: string, id: string, user: any = null) => {
  const coreNode = await getPopulatedNode(type, id);
  if (!coreNode) return null;

  const parents: any[] = [];
  const children: any[] = [];

  // 1. Fetch EXPLICIT Edges from Knowledge Graph Collection
  const explicitParents = await EducationPathRelation.find({ targetId: (coreNode as any)._id, targetType: type }).lean();
  const explicitChildren = await EducationPathRelation.find({ sourceId: (coreNode as any)._id, sourceType: type }).lean();

  const filterByEligibility = (edge: any) => {
    if (!user || !user.academicDetails) return true;
    
    // Basic minimum score check
    if (edge.minScoreRequired) {
        const studentScore = user.academicDetails.tenthScore || user.academicDetails.twelfthScore || 0;
        if (studentScore > 0 && studentScore < edge.minScoreRequired) {
            return false;
        }
    }
    
    // Basic subject check (if user has streams/subjects recorded)
    if (edge.specificSubjectsRequired && edge.specificSubjectsRequired.length > 0) {
        const userSubjects = user.academicDetails.subjects || [];
        if (userSubjects.length > 0) {
           const hasAllRequired = edge.specificSubjectsRequired.every((reqSub: string) => 
               userSubjects.some((uSub: string) => uSub.toLowerCase().includes(reqSub.toLowerCase()))
           );
           if (!hasAllRequired) return false;
        }
    }
    
    return true;
  };

  for (const edge of explicitParents) {
    if (!filterByEligibility(edge)) continue;
    const resolved = await getPopulatedNode(edge.sourceType, edge.sourceId);
    if (resolved) parents.push({ ...edge, resolvedNode: resolved });
  }

  for (const edge of explicitChildren) {
    if (!filterByEligibility(edge)) continue;
    const resolved = await getPopulatedNode(edge.targetType, edge.targetId);
    if (resolved) children.push({ ...edge, resolvedNode: resolved });
  }

  // 2. Fetch IMPLICIT Edges based on the entity type
  if (type === 'Career') {
    const career = coreNode as any;
    
    // Career -> Pathways
    if (career.pathwayRefs?.length) {
      for (const pRef of career.pathwayRefs) {
        const resolved = await getPopulatedNode('Pathway', pRef);
        if (resolved) parents.push({ sourceType: 'Pathway', relationType: 'PREPARES_FOR', resolvedNode: resolved });
      }
    }
    
    // Career -> Courses
    if (career.courseRefs?.length) {
      for (const cRef of career.courseRefs) {
        const resolved = await getPopulatedNode('Course', cRef);
        if (resolved) parents.push({ sourceType: 'Course', relationType: 'PREPARES_FOR', resolvedNode: resolved });
      }
    }
    
    // Career -> Skills
    if (career.skillRefs?.length) {
      for (const sRef of career.skillRefs) {
        const resolved = await getPopulatedNode('Skill', sRef);
        if (resolved) children.push({ targetType: 'Skill', relationType: 'REQUIRES_SKILL', resolvedNode: resolved });
      }
    }
    // Handle string skills if present
    if (career.skills?.length) {
      for (const skillStr of career.skills) {
         // Create virtual nodes for string skills
         const vNode = { _id: new mongoose.Types.ObjectId().toString(), name: skillStr, isVirtual: true };
         children.push({ targetType: 'Skill', relationType: 'REQUIRES_SKILL', resolvedNode: vNode as any });
      }
    }

    // Career -> Job Roles (Progression)
    if (career.jobRoleRefs?.length) {
      for (const jRef of career.jobRoleRefs) {
        const resolved = await getPopulatedNode('JobRole', jRef);
        if (resolved) children.push({ targetType: 'Job', relationType: 'PROGRESSES_TO', resolvedNode: resolved });
      }
    }

    // Reverse lookups: Degrees offering this career
    if (career.name) {
       const degrees = await Degree.find({ career_options: new RegExp(career.name, 'i') }).select('name slug level degree_type').lean();
       for (const deg of degrees) {
           parents.push({ sourceType: 'Degree', relationType: 'QUALIFIES_FOR', resolvedNode: deg });
       }
    }

  } else if (type === 'Degree') {
    const degree = coreNode as any;
    
    // Degrees -> Careers
    if (degree.career_options?.length) {
       for (const careerStr of degree.career_options) {
           const matchingCareer = await Career.findOne({ name: new RegExp(careerStr, 'i') }).select('name slug industry').lean();
           if (matchingCareer) {
               children.push({ targetType: 'Career', relationType: 'QUALIFIES_FOR', resolvedNode: matchingCareer });
           }
       }
    }

    // Degrees -> Higher Studies
    if (degree.higher_study_options?.length) {
       for (const studyStr of degree.higher_study_options) {
           const matchingDegree = await Degree.findOne({ name: new RegExp(studyStr, 'i') }).select('name slug level').lean();
           if (matchingDegree) {
               children.push({ targetType: 'Degree', relationType: 'LEADS_TO_HIGHER_ED', resolvedNode: matchingDegree });
           }
       }
    }

    // Reverse lookup: Exams targeting this degree
    if (degree.slug) {
        const exams = await Exam.find({ target_degrees: degree.slug }).select('name slug examLevel').lean();
        for (const ex of exams) {
            parents.push({ sourceType: 'Exam', relationType: 'ADMISSION_THROUGH', resolvedNode: ex });
        }
    }
    
    // Reverse lookup: Colleges offering this degree
    if (degree._id) {
        // College has offeredBranchesRef, etc. We just mock colleges if none explicitly linked.
        const colleges = await mongoose.model('College').find({ offeredCoursesRef: degree._id }).select('name aliases location').lean().catch(() => []);
        for (const col of colleges) {
            children.push({ targetType: 'College', relationType: 'OFFERED_BY', resolvedNode: col as any });
        }
    }

  } else if (type === 'Exam') {
    const exam = coreNode as any;
    
    // Exam -> Degrees/Courses
    if (exam.target_degrees?.length) {
      for (const degreeSlug of exam.target_degrees) {
        const degree = await Degree.findOne({ slug: degreeSlug }).select('name slug level').lean();
        if (degree) children.push({ targetType: 'Degree', relationType: 'ADMISSION_FOR', resolvedNode: degree });
      }
    }

    if (exam.target_courses?.length) {
      for (const courseSlug of exam.target_courses) {
        const course = await mongoose.model('Course').findOne({ slug: courseSlug }).select('name slug').lean().catch(() => null);
        if (course) children.push({ targetType: 'Course', relationType: 'ADMISSION_FOR', resolvedNode: course as any });
      }
    }
    
  } else if (type === 'Course') {
    const course = coreNode as any;
    
    // Course -> Stream
    if (course.streamId) {
       const stream = await mongoose.model('Stream').findById(course.streamId).select('name slug').lean().catch(() => null);
       if (stream) parents.push({ sourceType: 'Stream', relationType: 'BELONGS_TO', resolvedNode: stream as any });
    }

  } else if (type === 'Pathway') {
    const pathway = coreNode as any;
    if (pathway.options) {
      for (const opt of pathway.options) {
        if (opt.ref_id && opt.type) {
           const typeStr = opt.type.charAt(0).toUpperCase() + opt.type.slice(1);
           const resolved = await getPopulatedNode(typeStr, opt.ref_id);
           if (resolved) children.push({ targetType: typeStr, relationType: 'INCLUDES', resolvedNode: resolved });
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
