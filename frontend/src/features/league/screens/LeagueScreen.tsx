/** @format */

import React from 'react';
import { useLeagueTable } from '../useCases/useLeagueTable';

export const LeagueScreen: React.FC = () => {
  const { leagueTable, loading, isConnected } = useLeagueTable();

  if (loading || !isConnected) {
    return <div>Loading league table...</div>;
  }

  return (
    <div>
      <h1>Premier League Table</h1>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {leagueTable.map((club, index) => (
            <tr key={club.code}>
              <td>{index + 1}</td>
              <td>{club.code}</td>
              <td>{club.stats.played}</td>
              <td>{club.stats.won}</td>
              <td>{club.stats.drawn}</td>
              <td>{club.stats.lost}</td>
              <td>{club.stats.goalsFor}</td>
              <td>{club.stats.goalsAgainst}</td>
              <td>{club.stats.goalDifference}</td>
              <td>{club.stats.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
