import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Branch from '../models/Branch.js';
import CourseCategory from '../models/CourseCategory.js';
import CourseDetail from '../models/CourseDetail.js';
import College from '../models/College.js';

const router = Router();

// GET /api/pathways
router.get('/', async (req: Request, res: Response) => {
  try {
    const pathways = await Pathway.find({ active: true }).sort({ order: 1 });
    res.json(pathways);
  } catch (error) {
    console.error('Error fetching pathways:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/pathways/:id/streams
router.get('/:id/streams', async (req: Request, res: Response) => {
  try {
    const streams = await Stream.find({ pathwayId: req.params.id, active: true }).sort({ order: 1 });
    res.json(streams);
  } catch (error) {
    console.error('Error fetching streams:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/streams/:id/branches
router.get('/streams/:id/branches', async (req: Request, res: Response) => {
  try {
    const branches = await Branch.find({ streamId: req.params.id, active: true }).sort({ order: 1 });
    res.json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/streams/:id/colleges
router.get('/streams/:id/colleges', async (req: Request, res: Response) => {
  try {
    // Basic mapping heuristic: if stream is science, find colleges with specific educationLevels
    // For a fully comprehensive system, there would be a stream_colleges map.
    // For now, let's just return a placeholder or do a fuzzy search on college categories
    const stream = await Stream.findById(req.params.id);
    if (!stream) return res.status(404).json({ message: 'Stream not found' });
    
    let filter: any = { state: 'Karnataka' };
    
    // Map stream to college education level
    const slug = stream.slug.toLowerCase();
    if (slug.includes('ug') || slug.includes('undergrad')) filter.educationLevels = 'UNDERGRADUATE';
    else if (slug.includes('pg') || slug.includes('postgrad')) filter.educationLevels = 'POSTGRADUATE';
    else if (slug.includes('iti')) filter.educationLevels = 'ITI';
    else if (slug.includes('diploma')) filter.educationLevels = 'DIPLOMA';
    else if (slug.includes('science') || slug.includes('commerce') || slug.includes('arts')) filter.educationLevels = 'PUC';

    const colleges = await College.find(filter).limit(10).populate('districtRef', 'name');
    res.json(colleges);
  } catch (error) {
    console.error('Error fetching stream colleges:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
