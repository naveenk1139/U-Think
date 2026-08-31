import mongoose, { Document, Schema } from 'mongoose';

export interface IEducationLevel extends Document {
  name: string; // e.g., 'After 10th', 'After 12th', 'Degree', 'Postgraduate'
  slug: string;
  description?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EducationLevelSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

EducationLevelSchema.index({ slug: 1 });
EducationLevelSchema.index({ order: 1 });

export default mongoose.model<IEducationLevel>('EducationLevel', EducationLevelSchema);
