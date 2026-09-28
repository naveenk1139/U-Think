import { Router } from 'express';
import { getPathways, getStreams, getSubjectCombinations, getEligibleDegrees } from '../controllers/after10thController.js';

const router = Router();

// Phase 4 Post-10th Explorer Routes
router.get('/pathways', getPathways);
router.get('/pathways/:pathwayId/streams', getStreams);
router.get('/streams/:streamId/combinations', getSubjectCombinations);
router.get('/combinations/:combinationId/degrees', getEligibleDegrees);

// Keep legacy tree for backwards compatibility if needed, but return empty or refactored
router.get('/tree', async (req, res) => {
  res.json([]);
});
router.get('/search', async (req, res) => {
  res.json([]);
});
router.get('/:slug', async (req, res) => {
  res.json({});
});

export default router;
