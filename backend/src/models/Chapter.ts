import mongoose, { Document, Schema } from 'mongoose';

export interface IChapter extends Document {
  unitId: mongoose.Types.ObjectId;
  name: string;
  order: number;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ChapterSchema: Schema = new Schema({
  unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
  description: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IChapter>('Chapter', ChapterSchema);
