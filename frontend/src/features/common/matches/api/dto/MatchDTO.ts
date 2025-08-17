/** @format */

export interface MatchDTO {
  round: string;
  date: string;
  home: string;
  away: string;
  competition: string;
  score: {
    ft: [number, number];
  };
}
