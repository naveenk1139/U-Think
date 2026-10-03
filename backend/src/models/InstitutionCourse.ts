import mongoose, { Document, Schema } from 'mongoose';

export interface IInstitutionCourse extends Document {
  institutionId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  fees?: number;
  seats?: number;
  cutoffRank?: string;
  admissionStatus?: 'OPEN' | 'CLOSED' | 'UPCOMING';
  active: boolean;
}

const InstitutionCourseSchema: Schema = new Schema({
  institutionId: { type: Schema.Types.ObjectId, ref: 'College', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  fees: { type: Number },
  seats: { type: Number },
  cutoffRank: { type: String },
  admissionStatus: { type: String, enum: ['OPEN', 'CLOSED', 'UPCOMING'], default: 'UPCOMING' },
  active: { type: Boolean, default: true }
}, { timestamps: true });

InstitutionCourseSchema.index({ institutionId: 1, courseId: 1 }, { unique: true });
InstitutionCourseSchema.index({ courseId: 1 });

export default mongoose.model<IInstitutionCourse>('InstitutionCourse', InstitutionCourseSchema);
