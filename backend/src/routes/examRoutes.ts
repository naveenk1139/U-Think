import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { protect, AuthRequest } from '../middleware/authMiddleware';
import Exam from '../models/Exam';

const router = Router();

// Get all exams with optional filtering
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, educationLevel, category, level, type } = req.query;
    
    let query: any = {};

    if (educationLevel && educationLevel !== 'All') {
      query.educationLevel = educationLevel;
    }
    
    if (category && category !== 'All') {
      query.category = category;
    }

    if (level && level !== 'All') {
      query.level = level;
    }

    if (type && type !== 'All') {
      query.type = type;
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    const exams = await Exam.find(query).limit(100);
    res.json(exams);
  } catch (err) {
    next(err);
  }
});

// Get single exam
router.get('/info/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exam = await Exam.findOne({ examId: req.params.id });
    if (!exam) {
      res.status(404).json({ error: 'Exam not found' });
      return;
    }
    res.json(exam);
  } catch (err) {
    next(err);
  }
});
const getTrackedExamModel = (): mongoose.Model<any> => {
  const existing = mongoose.models.TrackedExam as mongoose.Model<any> | undefined;
  if (existing) {
    return existing;
  }
  const TrackedExamSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      examId: { type: String, required: true },
      examName: { type: String, required: true },
      examDate: { type: String, default: '' },
      status: {
        type: String,
        enum: ['upcoming', 'preparing', 'appeared', 'completed'],
        default: 'upcoming',
      },
    },
    { timestamps: true }
  );
  return mongoose.model('TrackedExam', TrackedExamSchema) as mongoose.Model<any>;
};

router.use(protect);

// Track an exam
router.post('/tracked', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { examId, examName, examDate, status } = req.body;
    if (!examId || !examName) {
      res.status(400).json({ error: 'examId and examName are required.' });
      return;
    }

    const TrackedExam = getTrackedExamModel();
    const exam = await TrackedExam.create({
      userId,
      examId,
      examName,
      examDate,
      status: status || 'upcoming',
    });

    res.status(201).json(exam);
  } catch (err) {
    next(err);
  }
});

// Get tracked exams for user
router.get('/tracked', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const TrackedExam = getTrackedExamModel();
    const exams = await TrackedExam.find({ userId }).sort({ createdAt: -1 });
    res.json(exams);
  } catch (err) {
    next(err);
  }
});

// Update status of tracked exam
router.patch('/tracked/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { status, examDate } = req.body;
    const TrackedExam = getTrackedExamModel();

    const updated = await TrackedExam.findOneAndUpdate(
      { _id: id, userId },
      {
        ...(status && { status }),
        ...(examDate !== undefined && { examDate }),
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: 'Tracked exam not found.' });
      return;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete a tracked exam
router.delete('/tracked/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const TrackedExam = getTrackedExamModel();
    const deleted = await TrackedExam.findOneAndDelete({ _id: id, userId });
    
    if (!deleted) {
      res.status(404).json({ error: 'Tracked exam not found or unauthorized.' });
      return;
    }
    
    res.json({ message: 'Tracked exam deleted successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;
