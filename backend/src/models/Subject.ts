import mongoose, { Document, Schema } from 'mongoose';

export interface ISubject extends Document {
  name: string; // e.g., 'Physics', 'Chemistry', 'Mathematics'
  slug: string;
  description?: string;
  syllabusWeightage?: string;
  practicalComponent?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  syllabusWeightage: { type: String },
  practicalComponent: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<ISubject>('Subject', SubjectSchema);
