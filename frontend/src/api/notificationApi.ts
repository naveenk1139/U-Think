import api from './axios';

export interface AppNotification {
  _id: string;
  title: string;
  message: string;
  type: 'system' | 'reminder' | 'pathway' | 'exam' | 'general';
  isRead: boolean;
  createdAt: string;
}

export const getNotifications = (): Promise<AppNotification[]> =>
  api.get<AppNotification[]>('/api/notifications').then((r) => r.data);

export const markNotificationRead = (id: string): Promise<AppNotification> =>
  api.patch<AppNotification>(`/api/notifications/${id}/read`).then((r) => r.data);

export const markAllNotificationsRead = (): Promise<{ message: string }> =>
  api.patch<{ message: string }>('/api/notifications/read-all').then((r) => r.data);
