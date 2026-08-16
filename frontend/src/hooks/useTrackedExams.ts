import { useState, useEffect } from 'react';
import * as api from '../api/examApi';
import { useAuth } from '../contexts/AuthContext';

export function useTrackedExams() {
  const { currentUser } = useAuth();
  const [trackedExams, setTrackedExams] = useState<api.TrackedExam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setTrackedExams([]);
      setLoading(false);
      return;
    }
    
    let isMounted = true;
    api.getTrackedExams()
      .then(exams => {
        if (isMounted) {
          setTrackedExams(exams);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
      
    return () => { isMounted = false; };
  }, [currentUser]);

  const trackExam = async (examId: string, examName: string, examDate?: string) => {
    try {
      const newExam = await api.trackExam({ examId, examName, examDate, status: 'upcoming' });
      setTrackedExams(prev => [newExam, ...prev]);
    } catch (error) {
      console.error('Failed to track exam', error);
      throw error;
    }
  };

  const untrackExam = async (id: string) => {
    try {
      await api.deleteTrackedExam(id);
      setTrackedExams(prev => prev.filter(e => e._id !== id));
    } catch (error) {
      console.error('Failed to untrack exam', error);
      throw error;
    }
  };
  
  // The UI often passes the `examId` (not the DB `_id`) to check if tracked
  const isTracked = (examId: string) => {
    return trackedExams.some(e => e.examId === examId);
  };
  
  const toggleTrackedExam = async (examId: string, examName?: string, examDate?: string) => {
    const existing = trackedExams.find(e => e.examId === examId);
    if (existing) {
      await untrackExam(existing._id);
    } else if (examName) {
      await trackExam(examId, examName, examDate);
    }
  };

  return { trackedExams, trackExam, untrackExam, toggleTrackedExam, isTracked, loading };
}
