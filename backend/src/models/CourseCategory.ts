import mongoose, { Document, Schema } from 'mongoose';

export interface ICourseCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CourseCategorySchema.index({ slug: 1 });

export default mongoose.model<ICourseCategory>('CourseCategory', CourseCategorySchema);
