/** @format */

import { areEqualIgnoreCase } from '../../../../core/utils/areEqual';
import { PremierLeagueMatch } from '../../../common/matches/domain/PremierLeagueMatch';
import { ClubHistory } from '../ClubHistory';
import { ClubMatch, Result, Venue } from '../Match';

const isClubInMatch = (code: string, m: PremierLeagueMatch) =>
  areEqualIgnoreCase(m.homeClub, code) || areEqualIgnoreCase(m.awayClub, code);

const isHomeTeam = (code: string, m: PremierLeagueMatch) => areEqualIgnoreCase(m.homeClub, code);

const computeClubMatches = (code: string, matches: PremierLeagueMatch[]): ClubMatch[] =>
  matches
    .filter((match) => isClubInMatch(code, match))
    .map((match) => {
      const venue: Venue = isHomeTeam(code, match) ? 'Home' : 'Away';
      const { homeScore, awayScore } = match;
      const goalsFor = venue === 'Home' ? homeScore : awayScore;
      const goalsAgainst = venue === 'Home' ? awayScore : homeScore;

      const goalDiff = goalsFor - goalsAgainst;
      const result: Result =
        goalsFor > goalsAgainst ? 'Win' : goalsFor < goalsAgainst ? 'Loss' : 'Draw';

      return {
        round: match.round,
        date: match.date,
        venue,
        homeTeam: match.homeClub,
        awayTeam: match.awayClub,
        homeScore: homeScore,
        awayScore: awayScore,
        goalsFor,
        goalsAgainst,
        goalDifference: goalDiff > 0 ? `+${goalDiff}` : `${goalDiff}`,
        result,
      };
    });

export const computeClubHistory = (
  clubCode: string,
  clubName: string,
  matches: PremierLeagueMatch[]
): ClubHistory => ({
  name: clubName,
  code: clubCode.toUpperCase(),
  matches: computeClubMatches(clubCode, matches),
});
