/** @format */

import { useEffect, useState } from 'react';
import { WebSocketClient } from '../../../../core/api/wsClient';
import { MatchDTO } from './dto/MatchDTO';
import { PremierLeagueMatch } from '../domain/PremierLeagueMatch';

export const useMatchesWebSocket = () => {
  const [data, setData] = useState<PremierLeagueMatch[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const wsClient = new WebSocketClient<MatchDTO | MatchDTO[]>('ws://localhost:65000/matches/ws');

    wsClient.onOpen = () => {
      setIsConnected(true);
      setError(null);
    };

    wsClient.onJSONMessage = (newData: MatchDTO | MatchDTO[]) => {
      // Guard in case only one match is received in the message
      const wsMatchesArray: MatchDTO[] = Array.isArray(newData) ? newData : [newData];

      const matches = wsMatchesArray.filter((match) => match.competition === 'Premier League');
      const premierLeagueMatches: PremierLeagueMatch[] = matches.map((match) => ({
        date: match.date,
        homeClub: match.home,
        awayClub: match.away,
        homeScore: match.score.ft[0],
        awayScore: match.score.ft[1],
        round: parseInt(match.round.split(' ')[1]),
      }));
      setData((prev) => [...prev, ...premierLeagueMatches]);
    };

    wsClient.onTextMessage = (message: string) => {
      // Disconnect the websocket when the season is finished
      if (message.trim() === 'season finished') {
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
