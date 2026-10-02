import { Router, Request, Response } from 'express';
import Stream from '../models/Stream.js';

const router = Router();

// GET /api/streams
router.get('/', async (req: Request, res: Response) => {
  try {
    const streams = await Stream.find({ active: true }).sort({ order: 1 });
    res.json({ data: streams });
  } catch (error) {
    console.error('Error fetching streams:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/streams/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const stream = await Stream.findById(req.params.id);
    if (!stream) return res.status(404).json({ message: 'Stream not found' });
    res.json({ data: stream });
  } catch (error) {
    console.error('Error fetching stream:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
