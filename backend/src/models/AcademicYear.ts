import mongoose, { Document, Schema } from 'mongoose';

export interface IAcademicYear extends Document {
  name: string; // e.g. "2026-2027"
  startDate?: Date;
  endDate?: Date;
  isCurrent: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AcademicYearSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  startDate: { type: Date },
  endDate: { type: Date },
  isCurrent: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IAcademicYear>('AcademicYear', AcademicYearSchema);
