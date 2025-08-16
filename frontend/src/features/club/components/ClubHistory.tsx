/** @format */

import React from 'react';
import { Label } from '../../../components/Label';
import { Badge } from '../../../components/Badge';
import { Card } from '../../../components/Card';
import { ClubMatch } from '../domain/Match';

const MatchHeader = ({
  matchday,
  date,
  status,
  result,
}: {
  matchday: number;
  date: string;
  status: 'HOME' | 'AWAY';
  result: string;
}) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-3">
      <Badge variant="defaultWhite">Matchday {matchday}</Badge>
      <Label variant="small" className="text-on-muted">
        {date}
      </Label>
      <Badge variant={status === 'HOME' ? 'default' : 'defaultWhite'}>{status}</Badge>
    </div>
    <Badge variant="defaultWhite">{result}</Badge>
  </div>
);

const ScoreDisplay = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
}: {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'HOME' | 'AWAY';
}) => (
  <div className="flex items-center justify-center gap-4 py-2 w-full">
    <div className="flex flex-col justify-center text-right">
      <Label
        variant="body"
        className={`font-semibold ${status === 'HOME' ? 'text-on-surface' : 'text-on-muted'}`}
      >
        {homeTeam}
      </Label>
      {status === 'HOME' && (
        <Label variant="small" className="text-on-muted">
          Home
        </Label>
      )}
    </div>
    <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg min-w-20">
      <Label variant="subheading" className="text-on-surface font-bold">
        {homeScore}
      </Label>
      <Label variant="body" className="text-on-muted">
        –
      </Label>
      <Label variant="subheading" className="text-on-surface font-bold">
        {awayScore}
      </Label>
    </div>
    <div className="flex flex-col justify-center text-left">
      <Label
        variant="body"
        className={`font-semibold block ${status === 'AWAY' ? 'text-on-surface' : 'text-on-muted'}`}
      >
        {awayTeam}
      </Label>
      {status === 'AWAY' && (
        <Label variant="small" className="text-on-muted">
          Away
        </Label>
      )}
    </div>
  </div>
);

const GoalsDetail = ({
  goalsFor,
  goalsAgainst,
  goalDifference,
}: {
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}) => (
  <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-surface-border">
    <div className="text-center">
      <Label variant="small" className="text-on-muted block mb-1">
        Goals For
      </Label>
      <Label variant="small" className="text-on-surface font-bold">
        {goalsFor}
      </Label>
    </div>
    <div className="text-center">
      <Label variant="small" className="text-on-muted block mb-1">
        Goals Against
      </Label>
      <Label variant="small" className="text-on-surface font-bold">
        {goalsAgainst}
      </Label>
    </div>
    <div className="text-center">
      <Label variant="small" className="text-on-muted block mb-1">
        Goal Difference
      </Label>
      <Label
        variant="small"
        className={`font-bold ${goalDifference < 0 ? 'text-error' : 'text-on-surface'}`}
      >
        {goalDifference > 0 ? '+' : ''}
        {goalDifference}
      </Label>
    </div>
  </div>
);

const MatchCard = ({ match }: { match: ClubMatch }) => (
  <div className="p-4 rounded-lg border border-surface-border hover:bg-muted transition-colors bg-white">
    <MatchHeader
      matchday={match.matchday}
      date={match.date}
      status={match.status}
      result={match.result}
    />
    <ScoreDisplay
      homeTeam={match.homeTeam}
      awayTeam={match.awayTeam}
      homeScore={match.homeScore}
      awayScore={match.awayScore}
      status={match.status}
    />
    <GoalsDetail
      goalsFor={match.goalsFor}
      goalsAgainst={match.goalsAgainst}
      goalDifference={match.goalDifference}
    />
  </div>
);

export const ClubHistory = ({
  matches,
  className,
}: {
  matches: ClubMatch[];
  className?: string;
}) => {
  return (
    <Card className={className || ''}>
      <Label variant="subheading" className="text-on-surface mb-4">
        Match History ({matches.length} matches)
      </Label>

      <div className="space-y-4">
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </div>
    </Card>
  );
};
