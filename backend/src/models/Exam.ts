import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  examId: string;
  slug: string;
  name: string;
  short_name?: string;
  category: string; // Engineering, Medical, Law, etc.
  sub_category?: string;
  level: string; // National, State, University, Institution
  education_stage?: string[]; // After 10th, After 12th, UG, PG, Professional
  description?: string;

  conducting_body?: string;
  official_website_url?: string;
  official_application_url?: string;
  official_notification_url?: string;
  official_brochure_url?: string;
  official_syllabus_url?: string;
  official_counselling_url?: string;

  eligibility?: {
    minimum_qualification?: string;
    required_subjects?: string[];
    minimum_marks?: string;
    age_requirement?: string;
    attempt_rules?: string;
    nationality_rules?: string;
  };

  exam_mode?: string[]; // computer_based, offline, hybrid

  importantDates?: {
    application_start?: Date;
    application_end?: Date;
    correction_start?: Date;
    correction_end?: Date;
    exam_date?: Date;
    result_date?: Date;
    counselling_date?: Date;
  };

  application_fee?: string;
  fee_details?: string;
  
  academic_year?: string;
  status?: string; // Active, Discontinued, TBA, Application Open, Application Closed

  source_id?: string;
  source_url?: string;
  source_name?: string;
  last_verified_at?: Date;

  createdAt?: Date;
  updatedAt?: Date;

  // Legacy fields to not break existing references entirely immediately
  type?: string; 
  ugPg?: string;
  streams?: string[];
  courses?: string[];
  subjects?: string[];
}

const ExamSchema = new Schema(
  {
    examId: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    short_name: { type: String },
    category: { type: String, required: true, index: true },
    sub_category: { type: String },
    level: { type: String, required: true, index: true },
    education_stage: [{ type: String, index: true }],
    description: { type: String },

    conducting_body: { type: String },
    official_website_url: { type: String },
    official_application_url: { type: String },
    official_notification_url: { type: String },
    official_brochure_url: { type: String },
    official_syllabus_url: { type: String },
    official_counselling_url: { type: String },

    eligibility: {
      minimum_qualification: { type: String },
      required_subjects: [{ type: String }],
      minimum_marks: { type: String },
      age_requirement: { type: String },
      attempt_rules: { type: String },
      nationality_rules: { type: String },
    },

    exam_mode: [{ type: String }],

    importantDates: {
      application_start: { type: Date },
      application_end: { type: Date },
      correction_start: { type: Date },
      correction_end: { type: Date },
      exam_date: { type: Date },
      result_date: { type: Date },
      counselling_date: { type: Date },
    },

    application_fee: { type: String },
    fee_details: { type: String },

    academic_year: { type: String, index: true },
    status: { type: String, default: 'Active' },

    source_id: { type: String },
    source_url: { type: String },
    source_name: { type: String },
    last_verified_at: { type: Date },

    // Legacy support fields
    type: { type: String },
    ugPg: { type: String },
    streams: [{ type: String }],
    courses: [{ type: String }],
    subjects: [{ type: String }],
  },
  { timestamps: true }
);

ExamSchema.index({ name: 'text', short_name: 'text', category: 'text', conducting_body: 'text' });

export default mongoose.model<IExam>('Exam', ExamSchema);
