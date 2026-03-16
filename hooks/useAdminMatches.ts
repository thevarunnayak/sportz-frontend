import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMatches } from '../services/api';
import { Match } from '../types';

export const useAdminMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);

  const loadMatches = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchMatches(100);
      setMatches(data.data || []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load matches';
      setError(msg);
    } finally {
      if (!hasLoadedRef.current) {
        setIsLoading(false);
        hasLoadedRef.current = true;
      }
    }
  }, []);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadMatches();
    }, 5000);
    return () => clearInterval(interval);
  }, [loadMatches]);

  return {
    matches,
    isLoading,
    error,
    reloadMatches: loadMatches,
  };
};
