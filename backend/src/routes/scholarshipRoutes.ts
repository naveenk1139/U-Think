import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Scholarship from '../models/Scholarship.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import { generateGeminiResponse } from '../services/aiService.js';

const router = Router();

// GET /api/scholarships/match
// Matches scholarships to the user's profile and returns EXACT EXPLANATIONS
router.get('/match', protect, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all active scholarships
    const scholarships = await Scholarship.find({ active: true }).limit(50);
    
    if (scholarships.length === 0) {
      return res.json({ matches: [] });
    }

    // Prepare user profile context
    const userProfileText = `
      Student Profile Data:
      Education Level: ${user.educationLevel || 'Not specified'}
      Class/Year: ${user.classOrYear || 'Not specified'}
      Stream: ${user.stream || 'Not specified'}
      10th %: ${user.academicProfile?.tenthPercentage || 'Not specified'}
      12th/PUC %: ${user.academicProfile?.twelfthPercentage || 'Not specified'}
      Category: ${user.personalDetails?.category || 'Not specified'}
      Gender: ${user.personalDetails?.gender || 'Not specified'}
      Annual Income: ${user.personalDetails?.annualIncome || 'Not specified'}
    `;

    // Prompt for Gemini
    const prompt = `
      You are the "Scholarship Exact Match Engine" for U-Think.
      You have the following student profile:
      ${userProfileText}

      You also have the following scholarships available:
      ${JSON.stringify(scholarships.map(s => ({ id: s._id, name: s.name, eligibility: s.eligibilityCriteria, amount: s.amount, reqDocs: s.requiredDocuments, source: s.sourceName, verifiedAt: s.lastVerifiedAt })), null, 2)}

      Evaluate which scholarships the student is eligible for. DO NOT INVENT ELIGIBILITY.
      If a scholarship's requirements match the student's profile, they are a match.
      If data is missing (e.g. income is required but student hasn't specified), mark as 'INFORMATION_REQUIRED'.

      Return ONLY a JSON object with this schema:
      {
        "matches": [
          {
            "scholarshipId": "string (the _id of the matched scholarship)",
            "name": "string",
            "amount": "string",
            "status": "ELIGIBLE" | "NOT_ELIGIBLE" | "INFORMATION_REQUIRED",
            "exactMatchExplanation": [
              {
                "requirement": "string",
                "satisfied": true | false,
                "reason": "string"
              }
            ],
            "missingDocuments": ["string"],
            "sourceName": "string",
            "lastVerifiedAt": "string"
          }
        ]
      }
    `;

    const geminiResponse = await generateGeminiResponse(prompt);
    
    let parsedData;
    try {
      const cleanResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse Scholarship Match response:", geminiResponse);
      return res.status(500).json({ error: 'Failed to analyze scholarships. AI returned invalid format.' });
    }

    // Attach original scholarship objects for frontend rendering convenience
    const enrichedMatches = parsedData.matches.map((match: any) => {
      const original = scholarships.find(s => s._id.toString() === match.scholarshipId);
      return {
        ...match,
        originalScholarship: original
      };
    });

    res.json({ success: true, matches: enrichedMatches });
  } catch (error) {
    console.error('Scholarship Match Error:', error);
    next(error);
  }
});

// GET /api/scholarships/applications
// Get all scholarship applications for the user
router.get('/applications', protect, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const applications = await Application.find({ user: userId, applicationType: 'SCHOLARSHIP' }).populate('scholarshipId');
    res.json({ success: true, applications });
  } catch (error) {
    next(error);
  }
});

// POST /api/scholarships/applications
// Create or update a scholarship application
router.post('/applications', protect, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const { scholarshipId, status, notes, missingDocuments } = req.body;
    
    if (!scholarshipId) {
      return res.status(400).json({ error: 'Scholarship ID is required' });
    }

    let application = await Application.findOne({ user: userId, scholarshipId, applicationType: 'SCHOLARSHIP' });
    
    if (application) {
      application.status = status || application.status;
      application.notes = notes || application.notes;
      application.missingDocuments = missingDocuments || application.missingDocuments;
      if (status === 'Applied' || status === 'Under Review' || status === 'Approved') {
          application.submissionDate = new Date();
      }
      await application.save();
    } else {
      application = new Application({
        user: userId,
        applicationType: 'SCHOLARSHIP',
        scholarshipId,
        status: status || 'Draft',
        notes,
        missingDocuments
      });
      await application.save();
    }

    res.json({ success: true, application });
  } catch (error) {
    next(error);
  }
});

// POST /api/scholarships/calculate-cost
// Cost calculator
router.post('/calculate-cost', protect, async (req, res, next) => {
  try {
    const { tuition, hostel, transport, books, exams, scholarshipAmount, otherFunding } = req.body;
    
    const totalCost = (Number(tuition) || 0) + (Number(hostel) || 0) + (Number(transport) || 0) + (Number(books) || 0) + (Number(exams) || 0);
    const totalFunding = (Number(scholarshipAmount) || 0) + (Number(otherFunding) || 0);
    const remainingCost = Math.max(0, totalCost - totalFunding);

    res.json({
      success: true,
      calculation: {
        totalCost,
        totalFunding,
        remainingCost,
        breakdown: { tuition, hostel, transport, books, exams, scholarshipAmount, otherFunding }
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
