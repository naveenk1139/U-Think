import mongoose, { Document, Schema } from 'mongoose';

export interface IStream extends Document {
  pathwayId: mongoose.Types.ObjectId;
  name: string; // e.g., 'Science', 'Commerce', 'Diploma', 'Vocational'
  slug: string;
  aliases?: string[];
  description?: string;
  duration?: string;
  typicalStructure?: string[];
  coreSubjects?: string[];
  electives?: string[];
  examDates?: Map<string, string>;
  icon?: string;
  boardId?: mongoose.Types.ObjectId;
  stateId?: mongoose.Types.ObjectId;
  academicYearId?: mongoose.Types.ObjectId;
  educationLevelId?: mongoose.Types.ObjectId;
  source?: string;
  verificationStatus?: 'DRAFT' | 'UNVERIFIED' | 'VERIFIED' | 'EXPIRED' | 'REQUIRES_REVIEW';
  lastVerified?: Date;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StreamSchema: Schema = new Schema({
  pathwayId: { type: Schema.Types.ObjectId, ref: 'Pathway', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  aliases: [{ type: String }],
  description: { type: String },
  duration: { type: String },
  typicalStructure: [{ type: String }],
  coreSubjects: [{ type: String }],
  electives: [{ type: String }],
  examDates: { type: Map, of: String },
  icon: { type: String },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  stateId: { type: Schema.Types.ObjectId, ref: 'State' },
  academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
  educationLevelId: { type: Schema.Types.ObjectId, ref: 'EducationLevel' },
  source: { type: String },
  verificationStatus: { type: String, enum: ['DRAFT', 'UNVERIFIED', 'VERIFIED', 'EXPIRED', 'REQUIRES_REVIEW'], default: 'UNVERIFIED' },
  lastVerified: { type: Date },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

StreamSchema.index({ boardId: 1, stateId: 1, academicYearId: 1 });

StreamSchema.index({ pathwayId: 1 });
StreamSchema.index({ slug: 1 });
StreamSchema.index({ name: 1 });

export default mongoose.model<IStream>('Stream', StreamSchema);
