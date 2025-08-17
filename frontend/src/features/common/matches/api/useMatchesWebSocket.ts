/** @format */

import { useEffect, useState } from 'react';
import { WebSocketClient } from '../../../../core/api/wsClient';
import { MatchDTO } from './dto/MatchDTO';
import { PremierLeagueMatch } from '../domain/PremierLeagueMatch';

const STORAGE_KEY = 'persistedPremierLeagueMatches';
export const useMatchesWebSocket = () => {
  const initialPersistedMatches = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || '[]'
  ) as PremierLeagueMatch[];

  const [data, setData] = useState<PremierLeagueMatch[]>(initialPersistedMatches);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const wsClient = new WebSocketClient<MatchDTO | MatchDTO[]>('ws://localhost:65000/matches/ws');

    wsClient.onOpen = () => {
      setIsConnected(true);
      setError(null);
    };

    wsClient.onJSONMessage = (newData: MatchDTO | MatchDTO[]) => {
      // Guard in case only one match is received in the message
      const wsMatchesArray: MatchDTO[] = Array.isArray(newData) ? newData : [newData];

      const premierLeagueMatches = wsMatchesArray.filter(
        (match) => match.competition === 'Premier League'
      );
      const mappedMatches: PremierLeagueMatch[] = premierLeagueMatches.map((match) => ({
        date: match.date,
        homeClub: match.home,
        awayClub: match.away,
        homeScore: match.score.ft[0],
        awayScore: match.score.ft[1],
        round: parseInt(match.round.split(' ')[1]),
      }));
      setData((prev) => [...prev, ...mappedMatches]);
    };

    wsClient.onTextMessage = (message: string) => {
      // Disconnect the websocket and clear persisted data when the season is finished
      if (message.trim() === 'season finished') {
        sessionStorage.removeItem(STORAGE_KEY);
        wsClient.disconnect();
      }
    };

    wsClient.onClose = () => {
      setIsConnected(false);
    };

    wsClient.onError = (errorMessage: string) => {
      setError(errorMessage);
      setIsConnected(false);
    };

    wsClient.connect();

    return () => {
      wsClient.disconnect();
    };
  }, []);

  return {
    data,
    isConnected,
    error,
  };
};
