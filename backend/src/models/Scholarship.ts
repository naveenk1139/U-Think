import mongoose, { Document, Schema } from 'mongoose';

export interface IScholarship extends Document {
  name: string;
  slug: string;
  amount?: string;
  eligibilityCriteria?: string;
  deadline?: Date;
  officialWebsite?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ScholarshipSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  amount: { type: String },
  eligibilityCriteria: { type: String },
  deadline: { type: Date },
  officialWebsite: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);
