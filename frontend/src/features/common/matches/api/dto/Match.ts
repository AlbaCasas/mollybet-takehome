/** @format */

export interface Match {
  round: string;
  date: string;
  home: string;
  away: string;
  score: {
    ft: [number, number];
  };
}
