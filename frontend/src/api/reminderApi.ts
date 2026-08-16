import api from './axios';

export interface Reminder {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  type: 'exam' | 'application' | 'scholarship' | 'personal' | 'general';
  priority: 'high' | 'medium' | 'low';
  isDone: boolean;
  createdAt: string;
}

export const getReminders = (): Promise<Reminder[]> =>
  api.get<Reminder[]>('/api/reminders').then((r) => r.data);

export const createReminder = (reminder: Omit<Reminder, '_id' | 'userId' | 'createdAt'>): Promise<Reminder> =>
  api.post<Reminder>('/api/reminders', reminder).then((r) => r.data);

export const updateReminder = (id: string, updates: Partial<Reminder>): Promise<Reminder> =>
  api.patch<Reminder>(`/api/reminders/${id}`, updates).then((r) => r.data);

export const deleteReminder = (id: string): Promise<void> =>
  api.delete(`/api/reminders/${id}`).then(() => undefined);
