import mongoose, { Document, Schema } from 'mongoose';

export interface IScholarship extends Document {
  name: string;
  slug: string;
  amount?: string;
  eligibilityCriteria?: string;
  requiredDocuments?: string[];
  applicationProcess?: string;
  deadline?: Date;
  officialWebsite?: string;
  
  // Source & Trust Layer
  sourceName?: string;
  sourceUrl?: string;
  lastVerifiedAt?: Date;
  verificationStatus?: 'FRESH' | 'AGING' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ScholarshipSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  amount: { type: String },
  eligibilityCriteria: { type: String },
  requiredDocuments: [{ type: String }],
  applicationProcess: { type: String },
  deadline: { type: Date },
  officialWebsite: { type: String },
  
  // Source & Trust Layer
  sourceName: { type: String },
  sourceUrl: { type: String },
  lastVerifiedAt: { type: Date },
  verificationStatus: { type: String, enum: ['FRESH', 'AGING', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Scholarship || mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);
