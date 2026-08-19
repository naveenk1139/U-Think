import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessmentOption {
  text: string;
  dimensionWeights: Record<string, number>; // e.g. { logical: 5, technical: 2 }
}

export interface IAssessmentQuestion extends Document {
  questionText: string;
  category: string; // e.g. 'Scenario', 'Logical', 'Preference', 'Technical'
  targetEducationLevels: string[]; // e.g. ['POST_10TH', '12TH_SCIENCE', 'ENGINEERING']
  options: IAssessmentOption[];
}

const AssessmentOptionSchema = new Schema({
  text: { type: String, required: true },
  dimensionWeights: { type: Map, of: Number, required: true }
});

const AssessmentQuestionSchema = new Schema(
  {
    questionText: { type: String, required: true },
    category: { type: String, required: true },
    targetEducationLevels: [{ type: String, required: true }],
    options: [AssessmentOptionSchema]
  },
  { timestamps: true }
);

// Indexes for fast adaptive querying
AssessmentQuestionSchema.index({ targetEducationLevels: 1 });
AssessmentQuestionSchema.index({ category: 1 });

export default mongoose.model<IAssessmentQuestion>('AssessmentQuestion', AssessmentQuestionSchema);
