/** @format */

import { ClubDTO } from '../api/dto/ClubDTO';
import { Match } from '../../common/matches/api/dto/Match';
import { Club } from './Club';
import { ClubStats } from './ClubStats';

const calculateClubStats = (clubCode: string, matches: Match[]): ClubStats => {
  let played = 0;
  let won = 0;
  let drawn = 0;
  let lost = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;

  matches.forEach((match) => {
    if (match.home === clubCode || match.away === clubCode) {
      played++;
      const isHome = match.home === clubCode;
      const teamGoals = isHome ? match.score.ft[0] : match.score.ft[1];
      const opponentGoals = isHome ? match.score.ft[1] : match.score.ft[0];

      goalsFor += teamGoals;
      goalsAgainst += opponentGoals;

      if (teamGoals > opponentGoals) {
        won++;
      } else if (teamGoals === opponentGoals) {
        drawn++;
      } else {
        lost++;
      }
    }
  });

  return {
    played,
    won,
    drawn,
    lost,
    goalsFor,
    goalsAgainst,
    goalDifference: goalsFor - goalsAgainst,
    points: won * 3 + drawn,
  };
};

export const mapToClub = (clubDTO: ClubDTO, matches: Match[]): Club => {
  const stats = calculateClubStats(clubDTO.code, matches);

  return {
    position: 0,
    name: clubDTO.name,
    code: clubDTO.code,
    stats,
  };
};
