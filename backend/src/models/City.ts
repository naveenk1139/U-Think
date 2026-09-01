import mongoose, { Document, Schema } from 'mongoose';

export interface ICity extends Document {
  name: string;
  slug: string;
  talukId?: mongoose.Types.ObjectId;
  districtId: mongoose.Types.ObjectId;
  stateId: mongoose.Types.ObjectId;
  pinCodes?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  talukId: { type: Schema.Types.ObjectId, ref: 'Taluk' },
  districtId: { type: Schema.Types.ObjectId, ref: 'District', required: true },
  stateId: { type: Schema.Types.ObjectId, ref: 'State', required: true },
  pinCodes: [{ type: String }],
  active: { type: Boolean, default: true },
}, { timestamps: true });

CitySchema.index({ districtId: 1 });
CitySchema.index({ talukId: 1 });
CitySchema.index({ name: 1 });

export default mongoose.model<ICity>('City', CitySchema);
