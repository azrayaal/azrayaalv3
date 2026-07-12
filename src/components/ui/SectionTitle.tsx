import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Reveal } from './Reveal';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  as: Heading = 'h2',
  id,
  className,
}: SectionTitleProps) {
  return (
    <Reveal
      className={cn(
        'mb-8 flex flex-col gap-4 sm:mb-12 lg:mb-16',
        align === 'left' && action && 'sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center')}>
        {eyebrow && (
          <span className="font-mono text-xs font-semibold uppercase tracking-[1.2px] text-fg-muted">
            {eyebrow}
          </span>
        )}

        <Heading
          id={id}
          className="text-dither text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.05] tracking-tight text-fg-strong"
        >
          {title}
        </Heading>

        {description && (
          <p className="max-w-[640px] text-balance text-sm leading-6 text-fg-muted sm:text-base">
            {description}
          </p>
        )}
      </div>

      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </Reveal>
  );
}
