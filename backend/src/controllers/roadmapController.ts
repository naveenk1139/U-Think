import { Request, Response } from 'express';
import StudentRoadmap, { IRoadmapStep } from '../models/StudentRoadmap.js';
import Career from '../models/Career.js';
import { analyzeProfileAndGenerateRoadmap } from '../services/roadmapService.js';

export const generateRoadmap = async (req: Request, res: Response) => {
  try {
    const studentId = req.body.studentId || (req as any).user?._id?.toString() || req.query.studentId;
    if (!studentId) {
      return res.status(401).json({ error: 'Unauthorized: Student ID is required' });
    }

    const student = await import('../models/User.js').then(m => m.User.findById(studentId));
    if (!student) return res.status(404).json({ error: 'Student not found' });
    
    // Check if a valid active roadmap exists that is newer than the student's profile updates
    const existingRoadmap = await StudentRoadmap.findOne({ studentId, isActive: true });
    
    const profileLastUpdated = student.updatedAt || new Date(0);
    if (existingRoadmap && existingRoadmap.generatedAt > profileLastUpdated) {
        // Profile hasn't changed since roadmap was generated. Return existing.
        return res.status(200).json(existingRoadmap);
    }

    const newRoadmap = await analyzeProfileAndGenerateRoadmap(studentId);
    res.status(201).json(newRoadmap);

  } catch (error: any) {
    console.error('Error generating roadmap:', error);
    if (error.message === 'INCOMPLETE_PROFILE') {
      res.status(400).json({ error: 'INCOMPLETE_PROFILE', message: 'Your profile is incomplete. Please complete your profile to generate a personalized roadmap.' });
    } else {
      res.status(500).json({ error: 'Failed to generate personalized roadmap' });
    }
  }
};

export const getMyRoadmaps = async (req: Request, res: Response) => {
  try {
    const studentId = (req as any).user?._id?.toString() || req.query.studentId || 'student_test_123';
    const roadmaps = await StudentRoadmap.find({ studentId, isActive: true }).sort({ lastUpdated: -1 });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roadmaps' });
  }
};
