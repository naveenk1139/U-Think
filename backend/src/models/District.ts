import mongoose, { Document, Schema } from 'mongoose';

export interface IDistrict extends Document {
  name: string;
  slug: string;
  stateId: mongoose.Types.ObjectId;
  division?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DistrictSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  stateId: { type: Schema.Types.ObjectId, ref: 'State', required: true },
  division: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

DistrictSchema.index({ stateId: 1 });
DistrictSchema.index({ name: 1 });

export default mongoose.model<IDistrict>('District', DistrictSchema);
