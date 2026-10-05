import { Router, Response, NextFunction } from 'express';
import AssessmentQuestion from '../models/AssessmentQuestion';
import AssessmentAttempt from '../models/AssessmentAttempt';
import CareerProfile from '../models/CareerProfile';
import AssessmentResult from '../models/AssessmentResult';
import { protect, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
router.use(protect);

const toPlainRecord = (value: any): Record<string, number> => {
  if (!value) return {};
  if (value instanceof Map) return Object.fromEntries(value.entries());
  if (typeof value.toObject === 'function') return value.toObject();
  return value;
};

// Start a new assessment
router.post('/start', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { educationLevel } = req.body;
    if (!userId || !educationLevel) {
      res.status(400).json({ error: 'educationLevel is required.' });
      return;
    }

    const attempt = await AssessmentAttempt.create({
      userId,
      educationLevel,
      status: 'IN_PROGRESS',
      answers: [],
      currentScores: {}
    });

    // Fetch the first question
    const firstQuestion = await AssessmentQuestion.findOne({
      targetEducationLevels: educationLevel
    }).sort({ _id: 1 }).lean();

    if (!firstQuestion) {
      res.status(404).json({ error: 'No assessment questions found for this education level.' });
      return;
    }

    res.status(201).json({ attemptId: attempt._id, nextQuestion: firstQuestion });
  } catch (err) {
    next(err);
  }
});

// Submit an answer
router.post('/answer', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { attemptId, questionId, choiceText } = req.body;
    if (!attemptId || !questionId || !choiceText) {
      res.status(400).json({ error: 'attemptId, questionId, and choiceText are required.' });
      return;
    }

    const attempt = await AssessmentAttempt.findById(attemptId);
    if (!attempt) {
      res.status(404).json({ error: 'Attempt not found.' });
      return;
    }
    if (!userId || attempt.userId !== userId) {
      res.status(403).json({ error: 'Forbidden.' });
      return;
    }

    const question = await AssessmentQuestion.findById(questionId);
    if (!question) {
      res.status(404).json({ error: 'Question not found.' });
      return;
    }

    const selectedOption = question.options.find(o => o.text === choiceText);
    if (!selectedOption) {
      res.status(400).json({ error: 'Invalid choice.' });
      return;
    }

    // Accumulate scores
    const currentScoresMap = attempt.currentScores as any;
    const weightsRecord = toPlainRecord(selectedOption.dimensionWeights);

    Object.entries(weightsRecord).forEach(([key, val]) => {
      const existing = typeof currentScoresMap.get === 'function'
        ? Number(currentScoresMap.get(key) || 0)
        : Number(currentScoresMap[key] || 0);
      const nextVal = existing + Number(val || 0);
      if (typeof currentScoresMap.set === 'function') {
        currentScoresMap.set(key, nextVal);
      } else {
        currentScoresMap[key] = nextVal;
      }
    });

    // Add answer
    attempt.answers.push({
      questionId: question._id as any as string,
      questionText: question.questionText,
      choiceText,
      dimensionWeights: weightsRecord
    });

    // Simple Adaptive Logic: If they have answered less than 5 questions, give another one
    // In a real AI adaptive engine, we'd pick a question that tests their highest variance dimension
    if (attempt.answers.length < 5) {
      const answeredIds = attempt.answers.map(a => a.questionId);
      
      const nextQuestion = await AssessmentQuestion.findOne({
        _id: { $nin: answeredIds },
        targetEducationLevels: attempt.educationLevel
      }).sort({ _id: 1 }).lean();

      if (nextQuestion) {
        await attempt.save();
        res.json({ isComplete: false, nextQuestion });
        return;
      }
    }

    // Finish assessment
    attempt.status = 'COMPLETED';
    await attempt.save();

    // Calculate Results
    const currentScores = toPlainRecord(attempt.currentScores);
    const profiles = await CareerProfile.find({
      targetEducationLevels: attempt.educationLevel
    });

    // Calculate match scores using cosine similarity or weighted average
    const topMatches = profiles.map(profile => {
      const reqDims = toPlainRecord(profile.requiredDimensions);
      let matchScore = 0;
      let totalReq = 0;
      let rationaleArr: string[] = [];

      Object.entries(reqDims).forEach(([dim, reqScore]) => {
        const userScore = currentScores[dim] || 0;
        // Simple normalization for demo: 
        // User score max is around 50 (5 qs * 10 max per dim). Convert to percentage.
        const userPct = Math.min((userScore / 25) * 100, 100); 
        
        const diff = Math.abs((reqScore as number) - userPct);
        const dimMatch = Math.max(100 - diff, 0);
        
        matchScore += dimMatch;
        totalReq++;

        if (userPct >= (reqScore as number) - 10) {
          rationaleArr.push(`✓ Strong match in ${dim} (${Math.round(userPct)}%)`);
        } else if (userPct < (reqScore as number) - 20) {
          rationaleArr.push(`⚠ Consider improving ${dim} (req: ${reqScore}%)`);
        }
      });

      matchScore = totalReq > 0 ? Math.round(matchScore / totalReq) : 0;

      return {
        careerId: profile._id as any as string,
        careerName: profile.careerName,
        matchScore,
        matchRationale: rationaleArr.join('. ') || 'Good baseline fit based on your preferences.'
      };
    });

    topMatches.sort((a, b) => b.matchScore - a.matchScore);
    const bestMatches = topMatches.slice(0, 3);

    // Save final result
    const result = await AssessmentResult.create({
      userId: attempt.userId,
      attemptId: attempt._id,
      educationLevel: attempt.educationLevel,
      finalScores: currentScores,
      topMatches: bestMatches,
      recommendedStreams: [],
      recommendedCourses: [],
      aiAnalysisText: `Based on your responses, you show strong potential in ${Object.keys(currentScores).slice(0, 2).join(' and ')}. We recommend exploring ${bestMatches[0].careerName}.`,
      strengths: Object.keys(currentScores).slice(0, 3),
      areasToImprove: []
    });

    res.json({ isComplete: true, resultId: result._id });
  } catch (err) {
    next(err);
  }
});

// Fetch result
router.get('/result/:resultId', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const result = await AssessmentResult.findById(req.params.resultId).populate('topMatches.careerId');
    if (!result) {
      res.status(404).json({ error: 'Result not found.' });
      return;
    }
    if (!userId || result.userId !== userId) {
      res.status(403).json({ error: 'Forbidden.' });
      return;
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Get user history
router.get('/history/:userId', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId || req.params.userId !== userId) {
      res.status(403).json({ error: 'Forbidden.' });
      return;
    }

    const results = await AssessmentResult.find({ userId })
      .sort({ createdAt: -1 })
      .populate('topMatches.careerId');
    res.json(results);
  } catch (err) {
    next(err);
  }
});

export default router;
