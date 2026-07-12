import { cn } from '@/utils/cn';

interface TagProps {
  label: string;
  className?: string;
}

/** Monospaced chip used for tech stack and taxonomy. */
export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-xs border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] leading-4 text-fg-muted',
        className,
      )}
    >
      {label}
    </span>
  );
}

interface TagListProps {
  items: string[];
  limit?: number;
  className?: string;
}

export function TagList({ items, limit, className }: TagListProps) {
  const visible = limit ? items.slice(0, limit) : items;
  const overflow = limit ? items.length - visible.length : 0;

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {visible.map((item) => (
        <li key={item}>
          <Tag label={item} />
        </li>
      ))}

      {overflow > 0 && (
        <li>
          <Tag label={`+${overflow}`} className="text-fg-subtle" />
        </li>
      )}
    </ul>
  );
}
