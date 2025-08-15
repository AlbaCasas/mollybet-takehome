/** @format */

import { useEffect, useState, useRef } from 'react';
import { WebSocketClient } from '../../../../core/api/wsClient';
import { Match } from './dto/Match';

export const useMatchesWebSocket = () => {
  const [data, setData] = useState<Match[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsClientRef = useRef<WebSocketClient<Match | Match[]> | null>(null);

  useEffect(() => {
    const wsClient = new WebSocketClient<Match | Match[]>('ws://localhost:65000/matches/ws');
    wsClientRef.current = wsClient;

    wsClient.onOpen = () => {
      setIsConnected(true);
      setError(null);
    };

    wsClient.onMessage = (newData: Match | Match[]) => {
      try {
        const matchesArray = Array.isArray(newData) ? newData : [newData];
        setData((prev) => [...prev, ...matchesArray]);
      } catch (err) {
        console.error('Error processing match data:', err);
        setError('Failed to process match data');
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
