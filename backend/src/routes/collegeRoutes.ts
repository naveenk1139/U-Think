import { Router, Request, Response } from 'express';
import College from '../models/College';
import { searchCollegesFromAPI } from '../services/collegeDbService';

const router = Router();

// GET /api/colleges/stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalColleges = await College.countDocuments();
    
    // Aggregation pipeline to count colleges by category
    const categoryCounts = await College.aggregate([
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } }
    ]);

    // Format the stats
    const stats: any = {
      total: totalColleges,
      categories: {}
    };

    categoryCounts.forEach(c => {
      if (c._id) stats.categories[c._id] = c.count;
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching college stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/colleges/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    let college = await College.findById(req.params.id);
    if (!college) {
      // If not found by object id, try finding by sourceId
      college = await College.findOne({ sourceId: req.params.id });
    }
    
    if (!college) {
      res.status(404).json({ message: 'College not found' });
      return;
    }
    res.json(college);
  } catch (error) {
    console.error('Error fetching college details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/colleges
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      q, 
      category, 
      type, 
      district, 
      city, 
      course, 
      entranceExam,
      ownership,
      page = 1,
      limit = 20
    } = req.query;

    // 1. Always attempt to fetch the requested page from the API to keep DB fresh
    const apiResult = await searchCollegesFromAPI({ 
      q, category, type, district, city, course, page, limit 
    });

    let colleges = [];
    let total = 0;

    // 2. If API returned data, use it directly (it was already synced to DB)
    if (apiResult.colleges && apiResult.colleges.length > 0) {
      colleges = apiResult.colleges;
      total = apiResult.total;
    } else {
      // 3. Fallback to local DB cache (e.g. if rate limited or API is down)
      const filter: any = { state: 'Karnataka' }; // Enforce Karnataka

      if (q) filter.$text = { $search: String(q) };
      if (category && category !== 'All') filter.categories = { $in: [String(category)] };
      if (type && type !== 'All') filter.type = String(type);
      if (ownership) filter.ownership = String(ownership);
      if (district && district !== 'Any District' && district !== 'Any State') filter.district = String(district);
      if (city) filter.city = String(city);
      if (course) filter.courses = { $regex: String(course), $options: 'i' };
      if (entranceExam) filter.entranceExams = { $in: [String(entranceExam)] };

      const skip = (Number(page) - 1) * Number(limit);

      colleges = await College.find(filter)
        .sort(q ? { score: { $meta: 'textScore' } } : { nirfRank: 1 })
        .skip(skip)
        .limit(Number(limit));

      total = await College.countDocuments(filter);
    }

    res.json({
      data: colleges,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
