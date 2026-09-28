import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  targetId: string; // e.g., College ID, Course ID
  targetType: 'College' | 'Course' | 'Mentor';
  content: string;
  rating: number;
  
  // Trust Layer Properties
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  aiConfidenceScore: number;
  flags: string[];
  reviewedAt: Date;
}

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: String, required: true },
  targetType: { type: String, enum: ['College', 'Course', 'Mentor'], required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  
  verificationStatus: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
  aiConfidenceScore: { type: Number, default: 0 },
  flags: [{ type: String }],
  reviewedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
