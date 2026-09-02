import mongoose, { Schema, Document } from 'mongoose';

export interface IDataQualityIssue extends Document {
  institutionId?: mongoose.Types.ObjectId;
  issueType: 'Missing Official Website' | 'Missing Fees' | 'Broken URL' | 'Conflicting Data' | 'Unrecognized Affiliation' | 'Other';
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  sourceUrl?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DataQualityIssueSchema = new Schema({
  institutionId: { type: Schema.Types.ObjectId, ref: 'College' },
  issueType: { 
    type: String, 
    enum: ['Missing Official Website', 'Missing Fees', 'Broken URL', 'Conflicting Data', 'Unrecognized Affiliation', 'Other'],
    required: true
  },
  description: { type: String, required: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
  sourceUrl: { type: String },
  resolvedAt: { type: Date }
}, { timestamps: true });

DataQualityIssueSchema.index({ institutionId: 1 });
DataQualityIssueSchema.index({ issueType: 1 });
DataQualityIssueSchema.index({ severity: 1 });
DataQualityIssueSchema.index({ resolvedAt: 1 });

export default mongoose.model<IDataQualityIssue>('DataQualityIssue', DataQualityIssueSchema);
