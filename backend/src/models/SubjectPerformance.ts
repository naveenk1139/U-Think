import mongoose, { Schema, Document } from 'mongoose';

export interface ISubjectPerformance extends Document {
  user: mongoose.Types.ObjectId;
  examId?: mongoose.Types.ObjectId;
  subjectName: string;
  topicName?: string;
  scorePercentage: number;
  evidenceSource: 'Assessment' | 'Practice Test' | 'Self-Reported' | 'Official Exam';
  lastEvaluatedAt: Date;
  weaknessIdentified: boolean;
  rootCause?: string;
  recommendedPractice?: string;
}

const SubjectPerformanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  examId: { type: Schema.Types.ObjectId, ref: 'Exam' },
  subjectName: { type: String, required: true },
  topicName: { type: String },
  scorePercentage: { type: Number, required: true, min: 0, max: 100 },
  evidenceSource: { type: String, enum: ['Assessment', 'Practice Test', 'Self-Reported', 'Official Exam'], required: true },
  lastEvaluatedAt: { type: Date, default: Date.now },
  weaknessIdentified: { type: Boolean, default: false },
  rootCause: { type: String },
  recommendedPractice: { type: String }
}, { timestamps: true });

export default mongoose.models.SubjectPerformance || mongoose.model<ISubjectPerformance>('SubjectPerformance', SubjectPerformanceSchema);
