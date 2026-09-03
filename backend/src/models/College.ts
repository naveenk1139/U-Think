import mongoose, { Schema, Document } from 'mongoose';

export interface ICollege extends Document {
  slug: string;
  canonicalSlug?: string;
  normalizedName?: string;
  collegeId?: string; // Optional alias for sourceId
  source: string; // 'collegedb', 'manual', etc.
  sourceId: string;
  name: string;
  aliases?: string[];
  categories: string[]; // Engineering, Medical, etc.
  subCategory?: string;
  type?: string; // Government, Private, etc.
  institutionType?: string; // University, Affiliated College, Autonomous
  institutionCategory?: string; // Govt, Private, etc.
  ownership?: string; // Government, Government Aided, Private, Deemed, Autonomous
  managementType?: string;
  aisheCode?: string;
  ugcCode?: string;
  aicteCode?: string;
  dteCode?: string;
  itiNcvtCode?: string;
  otherRegulatorIds?: string;
  googlePlaceId?: string;
  googleMapsUrl?: string;
  googleDirectionsUrl?: string;
  statusVerifiedAt?: Date;
  sourceRecordId?: string;
  state: string;
  stateRef?: mongoose.Types.ObjectId;
  district?: string;
  districtRef?: mongoose.Types.ObjectId;
  city?: string;
  cityRef?: mongoose.Types.ObjectId;
  taluk?: string;
  talukRef?: mongoose.Types.ObjectId;
  address?: string;
  pincode?: string;
  status?: string; // ACTIVE, INACTIVE, CLOSED, MERGED, UNVERIFIED
  universityAffiliation?: string;
  approvalBody?: string; // AICTE, UGC, MCI, etc.
  establishedYear?: number;
  courses: string[];
  programs?: string[]; // B.Tech, M.Tech, MBA, etc.
  educationLevels?: string[]; // AFTER_10TH, PUC, DIPLOMA, ITI, UNDERGRADUATE, POSTGRADUATE, PROFESSIONAL, RESEARCH
  specializations: string[];
  description?: string;
  facilities?: string[];
  admissionProcess?: string;
  admissionLink?: string;
  entranceExams: string[];
  acceptedExamsRef?: mongoose.Types.ObjectId[];
  offeredBranchesRef?: mongoose.Types.ObjectId[];
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
  officialWebsiteUrl?: string;
  websiteVerified?: boolean;
  websiteSource?: string;
  websiteVerifiedAt?: Date;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  logoUrl?: string;
  imageUrl?: string;
  imageSourceUrl?: string;
  imageLicense?: string;
  imageLastVerifiedAt?: Date;
  aisheUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
  lastVerifiedAt?: Date;
  verificationStatus?: 'verified' | 'unverified' | 'stale' | 'needs_review' | 'partially_verified' | 'conflicting';
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CollegeSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  canonicalSlug: { type: String },
  normalizedName: { type: String },
  collegeId: { type: String },
  source: { type: String, required: true, default: 'collegedb' },
  sourceId: { type: String, required: true },
  name: { type: String, required: true },
  aliases: [{ type: String }],
  categories: [{ type: String }],
  subCategory: { type: String },
  type: { type: String },
  institutionType: { type: String },
  institutionCategory: { type: String },
  ownership: { type: String },
  managementType: { type: String },
  aisheCode: { type: String },
  ugcCode: { type: String },
  aicteCode: { type: String },
  dteCode: { type: String },
  itiNcvtCode: { type: String },
  otherRegulatorIds: { type: String },
  googlePlaceId: { type: String },
  googleMapsUrl: { type: String },
  googleDirectionsUrl: { type: String },
  statusVerifiedAt: { type: Date },
  sourceRecordId: { type: String },
  state: { type: String, default: 'Karnataka' },
  stateRef: { type: Schema.Types.ObjectId, ref: 'State' },
  district: { type: String },
  districtRef: { type: Schema.Types.ObjectId, ref: 'District' },
  city: { type: String },
  cityRef: { type: Schema.Types.ObjectId, ref: 'City' },
  taluk: { type: String },
  talukRef: { type: Schema.Types.ObjectId, ref: 'Taluk' },
  address: { type: String },
  pincode: { type: String },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'CLOSED', 'MERGED', 'UNVERIFIED'], default: 'ACTIVE' },
  universityAffiliation: { type: String },
  approvalBody: { type: String },
  establishedYear: { type: Number },
  courses: [{ type: String }],
  programs: [{ type: String }],
  educationLevels: [{ type: String }],
  specializations: [{ type: String }],
  description: { type: String },
  facilities: [{ type: String }],
  admissionProcess: { type: String },
  admissionLink: { type: String },
  entranceExams: [{ type: String }],
  acceptedExamsRef: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
  offeredBranchesRef: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
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
  officialWebsiteUrl: { type: String },
  websiteVerified: { type: Boolean, default: false },
  websiteSource: { type: String },
  websiteVerifiedAt: { type: Date },
  phone: { type: String },
  email: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  logoUrl: { type: String },
  imageUrl: { type: String },
  imageSourceUrl: { type: String },
  imageLicense: { type: String },
  imageLastVerifiedAt: { type: Date },
  aisheUrl: { type: String },
  sourceName: { type: String },
  sourceUrl: { type: String },
  lastVerifiedAt: { type: Date },
  verificationStatus: { type: String, enum: ['verified', 'unverified', 'stale', 'needs_review', 'partially_verified', 'conflicting'], default: 'unverified' },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// Add text indexes for search
CollegeSchema.index({ name: 'text', city: 'text', district: 'text', courses: 'text', specializations: 'text', ownership: 'text', universityAffiliation: 'text' });

// Add unique compound index for source and sourceId
CollegeSchema.index({ source: 1, sourceId: 1 }, { unique: true });

// Add helpful indexes
CollegeSchema.index({ state: 1, district: 1 });
CollegeSchema.index({ stateRef: 1, districtRef: 1 });
CollegeSchema.index({ categories: 1 });
CollegeSchema.index({ type: 1 });
CollegeSchema.index({ status: 1 });

export default mongoose.model<ICollege>('College', CollegeSchema);
