import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmissionRoute extends Document {
  name: string; // e.g. Entrance Examination, Merit-based, Direct Admission
  courseId?: mongoose.Types.ObjectId;
  collegeId?: mongoose.Types.ObjectId;
  eligibilityId?: mongoose.Types.ObjectId;
  authority?: string;
  process?: string[];
  documentsRequired?: string[];
  applicationDeadline?: Date;
  admissionDeadline?: Date;
  source?: string;
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionRouteSchema: Schema = new Schema({
  name: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  collegeId: { type: Schema.Types.ObjectId, ref: 'College' },
  eligibilityId: { type: Schema.Types.ObjectId, ref: 'EligibilityRule' },
  authority: { type: String },
  process: [{ type: String }],
  documentsRequired: [{ type: String }],
  applicationDeadline: { type: Date },
  admissionDeadline: { type: Date },
  source: { type: String },
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  active: { type: Boolean, default: true }
}, { timestamps: true });

AdmissionRouteSchema.index({ courseId: 1 });
AdmissionRouteSchema.index({ collegeId: 1 });

export default mongoose.model<IAdmissionRoute>('AdmissionRoute', AdmissionRouteSchema);
