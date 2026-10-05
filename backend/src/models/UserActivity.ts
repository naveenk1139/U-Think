import mongoose, { Document, Schema } from 'mongoose';

export type ActivityType =
  | 'college_viewed'
  | 'course_viewed'
  | 'career_viewed'
  | 'exam_viewed'
  | 'job_viewed'
  | 'pathway_viewed'
  | 'saved_item';

export interface IUserActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: ActivityType;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const UserActivitySchema = new Schema<IUserActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['college_viewed', 'course_viewed', 'career_viewed', 'exam_viewed', 'job_viewed', 'pathway_viewed', 'saved_item'],
      required: true,
      index: true
    },
    entityType: { type: String },
    entityId: { type: String },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

UserActivitySchema.index({ userId: 1, type: 1, createdAt: -1 });

export default mongoose.models.UserActivity || mongoose.model<IUserActivity>('UserActivity', UserActivitySchema);
