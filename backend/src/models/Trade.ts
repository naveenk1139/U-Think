import mongoose, { Document, Schema } from 'mongoose';

export interface ITrade extends Document {
  streamId: mongoose.Types.ObjectId;
  name: string; // e.g., 'Electrician', 'Fitter'
  slug: string;
  description?: string;
  duration?: string;
  eligibility?: string;
  minimumQualification?: string;
  admissionMethod?: string;
  apprenticeshipOpportunities?: boolean;
  careerOpportunities?: string[];
  averageStartingSalary?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TradeSchema: Schema = new Schema({
  streamId: { type: Schema.Types.ObjectId, ref: 'Stream', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  eligibility: { type: String },
  minimumQualification: { type: String },
  admissionMethod: { type: String },
  apprenticeshipOpportunities: { type: Boolean, default: true },
  careerOpportunities: [{ type: String }],
  averageStartingSalary: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

TradeSchema.index({ slug: 1 });
TradeSchema.index({ streamId: 1 });

export default mongoose.model<ITrade>('Trade', TradeSchema);
