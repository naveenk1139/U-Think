import mongoose, { Schema, Document } from 'mongoose';

export interface IExamYear extends Document {
  exam_id: mongoose.Types.ObjectId;
  year: number;
  
  // Registration window
  registration_start?: Date;
  registration_end?: Date;
  correction_window_start?: Date;
  correction_window_end?: Date;
  
  // Exam dates
  admit_card_date?: Date;
  exam_start?: Date;
  exam_end?: Date;
  
  // Post-exam dates
  answer_key_date?: Date;
  result_date?: Date;
  counselling_start?: Date;
  counselling_end?: Date;
  
  official_notification_date?: Date;
  
  // Enums for clarity
  status: 'CONFIRMED' | 'TENTATIVE' | 'EXPECTED' | 'NOT_ANNOUNCED' | 'CLOSED';
  
  // Provenance
  source_name?: string;
  source_url?: string;
  last_verified_at?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

const ExamYearSchema = new Schema(
  {
    exam_id: { type: Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
    year: { type: Number, required: true, index: true },
    
    registration_start: { type: Date },
    registration_end: { type: Date },
    correction_window_start: { type: Date },
    correction_window_end: { type: Date },
    
    admit_card_date: { type: Date },
    exam_start: { type: Date },
    exam_end: { type: Date },
    
    answer_key_date: { type: Date },
    result_date: { type: Date },
    counselling_start: { type: Date },
    counselling_end: { type: Date },
    
    official_notification_date: { type: Date },
    
    status: { 
      type: String, 
      enum: ['CONFIRMED', 'TENTATIVE', 'EXPECTED', 'NOT_ANNOUNCED', 'CLOSED'],
      default: 'NOT_ANNOUNCED'
    },
    
    source_name: { type: String },
    source_url: { type: String },
    last_verified_at: { type: Date },
  },
  { timestamps: true }
);

// Ensure only one record per exam per year
ExamYearSchema.index({ exam_id: 1, year: 1 }, { unique: true });

export default mongoose.model<IExamYear>('ExamYear', ExamYearSchema);
