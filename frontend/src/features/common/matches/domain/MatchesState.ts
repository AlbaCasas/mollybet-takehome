/** @format */

import { Match } from './Match';

export interface MatchesState {
  matchData: Match[];
  isConnected: boolean;
  error: string | null;
}
