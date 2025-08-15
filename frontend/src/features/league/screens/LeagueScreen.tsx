/** @format */

import React from 'react';
import { useMatches } from '../../common/matches/context/MatchesProvider';

export const LeagueScreen: React.FC = () => {
  const { matchData, isConnected, error } = useMatches();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isConnected) {
    return <div>Connecting to websocket...</div>;
  }

  return (
    <div>
      <h1>Premier League Matches</h1>
      {matchData.map((match, index) => (
        <div key={index}>
          <div>
            {match.round} - {match.date}
          </div>
          <div>
            {match.home} {match.score.ft[0]} - {match.score.ft[1]} {match.away}
          </div>
        </div>
      ))}
    </div>
  );
};
