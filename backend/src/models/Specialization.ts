import mongoose, { Document, Schema } from 'mongoose';

export interface ISpecialization extends Document {
  branchId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  courseId?: mongoose.Types.ObjectId;
  coreSubjects?: string[];
  skills?: mongoose.Types.ObjectId[];
  tools?: string[];
  projects?: mongoose.Types.ObjectId[];
  internships?: mongoose.Types.ObjectId[];
  careerRoles?: mongoose.Types.ObjectId[];
  higherStudies?: mongoose.Types.ObjectId[];
  institutions?: mongoose.Types.ObjectId[];
  source?: string;
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SpecializationSchema: Schema = new Schema({
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  coreSubjects: [{ type: String }],
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  tools: [{ type: String }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  internships: [{ type: Schema.Types.ObjectId, ref: 'Internship' }],
  careerRoles: [{ type: Schema.Types.ObjectId, ref: 'JobRole' }],
  higherStudies: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  institutions: [{ type: Schema.Types.ObjectId, ref: 'College' }],
  source: { type: String },
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

SpecializationSchema.index({ courseId: 1 });

SpecializationSchema.index({ branchId: 1 });
SpecializationSchema.index({ slug: 1 });

export default mongoose.model<ISpecialization>('Specialization', SpecializationSchema);
