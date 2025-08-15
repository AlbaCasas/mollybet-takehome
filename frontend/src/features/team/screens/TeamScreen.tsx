/** @format */

import React from 'react';
import { useParams } from 'react-router';

export const TeamScreen: React.FC = () => {
  const { code } = useParams<{ code: string }>();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Team Code</h2>
        <p className="text-lg bg-blue-50 rounded border">{code || 'No team code provided'}</p>
      </div>
    </div>
  );
};
