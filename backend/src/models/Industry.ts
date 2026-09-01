import mongoose, { Document, Schema } from 'mongoose';

export interface IIndustry extends Document {
  name: string; // e.g., 'IT / Tech', 'Healthcare'
  slug: string;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

IndustrySchema.index({ slug: 1 });

export default mongoose.model<IIndustry>('Industry', IndustrySchema);
