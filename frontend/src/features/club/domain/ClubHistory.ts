/** @format */

import { ClubMatch } from './Match';

export interface ClubHistory {
  name: string;
  code: string;
  matches: ClubMatch[];
}
