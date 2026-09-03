import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedExam extends Document {
  user_id: mongoose.Types.ObjectId;
  exam_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SavedExamSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    exam_id: { type: Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
  },
  { timestamps: true }
);

// A user can only save an exam once
SavedExamSchema.index({ user_id: 1, exam_id: 1 }, { unique: true });

export default mongoose.model<ISavedExam>('SavedExam', SavedExamSchema);
