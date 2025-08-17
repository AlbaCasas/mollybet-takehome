/** @format */

import { PremierLeagueMatch } from './PremierLeagueMatch';

export interface MatchesState {
  matches: PremierLeagueMatch[];
  isConnected: boolean;
  error: string | null;
}
