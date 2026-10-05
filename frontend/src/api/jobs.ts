import api from './axios';

export interface JobSearchParams {
  query?: string;
  location?: string;
  category?: string;
  source?: string;
  jobType?: string;
  experience?: string;
  minSalary?: number;
  page?: number;
  limit?: number;
}

export const searchJobs = async (params: JobSearchParams) => {
  const response = await api.get('/api/jobs/search', { params });
  return response.data;
};

export const getProviderStatuses = async () => {
  const response = await api.get('/api/jobs/providers');
  return response.data;
};

export const getJobRecommendations = async () => {
  const response = await api.get('/api/jobs/recommendations');
  return response.data;
};

export const saveJobStatus = async (jobId: string, status: string, notes?: string) => {
  const response = await api.post(`/api/jobs/saved/${jobId}`, { status, notes });
  return response.data;
};

export const getSavedJobs = async () => {
  const response = await api.get('/api/jobs/saved');
  return response.data;
};
