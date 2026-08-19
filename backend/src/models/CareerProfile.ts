import mongoose, { Schema, Document } from 'mongoose';

export interface ICareerProfile extends Document {
  careerName: string;
  description: string;
  targetEducationLevels: string[];
  requiredDimensions: Record<string, number>; // e.g. { analytical: 80, technical: 90 }
  recommendedCourses: string[];
  entranceExams: string[];
  roadmap: string[];
}

const CareerProfileSchema = new Schema(
  {
    careerName: { type: String, required: true },
    description: { type: String, required: true },
    targetEducationLevels: [{ type: String, required: true }],
    requiredDimensions: { type: Map, of: Number, required: true },
    recommendedCourses: [{ type: String }],
    entranceExams: [{ type: String }],
    roadmap: [{ type: String }]
  },
  { timestamps: true }
);

CareerProfileSchema.index({ targetEducationLevels: 1 });
CareerProfileSchema.index({ careerName: 1 });

export default mongoose.model<ICareerProfile>('CareerProfile', CareerProfileSchema);
