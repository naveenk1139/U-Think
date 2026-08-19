import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  examId: string;
  name: string;
  level: string; // National, State, University, etc.
  educationLevel: string[]; // ['12TH_SCIENCE', 'UG', etc.]
  category: string; // Engineering, Medical, Law, etc.
  type: string; // Entrance Exam, Government Recruitment, etc.
  ugPg: string; // UG, PG, Diploma
  streams: string[];
  courses: string[];
  subjects: string[];
  eligibility: {
    qualification: string;
    ageCriteria: string;
    details: string;
  };
  importantDates: {
    applicationStart: string;
    applicationEnd: string;
    examDate: string;
    resultDate: string;
  };
  officialWebsite: string;
  lastUpdated: string;
  conductingBody: string;
  examMode: string;
  applicationProcess: string;
  acceptedFor: string;
  status: 'Active' | 'Discontinued' | 'TBA';
}

const ExamSchema = new Schema(
  {
    examId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    level: { type: String, required: true },
    educationLevel: [{ type: String, index: true }],
    category: { type: String, index: true, required: true },
    type: { type: String, required: true },
    ugPg: { type: String },
    streams: [{ type: String }],
    courses: [{ type: String }],
    subjects: [{ type: String }],
    eligibility: {
      qualification: { type: String },
      ageCriteria: { type: String },
      details: { type: String }
    },
    importantDates: {
      applicationStart: { type: String },
      applicationEnd: { type: String },
      examDate: { type: String },
      resultDate: { type: String }
    },
    officialWebsite: { type: String },
    lastUpdated: { type: String },
    conductingBody: { type: String },
    examMode: { type: String },
    applicationProcess: { type: String },
    acceptedFor: { type: String },
    status: { type: String, enum: ['Active', 'Discontinued', 'TBA'], default: 'Active' }
  },
  { timestamps: true }
);

ExamSchema.index({ name: 'text', category: 'text', streams: 'text', courses: 'text', conductingBody: 'text' });

export default mongoose.model<IExam>('Exam', ExamSchema);
