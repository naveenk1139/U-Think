import api from './axios';

export interface QuizAnswer {
  question: string;
  category: string;
  choiceText: string;
}

export interface QuizResult {
  _id?: string;
  userId: string;
  answers: QuizAnswer[];
  analysisText: string;
  recommendedStreams: string[];
  createdAt?: string;
}

/** Submit aptitude quiz answers — get AI analysis + save to MongoDB */
export const submitQuiz = (
  answers: QuizAnswer[]
): Promise<{ analysisText: string; recommendedStreams: string[] }> =>
  api
    .post('/api/aptitude/evaluate', { answers })
    .then((r) => r.data);

/** Save a completed quiz result to the user's history */
export const saveQuizResult = (result: Omit<QuizResult, '_id' | 'createdAt'>): Promise<QuizResult> =>
  api.post<QuizResult>('/api/quiz/results', result).then((r) => r.data);

/** Fetch all saved quiz results for current user */
export const getQuizResults = (): Promise<QuizResult[]> =>
  api.get<QuizResult[]>('/api/quiz/results').then((r) => r.data);

/** Delete a specific quiz result */
export const deleteQuizResult = (resultId: string): Promise<void> =>
  api.delete(`/api/quiz/results/${resultId}`).then(() => undefined);
