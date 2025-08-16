/** @format */

import React from 'react';
import Icon from '@mdi/react';
import { mdiFileAlert } from '@mdi/js';
import { Card } from './Card';
import { Label } from './Label';
import { Button } from './Button';

export const ErrorCard = ({
  title,
  message,
  onRetry,
  retryLabel = 'Try Again',
}: {
  title: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}) => {
  return (
    <Card className="text-center p-8 max-w-lg mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center mb-3">
          <Icon path={mdiFileAlert} size={3} className="text-gray-300" />
        </div>

        <Label variant="subheading" className="font-semibold">
          {title}
        </Label>

        <Label variant="caption" className="font-light">
          {message}
        </Label>

        {onRetry && (
          <Button onClick={onRetry} variant="primary" className="w-full mt-5">
            {retryLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};
