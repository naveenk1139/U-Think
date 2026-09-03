import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import College from '../models/College.js';
import CollegeCourse from '../models/CollegeCourse.js';
import FeeRecord from '../models/FeeRecord.js';
import District from '../models/District.js';
import Taluk from '../models/Taluk.js';
import State from '../models/State.js';
import Course from '../models/Course.js';
import { ai, generateWithRetry } from '../config/gemini.js';

const router = Router();

// GET /api/colleges/districts
router.get('/districts', async (req: Request, res: Response) => {
  try {
    const stateRecord = await State.findOne({ name: 'Karnataka' });
    const districts = await District.find({ stateId: stateRecord?._id, active: true }).sort({ name: 1 });
    res.json(districts);
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/colleges/taluks
router.get('/taluks', async (req: Request, res: Response) => {
  try {
    const { districtId } = req.query;
    const query = { active: true } as any;
    if (districtId) query.districtId = districtId;
    const taluks = await Taluk.find(query).sort({ name: 1 });
    res.json(taluks);
  } catch (error) {
    console.error('Error fetching taluks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/colleges/courses-list
router.get('/courses-list', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ active: true }).sort({ name: 1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses list:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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

    const districts = await College.distinct('district', filter);
    const courses = await College.distinct('courses', filter);

    // Format the stats
    const stats: any = {
      total: totalColleges,
      totalDistricts: districts.length,
      totalCourses: courses.length,
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

// GET /api/colleges/district-stats
router.get('/district-stats', async (req: Request, res: Response) => {
  try {
    const districtStats = await College.aggregate([
      { $match: { state: 'Karnataka' } },
      { $group: {
          _id: '$district',
          institutionCount: { $sum: 1 }
      }},
      { $match: { _id: { $ne: null, $ne: '' } } },
      { $sort: { institutionCount: -1 } },
      { $limit: 10 }
    ]);

    const formattedDistricts = districtStats.map(d => ({
      district: d._id,
      institutionCount: d.institutionCount
    }));

    res.json({ districts: formattedDistricts });
  } catch (error) {
    console.error('Error fetching district stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/colleges/filter-options
router.get('/filter-options', async (req: Request, res: Response) => {
  try {
    const categoryAgg = await College.aggregate([
      { $match: { state: 'Karnataka' } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } }
    ]);

    const typeAgg = await College.aggregate([
      { $match: { state: 'Karnataka' } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $match: { _id: { $ne: null } } }
    ]);

    const categories = categoryAgg.map(c => ({ name: c._id, count: c.count }));
    const types = typeAgg.map(t => ({ name: t._id, count: t.count }));

    const educationLevels = [
      { name: 'AFTER_10TH', count: await College.countDocuments({ state: 'Karnataka', educationLevels: 'AFTER_10TH' }) },
      { name: 'PUC', count: await College.countDocuments({ state: 'Karnataka', educationLevels: 'PUC' }) },
      { name: 'DIPLOMA', count: await College.countDocuments({ state: 'Karnataka', educationLevels: 'DIPLOMA' }) },
      { name: 'ITI', count: await College.countDocuments({ state: 'Karnataka', educationLevels: 'ITI' }) },
      { name: 'UNDERGRADUATE', count: await College.countDocuments({ state: 'Karnataka', educationLevels: 'UNDERGRADUATE' }) },
      { name: 'POSTGRADUATE', count: await College.countDocuments({ state: 'Karnataka', educationLevels: 'POSTGRADUATE' }) },
      { name: 'PROFESSIONAL', count: await College.countDocuments({ state: 'Karnataka', educationLevels: 'PROFESSIONAL' }) },
      { name: 'RESEARCH', count: await College.countDocuments({ state: 'Karnataka', educationLevels: 'RESEARCH' }) }
    ];

    res.json({
      categories,
      types,
      educationLevels
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/colleges/:idOrSlug
router.get('/:idOrSlug', async (req: Request, res: Response): Promise<void> => {
  try {
    const idOrSlug = req.params.idOrSlug;
    let college;
    
    // Check if it's a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      college = await College.findById(idOrSlug)
        .populate('districtRef', 'name slug')
        .populate('talukRef', 'name slug')
        .populate('cityRef', 'name slug');
    }

    if (!college) {
      college = await College.findOne({ slug: idOrSlug })
        .populate('districtRef', 'name slug')
        .populate('talukRef', 'name slug')
        .populate('cityRef', 'name slug');
    }

    if (!college) {
      college = await College.findOne({ sourceId: idOrSlug })
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

// GET /api/colleges/:idOrSlug/courses
router.get('/:idOrSlug/courses', async (req: Request, res: Response): Promise<void> => {
  try {
    const idOrSlug = req.params.idOrSlug;
    let college;
    
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      college = await College.findById(idOrSlug).select('_id');
    }
    if (!college) {
      college = await College.findOne({ slug: idOrSlug }).select('_id');
    }
    if (!college) {
      college = await College.findOne({ sourceId: idOrSlug }).select('_id');
    }
    if (!college) {
      res.status(404).json({ message: 'College not found' });
      return;
    }

    const courses = await CollegeCourse.find({ collegeId: college._id, active: true })
      .populate('courseId', 'name slug')
      .populate('branchId', 'name slug')
      .populate('entranceExamIds', 'name slug type')
      .populate('entranceExamId', 'name slug type');

    res.json(courses);
  } catch (error) {
    console.error('Error fetching college courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/colleges/:idOrSlug/fees
router.get('/:idOrSlug/fees', async (req: Request, res: Response): Promise<void> => {
  try {
    const idOrSlug = req.params.idOrSlug;
    let college;
    
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      college = await College.findById(idOrSlug).select('_id');
    }
    if (!college) {
      college = await College.findOne({ slug: idOrSlug }).select('_id');
    }
    if (!college) {
      college = await College.findOne({ sourceId: idOrSlug }).select('_id');
    }
    if (!college) {
      res.status(404).json({ message: 'College not found' });
      return;
    }

    const fees = await FeeRecord.find({ institution_id: college._id })
      .populate('degree_id', 'name slug');

    res.json(fees);
  } catch (error) {
    console.error('Error fetching college fees:', error);
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
    if (req.query.education_level) filter.educationLevels = { $in: [String(req.query.education_level)] };
    if (ownership) filter.ownership = String(ownership);
    
    // Support string matching for legacy/unmigrated data OR strict ObjectId refs if passed
    if (district && district !== 'Any District' && district !== 'Any State') {
      if (mongoose.Types.ObjectId.isValid(String(district))) {
         filter.districtRef = district;
      } else {
         filter.district = { $regex: String(district), $options: 'i' };
      }
    }
    
    const taluk = req.query.taluk;
    if (taluk && taluk !== 'All') {
      if (mongoose.Types.ObjectId.isValid(String(taluk))) {
         filter.talukRef = taluk;
      } else {
         filter.taluk = { $regex: String(taluk), $options: 'i' };
      }
    }
    
    if (city && city !== 'All') filter.city = { $regex: String(city), $options: 'i' };
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
    const { userProfile, collegeIds } = req.body;
    
    if (!userProfile) {
      res.status(400).json({ message: 'User profile is required' });
      return;
    }

    let collegesToScore = [];
    if (collegeIds && collegeIds.length > 0) {
      collegesToScore = await College.find({ _id: { $in: collegeIds }, status: 'ACTIVE' })
        .select('_id name city district categories specializations fees placement nirfRank type establishedYear courses universityAffiliation description')
        .lean();
    } else {
      collegesToScore = await College.find({ status: 'ACTIVE', state: 'Karnataka' })
        .select('_id name city district categories specializations fees placement nirfRank type establishedYear courses universityAffiliation description')
        .limit(50)
        .lean();
    }

    if (!collegesToScore || collegesToScore.length === 0) {
       res.status(404).json({ message: 'No colleges available for recommendation.' });
       return;
    }

    // 2. Prepare an extensive summary of colleges for the LLM
    const collegeDataForAI = collegesToScore.map(c => ({
      id: c._id,
      name: c.name,
      location: `${c.city || ''}, ${c.district || ''}`.trim(),
      type: c.type,
      categories: c.categories,
      specializations: c.specializations,
      fees: c.fees?.tuition || 'Unknown',
      placementPct: c.placement?.percentage || 'Unknown',
      establishedYear: c.establishedYear || 'Unknown',
      coursesOffered: c.courses?.slice(0, 8).join(', ') || 'Unknown',
      affiliation: c.universityAffiliation || 'Unknown',
      descriptionSummary: c.description ? c.description.substring(0, 150) : ''
    }));

const prompt = `
You are an expert, highly knowledgeable career and college counselor.
Based on the following user profile and preferences:
${JSON.stringify(userProfile, null, 2)}

And the following list of available, highly verified colleges in Karnataka:
${JSON.stringify(collegeDataForAI)}

Recommend the top 3-5 colleges that best match the user's specific aptitude scores, interests, and preferences. Consider factors like established history, placement percentages, and courses offered.
Return ONLY a valid JSON array of objects, with each object containing:
- "collegeId": The precise ID of the recommended college (must match exactly one of the IDs from the list).
- "rationale": A deeply personalized, 2-3 sentence explanation connecting the user's aptitude/interests with the college's specific strengths (e.g. placements, established year, specific courses).
`;

    // 3. Call Gemini
    let recommendations: Array<{ collegeId: string, rationale: string }> = [];

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Mock response if API key is missing
      recommendations = collegesToScore.slice(0, 3).map((c: any) => ({
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

    // 4. Return as a dictionary of scores mapped to IDs as expected by frontend
    const scores: Record<string, { score: number, rationale: string }> = {};
    for (const rec of recommendations) {
      // Create a pseudo-score based on index (top result = highest)
      const pseudoScore = 95 - (Object.keys(scores).length * 5);
      scores[rec.collegeId] = {
        score: pseudoScore > 0 ? pseudoScore : 10,
        rationale: rec.rationale
      };
    }

    res.json({ scores });
  } catch (error) {
    console.error('Error generating college recommendations:', error);
    res.status(500).json({ message: 'Server error while generating recommendations', error: String(error) });
  }
});

export default router;
