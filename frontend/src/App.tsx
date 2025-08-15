/** @format */

import React from 'react';
import './styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import { LeagueScreen } from './features/league/screens/LeagueScreen';
import { TeamScreen } from './features/team/screens/TeamScreen';

export const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeagueScreen />} />
        <Route path="/team/:code" element={<TeamScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
