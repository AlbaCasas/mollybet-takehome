/** @format */

import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { ClubHistory } from '../components/ClubHistory';
import { Label } from '../../../components/Label';
import { Card } from '../../../components/Card';
import { useGetClubHistory } from '../useCases/useGetClubHistory';

export const ClubScreen: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const { history, error } = useGetClubHistory(code || '');

  if (error || !history) {
    return <div>Error: {error}</div>;
  }

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
          <Badge>{history.code}</Badge>
          <Label variant="heading">{history.name}</Label>
        </Card>
        <ClubHistory matches={history.matches} />
      </div>
    </div>
  );
};
