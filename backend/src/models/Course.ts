import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  slug: string;
  type?: string; // 'Course', 'Combination', 'Specialization', 'Branch', 'Trade'
  category?: string;
  subCategory?: string;
  level?: string;
  stream?: string; // Legacy/slug ref
  streamId?: mongoose.Types.ObjectId; // Proper reference to Stream
  parentId?: mongoose.Types.ObjectId; // Self-referential for hierarchical courses
  combination?: string;
  description?: string;
  overview?: string;
  whoShouldChoose?: string[];
  subjects?: string[];
  practicalComponents?: string[];
  duration?: string;
  eligibility?: string;
  admissionRoute?: string[];
  entranceExams?: string[];
  fees?: string;
  scholarships?: string[];
  skills?: string[];
  tools?: string[];
  certifications?: string[];
  internships?: string[];
  apprenticeship?: string[];
  higherEducation?: string[];
  specializations?: string[];
  careers?: string[];
  jobRoles?: string[];
  industries?: string[];
  institutions?: string[];
  location?: string[];
  officialWebsite?: string;
  source?: string;
  sourceUrl?: string;
  verificationStatus?: 'DRAFT' | 'UNVERIFIED' | 'VERIFIED' | 'EXPIRED' | 'REQUIRES_REVIEW';
  lastVerified?: Date;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String },
  category: { type: String },
  subCategory: { type: String },
  level: { type: String },
  stream: { type: String },
  streamId: { type: Schema.Types.ObjectId, ref: 'Stream' },
  parentId: { type: Schema.Types.ObjectId, ref: 'Course' },
  combination: { type: String },
  description: { type: String },
  overview: { type: String },
  whoShouldChoose: [{ type: String }],
  subjects: [{ type: String }],
  practicalComponents: [{ type: String }],
  duration: { type: String },
  eligibility: { type: String },
  admissionRoute: [{ type: String }],
  entranceExams: [{ type: String }],
  fees: { type: String },
  scholarships: [{ type: String }],
  skills: [{ type: String }],
  tools: [{ type: String }],
  certifications: [{ type: String }],
  internships: [{ type: String }],
  apprenticeship: [{ type: String }],
  higherEducation: [{ type: String }],
  specializations: [{ type: String }],
  careers: [{ type: String }],
  jobRoles: [{ type: String }],
  industries: [{ type: String }],
  institutions: [{ type: String }],
  location: [{ type: String }],
  officialWebsite: { type: String },
  source: { type: String },
  sourceUrl: { type: String },
  verificationStatus: { type: String, enum: ['DRAFT', 'UNVERIFIED', 'VERIFIED', 'EXPIRED', 'REQUIRES_REVIEW'], default: 'UNVERIFIED' },
  lastVerified: { type: Date },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

CourseSchema.index({ category: 1 });
CourseSchema.index({ name: 1 });
CourseSchema.index({ streamId: 1 });
CourseSchema.index({ parentId: 1 });

export default mongoose.model<ICourse>('Course', CourseSchema);
