import mongoose, { Schema, Document } from 'mongoose';

export interface IExamDegreeMap extends Document {
  exam_id: mongoose.Types.ObjectId;
  degree_id: mongoose.Types.ObjectId;
  institution_id?: mongoose.Types.ObjectId; // Optional, if this mapping is specific to an institution
  
  eligibility_condition?: string; // e.g. "Only for B.Tech in Karnataka colleges"
  mandatory_or_optional: 'Mandatory' | 'Optional' | 'Alternative';
  admission_role: 'Entrance Exam' | 'Eligibility Exam' | 'Recruitment Exam' | 'Fellowship Exam' | 'Professional Exam';

  source_url?: string;
  last_verified_at?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

const ExamDegreeMapSchema = new Schema(
  {
    exam_id: { type: Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
    degree_id: { type: Schema.Types.ObjectId, ref: 'Degree', required: true, index: true },
    institution_id: { type: Schema.Types.ObjectId, ref: 'College', index: true },
    
    eligibility_condition: { type: String },
    mandatory_or_optional: { 
      type: String, 
      enum: ['Mandatory', 'Optional', 'Alternative'], 
      required: true,
      default: 'Mandatory'
    },
    admission_role: { 
      type: String, 
      enum: ['Entrance Exam', 'Eligibility Exam', 'Recruitment Exam', 'Fellowship Exam', 'Professional Exam'], 
      required: true,
      default: 'Entrance Exam'
    },

    source_url: { type: String },
    last_verified_at: { type: Date }
  },
  { timestamps: true }
);

// Prevent exact duplicate mappings
ExamDegreeMapSchema.index({ exam_id: 1, degree_id: 1, institution_id: 1 }, { unique: true });

export default mongoose.model<IExamDegreeMap>('ExamDegreeMap', ExamDegreeMapSchema);
