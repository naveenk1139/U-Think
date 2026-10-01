import mongoose from 'mongoose';
import { io } from '../index.js';
import Notification, { INotification } from '../models/Notification.js';

interface SendNotificationArgs {
  userId: string | mongoose.Types.ObjectId;
  title: string;
  message: string;
  type?: 'system' | 'reminder' | 'pathway' | 'exam' | 'general';
  link?: string;
}

export const sendNotification = async ({ userId, title, message, type = 'general', link }: SendNotificationArgs): Promise<INotification | null> => {
  try {
    // 1. Save to Database
    const notification = new Notification({
      userId,
      title,
      message,
      type,
      link,
      isRead: false
    });
    await notification.save();

    // 2. Broadcast via Socket.IO
    io.to(userId.toString()).emit('new_notification', notification);

    return notification;
  } catch (error) {
    console.error('Error sending notification:', error);
    return null;
  }
};
