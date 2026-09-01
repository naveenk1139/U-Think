import mongoose, { Document, Schema } from 'mongoose';

export interface IGovernmentScheme extends Document {
  name: string;
  slug: string;
  description?: string;
  eligibilityCriteria?: string;
  benefits?: string;
  officialWebsite?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GovernmentSchemeSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  eligibilityCriteria: { type: String },
  benefits: { type: String },
  officialWebsite: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IGovernmentScheme>('GovernmentScheme', GovernmentSchemeSchema);
