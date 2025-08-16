/** @format */

import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/client';
import { ClubDetailDTO } from './dto/ClubDetailDTO';

export const useClubDetail = (code: string) => {
  const [club, setClub] = useState<ClubDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubDetail = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<ClubDetailDTO>(`/clubs/${code}`);
        setClub(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch club');
        console.error('Error fetching club:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetail();
  }, [code]);

  return { club, loading, error };
};
