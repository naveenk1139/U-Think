import mongoose, { Document, Schema } from 'mongoose';

export interface ISubjectCombination extends Document {
  streamId: mongoose.Types.ObjectId;
  name: string; // e.g., 'PCMB'
  slug: string;
  description?: string;
  duration?: string; // e.g., '2 Years'
  eligibility?: string; // e.g., 'Passed 10th / SSLC or equivalent'
  subjects: mongoose.Types.ObjectId[];
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectCombinationSchema: Schema = new Schema({
  streamId: { type: Schema.Types.ObjectId, ref: 'Stream', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  eligibility: { type: String },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

SubjectCombinationSchema.index({ streamId: 1 });
SubjectCombinationSchema.index({ slug: 1 });

export default mongoose.model<ISubjectCombination>('SubjectCombination', SubjectCombinationSchema);
