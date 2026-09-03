import mongoose, { Document, Schema } from 'mongoose';

export interface ICollegeCourse extends Document {
  collegeId: mongoose.Types.ObjectId;
  courseId?: mongoose.Types.ObjectId;
  branchId?: mongoose.Types.ObjectId;
  educationLevel?: string;
  courseName?: string;
  degreeName?: string;
  branchName?: string;
  specializationName?: string;
  duration?: string;
  mode?: 'Full-Time' | 'Part-Time' | 'Online' | 'Hybrid' | 'Other';
  fees?: string;
  academicYear: string;
  intake?: number;
  eligibility?: string;
  requiredSubjects?: string[];
  minimumMarks?: string;
  programType?: string; // UG, PG, Diploma, ITI
  admissionRoute?: string;
  admissionMethod?: string;
  entranceExamRequired?: boolean;
  entranceExamIds?: mongoose.Types.ObjectId[];
  entranceExamId?: mongoose.Types.ObjectId;
  sourceUrl?: string;
  sourceName?: string;
  lastVerifiedAt?: Date;
  currentAvailability?: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CollegeCourseSchema: Schema = new Schema({
  collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
  educationLevel: { type: String },
  courseName: { type: String },
  degreeName: { type: String },
  branchName: { type: String },
  specializationName: { type: String },
  duration: { type: String },
  mode: { type: String, enum: ['Full-Time', 'Part-Time', 'Online', 'Hybrid', 'Other'], default: 'Full-Time' },
  fees: { type: String },
  academicYear: { type: String, required: true },
  intake: { type: Number },
  eligibility: { type: String },
  requiredSubjects: [{ type: String }],
  minimumMarks: { type: String },
  programType: { type: String },
  admissionRoute: { type: String },
  admissionMethod: { type: String },
  entranceExamRequired: { type: Boolean },
  entranceExamIds: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
  entranceExamId: { type: Schema.Types.ObjectId, ref: 'Exam' },
  sourceUrl: { type: String },
  sourceName: { type: String },
  lastVerifiedAt: { type: Date },
  currentAvailability: { type: Boolean, default: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CollegeCourseSchema.index({ collegeId: 1 });
CollegeCourseSchema.index({ courseId: 1 });
CollegeCourseSchema.index({ branchId: 1 });

export default mongoose.model<ICollegeCourse>('CollegeCourse', CollegeCourseSchema);
