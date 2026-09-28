import mongoose, { Document, Schema } from 'mongoose';

export interface ISchoolClass extends Document {
  name: string; // e.g. "Class 10", "PUC 1"
  slug: string;
  gradeLevel: number; // 1 to 12
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SchoolClassSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  gradeLevel: { type: Number, required: true },
  description: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<ISchoolClass>('SchoolClass', SchoolClassSchema);
