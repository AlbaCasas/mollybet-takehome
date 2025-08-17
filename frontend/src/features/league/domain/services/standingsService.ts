/** @format */

import { ClubDTO } from '../../api/dto/ClubDTO';
import { Standing } from '../Standing';
import { ClubStats } from '../ClubStats';
import { PremierLeagueMatch } from '../../../common/matches/domain/PremierLeagueMatch';
import { areEqualIgnoreCase } from '../../../../core/utils/areEqual';

const POINTS_WIN = 3;
const POINTS_DRAW = 1;

function isMatchForClub(match: PremierLeagueMatch, clubCode: string): boolean {
  return (
    areEqualIgnoreCase(match.homeClub, clubCode) || areEqualIgnoreCase(match.awayClub, clubCode)
  );
}

function goalsForAndAgainst(
  m: PremierLeagueMatch,
  clubCode: string,
  homeGoals: number,
  awayGoals: number
): { forGoals: number; againstGoals: number } {
  const isHome = areEqualIgnoreCase(m.homeClub, clubCode);
  return isHome
    ? { forGoals: homeGoals, againstGoals: awayGoals }
    : { forGoals: awayGoals, againstGoals: homeGoals };
}

function formatGoalDifference(gd: number): string {
  return gd > 0 ? `+${gd}` : String(gd);
}

function computeClubStats(clubCode: string, matches: PremierLeagueMatch[]): ClubStats {
  let played = 0;
  let won = 0;
  let drawn = 0;
  let lost = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;

  for (const match of matches) {
    if (!isMatchForClub(match, clubCode)) continue;

    const { homeScore, awayScore } = match;
    const { forGoals, againstGoals } = goalsForAndAgainst(match, clubCode, homeScore, awayScore);

    played += 1;
    goalsFor += forGoals;
    goalsAgainst += againstGoals;

    if (forGoals > againstGoals) won += 1;
    else if (forGoals === againstGoals) drawn += 1;
    else lost += 1;
  }

  const goalDifference = goalsFor - goalsAgainst;
  const points = won * POINTS_WIN + drawn * POINTS_DRAW;

  return {
    played,
    won,
    drawn,
    lost,
    goalsFor,
    goalsAgainst,
    goalDifference,
    goalDifferenceText: formatGoalDifference(goalDifference),
    points,
  };
}

function compareRows(a: Standing, b: Standing): number {
  return b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor;
}

export function computeStandings(
  clubs: ClubDTO[],
  premierLeagueMatches: PremierLeagueMatch[]
): Standing[] {
  // [AC] Clarification: I only render clubs that have Premier League matches
  const clubsWithPremierLeagueMatches = clubs.filter((club) => {
    return premierLeagueMatches.some(
      (match) =>
        areEqualIgnoreCase(match.homeClub, club.code) ||
        areEqualIgnoreCase(match.awayClub, club.code)
    );
  });

  const rows = clubsWithPremierLeagueMatches.map((club) => {
    const stats = computeClubStats(club.code, premierLeagueMatches);
    return {
      clubName: club.name,
      clubCode: club.code,
      played: stats.played,
      won: stats.won,
      drawn: stats.drawn,
      lost: stats.lost,
      goalsFor: stats.goalsFor,
      goalsAgainst: stats.goalsAgainst,
      goalDifference: stats.goalDifference,
      goalDifferenceText: stats.goalDifferenceText,
      points: stats.points,
    };
  });

  rows.sort(compareRows);
  return rows;
}
