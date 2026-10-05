import { Router, Request, Response } from 'express';
import Course from '../models/Course.js';
import CourseCategory from '../models/CourseCategory.js';

const router = Router();

// GET /api/courses/categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await CourseCategory.find({ active: true }).lean();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/courses/categories/:id
router.get('/categories/:id', async (req: Request, res: Response) => {
  try {
    const category = await CourseCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    
    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Find courses with pagination
    const filter = { category: category.name, active: true };
    const courses = await Course.find(filter)
      .lean()
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Course.countDocuments(filter);

    res.json({
      data: courses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
    
    // Single aggregation query to replace N+1 countDocuments
    const courseIds = courses.map(c => c._id);
    const childCounts = await Course.aggregate([
      { $match: { parentId: { $in: courseIds }, active: true } },
      { $group: { _id: "$parentId", count: { $sum: 1 } } }
    ]);
    const countMap = new Map();
    childCounts.forEach(c => countMap.set(c._id.toString(), c.count));

    const coursesWithCounts = courses.map(c => ({
      ...c,
      optionCount: countMap.get(c._id.toString()) || 0
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
