import mongoose, { Schema, Document } from 'mongoose';

export interface IFeeRecord extends Document {
  institution_id: mongoose.Types.ObjectId;
  degree_id: mongoose.Types.ObjectId;
  
  academic_year: string;
  fee_type: string; // e.g. "Government Quota", "Management Quota", "All India Quota", "NRI"
  
  tuition_fee?: number;
  admission_fee?: number;
  exam_fee?: number;
  lab_fee?: number;
  development_fee?: number;
  hostel_fee?: number;
  transport_fee?: number;
  other_fee?: number;

  total_fee: number;
  
  frequency: 'Annual' | 'Semester' | 'One-Time' | 'Course Total';
  
  category?: string; // General, SC/ST, OBC (if fees differ by caste/category)
  quota?: string; // State Quota, All India Quota
  seat_type?: string; // Government Seat in Private College, Private Seat, etc.

  source_url?: string;
  source_name?: string;
  source_document?: string;
  last_verified_at?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

const FeeRecordSchema = new Schema(
  {
    institution_id: { type: Schema.Types.ObjectId, ref: 'College', required: true, index: true },
    degree_id: { type: Schema.Types.ObjectId, ref: 'Degree', required: true, index: true },
    
    academic_year: { type: String, required: true, index: true },
    fee_type: { type: String, required: true },
    
    tuition_fee: { type: Number },
    admission_fee: { type: Number },
    exam_fee: { type: Number },
    lab_fee: { type: Number },
    development_fee: { type: Number },
    hostel_fee: { type: Number },
    transport_fee: { type: Number },
    other_fee: { type: Number },

    total_fee: { type: Number, required: true },
    
    frequency: { 
      type: String, 
      enum: ['Annual', 'Semester', 'One-Time', 'Course Total'], 
      required: true,
      default: 'Annual'
    },
    
    category: { type: String },
    quota: { type: String },
    seat_type: { type: String },

    source_url: { type: String },
    source_name: { type: String },
    source_document: { type: String },
    last_verified_at: { type: Date }
  },
  { timestamps: true }
);

FeeRecordSchema.index({ institution_id: 1, degree_id: 1, academic_year: 1, fee_type: 1 }, { unique: true });

export default mongoose.model<IFeeRecord>('FeeRecord', FeeRecordSchema);
