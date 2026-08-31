import mongoose, { Document, Schema } from 'mongoose';

export interface IBranch extends Document {
  courseId: mongoose.Types.ObjectId;
  name: string; // e.g., 'Computer Science Engineering', 'MBBS'
  slug: string;
  description?: string;
  duration?: string;
  eligibility?: string;
  requiredSubjects?: string[];
  averageFees?: string;
  relatedCareers?: mongoose.Types.ObjectId[];
  relatedExams?: mongoose.Types.ObjectId[];
  higherStudies?: mongoose.Types.ObjectId[];
  furtherStudies?: mongoose.Types.ObjectId[]; // PG courses
  requiredSkills?: string[];
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema: Schema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  eligibility: { type: String },
  requiredSubjects: [{ type: String }],
  averageFees: { type: String },
  relatedCareers: [{ type: Schema.Types.ObjectId, ref: 'Career' }],
  relatedExams: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
  higherStudies: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  furtherStudies: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  requiredSkills: [{ type: String }],
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

BranchSchema.index({ courseId: 1 });
BranchSchema.index({ slug: 1 });
BranchSchema.index({ name: 1 });

export default mongoose.model<IBranch>('Branch', BranchSchema);
