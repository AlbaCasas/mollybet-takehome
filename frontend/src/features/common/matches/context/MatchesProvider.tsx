/** @format */

import React, { createContext, useContext, ReactNode } from 'react';
import { useMatchesWebSocket } from '../api/useMatchesWebSocket';
import { MatchesState } from '../domain/MatchesState';

const MatchesContext = createContext<MatchesState | undefined>(undefined);

interface MatchesProviderProps {
  children: ReactNode;
}

export const MatchesProvider: React.FC<MatchesProviderProps> = ({ children }) => {
  const { data, isConnected, error } = useMatchesWebSocket();

  const contextValue: MatchesState = {
    matches: data,
    isConnected,
    error,
  };

  return <MatchesContext.Provider value={contextValue}>{children}</MatchesContext.Provider>;
};

export const usePremierLeagueMatches = (): MatchesState => {
  const context = useContext(MatchesContext);
  if (context === undefined) {
    throw new Error('usePremierLeagueMatches must be used within a MatchesProvider');
  }
  return context;
};
