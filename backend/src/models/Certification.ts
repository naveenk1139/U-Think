import mongoose, { Document, Schema } from 'mongoose';

export interface ICertification extends Document {
  name: string; 
  slug: string;
  provider?: string;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  provider: { type: String },
  description: { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<ICertification>('Certification', CertificationSchema);
