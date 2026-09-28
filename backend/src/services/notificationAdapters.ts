import Notification from '../models/Notification.js';
import { sendDeadlineReminderEmail } from './emailService.js';
import { sendDeadlineReminderSms } from './smsService.js';

/**
 * Dispatches an IN-APP notification to the user's dashboard.
 */
export async function dispatchInAppNotification(
  userId: string,
  title: string,
  message: string,
  deadlineCategory: string,
  sourceUrl?: string
): Promise<void> {
  // Convert deadline category to a supported Notification type if needed
  let type = 'general';
  if (deadlineCategory.includes('EXAM')) type = 'exam';
  else if (deadlineCategory.includes('SCHOLARSHIP')) type = 'general'; // Or 'scholarship' if supported
  else type = 'reminder';

  await Notification.create({
    userId,
    title,
    message,
    type,
    isRead: false,
    link: sourceUrl
  });
  
  console.log(`📱 In-App Notification dispatched for User: ${userId}`);
}

/**
 * Dispatches an EMAIL notification via Nodemailer.
 */
export async function dispatchEmailNotification(
  email: string,
  name: string,
  title: string,
  deadlineDate: Date,
  timeRemaining: string,
  category: string,
  sourceUrl?: string
): Promise<void> {
  const requiredAction = `Please take the necessary steps before ${deadlineDate.toLocaleDateString()}.`;
  
  await sendDeadlineReminderEmail(
    email,
    name || 'Student',
    title,
    deadlineDate,
    timeRemaining,
    category,
    requiredAction,
    sourceUrl
  );
}

/**
 * Dispatches an SMS notification via Twilio (Phase 17F).
 */
export async function dispatchSmsNotification(
  mobileNumber: string,
  title: string,
  deadlineDate: Date
): Promise<void> {
  const formattedDate = deadlineDate.toLocaleDateString('en-IN');
  const message = `U-THINK Alert: Your deadline for "${title}" is approaching on ${formattedDate}. Please check your email or dashboard.`;
  
  await sendDeadlineReminderSms(mobileNumber, message);
}
