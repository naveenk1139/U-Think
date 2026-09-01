import mongoose, { Document, Schema } from 'mongoose';

export interface IState extends Document {
  name: string;
  slug: string;
  code: string;
  country: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StateSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  country: { type: String, required: true, default: 'India' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IState>('State', StateSchema);
