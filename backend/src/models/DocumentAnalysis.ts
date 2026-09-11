import mongoose, { Document, Schema } from 'mongoose';

export interface IExtractedSubjectMark {
  subjectName: string;
  marksObtained: number | null;
  maximumMarks: number | null;
  grade: string | null;
  confidence: number;
}

export interface IDocumentAnalysis extends Document {
  documentId: mongoose.Types.ObjectId;
  analysisStatus: 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'REJECTED' | 'FAILED';
  documentType: string;
  studentName: string | null;
  rollNumber: string | null;
  institution: string | null;
  board: string | null;
  academicYear: string | null;
  subjects: IExtractedSubjectMark[];
  totalMarks: number | null;
  maximumMarks: number | null;
  percentage: number | null;
  resultStatus: string | null;
  confidence: number;
  aiModel: string;
  createdAt: Date;
  reviewedAt: Date | null;
  confirmedAt: Date | null;
}

const ExtractedSubjectMarkSchema = new Schema<IExtractedSubjectMark>({
  subjectName: { type: String, required: true },
  marksObtained: { type: Number, default: null },
  maximumMarks: { type: Number, default: null },
  grade: { type: String, default: null },
  confidence: { type: Number, default: 1.0 },
});

const DocumentAnalysisSchema = new Schema<IDocumentAnalysis>(
  {
    documentId: {
      type: Schema.Types.ObjectId,
      ref: 'StudentDocument',
      required: true,
    },
    analysisStatus: {
      type: String,
      enum: ['PENDING_CONFIRMATION', 'CONFIRMED', 'REJECTED', 'FAILED'],
      default: 'PENDING_CONFIRMATION',
    },
    documentType: { type: String, default: 'UNKNOWN' },
    studentName: { type: String, default: null },
    rollNumber: { type: String, default: null },
    institution: { type: String, default: null },
    board: { type: String, default: null },
    academicYear: { type: String, default: null },
    subjects: [ExtractedSubjectMarkSchema],
    totalMarks: { type: Number, default: null },
    maximumMarks: { type: Number, default: null },
    percentage: { type: Number, default: null },
    resultStatus: { type: String, default: null },
    confidence: { type: Number, default: 1.0 },
    aiModel: { type: String, default: 'gemini-2.5-flash' },
    createdAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date, default: null },
    confirmedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const DocumentAnalysis = mongoose.models.DocumentAnalysis || mongoose.model<IDocumentAnalysis>('DocumentAnalysis', DocumentAnalysisSchema);
export default DocumentAnalysis;
