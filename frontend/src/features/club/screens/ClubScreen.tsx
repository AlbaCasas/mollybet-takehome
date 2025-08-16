/** @format */

import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { ClubHistory } from '../components/ClubHistory';
import { Label } from '../../../components/Label';
import { Card } from '../../../components/Card';

const mockTeamData = {
  name: 'AFC Bournemouth',
  code: 'BOU',
  matches: [
    {
      matchday: 3,
      date: 'Sat, 24 Aug 2019',
      status: 'HOME' as const,
      homeTeam: 'AFC Bournemouth',
      awayTeam: 'Manchester City FC',
      homeScore: 1,
      awayScore: 3,
      goalsFor: 1,
      goalsAgainst: 3,
      goalDifference: -2,
      result: 'L',
    },
    {
      matchday: 2,
      date: 'Sat, 17 Aug 2019',
      status: 'AWAY' as const,
      homeTeam: 'Aston Villa FC',
      awayTeam: 'AFC Bournemouth',
      homeScore: 1,
      awayScore: 2,
      goalsFor: 2,
      goalsAgainst: 1,
      goalDifference: 1,
      result: 'W',
    },
  ],
};

export const ClubScreen: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();

  return (
    <div className="min-h-screen p-8 bg-surface">
      <div className="mb-6">
        <Button onClick={() => navigate('/')}>← Back to League Table</Button>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <Badge variant="primary">Premier League 2019/2020</Badge>
        </div>

        <Card className={`mb-8 text-center gap-4 flex`}>
          <Badge>{code}</Badge>
          <Label variant="heading">{mockTeamData.name}</Label>
        </Card>
        <ClubHistory matches={mockTeamData.matches} />
      </div>
    </div>
  );
};
