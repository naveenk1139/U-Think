import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateForUser, getUserRecommendations } from '../controllers/recommendationController.js';

const router = Router();

router.post('/generate', protect, generateForUser);
router.get('/', protect, getUserRecommendations);

export default router;