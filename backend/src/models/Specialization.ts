import mongoose, { Document, Schema } from 'mongoose';

export interface ISpecialization extends Document {
  branchId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SpecializationSchema: Schema = new Schema({
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

SpecializationSchema.index({ branchId: 1 });
SpecializationSchema.index({ slug: 1 });

export default mongoose.model<ISpecialization>('Specialization', SpecializationSchema);
