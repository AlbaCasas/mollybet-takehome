/** @format */

import { Match } from '../api/dto/Match';

export interface MatchesState {
  matchData: Match[];
  isConnected: boolean;
  error: string | null;
}
