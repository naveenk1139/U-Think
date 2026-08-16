import mongoose, { Schema, Document } from 'mongoose';

export interface ICollege extends Document {
  name: string;
  categories: string[]; // Engineering, Medical, etc.
  subCategory?: string;
  type: string; // Government, Private, etc.
  institutionType?: string; // University, Affiliated College, Autonomous
  ownership?: string; // Government, Government Aided, Private, Deemed, Autonomous
  state: string;
  district: string;
  city: string;
  taluk?: string;
  address: string;
  pincode?: string;
  universityAffiliation: string;
  approvalBody?: string; // AICTE, UGC, MCI, etc.
  establishedYear: number;
  courses: string[];
  programs?: string[]; // B.Tech, M.Tech, MBA, etc.
  specializations: string[];
  description?: string;
  facilities?: string[];
  admissionProcess: string;
  admissionLink?: string;
  entranceExams: string[];
  eligibility: string;
  fees: {
    tuition: string;
    hostel: string;
    other: string;
  };
  hostelAvailable: boolean;
  scholarshipsAvailable: boolean;
  placement: {
    percentage: number;
    highestPackage: string;
    avgPackage: string;
    topRecruiters: string[];
  };
  accreditation: string;
  nirfRank?: number;
  website: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  image: string;
  logo: string;
  sourceName?: string;
  sourceUrl?: string;
  verifiedAt?: Date;
  isVerified?: boolean;
}

const CollegeSchema: Schema = new Schema({
  name: { type: String, required: true },
  categories: [{ type: String, required: true }],
  subCategory: { type: String },
  type: { type: String, required: true },
  institutionType: { type: String },
  ownership: { type: String },
  state: { type: String, default: 'Karnataka' },
  district: { type: String, required: true },
  city: { type: String, required: true },
  taluk: { type: String },
  address: { type: String, required: true },
  pincode: { type: String },
  universityAffiliation: { type: String, required: true },
  approvalBody: { type: String },
  establishedYear: { type: Number, required: true },
  courses: [{ type: String }],
  programs: [{ type: String }],
  specializations: [{ type: String }],
  description: { type: String },
  facilities: [{ type: String }],
  admissionProcess: { type: String },
  admissionLink: { type: String },
  entranceExams: [{ type: String }],
  eligibility: { type: String },
  fees: {
    tuition: { type: String, required: true },
    hostel: { type: String },
    other: { type: String },
  },
  hostelAvailable: { type: Boolean, default: true },
  scholarshipsAvailable: { type: Boolean, default: true },
  placement: {
    percentage: { type: Number },
    highestPackage: { type: String },
    avgPackage: { type: String },
    topRecruiters: [{ type: String }],
  },
  accreditation: { type: String },
  nirfRank: { type: Number },
  website: { type: String },
  phone: { type: String },
  email: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  image: { type: String },
  logo: { type: String },
  sourceName: { type: String },
  sourceUrl: { type: String },
  verifiedAt: { type: Date },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// Add text indexes for search
CollegeSchema.index({ name: 'text', city: 'text', district: 'text', courses: 'text', specializations: 'text', ownership: 'text', universityAffiliation: 'text' });

export default mongoose.model<ICollege>('College', CollegeSchema);
