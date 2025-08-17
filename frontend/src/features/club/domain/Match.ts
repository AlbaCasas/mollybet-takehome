/** @format */

export type Venue = 'Home' | 'Away';
export type Result = 'Win' | 'Loss' | 'Draw';

export interface ClubMatch {
  round: number;
  date: string;
  venue: Venue;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: string;
  result: Result;
}
