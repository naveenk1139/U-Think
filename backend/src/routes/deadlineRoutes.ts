import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getUpcomingDeadlines, 
  createDeadline, 
  subscribeToDeadline, 
  getMyReminders 
} from '../controllers/deadlineController.js';

const router = express.Router();

// Public / User routes
router.get('/', getUpcomingDeadlines);
router.post('/:id/subscribe', protect, subscribeToDeadline);
router.get('/my-reminders', protect, getMyReminders);

// Admin routes
router.post('/', protect, createDeadline);

export default router;
