import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateForUser, getUserRecommendations, updateRecommendationFeedback } from '../controllers/recommendationController.js';

const router = Router();

router.post('/generate', protect, generateForUser);
router.post('/recalculate', protect, generateForUser); // Recalculate is an alias for generate for now

router.get('/', protect, getUserRecommendations);
// Specific recommendation type routes
router.get('/careers', protect, (req, res, next) => { req.query.type = 'Career'; next(); }, getUserRecommendations);
router.get('/courses', protect, (req, res, next) => { req.query.type = 'Course'; next(); }, getUserRecommendations);
router.get('/colleges', protect, (req, res, next) => { req.query.type = 'College'; next(); }, getUserRecommendations);
router.get('/exams', protect, (req, res, next) => { req.query.type = 'Exam'; next(); }, getUserRecommendations);
router.get('/skills', protect, (req, res, next) => { req.query.type = 'Skill'; next(); }, getUserRecommendations);

// The roadmap is handled by roadmapController, but the user requested this alias:
import { generateRoadmap } from '../controllers/roadmapController.js';
router.get('/roadmap', protect, generateRoadmap);

router.post('/:id/feedback', protect, updateRecommendationFeedback);

export default router;
