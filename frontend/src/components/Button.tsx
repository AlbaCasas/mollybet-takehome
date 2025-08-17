/** @format */

import React from 'react';
import { cn } from '../core/styles/utils';
import { Label } from './Label';
import Icon from '@mdi/react';

type ButtonVariant = 'default' | 'primary';

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-secondary hover:bg-muted border border-surface-border',
  primary: 'bg-primary hover:bg-brand-purple border border-primary',
};

const textVariants: Record<ButtonVariant, { className: string }> = {
  default: { className: 'text-on-secondary' },
  primary: { className: 'text-on-primary' },
};

export const Button = ({
  children,
  variant = 'default',
  icon,
  className,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const textConfig = textVariants[variant];

  return (
    <button
      className={cn(
        'cursor-pointer inline-flex items-center justify-center px-4 py-2 rounded-md transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center gap-3">
        {icon && <Icon path={icon} size={0.75} className={textConfig.className} />}
        <Label variant="body" className={textConfig.className}>
          {children}
        </Label>
      </div>
    </button>
  );
};
