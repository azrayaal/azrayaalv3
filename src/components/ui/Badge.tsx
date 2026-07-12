import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type BadgeTone = 'brand' | 'neutral' | 'warning' | 'danger' | 'success';

const tones: Record<BadgeTone, string> = {
  brand: 'bg-brand text-fg-strong',
  neutral: 'border border-fg-subtle bg-surface-2 text-fg',
  warning: 'bg-warning text-bg',
  danger: 'bg-danger text-fg-strong',
  success: 'bg-teal text-bg',
};

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold leading-4',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
