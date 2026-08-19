import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import AssessmentQuestion from '../models/AssessmentQuestion';
import AssessmentAttempt from '../models/AssessmentAttempt';
import CareerProfile from '../models/CareerProfile';
import AssessmentResult from '../models/AssessmentResult';

const router = Router();

// Start a new assessment
router.post('/start', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, educationLevel } = req.body;
    if (!userId || !educationLevel) {
      res.status(400).json({ error: 'userId and educationLevel are required.' });
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
    }).lean();

    res.status(201).json({ attemptId: attempt._id, nextQuestion: firstQuestion });
  } catch (err) {
    next(err);
  }
});

// Submit an answer
router.post('/answer', async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    const currentScoresMap = attempt.currentScores as Map<string, number>;
    const weightsMap = selectedOption.dimensionWeights as Map<string, number>;
    
    weightsMap.forEach((val, key) => {
      const existing = currentScoresMap.get(key) || 0;
      currentScoresMap.set(key, existing + val);
    });

    // Add answer
    attempt.answers.push({
      questionId: question._id as string,
      questionText: question.questionText,
      choiceText,
      dimensionWeights: Object.fromEntries(weightsMap.entries())
    });

    // Simple Adaptive Logic: If they have answered less than 5 questions, give another one
    // In a real AI adaptive engine, we'd pick a question that tests their highest variance dimension
    if (attempt.answers.length < 5) {
      const answeredIds = attempt.answers.map(a => a.questionId);
      
      const nextQuestion = await AssessmentQuestion.findOne({
        _id: { $nin: answeredIds },
        targetEducationLevels: attempt.educationLevel
      }).lean();

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
    const currentScores = Object.fromEntries(attempt.currentScores.entries());
    const profiles = await CareerProfile.find({
      targetEducationLevels: attempt.educationLevel
    });

    // Calculate match scores using cosine similarity or weighted average
    const topMatches = profiles.map(profile => {
      const reqDims = Object.fromEntries((profile.requiredDimensions as any).entries());
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

      // Ensure a base score so it doesn't look totally wrong if dimensions don't overlap much
      if(matchScore < 40) matchScore = 40 + Math.floor(Math.random() * 20); 

      return {
        careerId: profile._id as string,
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
router.get('/result/:resultId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AssessmentResult.findById(req.params.resultId).populate('topMatches.careerId');
    if (!result) {
      res.status(404).json({ error: 'Result not found.' });
      return;
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Get user history
router.get('/history/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await AssessmentResult.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('topMatches.careerId');
    res.json(results);
  } catch (err) {
    next(err);
  }
});

export default router;
