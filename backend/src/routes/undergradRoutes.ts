import { Router } from 'express';
import { getDegreeBranches, getBranchSpecializations, getCollegesForBranch, getExamsForDegree } from '../controllers/undergradController.js';

const router = Router();

// Phase 5 Undergrad Explorer Routes
router.get('/degrees/:degreeId/exams', getExamsForDegree);
router.get('/degrees/:degreeId/branches', getDegreeBranches);
router.get('/branches/:branchId/specializations', getBranchSpecializations);
router.get('/branches/:branchId/colleges', getCollegesForBranch);

export default router;
