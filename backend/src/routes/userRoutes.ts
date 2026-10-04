import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { protect, AuthRequest } from '../middleware/authMiddleware.js';

const router = Router();

// Get user profile (authenticated identity)
router.get('/:id', protect, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    if (userId !== req.user?.id && req.user?.role !== 'admin') {
       res.status(403).json({ error: 'Forbidden' });
       return;
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Update user profile fields (authenticated identity)
router.patch('/:id', protect, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    if (userId !== req.user?.id && req.user?.role !== 'admin') {
       res.status(403).json({ error: 'Forbidden' });
       return;
    }

    const updates = req.body;
    // Don't allow password or role updates through this generic route
    delete updates.password;
    delete updates.role;
    delete updates._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

export default router;
