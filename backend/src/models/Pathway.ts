import mongoose, { Document, Schema } from 'mongoose';

export interface IPathway extends Document {
  educationLevelId: mongoose.Types.ObjectId;
  name: string; // e.g., '12th / Intermediate', 'Diploma', 'ITI'
  slug: string;
  description?: string;
  duration?: string;
  eligibility?: string;
  entryRequirement?: string;
  order: number;
  icon?: string;
  boardId?: mongoose.Types.ObjectId;
  stateId?: mongoose.Types.ObjectId;
  academicYearId?: mongoose.Types.ObjectId;
  sourceName?: string;
  sourceUrl?: string;
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
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
  entryRequirement: { type: String },
  order: { type: Number, default: 0 },
  icon: { type: String },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  stateId: { type: Schema.Types.ObjectId, ref: 'State' },
  academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
  sourceName: { type: String },
  sourceUrl: { type: String },
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  verifiedAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

PathwaySchema.index({ boardId: 1, stateId: 1, academicYearId: 1 });

PathwaySchema.index({ educationLevelId: 1 });
PathwaySchema.index({ slug: 1 });
PathwaySchema.index({ order: 1 });

export default mongoose.model<IPathway>('Pathway', PathwaySchema);
