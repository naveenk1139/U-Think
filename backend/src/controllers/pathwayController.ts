import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import EducationLevel from '../models/EducationLevel.js';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';
import Branch from '../models/Branch.js';
import Career from '../models/Career.js';
import SubjectCombination from '../models/SubjectCombination.js';
import Subject from '../models/Subject.js';
import Trade from '../models/Trade.js';

export const getPathwayTree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { levelSlug, pathwayId, streamId, streamSlug } = req.query;
    
    let stream = null;
    if (streamId) {
        stream = await Stream.findOne({ _id: streamId, active: true }).lean();
    } else if (streamSlug) {
        stream = await Stream.findOne({ slug: String(streamSlug), active: true }).lean();
    }
    
    if (stream) {
       // Try fetching Subject Combinations first (e.g. 12th Science PCMB)
       const subjectCombinations = await SubjectCombination.find({ streamId: stream._id, active: true })
           .populate('subjects')
           .sort({ order: 1 })
           .lean();
           
       if (subjectCombinations.length > 0) {
           const combinationsWithDetails = await Promise.all(subjectCombinations.map(async (combination) => {
             // Fetch UG Courses eligible for this combination
             const ugCourses = await Course.find({ eligibleCombinations: combination._id, active: true }).sort({ order: 1 }).lean();
             
             const ugCoursesWithBranches = await Promise.all(ugCourses.map(async (ugCourse) => {
               // Fetch Branches for UG Course
               const branches = await Branch.find({ courseId: ugCourse._id, active: true })
                 .populate('relatedCareers')
                 .populate('relatedExams')
                 .populate('higherStudies')
                 .populate('furtherStudies')
                 .sort({ order: 1 })
                 .lean();
                 
               const branchesWithDetails = await Promise.all(branches.map(async (branch) => {
                 const specializations = await mongoose.model('Specialization').find({ branchId: branch._id, active: true }).lean();
                 const colleges = await mongoose.model('College').find({ offeredBranchesRef: branch._id, active: true }).lean();
                 return { ...branch, specializations, colleges };
               }));
               
               return { ...ugCourse, branches: branchesWithDetails };
             }));
             
             return { ...combination, ugCourses: ugCoursesWithBranches };
           }));
           
           return res.json({ ...stream, subjectCombinations: combinationsWithDetails });
       }

       // If no subject combinations, it's a direct course stream (e.g. B.Tech stream or Diploma or Trades)
       
       const trades = await Trade.find({ streamId: stream._id, active: true }).sort({ order: 1 }).lean();
       
       if (trades && trades.length > 0) {
           return res.json({ ...stream, trades });
       }

       const courses = await Course.find({ streamId: stream._id, active: true }).sort({ order: 1 }).lean();
       
       if (courses && courses.length > 0) {
           const coursesWithDetails = await Promise.all(courses.map(async (course) => {
               const branches = await Branch.find({ courseId: course._id, active: true })
                   .populate('relatedCareers')
                   .populate('relatedExams')
                   .populate('higherStudies')
                   .populate('furtherStudies')
                   .sort({ order: 1 })
                   .lean();
                   
               const branchesWithDetails = await Promise.all(branches.map(async (branch) => {
                   const specializations = await mongoose.model('Specialization').find({ branchId: branch._id, active: true }).lean();
                   const colleges = await mongoose.model('College').find({ offeredBranchesRef: branch._id, active: true }).lean();
                   return { ...branch, specializations, colleges };
               }));
               
               return { ...course, branches: branchesWithDetails };
           }));
           
           return res.json({ ...stream, courses: coursesWithDetails });
       }
       
       const branches = await Branch.find({ streamId: stream._id, active: true })
           .populate('relatedCareers')
           .populate('relatedExams')
           .populate('higherStudies')
           .populate('furtherStudies')
           .sort({ order: 1 })
           .lean();
           
       if (branches && branches.length > 0) {
           const branchesWithDetails = await Promise.all(branches.map(async (branch) => {
               const specializations = await mongoose.model('Specialization').find({ branchId: branch._id, active: true }).lean();
               const colleges = await mongoose.model('College').find({ offeredBranchesRef: branch._id, active: true }).lean();
               return { ...branch, specializations, colleges };
           }));
           return res.json({ ...stream, branches: branchesWithDetails });
       }
       
       return res.json({ ...stream });
    }

    // Default: fetch Education Levels and Pathways and Streams
    let levelFilter: any = { active: true };
    if (levelSlug) {
      levelFilter.slug = String(levelSlug);
    }

    const educationLevels = await EducationLevel.find(levelFilter).sort({ order: 1 }).lean();
    
    const tree = await Promise.all(educationLevels.map(async (level) => {
      const pathways = await Pathway.find({ educationLevelId: level._id, active: true }).sort({ order: 1 }).lean();
      
      const pathwaysWithStreams = await Promise.all(pathways.map(async (pathway) => {
        const streams = await Stream.find({ pathwayId: pathway._id, active: true }).sort({ order: 1 }).lean();
        
        const streamsWithCounts = await Promise.all(streams.map(async (stream) => {
           // A stream might have courses directly, or it might have subject combinations that have courses
           const comboCount = await SubjectCombination.countDocuments({ streamId: stream._id, active: true });
           const courseCount = await Course.countDocuments({ streamId: stream._id, active: true });
           const tradeCount = await Trade.countDocuments({ streamId: stream._id, active: true });
           return { ...stream, courseCount, comboCount, tradeCount };
        }));

        return { ...pathway, streams: streamsWithCounts };
      }));
      
      return { ...level, pathways: pathwaysWithStreams };
    }));

    res.json(tree);
  } catch (error) {
    next(error);
  }
};

