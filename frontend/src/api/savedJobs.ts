import api from './axios';
import { Job } from '../types';

export interface SavedJob extends Partial<Job> {
  _id: string;
  status: 'Saved' | 'Applied' | 'Interview' | 'Assessment' | 'Rejected' | 'Offer' | 'Withdrawn';
  notes: string;
  matchScore: number;
  savedAt: string;
  reminders: string[];
}

export const saveJob = (jobData: any) => {
  return api.post('/api/saved-jobs', jobData);
};

export const getSavedJobs = () => {
  return api.get('/api/saved-jobs');
};

export const checkSavedJobs = () => {
  return api.get('/api/saved-jobs/check');
};

export const updateSavedJob = (id: string, updates: any) => {
  return api.put(`/api/saved-jobs/${id}`, updates);
};

export const removeSavedJob = (id: string) => {
  return api.delete(`/api/saved-jobs/${id}`);
};
