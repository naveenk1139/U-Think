import mongoose, { Document, Schema } from 'mongoose';

export interface ISyllabus extends Document {
  boardId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  academicYearId?: mongoose.Types.ObjectId;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SyllabusSchema: Schema = new Schema({
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'SchoolClass', required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
  description: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

SyllabusSchema.index({ boardId: 1, classId: 1, subjectId: 1, academicYearId: 1 }, { unique: true });

export default mongoose.model<ISyllabus>('Syllabus', SyllabusSchema);
