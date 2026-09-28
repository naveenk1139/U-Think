import cron from 'node-cron';
import { ReminderSchedule } from '../models/ReminderSchedule.js';
import { Deadline } from '../models/Deadline.js';
import { User } from '../models/User.js';
import { dispatchInAppNotification, dispatchEmailNotification, dispatchSmsNotification } from './notificationAdapters.js';

/**
 * PHASE 17C: Deadline scheduling foundation
 * Core Reminder Engine that polls for due reminders and dispatches them.
 * This runs periodically via node-cron.
 */

// We process reminders every minute to ensure timely delivery, 
// but we lock records to prevent duplicate processing.
const BATCH_SIZE = 50;
const MAX_RETRIES = 3;

export const startReminderScheduler = () => {
  console.log('?? Notification Engine: Starting Multi-Channel Reminder Scheduler...');

  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      await processPendingReminders();
    } catch (error) {
      console.error('? Error in reminder scheduler execution:', error);
    }
  });
  
  // Also run retry logic for failed messages every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    try {
      await processRetryQueue();
    } catch (error) {
      console.error('? Error in reminder retry execution:', error);
    }
  });
};

async function processPendingReminders() {
  const now = new Date();
  
  // Find pending reminders where scheduledTime is in the past
  // Use findOneAndUpdate or updateMany to "lock" them by setting status to PROCESSING
  // This prevents multiple cron ticks or instances from picking up the same reminders.
  
  // 1. First, fetch IDs of due reminders
  const dueReminders = await ReminderSchedule.find({
    status: 'PENDING',
    scheduledTime: { $lte: now }
  })
  .limit(BATCH_SIZE)
  .select('_id')
  .lean();

  if (!dueReminders.length) return;

  const reminderIds = dueReminders.map(r => r._id);

  // 2. Lock them transactionally
  await ReminderSchedule.updateMany(
    { _id: { $in: reminderIds }, status: 'PENDING' },
    { $set: { status: 'PROCESSING', updatedAt: new Date() } }
  );

  // 3. Process the locked batch
  const remindersToProcess = await ReminderSchedule.find({
    _id: { $in: reminderIds },
    status: 'PROCESSING'
  }).populate('deadlineId');

  for (const reminder of remindersToProcess) {
    try {
      const deadline = reminder.deadlineId as any; // Cast for now, will type properly later
      
      // Verify deadline is still active
      if (deadline && (deadline.status === 'CANCELLED' || deadline.status === 'EXPIRED')) {
        reminder.status = 'CANCELLED';
        reminder.failureReason = `Deadline was ${deadline.status.toLowerCase()}`;
        await reminder.save();
        continue;
      }

      // Fetch user to get email/mobile and preferences
      const user = await User.findById(reminder.userId).lean() as any;
      if (!user) {
        throw new Error(`User not found for reminder ${reminder._id}`);
      }

      const timeRemaining = reminder.reminderType.replace('_BEFORE', '').replace(/_/g, ' ');
      const userChannels = user.settings?.notifications?.channels || { email: true, sms: false, inApp: true };

      // Dispatch based on channel
      if (reminder.channel === 'IN_APP') {
        if (userChannels.inApp === false) {
          reminder.status = 'SKIPPED';
          reminder.failureReason = 'User disabled IN_APP notifications';
        } else {
          const message = `Reminder: ${deadline.title} is approaching in ${timeRemaining}.`;
          await dispatchInAppNotification(
            user._id.toString(),
            deadline.title,
            message,
            deadline.category,
            deadline.sourceUrl
          );
          reminder.status = 'SENT';
        }
      } else if (reminder.channel === 'EMAIL') {
        if (userChannels.email === false) {
          reminder.status = 'SKIPPED';
          reminder.failureReason = 'User disabled EMAIL notifications';
        } else {
          if (!user.email) throw new Error('User has no email address');
          await dispatchEmailNotification(
            user.email,
            user.name,
            deadline.title,
            deadline.deadlineDate,
            timeRemaining,
            deadline.category,
            deadline.sourceUrl
          );
          reminder.status = 'SENT';
        }
      } else if (reminder.channel === 'SMS') {
        if (userChannels.sms === false) {
          reminder.status = 'SKIPPED';
          reminder.failureReason = 'User disabled SMS notifications';
        } else {
          if (!user.mobile) throw new Error('User has no mobile number');
          await dispatchSmsNotification(
            user.mobile,
            deadline.title,
            deadline.deadlineDate
          );
          reminder.status = 'SENT';
        }
      }

      await reminder.save();

      
    } catch (error: any) {
      console.error(`Failed to process reminder ${reminder._id}:`, error);
      await markReminderFailed(reminder, error.message);
    }
  }
}

async function processRetryQueue() {
  const now = new Date();
  
  // Find FAILED messages that have not exceeded MAX_RETRIES and are due for retry
  const retryReminders = await ReminderSchedule.find({
    status: 'FAILED',
    attemptCount: { $lt: MAX_RETRIES },
    nextRetryAt: { $lte: now }
  }).limit(BATCH_SIZE);

  for (const reminder of retryReminders) {
    // Put them back to PENDING so the main processor picks them up immediately
    reminder.status = 'PENDING';
    reminder.nextRetryAt = undefined; // clear retry time
    await reminder.save();
  }
}

async function markReminderFailed(reminder: any, errorMessage: string) {
  reminder.attemptCount += 1;
  reminder.failureReason = errorMessage;
  
  if (reminder.attemptCount >= MAX_RETRIES) {
    reminder.status = 'FAILED';
    // Permanent failure, no retry scheduled
  } else {
    reminder.status = 'FAILED';
    // Schedule retry with exponential backoff (e.g., 15 mins, 60 mins, etc.)
    const backoffMinutes = Math.pow(4, reminder.attemptCount) * 15; // 15, 60, 240
    reminder.nextRetryAt = new Date(Date.now() + backoffMinutes * 60000);
  }
  
  await reminder.save();
}
