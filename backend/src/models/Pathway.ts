import mongoose, { Document, Schema } from 'mongoose';

export interface IPathway extends Document {
  educationLevelId: mongoose.Types.ObjectId;
  name: string; // e.g., '12th / Intermediate', 'Diploma', 'ITI'
  slug: string;
  description?: string;
  duration?: string;
  eligibility?: string;
  order: number;
  icon?: string;
  sourceName?: string;
  sourceUrl?: string;
  verifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PathwaySchema: Schema = new Schema({
  educationLevelId: { type: Schema.Types.ObjectId, ref: 'EducationLevel', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  eligibility: { type: String },
  order: { type: Number, default: 0 },
  icon: { type: String },
  sourceName: { type: String },
  sourceUrl: { type: String },
  verifiedAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

PathwaySchema.index({ educationLevelId: 1 });
PathwaySchema.index({ slug: 1 });
PathwaySchema.index({ order: 1 });

export default mongoose.model<IPathway>('Pathway', PathwaySchema);
