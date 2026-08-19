import { Router, Request, Response } from 'express';
import College from '../models/College';
import { searchCollegesFromAPI } from '../services/collegeDbService';

const router = Router();

// GET /api/colleges/stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const filter = { state: 'Karnataka' }; // Enforce Karnataka globally
    const totalColleges = await College.countDocuments(filter);
    
    // Aggregation pipeline to count colleges by category
    const categoryCounts = await College.aggregate([
      { $match: filter },
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
      branch,
      entranceExam,
      ownership,
      sortBy,
      page = 1,
      limit = 20,
      userLat,
      userLng
    } = req.query;

    const filter: any = { state: 'Karnataka' }; // Enforce Karnataka

    if (q) {
      filter.$or = [
        { name: { $regex: String(q), $options: 'i' } },
        { aliases: { $regex: String(q), $options: 'i' } },
        { 'specializations': { $regex: String(q), $options: 'i' } }
      ];
    }
    
    if (category && category !== 'All') filter.categories = { $in: [String(category)] };
    if (type && type !== 'All') filter.type = { $regex: String(type), $options: 'i' };
    if (ownership) filter.ownership = String(ownership);
    if (district && district !== 'Any District' && district !== 'Any State') filter.district = String(district);
    if (city) filter.city = String(city);
    if (course) filter.courses = { $regex: String(course), $options: 'i' };
    if (branch) filter.specializations = { $regex: String(branch), $options: 'i' };
    if (entranceExam) filter.entranceExams = { $in: [String(entranceExam)] };

    const skip = (Number(page) - 1) * Number(limit);

    let sortOption: any = { nirfRank: 1 }; // Default

    // If q is provided, we sort by match relevance implicitly if using text search, but since we used $or regex, 
    // we can stick to nirfRank or a basic name sort. We'll leave nirfRank as default.

    let colleges = await College.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await College.countDocuments(filter);

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
