import api from './axios';
import { User } from '../contexts/AuthContext';

export const getProfile = (): Promise<User> =>
  api.get<User>('/api/profile/me').then((r) => r.data);

export const updateProfile = (updates: Partial<User>): Promise<User> =>
  api.put<User>('/api/profile/me', updates).then((r) => r.data);

export const uploadProfilePhoto = (photoFile: File): Promise<{ photoURL: string, user: User }> => {
  const formData = new FormData();
  formData.append('photo', photoFile);
  return api.post<{ photoURL: string, user: User }>('/api/profile/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((r) => r.data);
};

export const getInterests = (): Promise<string[]> =>
  api.get<string[]>('/api/profile/interests').then((r) => r.data);

export const updateInterests = (interests: string[]): Promise<string[]> =>
  api.put<string[]>('/api/profile/interests', { interests }).then((r) => r.data);
