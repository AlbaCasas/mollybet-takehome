/** @format */

import { useMemo } from 'react';
import { useClubs } from '../api/useClubs';
import { useMatches } from '../../common/matches/context/MatchesProvider';
import { mapToClub } from '../domain/mappers';
import { Club } from '../domain/Club';

export const useLeagueTable = () => {
  const { clubs, loading: clubsLoading, error: clubsError } = useClubs();
  const { matchData, isConnected, error: matchesError } = useMatches();

  const leagueTable: Club[] = useMemo(() => {
    if (!clubs.length || !matchData.length) return [];

    return clubs.map((clubDTO) => mapToClub(clubDTO, matchData));
  }, [clubs, matchData]);

  return {
    leagueTable,
    loading: clubsLoading,
    error: clubsError || matchesError,
    isConnected,
  };
};
