/** @format */

import React from 'react';
import { Label } from '../../../components/Label';
import { Badge } from '../../../components/Badge';

export const LeagueHeader = () => {
  return (
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
  );
};
