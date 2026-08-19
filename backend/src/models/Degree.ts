import mongoose, { Schema, Document } from 'mongoose';

export interface IDegree extends Document {
  degreeId: string;
  name: string;
  level: string; // UG, PG, Diploma, ITI, PhD
  category: string; // Engineering, Medical, Science, etc.
  duration: string;
  eligibility: {
    qualification: string;
    details: string;
  };
  admissionRoutes: string[];
  subjects: string[];
  specializations: string[];
  careers: string[];
  higherStudies: string[];
  overview: string;
}

const DegreeSchema = new Schema(
  {
    degreeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    level: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    duration: { type: String, required: true },
    eligibility: {
      qualification: { type: String },
      details: { type: String }
    },
    admissionRoutes: [{ type: String }],
    subjects: [{ type: String }],
    specializations: [{ type: String }],
    careers: [{ type: String }],
    higherStudies: [{ type: String }],
    overview: { type: String, required: true }
  },
  { timestamps: true }
);

DegreeSchema.index({ name: 'text', category: 'text', specializations: 'text', careers: 'text' });

export default mongoose.model<IDegree>('Degree', DegreeSchema);
