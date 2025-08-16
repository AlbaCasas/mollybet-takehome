/** @format */

import React from 'react';
import { Label } from '../../../components/Label';
import { cn } from '../../../core/styles/utils';

export const LiveIndicator = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <div className="flex items-center justify-end mb-4 gap-1">
      <Label variant="caption" className="text-on-muted">
        {isConnected ? 'Results online' : 'Results offline'}
      </Label>
      <div
        className={cn(
          isConnected ? 'bg-green-500' : 'bg-red-500',
          'h-[16px] w-[16px] p-2 rounded-md'
        )}
      />
    </div>
  );
};
