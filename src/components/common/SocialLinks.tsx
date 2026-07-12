import { ArrowUpRight } from 'lucide-react';
import type { SocialLink } from '@/types';
import { cn } from '@/utils/cn';

interface SocialLinksProps {
  links: SocialLink[];
  variant?: 'inline' | 'list';
  className?: string;
}

/**
 * Typographic rather than pictorial: the system has no brand marks, and a row
 * of foreign logos would be the only thing on the page that is not ours.
 */
export function SocialLinks({ links, variant = 'inline', className }: SocialLinksProps) {
  if (variant === 'list') {
    return (
      <ul className={cn('flex flex-col', className)}>
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex min-h-11 items-center justify-between gap-4 border-b border-line py-3"
            >
              <span className="text-sm text-fg transition-colors group-hover:text-fg-strong">
                {link.label}
              </span>

              <span className="flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors group-hover:text-fg">
                {link.handle}
                <ArrowUpRight
                  aria-hidden
                  size={12}
                  strokeWidth={1.5}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${link.label} — ${link.handle}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted transition-colors hover:border-line-strong hover:bg-surface hover:text-fg-strong"
          >
            {link.label}
            <ArrowUpRight aria-hidden size={12} strokeWidth={1.5} />
          </a>
        </li>
      ))}
    </ul>
  );
}
