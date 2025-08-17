/** @format */

import { useMemo } from 'react';
import { useClubDetail } from '../api/useClubDetail';
import { ClubHistory } from '../domain/ClubHistory';
import { computeClubHistory } from '../domain/services/clubHistoryService';
import { usePremierLeagueMatches } from '../../common/matches/context/MatchesProvider';

export const useGetClubHistory = (code?: string) => {
  const { club, loading: clubLoading, error: clubError, refetch } = useClubDetail(code);
  const { matches, isConnected, error: matchesError } = usePremierLeagueMatches();

  const history: ClubHistory | null = useMemo(() => {
    if (!club) return null;
    return computeClubHistory(club.code, club.name, matches);
  }, [club, matches]);

  return {
    history,
    loading: clubLoading,
    error: clubError,
    refetchClub: refetch,
    isSocketConnected: isConnected,
    socketError: matchesError,
  };
};
