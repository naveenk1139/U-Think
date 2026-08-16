import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const router = Router();

const getQuizResultModel = (): mongoose.Model<any> => {
  const existing = mongoose.models.QuizResult as mongoose.Model<any> | undefined;
  if (existing) {
    return existing;
  }
  const QuizResultSchema = new mongoose.Schema(
    {
      userId: { type: String, required: true, index: true },
      answers: [
        {
          question: String,
          category: String,
          choiceText: String,
        },
      ],
      analysisText: { type: String, required: true },
      recommendedStreams: [{ type: String }],
    },
    { timestamps: true }
  );
  return mongoose.model('QuizResult', QuizResultSchema) as mongoose.Model<any>;
};

// Save a quiz result
router.post('/results', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, answers, analysisText, recommendedStreams } = req.body;
    if (!userId || !analysisText) {
      res.status(400).json({ error: 'userId and analysisText are required.' });
      return;
    }

    const QuizResult = getQuizResultModel();
    const result = await QuizResult.create({
      userId,
      answers,
      analysisText,
      recommendedStreams,
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// Fetch all quiz results for a user
router.get('/results', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      res.status(400).json({ error: 'userId query parameter is required.' });
      return;
    }

    const QuizResult = getQuizResultModel();
    const results = await QuizResult.find({ userId }).sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Delete a quiz result by ID
router.delete('/results/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const QuizResult = getQuizResultModel();
    await QuizResult.findByIdAndDelete(id);
    res.json({ message: 'Quiz result deleted successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;
