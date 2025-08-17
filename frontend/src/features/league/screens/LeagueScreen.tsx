/** @format */

import React, { useCallback } from 'react';
import { Label } from '../../../components/Label';
import { LeagueTable } from '../components/LeagueTable';
import { WebSocketStatusBar } from '../../../components/WebSocketStatusBar';
import { useGetStandings } from '../useCases/useGetStandings';
import { useNavigate } from 'react-router';
import { ErrorState } from '../../../components/ErrorState';
import { LeagueHeader } from '../components/LeagueHeader';

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
        <ErrorState
          title="Unable to Load League Data"
          message="We're having trouble fetching the latest league information. This could be due to a network issue."
          error={error}
          onRetry={refetchClubs}
        />
      );
    }

    return (
      <>
        <LeagueHeader />
        <div className="max-w-6xl mx-auto px-6 py-8">
          <LeagueTable
            onRowClick={(clubCode: string) => navigate(`/club/${clubCode}`)}
            tableRows={standings}
          />
        </div>
      </>
    );
  }, [standings, loading, error, refetchClubs, isConnected, socketError]);

  return (
    <div className="min-h-screen bg-surface">
      <WebSocketStatusBar isConnected={isConnected} error={socketError} />
      {renderContent()}
    </div>
  );
};
