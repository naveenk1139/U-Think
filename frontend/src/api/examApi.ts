import api from './axios';

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
