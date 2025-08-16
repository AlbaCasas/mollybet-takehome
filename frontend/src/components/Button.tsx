/** @format */

import React from 'react';
import { cn } from '../core/styles/utils';
import { Label } from './Label';

type ButtonVariant = 'default' | 'primary';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-secondary hover:bg-muted border border-surface-border',
  primary: 'bg-primary hover:bg-brand-purple border border-primary',
};

const textVariants: Record<ButtonVariant, { className: string }> = {
  default: { className: 'text-on-secondary' },
  primary: { className: 'text-on-primary' },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className,
  onClick,
  disabled = false,
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
      <Label variant="body" className={textConfig.className}>
        {children}
      </Label>
    </button>
  );
};

export type { ButtonProps };
