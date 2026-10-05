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

    categories.forEach(cat => result[cat] = { colleges: 0, exams: 0, jobs: 0, mentors: 0 });

    const fetchGrouped = async (model: mongoose.Model<any>, groupByField: string) => {
      if (!model) return [];
      try {
        return await model.aggregate([
          { $match: { [groupByField]: { $in: categories } } },
          { $group: { _id: `$${groupByField}`, count: { $sum: 1 } } }
        ]);
      } catch (e) {
        return [];
      }
    };

    const [collegeCounts, examCounts, jobCounts, mentorCounts] = await Promise.all([
      fetchGrouped(College, 'category'),
      fetchGrouped(Exam, 'category'),
      fetchGrouped(Job, 'category'),
      fetchGrouped(Mentor, 'industry')
    ]);

    collegeCounts.forEach((c: any) => { if (result[c._id]) result[c._id].colleges = c.count; });
    examCounts.forEach((e: any) => { if (result[e._id]) result[e._id].exams = e.count; });
    jobCounts.forEach((j: any) => { if (result[j._id]) result[j._id].jobs = j.count; });
    mentorCounts.forEach((m: any) => { if (result[m._id]) result[m._id].mentors = m.count; });

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
