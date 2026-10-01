import mongoose, { Document, Schema } from 'mongoose';

export interface ISubjectCombination extends Document {
  streamId: mongoose.Types.ObjectId;
  name: string; // e.g., 'PCMB'
  slug: string;
  description?: string;
  duration?: string; // e.g., '2 Years'
  eligibility?: string; // e.g., 'Passed 10th / SSLC or equivalent'
  subjects: mongoose.Types.ObjectId[];
  boardId?: mongoose.Types.ObjectId;
  stateId?: mongoose.Types.ObjectId;
  academicYearId?: mongoose.Types.ObjectId;
  educationLevelId?: mongoose.Types.ObjectId;
  institutionId?: mongoose.Types.ObjectId;
  availability?: string;
  enabledCourses?: mongoose.Types.ObjectId[];
  restrictedCourses?: mongoose.Types.ObjectId[];
  entranceExams?: mongoose.Types.ObjectId[];
  careerAreas?: mongoose.Types.ObjectId[];
  source?: string;
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectCombinationSchema: Schema = new Schema({
  streamId: { type: Schema.Types.ObjectId, ref: 'Stream', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  eligibility: { type: String },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  stateId: { type: Schema.Types.ObjectId, ref: 'State' },
  academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
  educationLevelId: { type: Schema.Types.ObjectId, ref: 'EducationLevel' },
  institutionId: { type: Schema.Types.ObjectId, ref: 'College' },
  availability: { type: String },
  enabledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  restrictedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  entranceExams: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
  careerAreas: [{ type: Schema.Types.ObjectId, ref: 'Career' }],
  source: { type: String },
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

SubjectCombinationSchema.index({ boardId: 1, stateId: 1, academicYearId: 1 });

SubjectCombinationSchema.index({ streamId: 1 });
SubjectCombinationSchema.index({ slug: 1 });

export default mongoose.model<ISubjectCombination>('SubjectCombination', SubjectCombinationSchema);
