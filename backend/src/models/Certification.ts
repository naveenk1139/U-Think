import mongoose, { Document, Schema } from 'mongoose';

export interface ICertification extends Document {
  name: string; 
  slug: string;
  provider?: string;
  description?: string;
  skillRefs?: mongoose.Types.ObjectId[];
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  provider: { type: String },
  description: { type: String },
  skillRefs: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<ICertification>('Certification', CertificationSchema);
