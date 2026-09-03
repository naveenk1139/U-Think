import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  canonical_slug: string;
  exam_name: string;
  short_name?: string;
  
  status: 'ACTIVE' | 'DISCONTINUED' | 'MERGED';
  
  education_level: 'AFTER_10TH' | 'AFTER_12TH' | 'UNDERGRADUATE' | 'AFTER_DEGREE' | 'POSTGRADUATE' | 'PROFESSIONAL' | 'RESEARCH' | 'OTHER';
  minimum_education: string;
  
  streams: ('PCM' | 'PCB' | 'COMMERCE' | 'ARTS' | 'HUMANITIES' | 'VOCATIONAL' | 'ANY_STREAM' | 'OTHER')[];
  exam_categories: string[];
  exam_type: string;
  
  ownership: 'GOVERNMENT' | 'PRIVATE' | 'UNIVERSITY' | 'AUTONOMOUS' | 'OTHER';
  conducting_body: string;
  conducting_body_id?: string;
  
  official_website?: string;
  official_application_url?: string;
  official_information_url?: string;
  
  description?: string;
  eligibility: string;
  
  age_min?: number;
  age_max?: number;
  attempt_limit?: number;
  nationality_requirement?: string;
  reservation_information?: string;
  
  exam_mode: string[];
  exam_frequency: string;
  
  exam_pattern?: string;
  syllabus_url?: string;
  admit_card_url?: string;
  result_url?: string;
  counselling_url?: string;
  
  target_courses: string[];
  target_degrees: string[];
  target_institutions?: string[];
  
  // Provenance
  source_name?: string;
  source_url?: string;
  source_type?: string;
  source_record?: string;
  last_verified_at?: Date;
  verification_status: 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'UNVERIFIED' | 'OUTDATED' | 'CONFLICT' | 'REQUIRES_REVIEW';

  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema(
  {
    canonical_slug: { type: String, required: true, unique: true },
    exam_name: { type: String, required: true },
    short_name: { type: String },
    
    status: { type: String, enum: ['ACTIVE', 'DISCONTINUED', 'MERGED'], default: 'ACTIVE' },
    
    education_level: { 
      type: String, 
      enum: ['AFTER_10TH', 'AFTER_12TH', 'UNDERGRADUATE', 'AFTER_DEGREE', 'POSTGRADUATE', 'PROFESSIONAL', 'RESEARCH', 'OTHER'],
      required: true 
    },
    minimum_education: { type: String, required: true },
    
    streams: [{ 
      type: String,
      enum: ['PCM', 'PCB', 'COMMERCE', 'ARTS', 'HUMANITIES', 'VOCATIONAL', 'ANY_STREAM', 'OTHER']
    }],
    exam_categories: [{ type: String }],
    exam_type: { type: String },
    
    ownership: { 
      type: String,
      enum: ['GOVERNMENT', 'PRIVATE', 'UNIVERSITY', 'AUTONOMOUS', 'OTHER'],
      default: 'GOVERNMENT'
    },
    conducting_body: { type: String, required: true },
    conducting_body_id: { type: String },
    
    official_website: { type: String },
    official_application_url: { type: String },
    official_information_url: { type: String },
    
    description: { type: String },
    eligibility: { type: String, required: true },
    
    age_min: { type: Number },
    age_max: { type: Number },
    attempt_limit: { type: Number },
    nationality_requirement: { type: String },
    reservation_information: { type: String },
    
    exam_mode: [{ type: String }],
    exam_frequency: { type: String },
    
    exam_pattern: { type: String },
    syllabus_url: { type: String },
    admit_card_url: { type: String },
    result_url: { type: String },
    counselling_url: { type: String },
    
    target_courses: [{ type: String }],
    target_degrees: [{ type: String }],
    target_institutions: [{ type: String }],
    
    source_name: { type: String },
    source_url: { type: String },
    source_type: { type: String },
    source_record: { type: String },
    last_verified_at: { type: Date },
    verification_status: { 
      type: String, 
      enum: ['VERIFIED', 'PARTIALLY_VERIFIED', 'UNVERIFIED', 'OUTDATED', 'CONFLICT', 'REQUIRES_REVIEW'],
      default: 'UNVERIFIED'
    },
  },
  { timestamps: true }
);

ExamSchema.index({ exam_name: 'text', short_name: 'text', conducting_body: 'text', description: 'text' });
ExamSchema.index({ education_level: 1 });
ExamSchema.index({ streams: 1 });
ExamSchema.index({ exam_categories: 1 });

export default mongoose.model<IExam>('Exam', ExamSchema);
