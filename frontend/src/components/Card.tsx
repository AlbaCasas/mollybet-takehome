/** @format */

import React from 'react';
import { cn } from '../core/styles/utils';

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('bg-white border border-surface-border rounded-lg p-6', className)}>
      {children}
    </div>
  );
};
