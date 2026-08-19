import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  jobId: string; // The unique ID of the job
  status: 'Applied' | 'Interview' | 'Shortlisted' | 'Rejected' | 'Offer';
  appliedAt: Date;
  notes?: string;
}

const ApplicationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Interview', 'Shortlisted', 'Rejected', 'Offer'], default: 'Applied' },
  appliedAt: { type: Date, default: Date.now },
  notes: { type: String }
});

// Index to prevent duplicate applications
ApplicationSchema.index({ user: 1, jobId: 1 }, { unique: true });

export default mongoose.model<IApplication>('Application', ApplicationSchema);
