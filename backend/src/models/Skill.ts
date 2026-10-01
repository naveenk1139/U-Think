import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string; // e.g., 'React', 'Problem Solving'
  slug: string;
  category?: string;
  type?: string; // Soft, Hard, Technical
  careerRefs?: mongoose.Types.ObjectId[];
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String },
  type: { type: String },
  careerRefs: [{ type: Schema.Types.ObjectId, ref: 'Career' }],
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });


export default mongoose.model<ISkill>('Skill', SkillSchema);
