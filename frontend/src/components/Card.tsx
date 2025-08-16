/** @format */

import React from 'react';
import { cn } from '../core/styles/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn('bg-white border border-surface-border rounded-lg p-6', className)}>
      {children}
    </div>
  );
};

export type { CardProps };
