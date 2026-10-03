import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateForUser, getUserRecommendations, updateRecommendationFeedback } from '../controllers/recommendationController.js';

const router = Router();

router.post('/generate', protect, generateForUser);
router.get('/', protect, getUserRecommendations);
router.post('/:id/feedback', protect, updateRecommendationFeedback);

export default router;
