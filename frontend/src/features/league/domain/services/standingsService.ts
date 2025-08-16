/** @format */

import { ClubDTO } from '../../api/dto/ClubDTO';
import { Match } from '../../../common/matches/api/dto/Match';
import { Standing } from '../Standing';
import { ClubStats } from '../ClubStats';

const POINTS_WIN = 3;
const POINTS_DRAW = 1;

function isMatchForClub(m: Match, clubCode: string): boolean {
  return m.home === clubCode || m.away === clubCode;
}

function goalsForAndAgainst(
  m: Match,
  clubCode: string,
  homeGoals: number,
  awayGoals: number
): { forGoals: number; againstGoals: number } {
  const isHome = m.home === clubCode;
  return isHome
    ? { forGoals: homeGoals, againstGoals: awayGoals }
    : { forGoals: awayGoals, againstGoals: homeGoals };
}

function formatGoalDifference(gd: number): string {
  return gd > 0 ? `+${gd}` : String(gd);
}

function computeClubStats(clubCode: string, matches: Match[]): ClubStats {
  let played = 0;
  let won = 0;
  let drawn = 0;
  let lost = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;

  for (const match of matches) {
    if (!isMatchForClub(match, clubCode)) continue;

    const score = match.score.ft;
    if (!score) continue;

    const [homeGoals, awayGoals] = score;
    const { forGoals, againstGoals } = goalsForAndAgainst(match, clubCode, homeGoals, awayGoals);

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
  return (
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor ||
    a.clubName.localeCompare(b.clubName)
  );
}

export function computeStandings(clubs: ClubDTO[], matches: Match[]): Standing[] {
  const rows = clubs.map((club) => {
    const stats = computeClubStats(club.code, matches);
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
