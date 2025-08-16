/** @format */

import { useMemo } from 'react';
import { useMatches } from '../../common/matches/context/MatchesProvider';
import { useClubDetail } from '../api/useClubDetail';
import { ClubHistory } from '../domain/ClubHistory';
import { computeClubHistory } from '../domain/services/clubHistoryService';

export const useGetClubHistory = (code: string) => {
  const { club, loading: clubLoading, error: clubError } = useClubDetail(code);
  const { matchData, isConnected, error: matchesError } = useMatches();

  const history: ClubHistory | null = useMemo(() => {
    if (!club) return null;
    return computeClubHistory(club.code, club.name, matchData);
  }, [club, matchData]);

  return {
    history,
    loading: clubLoading,
    error: clubError || matchesError,
    isSocketConnected: isConnected,
  };
};
