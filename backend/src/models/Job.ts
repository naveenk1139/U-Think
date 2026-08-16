import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  jobId: string;
  source: string; // e.g., 'LinkedIn', 'Naukri', 'Indeed', 'Google', 'Apna', 'WorkIndia', 'JobHai', 'Admin'
  sourceJobId: string; // ID from the source platform
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: string; // 'Remote', 'Hybrid', 'On-site'
  employmentType: string; // 'Full Time', 'Part Time', 'Internship', 'Contract'
  experienceLevel: string; // e.g., 'Fresher', '1-3 years', etc.
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: string; // 'LPA', 'Monthly', etc.
  skills: string[];
  qualifications: string[];
  description: string;
  postedAt: Date;
  applicationDeadline?: Date;
  applicationUrl?: string; // Direct link to apply if available
  sourceUrl: string; // Link to the job on the source platform
  category?: string;
  industry?: string;
  verified: boolean;
  lastUpdated: Date;
}

const JobSchema: Schema = new Schema({
  jobId: { type: String, required: true, unique: true }, // Internal unique ID (could be hash of source + sourceJobId)
  source: { type: String, required: true },
  sourceJobId: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyLogo: { type: String },
  location: { type: String, required: true },
  workMode: { type: String, default: 'On-site' },
  employmentType: { type: String, default: 'Full Time' },
  experienceLevel: { type: String, default: 'Entry Level' },
  salaryMin: { type: Number },
  salaryMax: { type: Number },
  salaryPeriod: { type: String },
  skills: [{ type: String }],
  qualifications: [{ type: String }],
  description: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
  applicationDeadline: { type: Date },
  applicationUrl: { type: String },
  sourceUrl: { type: String, required: true },
  category: { type: String },
  industry: { type: String },
  verified: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now },
});

// Indexing for search
JobSchema.index({ title: 'text', company: 'text', description: 'text', skills: 'text' });
JobSchema.index({ source: 1, sourceJobId: 1 }, { unique: true });

export default mongoose.model<IJob>('Job', JobSchema);
