/** @format */

import { useMemo } from 'react';
import { useClubs } from '../api/useClubs';
import { useMatches } from '../../common/matches/context/MatchesProvider';
import { computeStandings } from '../domain/services/standingsService';
import { Standing } from '../domain/Standing';

export const useGetStandings = () => {
  const { clubs, loading: clubsLoading, error: clubsError } = useClubs();
  const { matchData, isConnected, error: matchesError } = useMatches();

  const standings: Standing[] = useMemo(() => {
    if (!clubs.length) return [];
    return computeStandings(clubs, matchData);
  }, [clubs, matchData]);

  return {
    standings,
    loading: clubsLoading,
    error: clubsError || matchesError,
    isConnected,
  };
};
