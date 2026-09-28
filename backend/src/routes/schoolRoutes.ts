import express from 'express';
import { getBoards, getClasses, getSyllabusList, getSyllabusHierarchy } from '../controllers/schoolController.js';

const router = express.Router();

router.get('/boards', getBoards);
router.get('/classes', getClasses);
router.get('/syllabus', getSyllabusList);
router.get('/syllabus/:syllabusId/hierarchy', getSyllabusHierarchy);

export default router;
