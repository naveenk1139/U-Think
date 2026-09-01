import { Router, Request, Response } from 'express';
import Course from '../models/Course.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ active: true }).sort({ order: 1 }).lean();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching courses' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, active: true }).lean();
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching course' });
  }
});

export default router;
