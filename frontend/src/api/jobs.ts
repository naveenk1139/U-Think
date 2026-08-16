import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface JobSearchParams {
  query?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  minSalary?: number;
}

export const searchJobs = async (params: JobSearchParams) => {
  const response = await axios.get(`${API_URL}/jobs/search`, {
    params
  });
  return response.data;
};

export const getProviderStatuses = async () => {
  const response = await axios.get(`${API_URL}/jobs/providers`);
  return response.data;
};

export const getJobRecommendations = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const response = await axios.get(`${API_URL}/jobs/recommendations`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const saveJobStatus = async (jobId: string, status: string, notes?: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const response = await axios.post(`${API_URL}/jobs/saved/${jobId}`, 
    { status, notes },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getSavedJobs = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const response = await axios.get(`${API_URL}/jobs/saved`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
