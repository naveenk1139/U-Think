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
  return api.post('/api/jobs/saved', jobData);
};

export const getSavedJobs = () => {
  return api.get('/api/jobs/saved');
};

export const checkSavedJobs = () => {
  return api.get('/api/jobs/saved/check');
};

export const updateSavedJob = (id: string, updates: any) => {
  return api.put(`/api/jobs/saved/${id}`, updates);
};

export const removeSavedJob = (id: string) => {
  return api.delete(`/api/jobs/saved/${id}`);
};
