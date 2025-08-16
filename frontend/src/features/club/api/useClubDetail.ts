/** @format */

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../../core/api/client';
import { ClubDetailDTO } from './dto/ClubDetailDTO';

export const useClubDetail = (code: string) => {
  const [club, setClub] = useState<ClubDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClubDetail = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<ClubDetailDTO>(`/clubs/${code}`);
      setClub(response.data);
    } catch (err) {
      setError(`Failed to find results for club code "${code}"`);
      console.error('Error fetching club:', err);
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    if (code) {
      fetchClubDetail();
    }
  }, [code]);

  return { club, loading, error, refetch: fetchClubDetail };
};
