/** @format */

import { ClubStats } from './ClubStats';

export interface Club {
  position: number;
  name: string;
  code: string;
  stats: ClubStats;
}
