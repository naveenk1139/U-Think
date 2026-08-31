import { Router } from 'express';
import { getBranchBySlug } from '../controllers/branchController.js';

const router = Router();

// Public route to fetch branch by slug
router.get('/:slug', getBranchBySlug);

export default router;
