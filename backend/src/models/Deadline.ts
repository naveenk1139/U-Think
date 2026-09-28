import mongoose, { Document, Schema } from 'mongoose';

export interface IDeadline extends Document {
  title: string;
  description?: string;
  category: 'ENTRANCE_EXAM' | 'EXAM_REGISTRATION' | 'COLLEGE_APPLICATION' | 'SCHOLARSHIP' | 'ADMISSION' | 'COUNSELLING' | 'DOCUMENT_SUBMISSION' | 'COURSE_APPLICATION' | 'INTERNSHIP' | 'CERTIFICATION' | 'OTHER_EDUCATION_DEADLINE';
  
  deadlineDate: Date;
  deadlineTime?: string; // Optional specific time like "23:59"
  timezone: string; // e.g., "Asia/Kolkata"
  
  sourceName?: string;
  sourceUrl?: string;
  sourceType?: string;
  
  lastVerifiedAt?: Date;
  verificationStatus: 'VERIFIED' | 'UNVERIFIED' | 'UNAVAILABLE';
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  
  // Polymorphic relations - allows this deadline to link to existing entities safely
  relatedExam?: mongoose.Types.ObjectId;
  relatedCourse?: mongoose.Types.ObjectId;
  relatedCollege?: mongoose.Types.ObjectId;
  relatedScholarship?: mongoose.Types.ObjectId;
  relatedApplication?: mongoose.Types.ObjectId;
  
  createdAt: Date;
  updatedAt: Date;
}

const DeadlineSchema = new Schema<IDeadline>(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { 
      type: String, 
      enum: ['ENTRANCE_EXAM', 'EXAM_REGISTRATION', 'COLLEGE_APPLICATION', 'SCHOLARSHIP', 'ADMISSION', 'COUNSELLING', 'DOCUMENT_SUBMISSION', 'COURSE_APPLICATION', 'INTERNSHIP', 'CERTIFICATION', 'OTHER_EDUCATION_DEADLINE'],
      required: true
    },
    
    deadlineDate: { type: Date, required: true },
    deadlineTime: { type: String },
    timezone: { type: String, default: 'Asia/Kolkata' },
    
    sourceName: { type: String },
    sourceUrl: { type: String },
    sourceType: { type: String },
    
    lastVerifiedAt: { type: Date },
    verificationStatus: { 
      type: String, 
      enum: ['VERIFIED', 'UNVERIFIED', 'UNAVAILABLE'],
      default: 'UNVERIFIED'
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'CANCELLED', 'EXPIRED'],
      default: 'ACTIVE'
    },
    
    relatedExam: { type: Schema.Types.ObjectId, ref: 'Exam' },
    relatedCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
    relatedCollege: { type: Schema.Types.ObjectId, ref: 'College' },
    relatedScholarship: { type: Schema.Types.ObjectId, ref: 'Scholarship' },
    relatedApplication: { type: Schema.Types.ObjectId, ref: 'Application' }
  },
  { timestamps: true }
);

// Indexes for faster querying of active deadlines
DeadlineSchema.index({ status: 1, deadlineDate: 1 });
DeadlineSchema.index({ category: 1 });
DeadlineSchema.index({ relatedExam: 1 });
DeadlineSchema.index({ relatedCollege: 1 });

export const Deadline = mongoose.models.Deadline || mongoose.model<IDeadline>('Deadline', DeadlineSchema);
export default Deadline;
