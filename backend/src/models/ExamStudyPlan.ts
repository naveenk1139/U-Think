import mongoose, { Schema, Document } from 'mongoose';

export interface IExamStudyPlan extends Document {
  user: mongoose.Types.ObjectId;
  examId: mongoose.Types.ObjectId;
  targetDate: Date;
  dailyAvailableHours: number;
  schedule: {
    date: Date;
    tasks: {
      durationMinutes: number;
      subject: string;
      topic: string;
      taskType: 'Study' | 'Revision' | 'Practice Test';
      completed: boolean;
    }[];
  }[];
  generatedAt: Date;
}

const ExamStudyPlanSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  targetDate: { type: Date, required: true },
  dailyAvailableHours: { type: Number, required: true },
  schedule: [{
    date: { type: Date, required: true },
    tasks: [{
      durationMinutes: { type: Number, required: true },
      subject: { type: String, required: true },
      topic: { type: String, required: true },
      taskType: { type: String, enum: ['Study', 'Revision', 'Practice Test'], required: true },
      completed: { type: Boolean, default: false }
    }]
  }],
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.ExamStudyPlan || mongoose.model<IExamStudyPlan>('ExamStudyPlan', ExamStudyPlanSchema);
