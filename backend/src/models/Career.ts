import mongoose, { Document, Schema } from 'mongoose';

export interface ICareer extends Document {
  name: string;
  slug: string;
  description?: string;
  industry?: string;
  salaryRange?: string;
  skills: string[];
  futureScope?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  industry: { type: String },
  salaryRange: { type: String },
  skills: [{ type: String }],
  futureScope: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CareerSchema.index({ slug: 1 });
CareerSchema.index({ name: 1 });

export default mongoose.model<ICareer>('Career', CareerSchema);
