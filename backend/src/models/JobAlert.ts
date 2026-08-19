import mongoose, { Document, Schema } from 'mongoose';

export interface IJobAlert extends Document {
  user: mongoose.Types.ObjectId;
  keywords: string;
  location?: string;
  experienceLevel?: string;
  minSalary?: number;
  workMode?: string;
  jobType?: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  isActive: boolean;
  createdAt: Date;
}

const JobAlertSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  keywords: { type: String, required: true },
  location: { type: String },
  experienceLevel: { type: String },
  minSalary: { type: Number },
  workMode: { type: String },
  jobType: { type: String },
  frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], default: 'Weekly' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IJobAlert>('JobAlert', JobAlertSchema);
