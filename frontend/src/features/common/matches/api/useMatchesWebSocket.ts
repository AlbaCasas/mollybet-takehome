/** @format */

import { useEffect, useState } from 'react';
import { WebSocketClient } from '../../../../core/api/wsClient';
import { Match } from './dto/Match';

export const useMatchesWebSocket = () => {
  const [data, setData] = useState<Match[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const wsClient = new WebSocketClient<Match | Match[]>('ws://localhost:65000/matches/ws');

    wsClient.onOpen = () => {
      setIsConnected(true);
      setError(null);
    };

    wsClient.onJSONMessage = (newData: Match | Match[]) => {
      // Guard in case only one match is received in the message
      const matchesArray: Match[] = Array.isArray(newData) ? newData : [newData];
      setData((prev) => [...prev, ...matchesArray]);
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
