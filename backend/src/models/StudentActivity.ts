import mongoose, { Document, Schema } from 'mongoose';

export interface IStudentActivity extends Document {
  studentId: mongoose.Types.ObjectId;
  activityType: 'VIEWED_COURSE' | 'VIEWED_COLLEGE' | 'VIEWED_CAREER' | 'VIEWED_EXAM' | 'COMPLETED_ASSESSMENT' | 'STARTED_ROADMAP' | 'COMPLETED_ROADMAP_TASK';
  entityId?: mongoose.Types.ObjectId;
  entityType?: 'Course' | 'College' | 'Career' | 'Exam' | 'Assessment' | 'RoadmapTask';
  metadata?: any;
  createdAt: Date;
}

const StudentActivitySchema = new Schema<IStudentActivity>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { 
      type: String, 
      enum: ['VIEWED_COURSE', 'VIEWED_COLLEGE', 'VIEWED_CAREER', 'VIEWED_EXAM', 'COMPLETED_ASSESSMENT', 'STARTED_ROADMAP', 'COMPLETED_ROADMAP_TASK'], 
      required: true 
    },
    entityId: { type: Schema.Types.ObjectId },
    entityType: { type: String, enum: ['Course', 'College', 'Career', 'Exam', 'Assessment', 'RoadmapTask'] },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Indexes for fast querying
StudentActivitySchema.index({ studentId: 1, activityType: 1 });
StudentActivitySchema.index({ studentId: 1, createdAt: -1 });

export const StudentActivity = mongoose.model<IStudentActivity>('StudentActivity', StudentActivitySchema);
