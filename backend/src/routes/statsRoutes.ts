import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Helper to safely get a model count without failing if collection is empty
const safeCount = async (model: mongoose.Model<any>, filter: object = {}): Promise<number> => {
  try {
    return await model.countDocuments(filter);
  } catch {
    return 0;
  }
};

// GET /api/stats/categories — Real DB counts per education category
router.get('/categories', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const College = mongoose.models.College as mongoose.Model<any>;
    const Exam = mongoose.models.Exam as mongoose.Model<any>;
    const Job = mongoose.models.Job as mongoose.Model<any>;
    const Mentor = mongoose.models.Mentor as mongoose.Model<any>;

    const categories = [
      'Engineering', 'Medical', 'Management', 'Law', 'Design',
      'Commerce', 'Science', 'Arts', 'Architecture', 'Agriculture',
      'Pharmacy', 'Nursing', 'Paramedical', 'Diploma', 'Polytechnic',
      'ITI', 'Vocational', 'Computer Applications', 'Education',
      'Hospitality', 'Social Sciences'
    ];

    const result: Record<string, { colleges: number; exams: number; jobs: number; mentors: number }> = {};

    await Promise.all(
      categories.map(async (cat) => {
        const [colleges, exams, jobs, mentors] = await Promise.all([
          College ? safeCount(College, { category: cat }) : 0,
          Exam ? safeCount(Exam, { category: cat }) : 0,
          Job ? safeCount(Job, { category: cat }) : 0,
          Mentor ? safeCount(Mentor, { industry: cat }) : 0,
        ]);
        result[cat] = { colleges, exams, jobs, mentors };
      })
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/stats/summary — Platform-level totals
router.get('/summary', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const College = mongoose.models.College as mongoose.Model<any>;
    const Exam = mongoose.models.Exam as mongoose.Model<any>;
    const Job = mongoose.models.Job as mongoose.Model<any>;
    const Mentor = mongoose.models.Mentor as mongoose.Model<any>;

    const [totalColleges, totalExams, totalJobs, totalMentors] = await Promise.all([
      College ? safeCount(College) : 0,
      Exam ? safeCount(Exam) : 0,
      Job ? safeCount(Job) : 0,
      Mentor ? safeCount(Mentor) : 0,
    ]);

    res.json({ totalColleges, totalExams, totalJobs, totalMentors });
  } catch (err) {
    next(err);
  }
});

export default router;
