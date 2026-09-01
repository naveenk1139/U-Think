import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import College from '../models/College';
import { searchCollegesFromAPI } from '../services/collegeDbService';

const router = Router();

// GET /api/colleges/stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const { q, type, district } = req.query;
    const filter: any = { state: 'Karnataka' }; // Enforce Karnataka globally

    if (q) {
      filter.$or = [
        { name: { $regex: String(q), $options: 'i' } },
        { aliases: { $regex: String(q), $options: 'i' } },
        { 'specializations': { $regex: String(q), $options: 'i' } }
      ];
    }
    
    if (type && type !== 'All') filter.type = { $regex: String(type), $options: 'i' };
    
    if (district && district !== 'Any District' && district !== 'Any State') {
      if (mongoose.Types.ObjectId.isValid(String(district))) {
         filter.districtRef = district;
      } else {
         filter.district = { $regex: String(district), $options: 'i' };
      }
    }

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
    let college = await College.findById(req.params.id)
      .populate('districtRef', 'name slug')
      .populate('talukRef', 'name slug')
      .populate('cityRef', 'name slug');
    if (!college) {
      // If not found by object id, try finding by sourceId
      college = await College.findOne({ sourceId: req.params.id })
        .populate('districtRef', 'name slug')
        .populate('talukRef', 'name slug')
        .populate('cityRef', 'name slug');
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
    
    // Support string matching for legacy/unmigrated data OR strict ObjectId refs if passed
    if (district && district !== 'Any District' && district !== 'Any State') {
      if (mongoose.Types.ObjectId.isValid(String(district))) {
         filter.districtRef = district;
      } else {
         filter.district = { $regex: String(district), $options: 'i' };
      }
    }
    if (req.query.talukId) filter.talukRef = req.query.talukId;
    
    if (city) filter.city = String(city);
    if (course) filter.courses = { $regex: String(course), $options: 'i' };
    if (branch) filter.specializations = { $regex: String(branch), $options: 'i' };
    if (entranceExam) filter.entranceExams = { $in: [String(entranceExam)] };

    const skip = (Number(page) - 1) * Number(limit);

    let sortOption: any = { name: 1 }; // Default to alphabetical

    if (sortBy === 'College Name') sortOption = { name: 1 };
    else if (sortBy === 'Fees: Low to High') sortOption = { 'fees.tuition': 1, name: 1 };
    else if (sortBy === 'Fees: High to Low') sortOption = { 'fees.tuition': -1, name: 1 };
    else if (sortBy === 'Placements: High to Low') sortOption = { 'placement.percentage': -1, name: 1 };
    else if (sortBy === 'Location') sortOption = { district: 1, city: 1, name: 1 };
    else if (sortBy === 'NIRF Ranking') sortOption = { nirfRank: 1, name: 1 };

    console.log('Query:', req.query);
    console.log('Filter:', JSON.stringify(filter));

    let colleges = await College.find(filter)
      .populate('districtRef', 'name slug')
      .populate('talukRef', 'name slug')
      .populate('cityRef', 'name slug')
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
