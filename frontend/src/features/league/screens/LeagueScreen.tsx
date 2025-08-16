/** @format */

import React from 'react';
import { Label } from '../../../components/Label';
import { Badge } from '../../../components/Badge';
import { LeagueTable } from '../components/LeagueTable';
import { useGetStandings } from '../useCases/useGetStandings';
import { LiveIndicator } from '../components/LiveIndicator';
import { useNavigate } from 'react-router';

export const LeagueScreen: React.FC = () => {
  const { standings, loading, isConnected } = useGetStandings();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <Label>Loading league table...</Label>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {!!standings.length && <LiveIndicator isConnected={isConnected} />}
        <LeagueTable
          onRowClick={(clubCode: string) => navigate(`/club/${clubCode}`)}
          tableRows={standings}
        />
      </div>
    </div>
  );
};
