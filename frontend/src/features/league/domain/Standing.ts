/** @format */

import { ClubStats } from './ClubStats';

export type Standing = {
  clubName: string;
  clubCode: string;
} & ClubStats;
