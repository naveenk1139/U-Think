import mongoose, { Document, Schema } from 'mongoose';

export interface ICareerProgression extends Document {
  careerId: mongoose.Types.ObjectId;
  startRoleRef: mongoose.Types.ObjectId;
  nextRoleRef: mongoose.Types.ObjectId;
  requiredSkillsRef?: mongoose.Types.ObjectId[];
  requiredExperienceYears?: number;
  description?: string;
  source?: string;
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CareerProgressionSchema: Schema = new Schema({
  careerId: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
  startRoleRef: { type: Schema.Types.ObjectId, ref: 'JobRole', required: true },
  nextRoleRef: { type: Schema.Types.ObjectId, ref: 'JobRole', required: true },
  requiredSkillsRef: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  requiredExperienceYears: { type: Number },
  description: { type: String },
  source: { type: String },
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CareerProgressionSchema.index({ careerId: 1 });
CareerProgressionSchema.index({ startRoleRef: 1, nextRoleRef: 1 }, { unique: true });

export default mongoose.model<ICareerProgression>('CareerProgression', CareerProgressionSchema);
