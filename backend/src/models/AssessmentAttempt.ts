import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessmentAttempt extends Document {
  userId: string;
  educationLevel: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  answers: {
    questionId: string;
    questionText: string;
    choiceText: string;
    dimensionWeights: Record<string, number>;
  }[];
  currentScores: Record<string, number>;
  confidenceScore: number;
}

const AssessmentAttemptSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    educationLevel: { type: String, required: true },
    status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED'], default: 'IN_PROGRESS' },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'AssessmentQuestion' },
        questionText: String,
        choiceText: String,
        dimensionWeights: { type: Map, of: Number }
      }
    ],
    currentScores: { type: Map, of: Number, default: {} },
    confidenceScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<IAssessmentAttempt>('AssessmentAttempt', AssessmentAttemptSchema);
