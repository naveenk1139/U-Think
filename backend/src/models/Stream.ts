import mongoose, { Document, Schema } from 'mongoose';

export interface IStream extends Document {
  pathwayId: mongoose.Types.ObjectId;
  name: string; // e.g., 'Science', 'Commerce', 'Diploma', 'Vocational'
  slug: string;
  aliases?: string[];
  description?: string;
  duration?: string;
  typicalStructure?: string[];
  icon?: string;
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
  icon: { type: String },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

StreamSchema.index({ pathwayId: 1 });
StreamSchema.index({ slug: 1 });
StreamSchema.index({ name: 1 });

export default mongoose.model<IStream>('Stream', StreamSchema);
