import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { protect, AuthRequest } from '../middleware/authMiddleware.js';
import Exam from '../models/Exam.js';
import ExamYear from '../models/ExamYear.js';
import SavedExam from '../models/SavedExam.js';

const router = Router();

// 1. GET /api/exams - Get all exams with advanced filtering and pagination
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      search, 
      education_level, 
      stream, 
      category, 
      type, 
      ownership,
      page = '1', 
      limit = '10' 
    } = req.query;
    
    let query: any = { status: 'ACTIVE' }; // Only show active exams by default

    // Handle array of values or single values for filters (Logical OR within same filter group)
    if (education_level && education_level !== 'All') {
      const levels = (education_level as string).split(',');
      query.education_level = { $in: levels };
    }
    
    if (stream && stream !== 'All') {
      const streams = (stream as string).split(',');
      query.streams = { $in: streams };
    }
    
    if (category && category !== 'All') {
      const categories = (category as string).split(',');
      query.exam_categories = { $in: categories };
    }
    
    if (type && type !== 'All') {
      const types = (type as string).split(',');
      query.exam_type = { $in: types };
    }

    if (ownership && ownership !== 'All') {
      const ownerships = (ownership as string).split(',');
      query.ownership = { $in: ownerships };
    }

    if (search) {
      // Use text search for performance, fallback to regex if needed
      query.$text = { $search: search as string };
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [exams, total] = await Promise.all([
      Exam.find(query).skip(skip).limit(limitNum).lean(),
      Exam.countDocuments(query)
    ]);

    res.json({
      items: exams,
      total,
      page: pageNum,
      page_size: limitNum,
      total_pages: Math.ceil(total / limitNum)
    });
  } catch (err) {
    next(err);
  }
});

// 2. GET /api/exams/recommendations - Get AI/Logic-based recommendations
router.get('/recommendations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { education_level, stream, course, age } = req.query;
    
    // Start with all active exams
    const allExams = await Exam.find({ status: 'ACTIVE' }).lean();
    
    // Score exams based on user parameters
    const scoredExams = allExams.map(exam => {
      let score = 0;
      let reasons: string[] = [];

      // 1. Education Level Match
      if (education_level && education_level !== 'All') {
         if (exam.education_level === education_level) {
            score += 10;
            reasons.push(`Matches your education level (${exam.education_level.replace('_', ' ')})`);
         } else {
            // Penalize heavily if level doesn't match
            score -= 20;
         }
      }

      // 2. Stream Match
      if (stream && stream !== 'All') {
         if (exam.streams?.includes(stream as string)) {
            score += 8;
            reasons.push(`Aligns with your chosen stream (${stream})`);
         }
      }

      // 3. Target Course Match
      if (course) {
         const targetStr = (course as string).toLowerCase();
         const matchesCourse = exam.target_courses?.some(c => c.toLowerCase().includes(targetStr));
         if (matchesCourse) {
            score += 15;
            reasons.push(`Required for your target course`);
         }
      }

      // 4. Age Eligibility (Hard constraint)
      if (age) {
         const userAge = parseInt(age as string, 10);
         if (exam.age_min && userAge < exam.age_min) {
            score = -100; // Ineligible
            reasons.push(`You are below the minimum age of ${exam.age_min}`);
         }
         if (exam.age_max && userAge > exam.age_max) {
            score = -100; // Ineligible
            reasons.push(`You are above the maximum age of ${exam.age_max}`);
         }
      }

      return {
         ...exam,
         relevance_score: score,
         recommendation_reason: reasons.join(' • ') || 'General recommendation based on your profile.'
      };
    });

    // Filter out ineligible (score < 0), sort by score desc, take top 5
    const recommendations = scoredExams
      .filter(e => e.relevance_score > 0)
      .sort((a, b) => b.relevance_score - a.relevance_score)
      .slice(0, 5);

    // If no specific parameters passed or no good matches, fallback to generic top 3
    if (recommendations.length === 0) {
       const fallback = allExams.slice(0, 3).map(e => ({ ...e, recommendation_reason: 'Trending popular exam.' }));
       res.json({ items: fallback });
       return;
    }

    res.json({ items: recommendations });
  } catch (err) {
    next(err);
  }
});

// 3. POST /api/exams/compare - Compare multiple exams
router.post('/compare', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { examIds } = req.body;
    if (!examIds || !Array.isArray(examIds) || examIds.length === 0) {
      res.status(400).json({ error: 'Please provide an array of examIds to compare' });
      return;
    }
    
    if (examIds.length > 3) {
      res.status(400).json({ error: 'Cannot compare more than 3 exams at a time' });
      return;
    }

    const exams = await Exam.find({ _id: { $in: examIds } }).lean();
    res.json(exams);
  } catch (err) {
    next(err);
  }
});

// 4. GET /api/exams/:slug - Get single exam details + years
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exam = await Exam.findOne({ canonical_slug: req.params.slug }).lean();
    if (!exam) {
      res.status(404).json({ error: 'Exam Not Found' });
      return;
    }

    // Fetch years associated with this exam
    const years = await ExamYear.find({ exam_id: exam._id }).sort({ year: -1 }).lean();
    
    res.json({ ...exam, years });
  } catch (err) {
    next(err);
  }
});

// -- AUTHENTICATED ROUTES FOR SAVED EXAMS --
router.use(protect);

// POST /api/exams/:id/save - Save an exam
router.post('/:id/save', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const examId = req.params.id;

    // Check if it exists
    const exam = await Exam.findById(examId);
    if (!exam) {
      res.status(404).json({ error: 'Exam not found' });
      return;
    }

    try {
      const saved = await SavedExam.create({ user_id: userId, exam_id: examId });
      res.status(201).json({ message: 'Exam saved successfully', saved });
    } catch (e: any) {
      if (e.code === 11000) {
        res.status(400).json({ error: 'Exam is already saved' });
      } else {
        throw e;
      }
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/exams/:id/save - Remove saved exam
router.delete('/:id/save', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const examId = req.params.id;

    const deleted = await SavedExam.findOneAndDelete({ user_id: userId, exam_id: examId });
    if (!deleted) {
      res.status(404).json({ error: 'Saved exam not found' });
      return;
    }
    
    res.json({ message: 'Saved exam removed' });
  } catch (err) {
    next(err);
  }
});

// GET /api/exams/user/saved - Get user's saved exams
router.get('/user/saved', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const savedExams = await SavedExam.find({ user_id: userId }).populate('exam_id').lean();
    
    const formatted = savedExams.map(s => s.exam_id);
    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

export default router;
