import mongoose, { Document, Schema } from 'mongoose';

export interface IJobRole extends Document {
  careerId: mongoose.Types.ObjectId;
  industryId?: mongoose.Types.ObjectId;
  name: string; // e.g., 'Frontend Developer'
  slug: string;
  description?: string;
  averageSalary?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobRoleSchema: Schema = new Schema({
  careerId: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
  industryId: { type: Schema.Types.ObjectId, ref: 'Industry' },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  averageSalary: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

JobRoleSchema.index({ slug: 1 });
JobRoleSchema.index({ careerId: 1 });

export default mongoose.model<IJobRole>('JobRole', JobRoleSchema);