export const getFilteredPathways = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, streamId, courseId } = req.query;
    
    if (search) {
      const regex = new RegExp(String(search), 'i');
      const branches = await Branch.find({
        active: true,
        $or: [
          { name: regex },
          { description: regex },
          { relatedCareers: regex }
        ]
      })
      .populate({
        path: 'courseId',
        match: { active: true },
        populate: {
          path: 'streamId',
          match: { active: true },
          populate: { 
            path: 'pathwayId',
            match: { active: true },
            populate: {
               path: 'educationLevelId',
               match: { active: true }
            }
          }
        }
      })
      .limit(50)
      .lean();
      
      const validBranches = branches.filter((b: any) => 
        b.courseId && b.courseId.streamId && b.courseId.streamId.pathwayId && b.courseId.streamId.pathwayId.educationLevelId
      );
      
      res.json(validBranches);
      return;
    }
    
    let filter: any = { active: true };
    if (courseId) {
      filter.courseId = courseId;
    }
    
    const branches = await Branch.find(filter).populate('courseId').lean();
    res.json(branches);
  } catch (error) {
    next(error);
  }
};

export const getPathwayStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { levelSlug } = req.query;
    let pathwayFilter: any = { active: true };

    if (levelSlug) {
      const level = await EducationLevel.findOne({ slug: String(levelSlug), active: true });
      if (level) {
        pathwayFilter.educationLevelId = level._id;
      } else {
        return res.json({ pathways: 0, streams: 0, subjectCombinations: 0, subjects: 0, courses: 0, branches: 0, careers: 0 });
      }
    }

    const pathways = await Pathway.find(pathwayFilter).select('_id').lean();
    const pathwayIds = pathways.map(p => p._id);

    const streams = await Stream.find({ pathwayId: { $in: pathwayIds }, active: true }).select('_id').lean();
    const streamIds = streams.map(s => s._id);

    const subjectCombinations = await SubjectCombination.find({ streamId: { $in: streamIds }, active: true }).select('_id subjects').lean();
    const scIds = subjectCombinations.map(sc => sc._id);
    
    const subjectIds = new Set();
    subjectCombinations.forEach((sc: any) => {
        if (sc.subjects) {
            sc.subjects.forEach((sub: any) => subjectIds.add(sub.toString()));
        }
    });

    const courses = await Course.find({ 
        $or: [
           { streamId: { $in: streamIds } }, 
           { eligibleCombinations: { $in: scIds } }
        ],
        active: true 
    }).select('_id').lean();
    const courseIds = courses.map(c => c._id);

    const branches = await Branch.find({ courseId: { $in: courseIds }, active: true }).select('_id relatedCareers').lean();
    
    const careerIds = new Set();
    branches.forEach((b: any) => {
        if (b.relatedCareers) {
            b.relatedCareers.forEach((car: any) => careerIds.add(car.toString()));
        }
    });

    const collegesCount = await mongoose.model('College').countDocuments({ active: true });
    const examsCount = await mongoose.model('Exam').countDocuments({ status: 'Active' });
    const jobsCount = await mongoose.model('JobRole').countDocuments({ active: true });
    
    res.json({
      pathways: pathwayIds.length,
      streams: streamIds.length,
      subjectCombinations: subjectCombinations.length,
      subjects: subjectIds.size,
      courses: courseIds.length,
      branches: branches.length,
      careers: careerIds.size,
      colleges: collegesCount,
      exams: examsCount,
      jobs: jobsCount
    });
  } catch (error) {
    next(error);
  }
};

export const searchPathways = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.json([]);
    }

    const searchRegex = new RegExp(q, 'i');
    
    // Search models concurrently
    const [pathways, streams, courses, branches, careers] = await Promise.all([
      Pathway.find({ name: searchRegex, active: true }).select('name slug').limit(5).lean(),
      Stream.find({ name: searchRegex, active: true }).select('name slug').limit(5).lean(),
      Course.find({ name: searchRegex, active: true }).select('name slug').limit(5).lean(),
      Branch.find({ name: searchRegex, active: true }).select('name slug').limit(5).lean(),
      Career.find({ name: searchRegex, active: true }).select('name').limit(5).lean()
    ]);

    const results = [];
    
    pathways.forEach(p => results.push({ type: 'Pathway', name: p.name, slug: p.slug }));
    streams.forEach(s => results.push({ type: 'Stream', name: s.name, slug: s.slug }));
    courses.forEach(c => results.push({ type: 'Course', name: c.name, slug: c.slug }));
    branches.forEach(b => results.push({ type: 'Branch', name: b.name, slug: b.slug }));
    careers.forEach(c => results.push({ type: 'Career', name: c.name, slug: '' }));

    res.json(results);
  } catch (error) {
    next(error);
  }
};
