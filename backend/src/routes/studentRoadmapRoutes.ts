import { Router } from 'express';
import { generateRoadmap, getMyRoadmaps } from '../controllers/roadmapController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/generate', protect, generateRoadmap);
router.get('/my-roadmaps', protect, getMyRoadmaps);

export default router;
