/** @format */

import React from 'react';
import { cn } from '../core/styles/utils';
import { Label } from './Label';

type BadgeVariant = 'default' | 'primary';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-muted',
  primary: 'bg-primary px-4 py-2 rounded-full',
};

const textVariants: Record<BadgeVariant, { variant: 'small' | 'caption'; className: string }> = {
  default: { variant: 'small', className: 'text-on-muted' },
  primary: { variant: 'caption', className: 'text-on-primary font-medium' },
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const textConfig = textVariants[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2 py-1 rounded-md',
        variantStyles[variant],
        className
      )}
    >
      <Label variant={textConfig.variant} className={textConfig.className}>
        {children}
      </Label>
    </span>
  );
};

export type { BadgeProps };
