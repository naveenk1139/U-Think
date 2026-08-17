import express from 'express';
import { jobService } from '../services/JobService';
import { jobMatchService } from '../services/JobMatchService';
import { protect } from '../middleware/authMiddleware';
import SavedJob from '../models/SavedJob';
import JobAlert from '../models/JobAlert';
import User from '../models/User';

const router = express.Router();

// Get provider statuses
router.get('/providers', (req, res) => {
  res.json({ success: true, data: jobService.getProviderStatuses() });
});

// Get jobs (search)
router.get('/search', async (req, res) => {
  try {
    const { query, location, jobType, experience, minSalary, page, limit } = req.query;
    
    const pageNum = page ? parseInt(page as string, 10) : 1;
    const limitNum = limit ? parseInt(limit as string, 10) : 20;

    const jobs = await jobService.searchJobs({
      query: query as string,
      location: location as string,
      jobType: jobType as string,
      experience: experience as string,
      minSalary: minSalary ? parseInt(minSalary as string, 10) : undefined,
      page: pageNum,
      limit: limitNum
    });
    
    // For now we just return a fake high total to enable UI pagination if we hit the limit
    const total = jobs.length >= limitNum ? pageNum * limitNum + limitNum : (pageNum - 1) * limitNum + jobs.length;

    res.json({ success: true, count: jobs.length, total, data: jobs });
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

export default router;
