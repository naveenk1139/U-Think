import mongoose, { Document, Schema } from 'mongoose';

export interface ISourceReference {
  sourceName: string;
  sourceUrl?: string;
  lastVerifiedAt: Date;
  verificationStatus: 'Verified' | 'Unverified' | 'Stale';
}

export interface IRecommendation extends Document {
  studentId: mongoose.Types.ObjectId;
  recommendationType: string;
  entityType: string;
  entityId: mongoose.Types.ObjectId;
  reason: string; // Canonical reason code or structured reason (not UI string)
  matchedFactors: string[];
  missingFactors: string[];
  eligibilityStatus: 'Eligible' | 'Not Eligible' | 'Action Required' | 'Unknown';
  matchScore: number;
  confidence: number;
  priority: 'High' | 'Medium' | 'Low';
  sourceReferences: ISourceReference[];
  profileVersion: number;
  status: 'Active' | 'Dismissed' | 'Accepted' | 'Expired';
  recommendationLabel: 'VERIFIED MATCH' | 'PARTIAL MATCH' | 'REQUIRES ACTION' | 'INFORMATION REQUIRED' | 'DATA UNVERIFIED';
  presentation?: any;
  presentationLanguage?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SourceReferenceSchema = new Schema<ISourceReference>({
  sourceName: { type: String, required: true },
  sourceUrl: { type: String },
  lastVerifiedAt: { type: Date, required: true },
  verificationStatus: { 
    type: String, 
    enum: ['Verified', 'Unverified', 'Stale'],
    default: 'Unverified'
  }
}, { _id: false });

const RecommendationSchema = new Schema<IRecommendation>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  recommendationType: {
    type: String,
    required: true,
    index: true
  },
  entityType: {
    type: String,
    required: true
  },
  entityId: {
    type: Schema.Types.ObjectId,
    refPath: 'entityType',
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  matchedFactors: [{ type: String }],
  missingFactors: [{ type: String }],
  eligibilityStatus: {
    type: String,
    enum: ['Eligible', 'Not Eligible', 'Action Required', 'Unknown'],
    default: 'Unknown'
  },
  matchScore: { type: Number, min: 0, max: 100 },
  confidence: { type: Number, min: 0, max: 100 },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  sourceReferences: [SourceReferenceSchema],
  profileVersion: {
    type: Number,
    required: true,
    default: 1
  },
  status: {
    type: String,
    enum: ['Active', 'Dismissed', 'Accepted', 'Expired'],
    default: 'Active',
    index: true
  },
  recommendationLabel: {
    type: String,
    enum: ['VERIFIED MATCH', 'PARTIAL MATCH', 'REQUIRES ACTION', 'INFORMATION REQUIRED', 'DATA UNVERIFIED'],
    required: true
  },
  presentation: { type: Schema.Types.Mixed },
  presentationLanguage: { type: String },
  expiresAt: { type: Date }
}, {
  timestamps: true
});

// Index to quickly fetch a student's active recommendations for a particular version
RecommendationSchema.index({ studentId: 1, status: 1, profileVersion: -1 });

export const Recommendation = mongoose.models.Recommendation || mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);
export default Recommendation;
