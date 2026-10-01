import mongoose, { Document, Schema } from 'mongoose';

export interface ISubject extends Document {
  name: string; // e.g., 'Physics', 'Chemistry', 'Mathematics'
  slug: string;
  description?: string;
  boardId?: mongoose.Types.ObjectId;
  stateId?: mongoose.Types.ObjectId;
  academicYearId?: mongoose.Types.ObjectId;
  educationLevelId?: mongoose.Types.ObjectId; // Maps to educationStage
  class?: string;
  stream?: string;
  units?: string[];
  chapters?: string[];
  topics?: string[];
  learningOutcomes?: string[];
  prerequisites?: string[];
  assessment?: string;
  relatedCourses?: mongoose.Types.ObjectId[];
  requiredFor?: mongoose.Types.ObjectId[];
  source?: string;
  lastVerifiedAt?: Date;
  syllabusWeightage?: string;
  practicalComponent?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  stateId: { type: Schema.Types.ObjectId, ref: 'State' },
  academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
  educationLevelId: { type: Schema.Types.ObjectId, ref: 'EducationLevel' },
  class: { type: String },
  stream: { type: String },
  units: [{ type: String }],
  chapters: [{ type: String }],
  topics: [{ type: String }],
  learningOutcomes: [{ type: String }],
  prerequisites: [{ type: String }],
  assessment: { type: String },
  relatedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  requiredFor: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  source: { type: String },
  lastVerifiedAt: { type: Date },
  syllabusWeightage: { type: String },
  practicalComponent: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

SubjectSchema.index({ boardId: 1, stateId: 1, academicYearId: 1 });

export default mongoose.model<ISubject>('Subject', SubjectSchema);
