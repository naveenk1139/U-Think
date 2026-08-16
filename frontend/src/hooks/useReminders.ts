import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/reminderApi';
import { useAuth } from '../contexts/AuthContext';

export function useReminders() {
  const { currentUser } = useAuth();
  const [reminders, setReminders] = useState<api.Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReminders = useCallback(async () => {
    if (!currentUser) {
      setReminders([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await api.getReminders();
      setReminders(data);
    } catch (err) {
      console.error('Failed to fetch reminders', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const addReminder = async (reminder: Omit<api.Reminder, '_id' | 'userId' | 'createdAt'>) => {
    try {
      const newReminder = await api.createReminder(reminder);
      setReminders(prev => [...prev, newReminder].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    } catch (error) {
      console.error('Failed to create reminder', error);
      throw error;
    }
  };

  const updateReminder = async (id: string, updates: Partial<api.Reminder>) => {
    try {
      const updated = await api.updateReminder(id, updates);
      setReminders(prev => prev.map(r => r._id === id ? updated : r));
    } catch (error) {
      console.error('Failed to update reminder', error);
      throw error;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await api.deleteReminder(id);
      setReminders(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error('Failed to delete reminder', error);
      throw error;
    }
  };

  // Backwards compatibility with the old simple toggle array
  const hasReminder = (title: string) => reminders.some(r => r.title === title && !r.isDone);
  
  const toggleReminder = async (examId: string, examName: string) => {
    const existing = reminders.find(r => r.title === examName && !r.isDone);
    if (existing) {
      await updateReminder(existing._id, { isDone: true });
    } else {
      await addReminder({
        title: examName,
        date: new Date().toISOString().split('T')[0],
        type: 'exam',
        priority: 'medium',
        isDone: false
      });
    }
  };

  return { reminders, addReminder, updateReminder, deleteReminder, hasReminder, toggleReminder, loading, refresh: fetchReminders };
}
