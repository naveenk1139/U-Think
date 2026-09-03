import api from './axios';
import { StructuredExam } from '../types';

export interface TrackedExam {
  _id: string;
  userId: string;
  examId: string;
  examName: string;
  examDate?: string;
  status: 'upcoming' | 'preparing' | 'appeared' | 'completed';
}

export const getTrackedExams = (): Promise<TrackedExam[]> =>
  api.get<TrackedExam[]>('/api/exams/tracked').then((r) => r.data);

export const trackExam = (exam: Omit<TrackedExam, '_id' | 'userId'>): Promise<TrackedExam> =>
  api.post<TrackedExam>('/api/exams/tracked', exam).then((r) => r.data);

export const updateTrackedExam = (id: string, updates: Partial<TrackedExam>): Promise<TrackedExam> =>
  api.patch<TrackedExam>(`/api/exams/tracked/${id}`, updates).then((r) => r.data);

export const deleteTrackedExam = (id: string): Promise<void> =>
  api.delete(`/api/exams/tracked/${id}`).then(() => undefined);

export interface ExamFilterParams {
  search?: string;
  education_level?: string;
  stream?: string;
  category?: string;
  type?: string;
  ownership?: string;
  page?: number;
  limit?: number;
}

export interface ExamPaginatedResponse {
  items: StructuredExam[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export const getExams = async (params: ExamFilterParams): Promise<ExamPaginatedResponse> => {
  const { data } = await api.get('/api/exams', { params });
  return data;
};

export const getExamRecommendations = async (params: { education_level?: string, stream?: string, category?: string }): Promise<{ items: StructuredExam[] }> => {
  const { data } = await api.get('/api/exams/recommendations', { params });
  return data;
};

export const getExamBySlug = async (slug: string): Promise<StructuredExam> => {
  const { data } = await api.get(`/api/exams/${slug}`);
  return data;
};

export const saveExam = async (examId: string): Promise<any> => {
  const { data } = await api.post(`/api/exams/${examId}/save`);
  return data;
};

export const unsaveExam = async (examId: string): Promise<any> => {
  const { data } = await api.delete(`/api/exams/${examId}/save`);
  return data;
};

export const getSavedExams = async (): Promise<StructuredExam[]> => {
  const { data } = await api.get('/api/exams/user/saved');
  return data;
};

export const compareExams = async (examIds: string[]): Promise<StructuredExam[]> => {
  const { data } = await api.post('/api/exams/compare', { examIds });
  return data;
};
