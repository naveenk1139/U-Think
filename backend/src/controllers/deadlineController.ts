import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Deadline } from '../models/Deadline.js';
import { ReminderSchedule } from '../models/ReminderSchedule.js';
import { User } from '../models/User.js';

// Get all active deadlines, sorted by approaching date
export const getUpcomingDeadlines = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter: any = { status: 'ACTIVE', deadlineDate: { $gte: new Date() } };
    
    if (category) {
      filter.category = category;
    }

    const deadlines = await Deadline.find(filter)
      .sort({ deadlineDate: 1 })
      .limit(50)
      .lean();

    res.status(200).json({ success: true, deadlines });
  } catch (error: any) {
    console.error('Error fetching deadlines:', error);
    res.status(500).json({ success: false, message: 'Server error fetching deadlines' });
  }
};

// Admin: Create a new deadline
export const createDeadline = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title, description, category, deadlineDate, deadlineTime,
      sourceName, sourceUrl, relatedExam, relatedCollege, relatedScholarship
    } = req.body;

    const deadline = new Deadline({
      title,
      description,
      category,
      deadlineDate: new Date(deadlineDate),
      deadlineTime,
      sourceName,
      sourceUrl,
      relatedExam,
      relatedCollege,
      relatedScholarship
    });

    await deadline.save();
    res.status(201).json({ success: true, deadline });
  } catch (error: any) {
    console.error('Error creating deadline:', error);
    res.status(500).json({ success: false, message: 'Server error creating deadline' });
  }
};

// User: Subscribe to a deadline (Queue up reminders)
export const subscribeToDeadline = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id: deadlineId } = req.params;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const deadline = await Deadline.findById(deadlineId);
    if (!deadline) {
      res.status(404).json({ success: false, message: 'Deadline not found' });
      return;
    }

    if (deadline.deadlineDate < new Date()) {
      res.status(400).json({ success: false, message: 'Deadline has already passed' });
      return;
    }

    // Determine the scheduled times for reminders
    const now = new Date();
    const reminderTypes: { type: string, daysBefore: number }[] = [
      { type: '7_DAYS_BEFORE', daysBefore: 7 },
      { type: '3_DAYS_BEFORE', daysBefore: 3 },
      { type: '1_DAY_BEFORE', daysBefore: 1 }
    ];

    const newSchedules = [];

    // User preferences determine which channels get queued
    const user = await User.findById(userId).select('settings').lean() as any;
    const prefs = user?.settings?.notifications?.channels || { email: true, inApp: true, sms: false };
    
    const activeChannels = [];
    if (prefs.email) activeChannels.push('EMAIL');
    if (prefs.inApp) activeChannels.push('IN_APP');
    if (prefs.sms) activeChannels.push('SMS');

    for (const { type, daysBefore } of reminderTypes) {
      const scheduledTime = new Date(deadline.deadlineDate);
      scheduledTime.setDate(scheduledTime.getDate() - daysBefore);

      // Only schedule if the reminder time is in the future
      if (scheduledTime > now) {
        for (const channel of activeChannels) {
          const deduplicationKey = `${userId}_${deadlineId}_${type}_${channel}`;
          
          // Use upsert to prevent duplicates if user subscribes multiple times
          await ReminderSchedule.updateOne(
            { deduplicationKey },
            {
              $setOnInsert: {
                userId,
                deadlineId,
                reminderType: type,
                scheduledTime,
                channel,
                status: 'PENDING'
              }
            },
            { upsert: true }
          );
          
          newSchedules.push(deduplicationKey);
        }
      }
    }

    res.status(200).json({ 
      success: true, 
      message: `Successfully subscribed to reminders for ${deadline.title}`,
      schedulesCreated: newSchedules.length
    });
  } catch (error: any) {
    console.error('Error subscribing to deadline:', error);
    res.status(500).json({ success: false, message: 'Server error subscribing to deadline' });
  }
};

// User: Get my active subscriptions/reminders
export const getMyReminders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const reminders = await ReminderSchedule.find({ userId, status: { $in: ['PENDING', 'QUEUED', 'PROCESSING'] } })
      .populate('deadlineId')
      .sort({ scheduledTime: 1 })
      .lean();

    res.status(200).json({ success: true, reminders });
  } catch (error: any) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ success: false, message: 'Server error fetching reminders' });
  }
};
