import mongoose, { Document, Schema } from 'mongoose';

export interface ITaluk extends Document {
  name: string;
  slug: string;
  districtId: mongoose.Types.ObjectId;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TalukSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  districtId: { type: Schema.Types.ObjectId, ref: 'District', required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

TalukSchema.index({ districtId: 1 });
TalukSchema.index({ name: 1 });

export default mongoose.model<ITaluk>('Taluk', TalukSchema);
