import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  streamId?: mongoose.Types.ObjectId;
  name: string; // e.g., 'PCM', 'B.E / B.Tech', 'MBBS'
  slug: string;
  aliases?: string[];
  courseLevel?: string;
  entranceRequired?: boolean;
  sourceName?: string;
  verifiedAt?: Date;
  duration?: string; // e.g., '4 Years'
  eligibility?: string; // e.g., '10+2 with 50%'
  description?: string;
  subjects?: string[];
  eligibleCombinations?: mongoose.Types.ObjectId[];
  shortName?: string;
  courseType?: string;
  degreeType?: string;
  discipline?: string;
  mode?: string[];
  minimumMarks?: string;
  admissionRoute?: string[];
  entranceExams?: mongoose.Types.ObjectId[];
  boardsAccepted?: mongoose.Types.ObjectId[];
  states?: mongoose.Types.ObjectId[];
  academicYears?: mongoose.Types.ObjectId[];
  institutions?: mongoose.Types.ObjectId[];
  branches?: mongoose.Types.ObjectId[];
  specializations?: mongoose.Types.ObjectId[];
  curriculum?: string;
  semesterStructure?: string;
  skills?: mongoose.Types.ObjectId[];
  projects?: mongoose.Types.ObjectId[];
  internships?: mongoose.Types.ObjectId[];
  careerLinks?: mongoose.Types.ObjectId[];
  jobRoles?: mongoose.Types.ObjectId[];
  higherStudyLinks?: mongoose.Types.ObjectId[];
  alternativeCourses?: mongoose.Types.ObjectId[];
  relatedCourses?: mongoose.Types.ObjectId[];
  sourceUrl?: string;
  verificationStatus?: 'VERIFIED' | 'NEEDS_REVIEW' | 'STALE' | 'UNKNOWN';
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
  streamId: { type: Schema.Types.ObjectId, ref: 'Stream' },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  aliases: [{ type: String }],
  courseLevel: { type: String },
  entranceRequired: { type: Boolean },
  sourceName: { type: String },
  verifiedAt: { type: Date },
  duration: { type: String },
  eligibility: { type: String },
  description: { type: String },
  subjects: [{ type: String }],
  eligibleCombinations: [{ type: Schema.Types.ObjectId, ref: 'SubjectCombination' }],
  higherStudyArea: { type: String },
  shortName: { type: String },
  courseType: { type: String },
  degreeType: { type: String },
  discipline: { type: String },
  mode: [{ type: String }],
  minimumMarks: { type: String },
  admissionRoute: [{ type: String }],
  entranceExams: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
  boardsAccepted: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
  states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
  academicYears: [{ type: Schema.Types.ObjectId, ref: 'AcademicYear' }],
  institutions: [{ type: Schema.Types.ObjectId, ref: 'College' }],
  branches: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
  specializations: [{ type: Schema.Types.ObjectId, ref: 'Specialization' }],
  curriculum: { type: String },
  semesterStructure: { type: String },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  internships: [{ type: Schema.Types.ObjectId, ref: 'Internship' }],
  careerLinks: [{ type: Schema.Types.ObjectId, ref: 'Career' }],
  jobRoles: [{ type: Schema.Types.ObjectId, ref: 'JobRole' }],
  higherStudyLinks: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  alternativeCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  relatedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  sourceUrl: { type: String },
  verificationStatus: { type: String, enum: ['VERIFIED', 'NEEDS_REVIEW', 'STALE', 'UNKNOWN'], default: 'UNKNOWN' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

CourseSchema.index({ streamId: 1 });
CourseSchema.index({ slug: 1 });
CourseSchema.index({ name: 1 });

export default mongoose.model<ICourse>('Course', CourseSchema);
