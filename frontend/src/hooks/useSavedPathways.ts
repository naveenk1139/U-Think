import { useState, useEffect } from 'react';
import * as api from '../api/pathwayApi';
import { useAuth } from '../contexts/AuthContext';

export function useSavedPathways() {
  const { currentUser } = useAuth();
  const [savedPathways, setSavedPathways] = useState<api.SavedPathway[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setSavedPathways([]);
      setLoading(false);
      return;
    }
    
    let isMounted = true;
    api.getSavedPathways()
      .then(pathways => {
        if (isMounted) {
          setSavedPathways(pathways);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
      
    return () => { isMounted = false; };
  }, [currentUser]);

  const savePathway = async (specId: string, specName: string, notes?: string) => {
    try {
      const newPathway = await api.savePathway({ specId, specName, notes });
      setSavedPathways(prev => [newPathway, ...prev]);
    } catch (error) {
      console.error('Failed to save pathway', error);
      throw error;
    }
  };

  const unsavePathway = async (id: string) => {
    try {
      await api.deletePathway(id);
      setSavedPathways(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to unsave pathway', error);
      throw error;
    }
  };

  const isSaved = (specId: string) => {
    return savedPathways.some(p => p.specId === specId);
  };
  
  const toggleSavedPathway = async (pathway: { id: string, title: string, type?: string, institute?: string, match?: string }) => {
    const existing = savedPathways.find(p => p.specId === pathway.id);
    if (existing) {
      await unsavePathway(existing._id);
    } else {
      await savePathway(pathway.id, pathway.title);
    }
  };

  return { savedPathways, savePathway, unsavePathway, toggleSavedPathway, isSaved, loading };
}
