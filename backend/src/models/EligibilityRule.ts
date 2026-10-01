import mongoose, { Document, Schema } from 'mongoose';

export interface IEligibilityRule extends Document {
  targetId: mongoose.Types.ObjectId; // Course, Branch, College
  targetType: string;
  boardId?: mongoose.Types.ObjectId;
  stateId?: mongoose.Types.ObjectId;
  academicYearId?: mongoose.Types.ObjectId;
  requiredEducationLevel?: string;
  requiredSubjects?: string[];
  minimumMarks?: number;
  requiredEntranceExamId?: mongoose.Types.ObjectId;
  minimumEntranceScore?: number;
  requiredQualification?: string;
  category?: string; // General, OBC, SC, ST
  otherConditions?: string[];
  source?: string;
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  lastVerifiedAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EligibilityRuleSchema: Schema = new Schema({
  targetId: { type: Schema.Types.ObjectId, required: true, refPath: 'targetType' },
  targetType: { type: String, required: true, enum: ['Course', 'Branch', 'College', 'Specialization'] },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  stateId: { type: Schema.Types.ObjectId, ref: 'State' },
  academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
  requiredEducationLevel: { type: String },
  requiredSubjects: [{ type: String }],
  minimumMarks: { type: Number },
  requiredEntranceExamId: { type: Schema.Types.ObjectId, ref: 'Exam' },
  minimumEntranceScore: { type: Number },
  requiredQualification: { type: String },
  category: { type: String, default: 'General' },
  otherConditions: [{ type: String }],
  source: { type: String },
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  lastVerifiedAt: { type: Date },
  active: { type: Boolean, default: true }
}, { timestamps: true });

EligibilityRuleSchema.index({ targetId: 1, targetType: 1 });
EligibilityRuleSchema.index({ boardId: 1, stateId: 1, academicYearId: 1 });

export default mongoose.model<IEligibilityRule>('EligibilityRule', EligibilityRuleSchema);
