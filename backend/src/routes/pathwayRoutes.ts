import { Router, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { protect, AuthRequest } from '../middleware/authMiddleware';

const router = Router();

const getSavedPathwayModel = (): mongoose.Model<any> => {
  const existing = mongoose.models.SavedPathway as mongoose.Model<any> | undefined;
  if (existing) {
    return existing;
  }
  const SavedPathwaySchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      specId: { type: String, required: true },
      specName: { type: String, required: true },
      notes: { type: String, default: '' },
    },
    { timestamps: true }
  );
  return mongoose.model('SavedPathway', SavedPathwaySchema) as mongoose.Model<any>;
};

router.use(protect);

// Save a pathway
router.post('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { specId, specName, notes } = req.body;
    if (!specId || !specName) {
      res.status(400).json({ error: 'specId and specName are required.' });
      return;
    }

    const SavedPathway = getSavedPathwayModel();
    const pathway = await SavedPathway.create({ userId, specId, specName, notes });
    res.status(201).json(pathway);
  } catch (err) {
    next(err);
  }
});

// Fetch saved pathways for a user
router.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const SavedPathway = getSavedPathwayModel();
    const pathways = await SavedPathway.find({ userId }).sort({ createdAt: -1 });
    res.json(pathways);
  } catch (err) {
    next(err);
  }
});

// Delete a saved pathway
router.delete('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const SavedPathway = getSavedPathwayModel();
    const deleted = await SavedPathway.findOneAndDelete({ _id: id, userId });
    
    if (!deleted) {
      res.status(404).json({ error: 'Saved pathway not found or unauthorized.' });
      return;
    }
    
    res.json({ message: 'Saved pathway deleted successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;
