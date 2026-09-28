import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
  chapterId: mongoose.Types.ObjectId;
  name: string;
  order: number;
  description?: string;
  learningOutcomes?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema: Schema = new Schema({
  chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
  description: { type: String },
  learningOutcomes: [{ type: String }],
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<ITopic>('Topic', TopicSchema);
