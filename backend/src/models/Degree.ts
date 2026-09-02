import mongoose, { Schema, Document } from 'mongoose';

export interface IDegree extends Document {
  degreeId: string;
  slug: string;
  name: string; // e.g. Bachelor of Technology in Computer Science
  short_name?: string; // e.g. B.Tech CSE
  degree_type?: string; // B.Tech, B.Sc, MBBS
  level: string; // UG, PG, Diploma, ITI, PhD
  discipline?: string; // Engineering, Medical, Science, etc.
  stream?: string; // e.g. Engineering & Technology
  branch?: string; // e.g. Computer Science
  specialization?: string; // e.g. Artificial Intelligence

  duration: number;
  duration_unit: string; // Years, Months, Semesters
  mode?: string[]; // Full-time, Part-time, Online, Distance

  eligibility?: {
    required_subjects?: string[];
    minimum_marks?: string;
    age_requirement?: string;
    details?: string;
  };

  entrance_required?: boolean;
  admission_method?: string[]; // Entrance Exam, Merit, Management Quota, Lateral Entry

  recognition?: {
    regulator?: string; // UGC, AICTE, NMC, BCI, etc.
    awarding_body?: string; // University, Institution
  };

  description?: string;
  curriculum_summary?: string;

  career_options?: string[];
  higher_study_options?: string[];

  source_id?: string;
  source_url?: string;
  last_verified_at?: Date;

  createdAt?: Date;
  updatedAt?: Date;

  // Legacy fields
  category?: string;
  admissionRoutes?: string[];
  subjects?: string[];
  specializations?: string[];
  careers?: string[];
  higherStudies?: string[];
  overview?: string;
}

const DegreeSchema = new Schema(
  {
    degreeId: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    short_name: { type: String },
    degree_type: { type: String, index: true },
    level: { type: String, required: true, index: true },
    discipline: { type: String, index: true },
    stream: { type: String, index: true },
    branch: { type: String, index: true },
    specialization: { type: String },

    duration: { type: Number, required: true },
    duration_unit: { type: String, required: true, default: 'Years' },
    mode: [{ type: String }],

    eligibility: {
      required_subjects: [{ type: String }],
      minimum_marks: { type: String },
      age_requirement: { type: String },
      details: { type: String }
    },

    entrance_required: { type: Boolean, default: false },
    admission_method: [{ type: String }],

    recognition: {
      regulator: { type: String },
      awarding_body: { type: String }
    },

    description: { type: String },
    curriculum_summary: { type: String },

    career_options: [{ type: String }],
    higher_study_options: [{ type: String }],

    source_id: { type: String },
    source_url: { type: String },
    last_verified_at: { type: Date },

    // Legacy fields
    category: { type: String },
    admissionRoutes: [{ type: String }],
    subjects: [{ type: String }],
    specializations: [{ type: String }],
    careers: [{ type: String }],
    higherStudies: [{ type: String }],
    overview: { type: String }
  },
  { timestamps: true }
);

DegreeSchema.index({ name: 'text', short_name: 'text', discipline: 'text', branch: 'text', specialization: 'text' });

export default mongoose.model<IDegree>('Degree', DegreeSchema);
