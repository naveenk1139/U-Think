import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import College from '../models/College.js';
import { searchCollegesFromAPI } from '../services/collegeDbService.js';
import { ai, generateWithRetry } from '../config/gemini.js';

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

// POST /api/colleges/recommend
router.post('/recommend', async (req: Request, res: Response): Promise<void> => {
  try {
    const { preferences } = req.body;
    
    if (!preferences) {
      res.status(400).json({ message: 'Preferences are required' });
      return;
    }

    // 1. Fetch a broad set of colleges (e.g., active ones in Karnataka)
    // We limit to 50 to avoid token limits for the LLM
    const colleges = await College.find({ status: 'ACTIVE', state: 'Karnataka' })
      .select('name city district categories specializations fees placement nirfRank type')
      .limit(50)
      .lean();

    if (!colleges || colleges.length === 0) {
       res.status(404).json({ message: 'No colleges available for recommendation.' });
       return;
    }

    // 2. Prepare a concise summary of colleges for the LLM
    const collegeDataForAI = colleges.map(c => ({
      id: c._id,
      name: c.name,
      location: `${c.city || ''}, ${c.district || ''}`.trim(),
      type: c.type,
      categories: c.categories,
      specializations: c.specializations,
      fees: c.fees?.tuition || 'Unknown',
      placementPct: c.placement?.percentage || 'Unknown'
    }));

    const prompt = `
You are an expert college counselor.
Based on the following user preferences:
${JSON.stringify(preferences, null, 2)}

And the following list of available colleges:
${JSON.stringify(collegeDataForAI)}

Recommend the top 3-5 colleges that best match the user's preferences.
Return ONLY a valid JSON array of objects, with each object containing:
- "collegeId": The ID of the recommended college (must match exactly one of the IDs from the list).
- "rationale": A short, 1-2 sentence explanation of why this college is a good fit for the user based on their preferences.
`;

    // 3. Call Gemini
    let recommendations: Array<{ collegeId: string, rationale: string }> = [];

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Mock response if API key is missing
      recommendations = colleges.slice(0, 3).map((c: any) => ({
        collegeId: String(c._id),
        rationale: "This is a simulated AI recommendation because the GEMINI_API_KEY is not configured in the backend."
      }));
    } else {
      const model = ai.models;
      const response = await generateWithRetry(model, {
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const aiResponseText = response.text();
      
      try {
        recommendations = JSON.parse(aiResponseText);
      } catch (e) {
        console.error('Failed to parse AI response:', aiResponseText);
        res.status(500).json({ message: 'Failed to process AI recommendations.' });
        return;
      }
    }

    // 4. Fetch the full college objects for the recommendations
    const recommendedColleges = [];
    for (const rec of recommendations) {
      const fullCollege = await College.findById(rec.collegeId)
        .populate('districtRef', 'name slug')
        .populate('talukRef', 'name slug')
        .populate('cityRef', 'name slug');
        
      if (fullCollege) {
        recommendedColleges.push({
          college: fullCollege,
          rationale: rec.rationale
        });
      }
    }

    res.json({ recommendations: recommendedColleges });
  } catch (error) {
    console.error('Error generating college recommendations:', error);
    res.status(500).json({ message: 'Server error while generating recommendations', error: String(error) });
  }
});

export default router;
