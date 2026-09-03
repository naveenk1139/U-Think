import { Router, Request, Response } from 'express';
import Course from '../models/Course.js';
import CourseCategory from '../models/CourseCategory.js';
import CourseDetail from '../models/CourseDetail.js';

const router = Router();

// GET /api/courses/categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await CourseCategory.find({ active: true }).sort({ createdAt: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching course categories:', error);
    res.status(500).json({ error: 'Server error fetching categories' });
  }
});

// GET /api/courses/categories/:id
router.get('/categories/:id', async (req: Request, res: Response) => {
  try {
    const courses = await CourseDetail.find({ categoryId: req.params.id, active: true }).sort({ createdAt: 1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ error: 'Server error fetching courses' });
  }
});

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
