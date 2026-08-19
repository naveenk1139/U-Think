import mongoose, { Schema, Document } from 'mongoose';

export interface IMentorSession extends Document {
  mentorId: string;
  studentId: string;
  requestedAt: Date;
  date: string;
  time: string;
  topic: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed' | 'Cancelled';
  notes?: string;
}

const MentorSessionSchema = new Schema(
  {
    mentorId: { type: Schema.Types.ObjectId, ref: 'Mentor', required: true },
    studentId: { type: String, required: true, index: true },
    requestedAt: { type: Date, default: Date.now },
    date: { type: String, required: true },
    time: { type: String, required: true },
    topic: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'], default: 'Pending' },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IMentorSession>('MentorSession', MentorSessionSchema);
