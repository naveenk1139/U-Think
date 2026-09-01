import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string; // e.g., 'React', 'Problem Solving'
  slug: string;
  category?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

SkillSchema.index({ slug: 1 });

export default mongoose.model<ISkill>('Skill', SkillSchema);
