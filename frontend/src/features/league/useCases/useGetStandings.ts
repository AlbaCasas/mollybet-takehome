/** @format */

import { useMemo } from 'react';
import { useClubs } from '../api/useClubs';
import { computeStandings } from '../domain/services/standingsService';
import { Standing } from '../domain/Standing';
import { usePremierLeagueMatches } from '../../common/matches/context/MatchesProvider';

export const useGetStandings = () => {
  const { clubs, loading: clubsLoading, error: clubsError, refetch } = useClubs();
  const { matches, isConnected, error: matchesError } = usePremierLeagueMatches();

  const standings: Standing[] = useMemo(() => {
    if (!clubs.length) return [];
    return computeStandings(clubs, matches);
  }, [clubs, matches]);

  return {
    standings,
    loading: clubsLoading,
    error: clubsError,
    refetchClubs: refetch,
    isConnected,
    socketError: matchesError,
  };
};
