import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessmentResult extends Document {
  userId: string;
  attemptId: string;
  educationLevel: string;
  finalScores: Record<string, number>;
  topMatches: {
    careerId: string;
    careerName: string;
    matchScore: number;
    matchRationale: string;
  }[];
  recommendedStreams: string[];
  recommendedCourses: string[];
  aiAnalysisText: string;
  strengths: string[];
  areasToImprove: string[];
}

const AssessmentResultSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    attemptId: { type: Schema.Types.ObjectId, ref: 'AssessmentAttempt', required: true },
    educationLevel: { type: String, required: true },
    finalScores: { type: Map, of: Number, required: true },
    topMatches: [
      {
        careerId: { type: Schema.Types.ObjectId, ref: 'CareerProfile' },
        careerName: String,
        matchScore: Number,
        matchRationale: String
      }
    ],
    recommendedStreams: [{ type: String }],
    recommendedCourses: [{ type: String }],
    aiAnalysisText: { type: String },
    strengths: [{ type: String }],
    areasToImprove: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model<IAssessmentResult>('AssessmentResult', AssessmentResultSchema);
