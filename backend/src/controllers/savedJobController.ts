import { Request, Response } from 'express';
import SavedJob from '../models/SavedJob';

// Save a job
export const saveJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId; // Assumes authMiddleware sets req.user
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { jobId, source, sourceJobId } = req.body;
    if (!jobId || !source || !sourceJobId) {
      return res.status(400).json({ success: false, message: 'jobId, source, and sourceJobId are required' });
    }

    // Check if already saved
    const existing = await SavedJob.findOne({ user: userId, jobId });
    if (existing) {
      return res.status(200).json({ success: true, message: 'Job already saved', data: existing });
    }

    const newSavedJob = new SavedJob({
      ...req.body,
      user: userId
    });

    await newSavedJob.save();
    return res.status(201).json({ success: true, message: 'Job saved successfully', data: newSavedJob });
  } catch (error: any) {
    console.error('Error saving job:', error);
    if (error.code === 11000) {
      return res.status(200).json({ success: true, message: 'Job already saved' });
    }
    return res.status(500).json({ success: false, message: 'Failed to save job' });
  }
};

// Get all saved jobs for current user
export const getSavedJobs = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const savedJobs = await SavedJob.find({ user: userId }).sort({ savedAt: -1 });
    return res.status(200).json({ success: true, data: savedJobs });
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch saved jobs' });
  }
};

// Remove a saved job
export const removeSavedJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { id } = req.params; // This can be the internal _id or the jobId
    
    // Try to delete by _id or jobId, but strictly scoped to the user
    const deleted = await SavedJob.findOneAndDelete({
      user: userId,
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { jobId: id }]
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Saved job not found' });
    }

    return res.status(200).json({ success: true, message: 'Job removed from saved' });
  } catch (error) {
    console.error('Error removing saved job:', error);
    return res.status(500).json({ success: false, message: 'Failed to remove saved job' });
  }
};

// Update status, notes, or reminders
export const updateSavedJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { id } = req.params;
    const updates = req.body;

    const updated = await SavedJob.findOneAndUpdate(
      { user: userId, _id: id },
      { $set: updates },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Saved job not found' });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating saved job:', error);
    return res.status(500).json({ success: false, message: 'Failed to update saved job' });
  }
};

// Check if specific jobs are saved
export const checkSavedJobs = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Get all jobIds this user has saved
    const savedJobs = await SavedJob.find({ user: userId }, 'jobId');
    const savedJobIds = savedJobs.map(job => job.jobId);

    return res.status(200).json({ success: true, data: savedJobIds });
  } catch (error) {
    console.error('Error checking saved jobs:', error);
    return res.status(500).json({ success: false, message: 'Failed to check saved jobs' });
  }
};
