import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  streamId?: mongoose.Types.ObjectId;
  name: string; // e.g., 'PCM', 'B.E / B.Tech', 'MBBS'
  slug: string;
  aliases?: string[];
  courseLevel?: string;
  entranceRequired?: boolean;
  sourceName?: string;
  verifiedAt?: Date;
  duration?: string; // e.g., '4 Years'
  eligibility?: string; // e.g., '10+2 with 50%'
  description?: string;
  subjects?: string[];
  eligibleCombinations?: mongoose.Types.ObjectId[];
  higherStudyArea?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
  streamId: { type: Schema.Types.ObjectId, ref: 'Stream' },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  aliases: [{ type: String }],
  courseLevel: { type: String },
  entranceRequired: { type: Boolean },
  sourceName: { type: String },
  verifiedAt: { type: Date },
  duration: { type: String },
  eligibility: { type: String },
  description: { type: String },
  subjects: [{ type: String }],
  eligibleCombinations: [{ type: Schema.Types.ObjectId, ref: 'SubjectCombination' }],
  higherStudyArea: { type: String },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CourseSchema.index({ streamId: 1 });
CourseSchema.index({ slug: 1 });
CourseSchema.index({ name: 1 });

export default mongoose.model<ICourse>('Course', CourseSchema);
