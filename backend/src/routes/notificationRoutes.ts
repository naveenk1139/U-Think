import { Router, Response, NextFunction } from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware';
import Notification from '../models/Notification';

const router = Router();

router.use(protect);

// Get all notifications for user
router.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
});

// Mark a specific notification as read
router.patch('/:id/read', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      res.status(404).json({ error: 'Notification not found or unauthorized' });
      return;
    }

    res.json(notification);
  } catch (err) {
    next(err);
  }
});

// Mark all notifications as read for user
router.patch('/read-all', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    await Notification.updateMany({ userId, isRead: false }, { isRead: true });

    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    next(err);
  }
});

export default router;
