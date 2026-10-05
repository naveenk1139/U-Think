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
    
    // Single aggregation query to replace N+1 countDocuments
    const streamIds = streams.map(s => s._id);
    const childCounts = await Course.aggregate([
      { $match: { streamId: { $in: streamIds }, parentId: { $exists: false }, active: true } },
      { $group: { _id: "$streamId", count: { $sum: 1 } } }
    ]);
    const countMap = new Map();
    childCounts.forEach(c => countMap.set(c._id.toString(), c.count));

    const streamsWithCounts = streams.map(s => ({
      ...s,
      optionCount: countMap.get(s._id.toString()) || 0
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
