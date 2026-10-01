import mongoose, { Document, Schema } from 'mongoose';

export interface ICareer extends Document {
  name: string;
  slug: string;
  description?: string;
  industry?: string;
  salaryRange?: string;
  skills: string[];
  futureScope?: string;
  jobRoleRefs?: mongoose.Types.ObjectId[];
  pathwayRefs?: mongoose.Types.ObjectId[];
  courseRefs?: mongoose.Types.ObjectId[];
  skillRefs?: mongoose.Types.ObjectId[];
  averageSalary?: string;
  demand?: string;
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  industry: { type: String },
  salaryRange: { type: String },
  skills: [{ type: String }],
  futureScope: { type: String },
  jobRoleRefs: [{ type: Schema.Types.ObjectId, ref: 'JobRole' }],
  pathwayRefs: [{ type: Schema.Types.ObjectId, ref: 'Pathway' }],
  courseRefs: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  skillRefs: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  averageSalary: { type: String },
  demand: { type: String },
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CareerSchema.index({ name: 1 });

export default mongoose.model<ICareer>('Career', CareerSchema);
