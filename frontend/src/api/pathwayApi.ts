import api from './axios';

export interface SavedPathway {
  _id: string;
  userId: string;
  specId: string;
  specName: string;
  notes?: string;
  createdAt: string;
}

export const getSavedPathways = (): Promise<SavedPathway[]> =>
  api.get<SavedPathway[]>('/api/pathways').then((r) => r.data);

export const savePathway = (pathway: Omit<SavedPathway, '_id' | 'userId' | 'createdAt'>): Promise<SavedPathway> =>
  api.post<SavedPathway>('/api/pathways', pathway).then((r) => r.data);

export const deletePathway = (id: string): Promise<void> =>
  api.delete(`/api/pathways/${id}`).then(() => undefined);
