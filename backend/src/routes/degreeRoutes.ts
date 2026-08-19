import { Router, Request, Response, NextFunction } from 'express';
import Degree from '../models/Degree';

const router = Router();

// Get all degrees with optional filtering
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, level, category } = req.query;
    
    let query: any = {};

    if (level && level !== 'All') {
      query.level = level;
    }
    
    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    const degrees = await Degree.find(query).limit(100);
    res.json(degrees);
  } catch (err) {
    next(err);
  }
});

// Get single degree
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const degree = await Degree.findOne({ degreeId: req.params.id });
    if (!degree) {
      res.status(404).json({ error: 'Degree not found' });
      return;
    }
    res.json(degree);
  } catch (err) {
    next(err);
  }
});

export default router;
