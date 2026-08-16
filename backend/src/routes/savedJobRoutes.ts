import express from 'express';
import { saveJob, getSavedJobs, removeSavedJob, updateSavedJob, checkSavedJobs } from '../controllers/savedJobController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/', saveJob);
router.get('/', getSavedJobs);
router.get('/check', checkSavedJobs);
router.put('/:id', updateSavedJob);
router.delete('/:id', removeSavedJob);

export default router;
