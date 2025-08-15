/** @format */

import React from 'react';
import './core/theme/styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import { LeagueScreen } from './features/league/screens/LeagueScreen';
import { TeamScreen } from './features/team/screens/TeamScreen';
import { MatchesProvider } from './features/common/matches/context/MatchesProvider';

export const App: React.FunctionComponent = () => {
  return (
    <MatchesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LeagueScreen />} />
          <Route path="/team/:code" element={<TeamScreen />} />
        </Routes>
      </BrowserRouter>
    </MatchesProvider>
  );
};
