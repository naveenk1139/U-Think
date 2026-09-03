import mongoose, { Document, Schema } from 'mongoose';

export interface IExamSchedule extends Document {
  streamId?: mongoose.Types.ObjectId; // E.g. for "Science", "Commerce"
  examType: string; // e.g., 'Main 2026', 'Improvement 2026'
  subjectName: string;
  date: string;
  time: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExamScheduleSchema: Schema = new Schema({
  streamId: { type: Schema.Types.ObjectId, ref: 'Stream' },
  examType: { type: String, required: true },
  subjectName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

ExamScheduleSchema.index({ streamId: 1 });
ExamScheduleSchema.index({ examType: 1 });

export default mongoose.model<IExamSchedule>('ExamSchedule', ExamScheduleSchema);
