import mongoose, { Document, Schema } from 'mongoose';

export interface IAfter10thPathway extends Document {
  name: string;
  slug: string;
  type: string;
  description?: string;
  eligibility?: string;
  duration?: string;
  status: string;
  source?: string;
  sourceUrl?: string;
  verifiedAt?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const After10thPathwaySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  description: { type: String },
  eligibility: { type: String },
  duration: { type: String },
  status: { type: String, default: 'active' },
  source: { type: String },
  sourceUrl: { type: String },
  verifiedAt: { type: Date },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IAfter10thPathway>('After10thPathway', After10thPathwaySchema);
