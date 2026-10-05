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
    
    // Also check if any new assessment results were generated
    const latestAssessment = await import('../models/AssessmentResult.js').then(m => m.default.findOne({ userId: studentId }).sort({ createdAt: -1 }));
    const assessmentLastUpdated = latestAssessment ? ((latestAssessment as any).createdAt || new Date(0)) : new Date(0);
    
    const latestDataUpdate = profileLastUpdated > assessmentLastUpdated ? profileLastUpdated : assessmentLastUpdated;

    if (existingRoadmap && !req.body.forceRefresh) {
      if (existingRoadmap.generatedAt > latestDataUpdate) {
        // Profile hasn't changed since roadmap was generated. Return existing.
        return res.status(200).json(existingRoadmap);
      } else {
        // Profile has changed. Return existing immediately for fast UI, but recalculate in background.
        analyzeProfileAndGenerateRoadmap(studentId)
          .then(() => {
            // In a real app, you would notify the client via WebSockets here (e.g., io.to(studentId).emit('roadmapUpdated'))
            console.log(`Background roadmap update completed for student ${studentId}`);
          })
          .catch(err => {
            console.error('Background roadmap generation failed', err);
          });
        return res.status(200).json(existingRoadmap);
      }
    }

    // No existing roadmap, must block and generate
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

export const updateStepStatus = async (req: Request, res: Response) => {
  try {
    const studentId = (req as any).user?.id || req.body.studentId;
    const { stepId, status, payload } = req.body;
    
    if (!studentId || !stepId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Phase 9: Trigger Adaptive Roadmap Engine
    const { processEventAndReevaluate } = await import('../services/nextBestActionEngine.js');
    
    if (status === 'COMPLETED') {
      await processEventAndReevaluate(studentId, 'STEP_COMPLETED', { stepId });
    } else if (status === 'FAILED') {
      // Dynamic insertion of Remedial Action
      await processEventAndReevaluate(studentId, 'TEST_FAILED', { topic: payload?.topic || 'Recent Assessment' });
    } else {
      // Just update standard status
      const roadmap = await StudentRoadmap.findOne({ studentId, isActive: true });
      if (roadmap) {
        const step = roadmap.steps.find((s: IRoadmapStep) => s.stepId === stepId);
        if (step) {
          step.status = status;
          roadmap.lastUpdated = new Date();
          await roadmap.save();
        }
      }
    }

    res.status(200).json({ success: true, message: 'Step updated successfully' });
  } catch (error) {
    console.error('Error updating step status:', error);
    res.status(500).json({ error: 'Failed to update step status' });
  }
};
