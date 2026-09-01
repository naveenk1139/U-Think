import { Router, Request, Response } from 'express';
import Stream from '../models/Stream.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const streams = await Stream.find({ active: true }).sort({ order: 1 }).lean();
    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching streams' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const stream = await Stream.findOne({ slug: req.params.slug, active: true }).lean();
    if (!stream) return res.status(404).json({ error: 'Stream not found' });
    res.json(stream);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching stream' });
  }
});

export default router;
