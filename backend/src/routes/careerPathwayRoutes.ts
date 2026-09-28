import { Router } from 'express';
import { getPgDegrees, getSuperSpecializations, getSkills, getCareers, getJobs } from '../controllers/careerPathwayController.js';

const router = Router();

// Phase 6 Routes
router.get('/specializations/:specId/pg-degrees', getPgDegrees);
router.get('/pg-degrees/:pgId/super-specializations', getSuperSpecializations);
router.get('/super-specializations/:id/skills', getSkills);
router.get('/skills/:skillName/careers', getCareers);
router.get('/careers/:careerId/jobs', getJobs);

export default router;
