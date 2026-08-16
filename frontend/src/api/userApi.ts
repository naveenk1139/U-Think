import api from './axios';

export interface UserSyncPayload {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  streamPreference?: string;
  lastLogin: string;
  createdAt: string;
}

/** Sync Firebase user to MongoDB after login */
export const syncUser = (payload: UserSyncPayload): Promise<UserProfile> =>
  api.post<UserProfile>('/api/users/sync', payload).then((r) => r.data);

/** Fetch user profile by Firebase UID */
export const getUserProfile = (uid: string): Promise<UserProfile> =>
  api.get<UserProfile>(`/api/users/${uid}`).then((r) => r.data);

/** Update user profile fields */
export const updateUserProfile = (
  uid: string,
  updates: Partial<Pick<UserProfile, 'bio' | 'displayName' | 'photoURL' | 'streamPreference'>>
): Promise<UserProfile> =>
  api.patch<UserProfile>(`/api/users/${uid}`, updates).then((r) => r.data);
