import express from 'express';
import { jobService } from '../services/JobService';
import { jobMatchService } from '../services/JobMatchService';
import { protect } from '../middleware/authMiddleware';
import User from '../models/User';
import SavedJob from '../models/SavedJob';
import JobAlert from '../models/JobAlert';
import Job from '../models/Job';
import { IUser } from '../models/User';
import { generateGeminiResponse } from '../services/aiService.js';

const router = express.Router();

// Get provider statuses
router.get('/providers', (req, res) => {
  res.json({ success: true, data: jobService.getProviderStatuses() });
});

// Get jobs (search)
router.get('/search', async (req, res) => {
  try {
    const { query, location, category, jobType, experience, minSalary, source, page, limit } = req.query;
    
    const pageNum = page ? parseInt(page as string, 10) : 1;
    const limitNum = limit ? parseInt(limit as string, 10) : 20;
    const skip = (pageNum - 1) * limitNum;

    const filter: any = { status: 'ACTIVE' };

    if (query) {
      filter.$or = [
        { title: { $regex: String(query), $options: 'i' } },
        { company: { $regex: String(query), $options: 'i' } },
        { skills: { $regex: String(query), $options: 'i' } }
      ];
    }
    
    if (category && category !== 'All Jobs') filter.category = String(category);
    if (location) filter.city = { $regex: String(location), $options: 'i' };
    if (jobType && jobType !== 'all') filter.employmentType = String(jobType);
    if (experience && experience !== 'all') filter.experienceLevel = String(experience);
    if (minSalary) filter.salaryMin = { $gte: parseInt(minSalary as string, 10) };
    if (source && source !== 'All Sources') filter.source = String(source);

    const jobs = await Job.find(filter)
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();
      
    const total = await Job.countDocuments(filter);

    // Mock a user profile for the AI match (in a real app, use req.user)
    const mockUser = {
      skills: ['Python', 'Django', 'React', 'Git', 'SQL'],
      preferredLocation: 'Bengaluru',
      experienceLevel: 'Fresher'
    } as any;

    const data = jobs.map(job => {
      const matchAnalysis = jobMatchService.calculateMatch(mockUser, job as any);
      return { ...job, matchAnalysis };
    });

    res.json({ success: true, count: data.length, total, data });
  } catch (error) {
    console.error('Job search error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
});

// Get job recommendations / matching for a user
router.get('/recommendations', protect, async (req, res) => {
  try {
    const user = await User.findById((req as any).user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // We can run a search based on user's preferred location or skills
    // For demo purposes, we will run a generic search and then match
    const jobs = await jobService.searchJobs({
       query: (user as any).skills?.join(' ') || 'Developer',
       location: (user as any).preferredLocation || 'India'
    });

    const matchedJobs = jobs.map(job => {
      const matchResult = jobMatchService.calculateMatch(user, job);
      return {
        ...job.toObject(),
        matchAnalysis: matchResult
      };
    });

    // Sort by highest match score
    matchedJobs.sort((a, b) => b.matchAnalysis.score - a.matchAnalysis.score);

    res.json({ success: true, count: matchedJobs.length, data: matchedJobs });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recommendations' });
  }
});

// Save a job
router.post('/saved/:jobId', protect, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { jobId } = req.params;
    const { status, notes } = req.body;

    const savedJob = await SavedJob.findOneAndUpdate(
      { user: userId, jobId },
      { status: status || 'Saved', notes, statusUpdatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: savedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save job' });
  }
});

// Get saved jobs
router.get('/saved', protect, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const savedJobs = await SavedJob.find({ user: userId }).sort({ statusUpdatedAt: -1 });
    res.json({ success: true, data: savedJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch saved jobs' });
  }
});

// Job Alerts
router.post('/alerts', protect, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const alert = await JobAlert.create({ user: userId, ...req.body });
    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create alert' });
  }
});


// Career Transition Mapping
router.post('/transition-map', protect, async (req, res) => {
  try {
    const { targetRole, currentSkills, currentRole } = req.body;
    
    const prompt = `
      You are the "U-Think Career Transition Coach".
      User wants to transition to: ${targetRole}
      Current Role: ${currentRole || 'Student / Fresher'}
      Current Skills: ${currentSkills?.join(', ') || 'None'}

      Generate a step-by-step career transition map.
      Output ONLY a valid JSON object matching this schema:
      {
        "transitionDifficulty": "Low" | "Medium" | "High",
        "estimatedMonths": number,
        "phases": [
          {
            "phaseName": "string",
            "focusArea": "string",
            "milestone": "string"
          }
        ],
        "keyObstacles": ["string"]
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    const parsedData = JSON.parse(geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim());
    
    res.json({ success: true, transitionMap: parsedData });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Skill Gap Analysis Engine
router.post('/skill-gap', protect, async (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;
    
    const prompt = `
      You are the "U-Think Skill Gap Analyzer".
      Target Role: ${targetRole}
      Current Skills: ${currentSkills?.join(', ') || 'None'}

      Identify the exact missing skills required for this role.
      Recommend specific types of courses or certifications to acquire them.
      Output ONLY a valid JSON object matching this schema:
      {
        "matchPercentage": number,
        "missingSkills": [
          {
            "skillName": "string",
            "importance": "Critical" | "High" | "Medium",
            "recommendedAction": "string (e.g. course topic)"
          }
        ],
        "existingTransferableSkills": ["string"]
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    const parsedData = JSON.parse(geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim());
    
    res.json({ success: true, skillGap: parsedData });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

export default router;
