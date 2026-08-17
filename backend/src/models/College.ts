import mongoose, { Schema, Document } from 'mongoose';

export interface ICollege extends Document {
  collegeId?: string; // Optional alias for sourceId
  source: string; // 'collegedb', 'manual', etc.
  sourceId: string;
  name: string;
  aliases?: string[];
  categories: string[]; // Engineering, Medical, etc.
  subCategory?: string;
  type?: string; // Government, Private, etc.
  institutionType?: string; // University, Affiliated College, Autonomous
  ownership?: string; // Government, Government Aided, Private, Deemed, Autonomous
  state: string;
  district?: string;
  city?: string;
  taluk?: string;
  address?: string;
  pincode?: string;
  universityAffiliation?: string;
  approvalBody?: string; // AICTE, UGC, MCI, etc.
  establishedYear?: number;
  courses: string[];
  programs?: string[]; // B.Tech, M.Tech, MBA, etc.
  specializations: string[];
  description?: string;
  facilities?: string[];
  admissionProcess?: string;
  admissionLink?: string;
  entranceExams: string[];
  eligibility?: string;
  fees?: {
    tuition?: string;
    hostel?: string;
    other?: string;
  };
  hostelAvailable?: boolean;
  scholarshipsAvailable?: boolean;
  placement?: {
    percentage?: number;
    highestPackage?: string;
    avgPackage?: string;
    topRecruiters?: string[];
  };
  accreditation?: string;
  nirfRank?: number;
  website?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  logo?: string;
  sourceName?: string;
  sourceUrl?: string;
  lastVerifiedAt?: Date;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CollegeSchema: Schema = new Schema({
  collegeId: { type: String },
  source: { type: String, required: true, default: 'collegedb' },
  sourceId: { type: String, required: true },
  name: { type: String, required: true },
  aliases: [{ type: String }],
  categories: [{ type: String }],
  subCategory: { type: String },
  type: { type: String },
  institutionType: { type: String },
  ownership: { type: String },
  state: { type: String, default: 'Karnataka' },
  district: { type: String },
  city: { type: String },
  taluk: { type: String },
  address: { type: String },
  pincode: { type: String },
  universityAffiliation: { type: String },
  approvalBody: { type: String },
  establishedYear: { type: Number },
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
    tuition: { type: String },
    hostel: { type: String },
    other: { type: String },
  },
  hostelAvailable: { type: Boolean, default: null },
  scholarshipsAvailable: { type: Boolean, default: null },
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
  lastVerifiedAt: { type: Date },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// Add text indexes for search
CollegeSchema.index({ name: 'text', city: 'text', district: 'text', courses: 'text', specializations: 'text', ownership: 'text', universityAffiliation: 'text' });

// Add unique compound index for source and sourceId
CollegeSchema.index({ source: 1, sourceId: 1 }, { unique: true });

// Add other helpful indexes
CollegeSchema.index({ state: 1, district: 1 });
CollegeSchema.index({ categories: 1 });
CollegeSchema.index({ type: 1 });

export default mongoose.model<ICollege>('College', CollegeSchema);
