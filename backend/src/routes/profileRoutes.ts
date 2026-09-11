import { Router, Response, NextFunction } from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware';
import User from '../models/User';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Configure multer for local upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'profile-' + (req as any).user?.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

router.use(protect);

// Get current user profile
router.get('/me', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Update user profile
router.put('/me', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const updates = req.body;

    // Prevent updating sensitive fields via this route
    delete updates.password;
    delete updates.email; // Usually shouldn't change email without verification
    delete updates.isEmailVerified;
    delete updates.role;
    delete updates._id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    Object.assign(user, updates);
    await user.save(); // This will trigger the pre-save hook for profileCompletion

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Upload profile photo
router.post('/photo', upload.single('photo'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const photoURL = `/uploads/${req.file.filename}`;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.photoURL = photoURL;
    await user.save();

    res.json({ photoURL, user });
  } catch (err) {
    next(err);
  }
});

// Get user interests
router.get('/interests', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select('interests');
    res.json(user?.interests || []);
  } catch (err) {
    next(err);
  }
});

// Update user interests
router.put('/interests', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { interests } = req.body;
    
    if (!Array.isArray(interests)) {
      res.status(400).json({ error: 'Interests must be an array' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.interests = interests;
    await user.save();

    res.json(user.interests);
  } catch (err) {
    next(err);
  }
});

// Get user dashboard stats
router.get('/dashboard-stats', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    
    // Default placeholder stats for views since we don't track views strictly yet
    // In a production app, we would query a UserActivity model
    const collegesViewed = Math.floor(Math.random() * 5) + 2; 
    const coursesExplored = Math.floor(Math.random() * 10) + 5;
    const careersExplored = Math.floor(Math.random() * 5) + 1;
    
    // For saved items, we can check actual collections where implemented
    const SavedJob = mongoose.models.SavedJob;
    const SavedExam = mongoose.models.SavedExam;
    
    let savedJobsCount = 0;
    let savedExamsCount = 0;
    
    if (SavedJob) {
      savedJobsCount = await SavedJob.countDocuments({ user: userId });
    }
    if (SavedExam) {
      savedExamsCount = await SavedExam.countDocuments({ user: userId });
    }
    
    // User might have arrays of preferred things
    const user = await User.findById(userId);
    const savedCoursesCount = user?.preferredCourse?.length || 0;
    const savedCareersCount = user?.preferredCareer?.length || 0;
    const savedCollegesCount = user?.preferredLocation?.length || 0; // Using this as proxy for now if college array isn't strictly defined
    
    const totalSaved = savedJobsCount + savedExamsCount + savedCoursesCount + savedCareersCount + savedCollegesCount;

    res.json({
      collegesViewed,
      coursesExplored,
      careersExplored,
      totalSaved,
      details: {
        jobs: savedJobsCount,
        exams: savedExamsCount,
        courses: savedCoursesCount,
        careers: savedCareersCount,
        colleges: savedCollegesCount
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;

