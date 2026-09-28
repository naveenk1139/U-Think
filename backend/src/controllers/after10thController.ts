import { Request, Response } from 'express';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import SubjectCombination from '../models/SubjectCombination.js';
import EducationPathRelation from '../models/EducationPathRelation.js';
import Degree from '../models/Degree.js';
import Subject from '../models/Subject.js';

export const getPathways = async (req: Request, res: Response) => {
  try {
    // We assume 10th level has a specific educationLevelId or we just fetch pathways that are active
    // For now, let's fetch all active pathways (12th, Diploma, ITI, etc.)
    const pathways = await Pathway.find({ active: true }).sort({ order: 1 }).lean();
    res.json(pathways);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pathways' });
  }
};

export const getStreams = async (req: Request, res: Response) => {
  try {
    const { pathwayId } = req.params;
    const streams = await Stream.find({ pathwayId, active: true }).sort({ order: 1 }).lean();
    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch streams' });
  }
};

export const getSubjectCombinations = async (req: Request, res: Response) => {
  try {
    const { streamId } = req.params;
    const combinations = await SubjectCombination.find({ streamId, active: true })
      .populate('subjects')
      .sort({ order: 1 })
      .lean();
    res.json(combinations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subject combinations' });
  }
};

export const getEligibleDegrees = async (req: Request, res: Response) => {
  try {
    const { combinationId } = req.params;
    
    // Find relations where source is this combination and target is Degree
    const relations = await EducationPathRelation.find({
      sourceType: 'SubjectCombination',
      sourceId: combinationId,
      targetType: 'Degree',
      relationType: { $in: ['ELIGIBLE_FOR', 'ENABLES'] }
    }).lean();

    const degreeIds = relations.map(r => r.targetId);
    
    const degrees = await Degree.find({ _id: { $in: degreeIds }, active: true }).lean();
    
    // Attach relation rule metadata to degrees
    const degreesWithRules = degrees.map(degree => {
      const relation = relations.find(r => r.targetId.toString() === degree._id.toString());
      return {
        ...degree,
        eligibilityRule: relation ? {
          minScoreRequired: relation.minScoreRequired,
          entranceExamRequired: relation.entranceExamRequired,
          description: relation.description
        } : null
      };
    });

    res.json(degreesWithRules);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch eligible degrees' });
  }
};
