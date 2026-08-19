import mongoose, { Schema, Document } from 'mongoose';

export interface IMentor extends Document {
  mentorId: string;
  name: string;
  profilePhoto?: string;
  jobTitle: string;
  company: string;
  industry: string;
  education: string;
  specialization: string;
  experience: string; // e.g., "10+ years"
  location: string;
  educationLevels: string[];
  streams: string[];
  courses: string[];
  branches: string[];
  skills: string[];
  careerAreas: string[];
  bio: string;
  availability: 'Available' | 'Busy' | 'Offline';
  verified: boolean;
  mentorType: 'REAL' | 'AI';
}

const MentorSchema = new Schema(
  {
    mentorId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePhoto: { type: String },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    industry: { type: String, required: true },
    education: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    educationLevels: [{ type: String, index: true }],
    streams: [{ type: String, index: true }],
    courses: [{ type: String, index: true }],
    branches: [{ type: String }],
    skills: [{ type: String }],
    careerAreas: [{ type: String }],
    bio: { type: String, required: true },
    availability: { type: String, enum: ['Available', 'Busy', 'Offline'], default: 'Available' },
    verified: { type: Boolean, default: false },
    mentorType: { type: String, enum: ['REAL', 'AI'], required: true }
  },
  { timestamps: true }
);

MentorSchema.index({ name: 'text', jobTitle: 'text', industry: 'text', skills: 'text', company: 'text' });

export default mongoose.model<IMentor>('Mentor', MentorSchema);
