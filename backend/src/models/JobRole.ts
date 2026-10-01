import mongoose, { Document, Schema } from 'mongoose';

export interface IJobRole extends Document {
  careerId: mongoose.Types.ObjectId;
  industryId?: mongoose.Types.ObjectId;
  name: string; // e.g., 'Frontend Developer'
  slug: string;
  description?: string;
  averageSalary?: string;
  level?: string; // Entry, Mid, Senior
  skillRefs?: mongoose.Types.ObjectId[];
  responsibilities?: string[];
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobRoleSchema: Schema = new Schema({
  careerId: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
  industryId: { type: Schema.Types.ObjectId, ref: 'Industry' },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  averageSalary: { type: String },
  level: { type: String },
  skillRefs: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  responsibilities: [{ type: String }],
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

JobRoleSchema.index({ slug: 1 });
JobRoleSchema.index({ careerId: 1 });

export default mongoose.model<IJobRole>('JobRole', JobRoleSchema);
