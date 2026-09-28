import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  applicationType: 'JOB' | 'SCHOLARSHIP' | 'COLLEGE';
  
  // Target references
  jobId?: string; // Existing
  scholarshipId?: mongoose.Types.ObjectId; // New for scholarships
  
  status: 'Draft' | 'Documents Required' | 'Applied' | 'Interview' | 'Shortlisted' | 'Rejected' | 'Offer' | 'Under Review' | 'Approved';
  appliedAt: Date;
  notes?: string;
  
  // Tracking
  submissionDate?: Date;
  applicationReference?: string;
  source?: string;
  missingDocuments?: string[];
}

const ApplicationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  applicationType: { type: String, enum: ['JOB', 'SCHOLARSHIP', 'COLLEGE'], default: 'JOB' },
  
  jobId: { type: String },
  scholarshipId: { type: Schema.Types.ObjectId, ref: 'Scholarship' },
  
  status: { 
    type: String, 
    enum: ['Draft', 'Documents Required', 'Applied', 'Interview', 'Shortlisted', 'Rejected', 'Offer', 'Under Review', 'Approved'], 
    default: 'Applied' 
  },
  appliedAt: { type: Date, default: Date.now },
  notes: { type: String },
  
  submissionDate: { type: Date },
  applicationReference: { type: String },
  source: { type: String },
  missingDocuments: [{ type: String }]
}, { timestamps: true });

// Prevent duplicates for the same user and job/scholarship
ApplicationSchema.index({ user: 1, jobId: 1 }, { unique: true, partialFilterExpression: { jobId: { $exists: true, $type: "string" } } });
ApplicationSchema.index({ user: 1, scholarshipId: 1 }, { unique: true, partialFilterExpression: { scholarshipId: { $exists: true } } });

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
