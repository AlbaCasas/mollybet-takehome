/** @format */

import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { ClubHistory } from '../components/ClubHistory';
import { Label } from '../../../components/Label';
import { Card } from '../../../components/Card';
import { WebSocketStatusBar } from '../../../components/WebSocketStatusBar';
import { ErrorCard } from '../../../components/ErrorCard';
import { useGetClubHistory } from '../useCases/useGetClubHistory';

export const ClubScreen: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const { history, loading, error, refetchClub, isSocketConnected, socketError } =
    useGetClubHistory(code || '');

  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Label variant="body" className="text-on-muted">
            Loading club details...
          </Label>
        </div>
      );
    }

    if (error || !history) {
      return (
        <div className="flex justify-center items-center h-64">
          <ErrorCard
            title="Club Not Found"
            message={error || 'No data available'}
            onRetry={refetchClub}
            retryLabel="Retry"
          />
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <Badge variant="primary">Premier League 2019/2020</Badge>
        </div>

        <Card className={`mb-8 text-center gap-4 flex`}>
          <Badge>{history.code}</Badge>
          <Label variant="heading">{history.name}</Label>
        </Card>
        <ClubHistory matches={history.matches} />
      </div>
    );
  }, [history, loading, error, refetchClub, isSocketConnected, socketError]);

  return (
    <div className="min-h-screen bg-surface">
      <WebSocketStatusBar isConnected={isSocketConnected} error={socketError} />
      <div className="p-8">
        <div className="mb-6">
          <Button onClick={() => navigate('/')}>← Back to League Table</Button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};
