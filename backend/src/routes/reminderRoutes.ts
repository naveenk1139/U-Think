import { Router, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { protect, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

const getReminderModel = (): mongoose.Model<any> => {
  const existing = mongoose.models.Reminder as mongoose.Model<any> | undefined;
  if (existing) {
    return existing;
  }
  const ReminderSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      title: { type: String, required: true },
      date: { type: String, required: true },
      type: {
        type: String,
        enum: ['exam', 'application', 'result', 'general'],
        default: 'general',
      },
      isDone: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  return mongoose.model('Reminder', ReminderSchema) as mongoose.Model<any>;
};

router.use(protect);

// Create a reminder
router.post('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { title, date, type, priority, description, isDone } = req.body;
    
    if (!title || !date) {
      res.status(400).json({ error: 'title and date are required.' });
      return;
    }

    const Reminder = getReminderModel();
    const reminder = await Reminder.create({
      userId,
      title,
      date,
      type: type || 'general',
      priority: priority || 'medium',
      description: description || '',
      isDone: isDone || false,
    });

    res.status(201).json(reminder);
  } catch (err) {
    next(err);
  }
});

// Get reminders for a user
router.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const Reminder = getReminderModel();
    const reminders = await Reminder.find({ userId }).sort({ date: 1 });
    res.json(reminders);
  } catch (err) {
    next(err);
  }
});

// Update a reminder (e.g. toggle completion)
router.patch('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { isDone, title, date, type, priority, description } = req.body;
    const Reminder = getReminderModel();

    const updated = await Reminder.findOneAndUpdate(
      { _id: id, userId },
      {
        ...(isDone !== undefined && { isDone }),
        ...(title && { title }),
        ...(date && { date }),
        ...(type && { type }),
        ...(priority && { priority }),
        ...(description !== undefined && { description }),
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: 'Reminder not found.' });
      return;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete a reminder
router.delete('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const Reminder = getReminderModel();
    const deleted = await Reminder.findOneAndDelete({ _id: id, userId });
    
    if (!deleted) {
      res.status(404).json({ error: 'Reminder not found or unauthorized.' });
      return;
    }
    
    res.json({ message: 'Reminder deleted successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;
