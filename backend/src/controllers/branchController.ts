import { Request, Response, NextFunction } from 'express';
import Branch from '../models/Branch.js';

export const getBranchBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const branch = await Branch.findOne({ slug, active: true })
      .populate('courseId')
      .populate('relatedCareers')
      .populate('relatedExams')
      .populate('higherStudies')
      .populate('furtherStudies')
      .lean();

    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.json(branch);
  } catch (error) {
    next(error);
  }
};
