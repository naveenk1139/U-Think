import { Router } from 'express';
import { generateRoadmap, getMyRoadmaps } from '../controllers/roadmapController.js';

const router = Router();

router.post('/generate', generateRoadmap);
router.get('/my-roadmaps', getMyRoadmaps);

export default router;
