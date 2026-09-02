import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversity extends Document {
  name: string;
  slug: string;
  type: string; // State Public, Private, Deemed, Central
  state: string;
  district?: string;
  city?: string;
  officialWebsiteUrl?: string;
  recognition?: string[]; // UGC, AICTE, etc.
  sourceUrl?: string;
  lastVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UniversitySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  state: { type: String, required: true, default: 'Karnataka' },
  district: { type: String },
  city: { type: String },
  officialWebsiteUrl: { type: String },
  recognition: [{ type: String }],
  sourceUrl: { type: String },
  lastVerifiedAt: { type: Date }
}, { timestamps: true });

UniversitySchema.index({ name: 'text' });
UniversitySchema.index({ state: 1, type: 1 });

export default mongoose.model<IUniversity>('University', UniversitySchema);
