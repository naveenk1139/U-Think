import mongoose, { Document, Schema } from 'mongoose';

export interface IBoard extends Document {
  name: string;
  slug: string;
  type: 'Central' | 'State' | 'International';
  stateId?: mongoose.Types.ObjectId;
  description?: string;
  officialWebsite?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['Central', 'State', 'International'] },
  stateId: { type: Schema.Types.ObjectId, ref: 'State' },
  description: { type: String },
  officialWebsite: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IBoard>('Board', BoardSchema);
