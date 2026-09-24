import mongoose, { Document, Schema } from 'mongoose';

export interface IEducationPathRelation extends Document {
  sourceType: string; // e.g., 'EducationLevel', 'Pathway', 'Stream', 'SubjectCombination', 'Degree'
  sourceId: mongoose.Types.ObjectId;
  targetType: string; // e.g., 'Stream', 'SubjectCombination', 'Degree', 'Exam', 'Career'
  targetId: mongoose.Types.ObjectId;
  relationType: 'REQUIRES' | 'ENABLES' | 'LEADS_TO' | 'ALTERNATIVE_TO' | 'PREREQUISITE' | 'ELIGIBLE_FOR' | 'NOT_ELIGIBLE_FOR' | 'CAN_SWITCH_TO' | 'BLOCKED_BY' | 'NEXT_STEP';
  
  // Rule Engine Constraints
  minScoreRequired?: number; // Minimum percentage
  specificSubjectsRequired?: string[];
  entranceExamRequired?: boolean;
  entranceExamIds?: mongoose.Types.ObjectId[];
  
  // Simulation & UI Metadata
  description?: string;
  sourceName?: string; // Where this rule came from (e.g., KEA, UGC)
  sourceUrl?: string;
  isVerified: boolean;
  lastVerifiedAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

const EducationPathRelationSchema: Schema = new Schema({
  sourceType: { type: String, required: true, enum: ['EducationLevel', 'Pathway', 'Stream', 'SubjectCombination', 'Course', 'Degree', 'Branch', 'Exam', 'Career', 'College'] },
  sourceId: { type: Schema.Types.ObjectId, required: true, refPath: 'sourceType' },
  
  targetType: { type: String, required: true, enum: ['EducationLevel', 'Pathway', 'Stream', 'SubjectCombination', 'Course', 'Degree', 'Branch', 'Exam', 'Career', 'College'] },
  targetId: { type: Schema.Types.ObjectId, required: true, refPath: 'targetType' },
  
  relationType: { 
    type: String, 
    required: true, 
    enum: ['REQUIRES', 'ENABLES', 'LEADS_TO', 'ALTERNATIVE_TO', 'PREREQUISITE', 'ELIGIBLE_FOR', 'NOT_ELIGIBLE_FOR', 'CAN_SWITCH_TO', 'BLOCKED_BY', 'NEXT_STEP'] 
  },
  
  minScoreRequired: { type: Number },
  specificSubjectsRequired: [{ type: String }],
  entranceExamRequired: { type: Boolean, default: false },
  entranceExamIds: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
  
  description: { type: String },
  sourceName: { type: String },
  sourceUrl: { type: String },
  isVerified: { type: Boolean, default: false },
  lastVerifiedAt: { type: Date },
}, { timestamps: true });

// Compound indexes for rapid graph traversal
EducationPathRelationSchema.index({ sourceId: 1, targetId: 1, relationType: 1 }, { unique: true });
EducationPathRelationSchema.index({ sourceId: 1, relationType: 1 });
EducationPathRelationSchema.index({ targetId: 1, relationType: 1 });

export default mongoose.model<IEducationPathRelation>('EducationPathRelation', EducationPathRelationSchema);
