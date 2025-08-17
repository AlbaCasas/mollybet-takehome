/** @format */

import React from 'react';
import { Label } from '../../../../components/Label';
import { cn } from '../../../../core/styles/utils';
import { usePremierLeagueMatches } from '../context/MatchesProvider';

export const WebSocketStatusBar = () => {
  const { isConnected, error, matches } = usePremierLeagueMatches();
  const getStatusTextColor = () => {
    if (error) return 'text-error';
    return isConnected ? 'text-success' : 'text-warning';
  };

  const getStatusBackground = () => {
    if (error) return 'bg-error';
    return isConnected ? 'bg-success' : 'bg-warning';
  };

  const getStatusText = () => {
    if (error) return 'Error';
    return isConnected ? 'Connected' : 'Disconnected';
  };

  return (
    <div className="bg-surface border-b border-surface-border px-4 py-2 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Label variant="small" className="text-on-muted">
          Premier League Day {matches.length > 0 ? matches[matches.length - 1].round : 0}
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Label variant="small" className="text-on-muted">
          WebSocket:
        </Label>
        <div className="flex items-center gap-1">
          <Label variant="small" className={getStatusTextColor()}>
            {getStatusText()}
          </Label>
          <div className={cn('w-[8px] h-[8px] rounded-full', getStatusBackground())} />
        </div>
      </div>
    </div>
  );
};
