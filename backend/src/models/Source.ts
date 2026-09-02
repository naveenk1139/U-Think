import mongoose, { Schema, Document } from 'mongoose';

export interface ISource extends Document {
  sourceName: string; // e.g. "AISHE", "KEA", "COMEDK"
  sourceType: 'API' | 'Website' | 'PDF' | 'Manual';
  url: string;
  publisher: string;
  academicYear?: string;
  fetchedAt: Date;
  lastCheckedAt: Date;
  status: 'Active' | 'Inactive' | 'Failing';
  checksum?: string;
  parserVersion?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SourceSchema = new Schema({
  sourceName: { type: String, required: true },
  sourceType: { type: String, enum: ['API', 'Website', 'PDF', 'Manual'], required: true },
  url: { type: String, required: true },
  publisher: { type: String, required: true },
  academicYear: { type: String },
  fetchedAt: { type: Date, required: true, default: Date.now },
  lastCheckedAt: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['Active', 'Inactive', 'Failing'], default: 'Active' },
  checksum: { type: String },
  parserVersion: { type: String }
}, { timestamps: true });

SourceSchema.index({ sourceName: 1 });
SourceSchema.index({ status: 1 });

export default mongoose.model<ISource>('Source', SourceSchema);
