import { ArrowUpRight } from 'lucide-react';
import type { Experience } from '@/types';
import { RevealGroup, RevealItem, TagList } from '@/components/ui';
import { cn } from '@/utils/cn';
import { formatDateRange, formatDuration } from '@/utils/format';

interface TimelineProps {
  items: Experience[];
  /** Compact drops achievements and stack — used on the home page preview. */
  compact?: boolean;
  className?: string;
}

export function Timeline({ items, compact = false, className }: TimelineProps) {
  return (
    <RevealGroup as="ul" className={cn('flex flex-col', className)}>
      {items.map((item, index) => {
        const current = item.endDate === null;

        return (
          <RevealItem as="li" key={item.id} className="group relative">
            <div
              className={cn(
                'grid gap-6 border-t border-line py-8 md:grid-cols-[200px_1fr] md:gap-10 lg:py-10',
                index === items.length - 1 && 'border-b',
              )}
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                  {formatDateRange(item.startDate, item.endDate)}
                </span>
                <span className="font-mono text-[11px] text-fg-subtle">
                  {formatDuration(item.startDate, item.endDate)} · {item.type}
                </span>

                {current && (
                  <span className="mt-1 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.2px] text-teal">
                    <span aria-hidden className="size-1.5 rounded-full bg-teal" />
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <header className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold leading-7 text-fg-strong">{item.role}</h3>

                  <p className="flex items-center gap-2 text-sm text-fg-muted">
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-fg transition-colors hover:text-blue"
                      >
                        {item.company}
                        <ArrowUpRight aria-hidden size={12} strokeWidth={1.5} />
                      </a>
                    ) : (
                      <span className="text-fg">{item.company}</span>
                    )}
                    <span aria-hidden className="text-fg-subtle">
                      /
                    </span>
                    {item.location}
                  </p>
                </header>

                <p className="max-w-[640px] text-sm leading-6 text-fg-muted">{item.description}</p>

                {!compact && (
                  <>
                    <ul className="flex max-w-[640px] flex-col gap-2">
                      {item.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3 text-sm leading-6 text-fg">
                          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-fg-subtle" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    <TagList items={item.stack} className="pt-2" />
                  </>
                )}
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
