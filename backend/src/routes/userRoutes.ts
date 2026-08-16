import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Mongoose model getter or schema definition
const getUserModel = (): mongoose.Model<any> => {
  const existing = mongoose.models.User as mongoose.Model<any> | undefined;
  if (existing) {
    return existing;
  }
  const UserSchema = new mongoose.Schema(
    {
      uid: { type: String, required: true, unique: true, index: true },
      email: { type: String },
      displayName: { type: String },
      photoURL: { type: String },
      bio: { type: String, default: '' },
      streamPreference: { type: String, default: '' },
      lastLogin: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  return mongoose.model('User', UserSchema) as mongoose.Model<any>;
};

// Sync user from Firebase auth to MongoDB
router.post('/sync', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;
    if (!uid) {
      res.status(400).json({ error: 'User UID is required.' });
      return;
    }

    const User = getUserModel();
    const user = await User.findOneAndUpdate(
      { uid },
      {
        uid,
        email,
        displayName,
        photoURL,
        lastLogin: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Get user profile by UID
router.get('/:uid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const User = getUserModel();
    const user = await User.findOne({ uid });
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Update user profile fields
router.patch('/:uid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const { bio, displayName, photoURL, streamPreference } = req.body;
    const User = getUserModel();

    const user = await User.findOneAndUpdate(
      { uid },
      {
        ...(bio !== undefined && { bio }),
        ...(displayName !== undefined && { displayName }),
        ...(photoURL !== undefined && { photoURL }),
        ...(streamPreference !== undefined && { streamPreference }),
      },
      { new: true }
    );

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
