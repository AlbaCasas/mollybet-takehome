/** @format */

import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/client';
import { ClubDTO } from './dto/ClubDTO';

export const useClubs = () => {
  const [clubs, setClubs] = useState<ClubDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<ClubDTO[]>('/clubs');
        setClubs(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch clubs');
        console.error('Error fetching clubs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  return { clubs, loading, error };
};
