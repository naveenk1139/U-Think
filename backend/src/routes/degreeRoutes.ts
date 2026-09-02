import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Degree from '../models/Degree';
import ExamDegreeMap from '../models/ExamDegreeMap';

const router = Router();

// Get all degrees with advanced filtering
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, level, discipline, stream, duration, mode, entrance_required } = req.query;
    
    let query: any = {};

    if (level && level !== 'All') query.level = level;
    if (discipline && discipline !== 'All') query.discipline = discipline;
    if (stream && stream !== 'All') query.stream = stream;
    if (duration && duration !== 'All') query.duration = parseInt(duration as string, 10);
    if (mode && mode !== 'All') query.mode = mode;
    if (entrance_required !== undefined) query.entrance_required = entrance_required === 'true';

    if (search) {
      query.$text = { $search: search as string };
    }

    const degrees = await Degree.find(query).limit(100);
    res.json(degrees);
  } catch (err) {
    next(err);
  }
});

// Get single degree by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const degree = await Degree.findOne({ slug: req.params.slug });
    if (!degree) {
      res.status(404).json({ error: 'Degree not found' });
      return;
    }
    res.json(degree);
  } catch (err) {
    next(err);
  }
});

// Get exams mapped to this degree
router.get('/:slug/exams', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const degree = await Degree.findOne({ slug: req.params.slug });
    if (!degree) {
      res.status(404).json({ error: 'Degree not found' });
      return;
    }

    const mappings = await ExamDegreeMap.find({ degree_id: degree._id }).populate('exam_id');
    res.json(mappings);
  } catch (err) {
    next(err);
  }
});

// We can add colleges mapping later when the college models are adapted.
export default router;
