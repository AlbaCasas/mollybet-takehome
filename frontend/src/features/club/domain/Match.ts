/** @format */

export interface ClubMatch {
  matchday: number;
  date: string;
  status: 'HOME' | 'AWAY';
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  result: string;
}
