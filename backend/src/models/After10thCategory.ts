import mongoose, { Document, Schema } from 'mongoose';

export interface IAfter10thCategory extends Document {
  pathwayId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  possibleSubjects?: string[];
  majorDisciplines?: string[];
  combinations?: {
    name: string;
    subjects: string[];
  }[];
  duration?: string;
  eligibility?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const After10thCategorySchema: Schema = new Schema({
  pathwayId: { type: Schema.Types.ObjectId, ref: 'After10thPathway', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  possibleSubjects: [{ type: String }],
  majorDisciplines: [{ type: String }],
  combinations: [{
    name: { type: String },
    subjects: [{ type: String }]
  }],
  duration: { type: String },
  eligibility: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

After10thCategorySchema.index({ pathwayId: 1 });
After10thCategorySchema.index({ slug: 1 });

export default mongoose.model<IAfter10thCategory>('After10thCategory', After10thCategorySchema);
