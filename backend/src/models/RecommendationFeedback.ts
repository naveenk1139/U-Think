import mongoose, { Document, Schema } from 'mongoose';

export interface IRecommendationFeedback extends Document {
  studentId: mongoose.Types.ObjectId;
  recommendationId: mongoose.Types.ObjectId;
  entityId: mongoose.Types.ObjectId;
  entityType: 'Career' | 'Course' | 'College' | 'Exam' | 'Scholarship';
  feedbackType: 'INTERESTED' | 'NOT_INTERESTED' | 'ALREADY_COMPLETED' | 'NOT_RELEVANT' | 'TOO_EXPENSIVE' | 'TOO_FAR' | 'ALREADY_KNOW';
  comments?: string;
  createdAt: Date;
}

const RecommendationFeedbackSchema = new Schema<IRecommendationFeedback>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recommendationId: { type: Schema.Types.ObjectId, ref: 'Recommendation', required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
    entityType: { type: String, enum: ['Career', 'Course', 'College', 'Exam', 'Scholarship'], required: true },
    feedbackType: { 
      type: String, 
      enum: ['INTERESTED', 'NOT_INTERESTED', 'ALREADY_COMPLETED', 'NOT_RELEVANT', 'TOO_EXPENSIVE', 'TOO_FAR', 'ALREADY_KNOW'], 
      required: true 
    },
    comments: { type: String },
  },
  { timestamps: true }
);

RecommendationFeedbackSchema.index({ studentId: 1, recommendationId: 1 }, { unique: true });

export const RecommendationFeedback = mongoose.model<IRecommendationFeedback>('RecommendationFeedback', RecommendationFeedbackSchema);
