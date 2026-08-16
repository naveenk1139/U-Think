import mongoose, { Document, Schema } from 'mongoose';

export interface ISavedJob extends Document {
  user: mongoose.Types.ObjectId;
  jobId: string;
  source: string;
  sourceJobId: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: string;
  employmentType: string;
  experience: string;
  salary: string;
  skills: string[];
  sourceUrl: string;
  applicationUrl?: string;
  
  status: 'Saved' | 'Applied' | 'Interview' | 'Assessment' | 'Rejected' | 'Offer' | 'Withdrawn';
  notes: string;
  matchScore: number;
  savedAt: Date;
  postedAt: Date;
  reminders: Date[];
  
  createdAt: Date;
  updatedAt: Date;
}

const savedJobSchema = new Schema<ISavedJob>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: String, required: true },
  source: { type: String, required: true },
  sourceJobId: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyLogo: { type: String },
  location: { type: String, required: true },
  workMode: { type: String, default: 'On-site' },
  employmentType: { type: String, default: 'Full Time' },
  experience: { type: String, default: 'Not specified' },
  salary: { type: String, default: 'Not disclosed' },
  skills: { type: [String], default: [] },
  sourceUrl: { type: String, required: true },
  applicationUrl: { type: String },
  
  status: { 
    type: String, 
    enum: ['Saved', 'Applied', 'Interview', 'Assessment', 'Rejected', 'Offer', 'Withdrawn'],
    default: 'Saved'
  },
  notes: { type: String, default: '' },
  matchScore: { type: Number, default: 0 },
  savedAt: { type: Date, default: Date.now },
  postedAt: { type: Date, default: Date.now },
  reminders: { type: [Date], default: [] }
}, {
  timestamps: true
});

// Prevent a user from saving the exact same job twice
savedJobSchema.index({ user: 1, jobId: 1 }, { unique: true });
savedJobSchema.index({ user: 1, source: 1, sourceJobId: 1 }, { unique: true });

export default mongoose.model<ISavedJob>('SavedJob', savedJobSchema);
