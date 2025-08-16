/** @format */

import React from 'react';
import { cn } from '../core/styles/utils';

type LabelVariant = 'heading' | 'subheading' | 'body' | 'caption' | 'small';
type LabelElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface LabelProps {
  children: React.ReactNode;
  variant?: LabelVariant;
  className?: string;
  as?: LabelElement;
}

const variantStyles: Record<LabelVariant, string> = {
  heading: 'text-2xl font-semibold text-on-surface',
  subheading: 'text-xl font-medium text-on-surface',
  body: 'text-base font-normal text-on-surface',
  caption: 'text-sm font-medium text-on-muted',
  small: 'text-xs font-normal text-on-muted',
};

const defaultElements: Record<LabelVariant, LabelElement> = {
  heading: 'h1',
  subheading: 'h2',
  body: 'p',
  caption: 'span',
  small: 'span',
};

export const Label: React.FC<LabelProps> = ({ children, variant = 'body', className, as }) => {
  const Element = as || defaultElements[variant];
  const classes = cn(variantStyles[variant], className);

  return React.createElement(Element, { className: classes }, children);
};

export type { LabelProps };
