import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

/**
 * Continuous ticker. The list is duplicated so the translation can loop
 * seamlessly; the duplicate is hidden from assistive tech.
 */
export function Marquee({ items, speed = 40, className }: MarqueeProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <ul className={cn('flex flex-wrap gap-x-8 gap-y-2', className)}>
        {items.map((item) => (
          <li key={item} className="font-mono text-xs uppercase tracking-[1.2px] text-fg-subtle">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]',
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center gap-8 pr-8 [animation:marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
          style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
        >
          {items.map((item) => (
            <li
              key={item}
              className="flex shrink-0 items-center gap-8 font-mono text-xs uppercase tracking-[1.2px] text-fg-subtle"
            >
              {item}
              <span aria-hidden className="size-1 rounded-full bg-surface-3" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
