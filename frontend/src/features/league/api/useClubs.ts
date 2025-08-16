/** @format */

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../../core/api/client';
import { ClubDTO } from './dto/ClubDTO';

export const useClubs = () => {
  const [clubs, setClubs] = useState<ClubDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClubs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<ClubDTO[]>('/clubs');
      setClubs(response.data);
    } catch (err) {
      setError('Failed to fetch clubs data');
      console.error('Error fetching clubs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClubs();
  }, []);

  const refetch = () => {
    fetchClubs();
  };

  return { clubs, loading, error, refetch };
};
