/** @format */

import React, { useCallback } from 'react';
import { Label } from '../../../components/Label';
import { Badge } from '../../../components/Badge';
import { LeagueTable } from '../components/LeagueTable';
import { WebSocketStatusBar } from '../../../components/WebSocketStatusBar';
import { useGetStandings } from '../useCases/useGetStandings';
import { useNavigate } from 'react-router';
import { ErrorCard } from '../../../components/ErrorCard';

export const LeagueScreen: React.FC = () => {
  const { standings, loading, error, refetchClubs, isConnected, socketError } = useGetStandings();
  const navigate = useNavigate();

  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Label>Loading league table...</Label>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center flex-grow-1">
          <ErrorCard
            title="Error loading League Data"
            message={error}
            onRetry={refetchClubs}
            retryLabel="Retry"
          />
        </div>
      );
    }

    return (
      <>
        <LeagueTable
          onRowClick={(clubCode: string) => navigate(`/club/${clubCode}`)}
          tableRows={standings}
        />
      </>
    );
  }, [standings, loading, error, refetchClubs, isConnected, socketError]);

  return (
    <div className="min-h-screen bg-surface">
      <WebSocketStatusBar isConnected={isConnected} error={socketError} />
      <div className="bg-white border-b border-surface-border">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center mb-4">
            <Badge variant="primary">Premier League 2019/20</Badge>
          </div>
          <div className="text-center">
            <Label variant="heading" as="h1" className="text-3xl font-bold text-primary mb-2">
              League Table
            </Label>
            <Label variant="body" className="text-on-muted">
              Live simulation of the 2019/20 season
            </Label>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">{renderContent()}</div>
    </div>
  );
};
