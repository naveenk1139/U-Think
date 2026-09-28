import mongoose, { Document, Schema } from 'mongoose';

export interface IReminderSchedule extends Document {
  userId: mongoose.Types.ObjectId;
  deadlineId: mongoose.Types.ObjectId;
  
  reminderType: '30_DAYS_BEFORE' | '14_DAYS_BEFORE' | '7_DAYS_BEFORE' | '3_DAYS_BEFORE' | '1_DAY_BEFORE' | 'ON_DEADLINE' | 'CUSTOM';
  scheduledTime: Date;
  
  channel: 'EMAIL' | 'SMS' | 'IN_APP';
  
  status: 'PENDING' | 'QUEUED' | 'PROCESSING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'CANCELLED' | 'SKIPPED';
  
  attemptCount: number;
  lastAttemptAt?: Date;
  nextRetryAt?: Date;
  
  failureReason?: string;
  providerResponse?: string;
  
  // Deduplication key (e.g. userId_deadlineId_reminderType_channel)
  deduplicationKey: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const ReminderScheduleSchema = new Schema<IReminderSchedule>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deadlineId: { type: Schema.Types.ObjectId, ref: 'Deadline', required: true },
    
    reminderType: { 
      type: String, 
      enum: ['30_DAYS_BEFORE', '14_DAYS_BEFORE', '7_DAYS_BEFORE', '3_DAYS_BEFORE', '1_DAY_BEFORE', 'ON_DEADLINE', 'CUSTOM'],
      required: true
    },
    scheduledTime: { type: Date, required: true },
    
    channel: { 
      type: String, 
      enum: ['EMAIL', 'SMS', 'IN_APP'],
      required: true
    },
    
    status: { 
      type: String, 
      enum: ['PENDING', 'QUEUED', 'PROCESSING', 'SENT', 'DELIVERED', 'FAILED', 'CANCELLED', 'SKIPPED'],
      default: 'PENDING'
    },
    
    attemptCount: { type: Number, default: 0 },
    lastAttemptAt: { type: Date },
    nextRetryAt: { type: Date },
    
    failureReason: { type: String },
    providerResponse: { type: String },
    
    deduplicationKey: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Indexes for efficient polling by the scheduler
ReminderScheduleSchema.index({ status: 1, scheduledTime: 1 });
// Indexes for retry logic
ReminderScheduleSchema.index({ status: 1, nextRetryAt: 1 });
// Indexes for fast lookup by user or deadline
ReminderScheduleSchema.index({ userId: 1 });
ReminderScheduleSchema.index({ deadlineId: 1 });

export const ReminderSchedule = mongoose.models.ReminderSchedule || mongoose.model<IReminderSchedule>('ReminderSchedule', ReminderScheduleSchema);
export default ReminderSchedule;
