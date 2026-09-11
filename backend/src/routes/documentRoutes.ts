import { Router, Response, NextFunction } from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { StudentDocument } from '../models/StudentDocument.js';
import { DocumentAnalysis } from '../models/DocumentAnalysis.js';
import { User } from '../models/User.js';
import { analyzeDocument } from '../services/geminiService.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for local upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads/documents');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'doc-' + (req as any).user?.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, and PDF files are allowed'));
    }
  }
});

router.use(protect);

// 1. Upload and Analyze Document
router.post('/upload', upload.single('document'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded or invalid file type.' });
      return;
    }

    const storageReference = `/uploads/documents/${req.file.filename}`;

    // Create StudentDocument record
    const studentDoc = await StudentDocument.create({
      studentId: userId,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      storageReference,
      status: 'ANALYZING',
    });

    try {
      // Call Gemini for structured extraction
      const extractedData = await analyzeDocument(req.file.path, req.file.mimetype);

      // Create DocumentAnalysis record
      const analysis = await DocumentAnalysis.create({
        documentId: studentDoc._id,
        analysisStatus: 'PENDING_CONFIRMATION',
        documentType: extractedData.documentType || 'UNKNOWN',
        studentName: extractedData.studentName,
        rollNumber: extractedData.rollNumber,
        institution: extractedData.institution,
        board: extractedData.board,
        academicYear: extractedData.academicYear,
        totalMarks: extractedData.totalMarks,
        maximumMarks: extractedData.maximumMarks,
        percentage: extractedData.percentage,
        resultStatus: extractedData.resultStatus,
        confidence: extractedData.confidence || 1.0,
        subjects: extractedData.subjects || [],
      });

      // Update document status
      studentDoc.status = 'PROCESSED';
      studentDoc.documentType = analysis.documentType;
      await studentDoc.save();

      res.json({ document: studentDoc, analysis });
    } catch (aiError: any) {
      console.error('AI Analysis Error:', aiError);
      studentDoc.status = 'FAILED';
      await studentDoc.save();
      res.status(500).json({ error: 'Failed to analyze document', details: aiError.message });
    }
  } catch (err) {
    next(err);
  }
});

// 2. Get User Documents
router.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const documents = await StudentDocument.find({ studentId: userId }).sort({ createdAt: -1 });
    
    // Fetch associated analysis for each document
    const results = await Promise.all(documents.map(async (doc) => {
      const analysis = await DocumentAnalysis.findOne({ documentId: doc._id });
      return { document: doc, analysis };
    }));

    res.json(results);
  } catch (err) {
    next(err);
  }
});

// 3. Confirm Document Analysis
router.post('/:id/confirm', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const documentId = req.params.id;
    const updatedData = req.body; // Allows student to submit corrected data

    // Verify document belongs to user
    const studentDoc = await StudentDocument.findOne({ _id: documentId, studentId: userId });
    if (!studentDoc) {
      res.status(404).json({ error: 'Document not found or access denied.' });
      return;
    }

    const analysis = await DocumentAnalysis.findOne({ documentId });
    if (!analysis) {
      res.status(404).json({ error: 'Analysis not found for this document.' });
      return;
    }

    if (analysis.analysisStatus === 'CONFIRMED') {
      res.status(400).json({ error: 'This document is already confirmed.' });
      return;
    }

    // Apply student corrections if provided
    if (updatedData) {
      if (updatedData.documentType) analysis.documentType = updatedData.documentType;
      if (updatedData.studentName !== undefined) analysis.studentName = updatedData.studentName;
      if (updatedData.rollNumber !== undefined) analysis.rollNumber = updatedData.rollNumber;
      if (updatedData.institution !== undefined) analysis.institution = updatedData.institution;
      if (updatedData.board !== undefined) analysis.board = updatedData.board;
      if (updatedData.academicYear !== undefined) analysis.academicYear = updatedData.academicYear;
      if (updatedData.totalMarks !== undefined) analysis.totalMarks = updatedData.totalMarks;
      if (updatedData.maximumMarks !== undefined) analysis.maximumMarks = updatedData.maximumMarks;
      
      // Re-calculate percentage deterministically if both total and max are present
      if (analysis.totalMarks != null && analysis.maximumMarks != null && analysis.maximumMarks > 0) {
        analysis.percentage = parseFloat(((analysis.totalMarks / analysis.maximumMarks) * 100).toFixed(2));
      } else if (updatedData.percentage !== undefined) {
        analysis.percentage = updatedData.percentage;
      }

      if (updatedData.resultStatus !== undefined) analysis.resultStatus = updatedData.resultStatus;
      if (updatedData.subjects) analysis.subjects = updatedData.subjects;
    }

    // Mark as confirmed
    analysis.analysisStatus = 'CONFIRMED';
    analysis.confirmedAt = new Date();
    await analysis.save();

    // Update Student Profile
    const user = await User.findById(userId);
    if (user) {
      if (!user.academicProfile) {
        user.academicProfile = { source: 'DOCUMENT_ANALYSIS' };
      }
      
      if (analysis.documentType === 'TENTH_MARKSHEET' && analysis.percentage) {
        user.academicProfile.tenthPercentage = analysis.percentage;
      } else if (analysis.documentType === 'TWELFTH_MARKSHEET' && analysis.percentage) {
        user.academicProfile.twelfthPercentage = analysis.percentage;
      } else if (analysis.documentType === 'DIPLOMA_MARKSHEET' && analysis.percentage) {
        user.academicProfile.diplomaPercentage = analysis.percentage;
      }

      // We overwrite subjects with the latest confirmed document's subjects for now, 
      // or we could append. Overwrite is safer to prevent duplicates from multiple uploads.
      if (analysis.subjects && analysis.subjects.length > 0) {
        user.academicProfile.subjects = analysis.subjects.map((sub: any) => ({
          subjectName: sub.subjectName,
          marksObtained: sub.marksObtained,
          maximumMarks: sub.maximumMarks,
          grade: sub.grade
        }));
      }

      user.academicProfile.lastUpdated = new Date();
      user.academicProfile.source = 'DOCUMENT_ANALYSIS';
      
      await user.save();
    }

    res.json({ message: 'Document analysis confirmed and profile updated successfully.', analysis });
  } catch (err) {
    next(err);
  }
});

export default router;
