import mongoose, { Document, Schema } from 'mongoose';

export interface ICourseDetail extends Document {
  categoryId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  duration?: string;
  fees?: string;
  keySkills?: string[];
  careerOpportunities?: string[];
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseDetailSchema: Schema = new Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: 'CourseCategory', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  duration: { type: String },
  fees: { type: String },
  keySkills: [{ type: String }],
  careerOpportunities: [{ type: String }],
  description: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CourseDetailSchema.index({ categoryId: 1 });
CourseDetailSchema.index({ slug: 1 });

export default mongoose.model<ICourseDetail>('CourseDetail', CourseDetailSchema);
