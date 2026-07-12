import type { Statistic } from '@/types';
import { Counter, RevealGroup, RevealItem } from '@/components/ui';
import { cn } from '@/utils/cn';

interface StatGridProps {
  stats: Statistic[];
  className?: string;
}

export function StatGrid({ stats, className }: StatGridProps) {
  return (
    <RevealGroup
      as="ul"
      className={cn(
        'grid grid-cols-2 divide-line border-y border-line md:grid-cols-4 md:divide-x',
        className,
      )}
    >
      {stats.map((stat) => (
        <RevealItem
          as="li"
          key={stat.id}
          className="flex flex-col gap-2 border-line px-0 py-8 odd:border-r even:pl-6 md:border-r-0 md:px-8 md:odd:border-r-0 md:even:pl-8 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
        >
          <span className="text-dither text-[clamp(2rem,4vw,3rem)] font-medium leading-none text-fg-strong">
            <Counter value={stat.value} suffix={stat.suffix} />
          </span>

          <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
            {stat.label}
          </span>

          <p className="text-sm leading-6 text-fg-subtle">{stat.description}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
