import mongoose, { Document, Schema } from 'mongoose';

export interface ICareerPath extends Document {
  careerId: mongoose.Types.ObjectId;
  startJobRoleId: mongoose.Types.ObjectId;
  nextJobRoles: mongoose.Types.ObjectId[];
  typicalDuration?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CareerPathSchema: Schema = new Schema({
  careerId: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
  startJobRoleId: { type: Schema.Types.ObjectId, ref: 'JobRole', required: true },
  nextJobRoles: [{ type: Schema.Types.ObjectId, ref: 'JobRole' }],
  typicalDuration: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<ICareerPath>('CareerPath', CareerPathSchema);
