import { Router, Request, Response } from 'express';
import Course from '../models/Course.js';

const router = Router();

// GET /api/courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ active: true }).sort({ order: 1 });
    res.json({ data: courses });
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
