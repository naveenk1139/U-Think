import { Router, Request, Response } from 'express';
import Course from '../models/Course.js';

const router = Router();

// GET /api/courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const filter: any = { active: true };
    if (req.query.streamId) {
      filter.streamId = req.query.streamId;
    }
    if (req.query.parentId !== undefined) {
      if (req.query.parentId === 'null' || req.query.parentId === '') {
        filter.parentId = { $exists: false };
      } else {
        filter.parentId = req.query.parentId;
      }
    }
    const courses = await Course.find(filter).lean().sort({ order: 1 });
    
    // Dynamically calculate counts of children courses
    const coursesWithCounts = await Promise.all(courses.map(async (c) => {
      const count = await Course.countDocuments({ parentId: c._id, active: true });
      return { ...c, optionCount: count };
    }));
    
    res.json({ data: coursesWithCounts });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/courses/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ data: course });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
