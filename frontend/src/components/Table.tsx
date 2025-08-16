/** @format */

import React from 'react';
import { cn } from '../core/styles/utils';
import { Label } from './Label';

type Align = 'left' | 'center' | 'right';

export function Table({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full">{children}</table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-surface border-b border-surface-border">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="bg-surface divide-y divide-surface-border">{children}</tbody>;
}

export function TableRow({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <tr
      className={cn(
        'hover:bg-muted transition-colors',
        {
          'cursor-pointer': onClick,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableTH({
  align = 'center',
  text,
  className,
  children,
}: {
  text?: string;
  align?: Align;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <th
      className={cn(
        'px-4 py-3',
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
        className
      )}
    >
      {text ? (
        <Label variant="small" className="uppercase tracking-wider">
          {text}
        </Label>
      ) : (
        children
      )}
    </th>
  );
}

export function TableTD({
  align = 'center',
  text,
  className,
  children,
  colSpan,
}: {
  text?: string;
  align?: Align;
  className?: string;
  children?: React.ReactNode;
  colSpan?: number;
}) {
  return (
    <td
      className={cn(
        'whitespace-nowrap relative',
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
        className
      )}
      colSpan={colSpan}
    >
      {text ? (
        <Label variant="caption" className="mx-4 my-3">
          {text}
        </Label>
      ) : (
        children
      )}
    </td>
  );
}
