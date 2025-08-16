/** @format */

import { Match } from '../../../common/matches/api/dto/Match';
import { ClubHistory } from '../ClubHistory';
import { ClubMatch, Result, Venue } from '../Match';

const isClubInMatch = (code: string, m: Match) => m.home === code || m.away === code;
const isHomeTeam = (code: string, m: Match) => m.home === code;

const computeClubMatches = (code: string, matches: Match[]): ClubMatch[] =>
  matches
    .filter((match) => isClubInMatch(code, match))
    .map((match) => {
      const venue: Venue = isHomeTeam(code, match) ? 'Home' : 'Away';
      const [homeScore, awayScore] = match.score.ft as [number, number];

      const goalsFor = venue === 'Home' ? homeScore : awayScore;
      const goalsAgainst = venue === 'Home' ? awayScore : homeScore;

      const goalDiff = goalsFor - goalsAgainst;
      const result: Result =
        goalsFor > goalsAgainst ? 'Win' : goalsFor < goalsAgainst ? 'Loss' : 'Draw';

      return {
        round: match.round,
        date: match.date,
        venue,
        homeTeam: match.home,
        awayTeam: match.away,
        homeScore,
        awayScore,
        goalsFor,
        goalsAgainst,
        goalDifference: goalDiff > 0 ? `+${goalDiff}` : `${goalDiff}`,
        result,
      };
    });

export const computeClubHistory = (
  clubCode: string,
  clubName: string,
  matches: Match[]
): ClubHistory => ({
  name: clubName,
  code: clubCode,
  matches: computeClubMatches(clubCode, matches),
});
