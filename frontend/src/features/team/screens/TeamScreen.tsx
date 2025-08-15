/** @format */

import React from 'react';
import { useParams } from 'react-router';

export const TeamScreen: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  return (
    <div className="min-h-screen p-8 bg-surface">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Team Code</h2>
        <p className="text-lg bg-primary text-on-primary rounded border">
          {code || 'No team code provided'}
        </p>
      </div>
    </div>
  );
};
