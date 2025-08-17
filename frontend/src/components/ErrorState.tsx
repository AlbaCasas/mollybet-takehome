/** @format */

import React from 'react';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline, mdiArrowLeft, mdiRefresh } from '@mdi/js';
import { Card } from './Card';
import { Label } from './Label';
import { Button } from './Button';

export const ErrorState = ({
  title,
  message,
  error,
  onRetry,
  onGoBack,
}: {
  title: string;
  message: string;
  error?: string | null;
  onRetry?: () => void;
  onGoBack?: () => void;
}) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md md:min-w-[450px] text-center p-8">
        <div className="flex flex-col items-center">
          <Icon path={mdiAlertCircleOutline} size={2.5} className="text-gray-500 mb-5" />

          <div className="flex flex-col gap-2">
            <Label variant="subheading" className="font-bold text-2xl">
              {title}
            </Label>
            <Label variant="body" className="text-gray-500">
              {message}
            </Label>
          </div>

          {error && (
            <div className="flex flex-col w-full rounded-lg border border-error/60 p-3 bg-error/10 mt-6">
              <Label variant="caption" className="font-regular">
                {error}
              </Label>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full mt-6">
            {onRetry && (
              <Button onClick={onRetry} variant="primary" className="flex-1" icon={mdiRefresh}>
                Try Again
              </Button>
            )}

            {onGoBack && (
              <Button onClick={onGoBack} variant="default" className="flex-1" icon={mdiArrowLeft}>
                Go Back
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
