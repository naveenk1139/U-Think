import mongoose, { Document, Schema } from 'mongoose';

export interface IStabilityAnalysis extends Document {
  studentId: string;
  targetCareer: string;
  stabilityScore: number; // 0-100
  confidenceLevel: string; // 'High', 'Medium', 'Low'
  supportingFactors: string[];
  riskFactors: string[]; // This is the "disagreement" or devil's advocate part
  alternativeSuggestion?: string;
  analyzedAt: Date;
}

const StabilityAnalysisSchema: Schema = new Schema({
  studentId: { type: String, required: true, index: true },
  targetCareer: { type: String, required: true },
  stabilityScore: { type: Number, required: true },
  confidenceLevel: { type: String, required: true },
  supportingFactors: [{ type: String }],
  riskFactors: [{ type: String }],
  alternativeSuggestion: { type: String },
  analyzedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const StabilityAnalysis = mongoose.models.StabilityAnalysis || mongoose.model<IStabilityAnalysis>('StabilityAnalysis', StabilityAnalysisSchema);
export default StabilityAnalysis;
