/** @format */

export interface MatchDTO {
  round: string;
  date: string;
  home: string;
  away: string;
  score: {
    ft: [number, number];
  };
}
