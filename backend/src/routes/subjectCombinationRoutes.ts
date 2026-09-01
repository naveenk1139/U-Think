import { Router, Request, Response } from 'express';
import SubjectCombination from '../models/SubjectCombination.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const combinations = await SubjectCombination.find({ active: true })
      .populate('subjects')
      .sort({ order: 1 })
      .lean();
    res.json(combinations);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching subject combinations' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const combo = await SubjectCombination.findOne({ slug: req.params.slug, active: true })
      .populate('subjects')
      .lean();
    if (!combo) return res.status(404).json({ error: 'Subject combination not found' });
    res.json(combo);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching subject combination' });
  }
});

export default router;
