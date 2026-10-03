import { Router, Request, Response } from 'express';
import Stream from '../models/Stream.js';
import Course from '../models/Course.js';

const router = Router();

// GET /api/streams
router.get('/', async (req: Request, res: Response) => {
  try {
    const filter: any = { active: true };
    if (req.query.pathwayId) {
      filter.pathwayId = req.query.pathwayId;
    }
    const streams = await Stream.find(filter).lean().sort({ order: 1 });
    
    // Dynamically calculate counts for streams
    const streamsWithCounts = await Promise.all(streams.map(async (s) => {
      const count = await Course.countDocuments({ streamId: s._id, parentId: { $exists: false }, active: true });
      return { ...s, optionCount: count };
    }));
    
    res.json({ data: streamsWithCounts });
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
