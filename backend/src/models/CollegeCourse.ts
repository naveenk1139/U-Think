import mongoose, { Document, Schema } from 'mongoose';

export interface ICollegeCourse extends Document {
  collegeId: mongoose.Types.ObjectId;
  courseId?: mongoose.Types.ObjectId;
  branchId?: mongoose.Types.ObjectId;
  duration?: string;
  fees?: string;
  academicYear: string;
  intake?: number;
  eligibility?: string;
  programType?: string; // UG, PG, Diploma, ITI
  admissionRoute?: string;
  entranceExamId?: mongoose.Types.ObjectId;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CollegeCourseSchema: Schema = new Schema({
  collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
  duration: { type: String },
  fees: { type: String },
  academicYear: { type: String, required: true },
  intake: { type: Number },
  eligibility: { type: String },
  programType: { type: String },
  admissionRoute: { type: String },
  entranceExamId: { type: Schema.Types.ObjectId, ref: 'Exam' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CollegeCourseSchema.index({ collegeId: 1 });
CollegeCourseSchema.index({ courseId: 1 });
CollegeCourseSchema.index({ branchId: 1 });

export default mongoose.model<ICollegeCourse>('CollegeCourse', CollegeCourseSchema);
