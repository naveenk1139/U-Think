import { Request, Response } from 'express';
import Degree from '../models/Degree.js';
import Branch from '../models/Branch.js';
import Specialization from '../models/Specialization.js';
import EducationPathRelation from '../models/EducationPathRelation.js';
import ExamDegreeMap from '../models/ExamDegreeMap.js';
import Exam from '../models/Exam.js';
import CollegeCourse from '../models/CollegeCourse.js';
import College from '../models/College.js';

// 1. Get Branches under a specific Degree (using EducationPathRelation)
export const getDegreeBranches = async (req: Request, res: Response) => {
  try {
    const { degreeId } = req.params;
    
    // Find relations where source is this Degree and target is Branch
    const relations = await EducationPathRelation.find({
      sourceType: 'Degree',
      sourceId: degreeId,
      targetType: 'Branch',
      relationType: 'ENABLES'
    }).lean();

    const branchIds = relations.map(r => r.targetId);
    
    const branches = await Branch.find({ _id: { $in: branchIds }, active: true }).lean();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch branches for degree' });
  }
};

// Get Required/Optional Exams for a Degree
export const getExamsForDegree = async (req: Request, res: Response) => {
  try {
    const { degreeId } = req.params;
    
    // Find mappings and populate the actual Exam document
    const mappings = await ExamDegreeMap.find({ degreeId }).populate('exam_id').lean();
    
    // Format the response for the frontend
    const exams = mappings.map((m: any) => ({
      mappingId: m._id,
      exam: m.exam_id,
      eligibilityCondition: m.eligibility_condition,
      mandatoryOrOptional: m.mandatory_or_optional,
      admissionRole: m.admission_role
    }));

    res.json(exams);
  } catch (error) {
    console.error("Failed to fetch exams", error);
    res.status(500).json({ error: 'Failed to fetch exams for degree' });
  }
};

// 2. Get Specializations under a specific Branch
export const getBranchSpecializations = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const specializations = await Specialization.find({ branchId, active: true }).lean();
    res.json(specializations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch specializations' });
  }
};

// 3. Get Colleges offering this Branch (and optionally specialization)
export const getCollegesForBranch = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const { specializationName } = req.query;

    const query: any = { branchId, active: true };
    if (specializationName) {
      query.specializationName = specializationName;
    }

    const collegeCourses = await CollegeCourse.find(query).populate('collegeId').lean();
    
    // Extract unique colleges from courses
    const uniqueColleges = Array.from(new Map(collegeCourses.map(cc => {
      const college: any = cc.collegeId;
      // attach course details to the college for display
      return [college._id.toString(), { ...college, courseOffered: cc }];
    })).values());

    res.json(uniqueColleges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
};
