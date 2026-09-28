import mongoose, { Document, Schema } from 'mongoose';

export interface IUnit extends Document {
  syllabusId: mongoose.Types.ObjectId;
  name: string;
  order: number;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema: Schema = new Schema({
  syllabusId: { type: Schema.Types.ObjectId, ref: 'Syllabus', required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
  description: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IUnit>('Unit', UnitSchema);
