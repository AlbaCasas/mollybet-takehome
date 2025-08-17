/** @format */

import React from 'react';
import { cn } from '../core/styles/utils';
import { Label, LabelVariant } from './Label';

type BadgeVariant = 'default' | 'defaultWhite' | 'defaultSmall' | 'primary';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-muted border-1 border-gray-300',
  defaultWhite: 'bg-white border-1 border-gray-300',
  defaultSmall: 'bg-muted border-1 border-gray-300',
  primary: 'bg-primary px-4 py-2 rounded-full',
};

const textVariants: Record<BadgeVariant, { variant: LabelVariant; className: string }> = {
  default: { variant: 'small', className: 'text-on-muted font-semibold  px-2 py-1' },
  defaultWhite: { variant: 'small', className: 'text-on-surface font-semibold  px-2 py-1' },
  defaultSmall: { variant: 'extraSmall', className: 'text-on-muted font-semibold px-1 py-0.5' },
  primary: { variant: 'caption', className: 'text-on-primary font-medium' },
};

export const Badge = ({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) => {
  const textConfig = textVariants[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        variantStyles[variant],
        className
      )}
    >
      <Label variant={textConfig.variant} className={cn(textConfig.className)}>
        {children}
      </Label>
    </span>
  );
};
