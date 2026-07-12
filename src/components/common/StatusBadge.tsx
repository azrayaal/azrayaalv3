import type { ProjectStatus } from '@/types';
import { cn } from '@/utils/cn';

const config: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: 'Live', dot: 'bg-teal' },
  'in-progress': { label: 'In progress', dot: 'bg-warning' },
  archived: { label: 'Archived', dot: 'bg-fg-subtle' },
  concept: { label: 'Concept', dot: 'bg-blue' },
};

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, dot } = config[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted',
        className,
      )}
    >
      <span aria-hidden className={cn('size-1.5 rounded-full', dot)} />
      {label}
    </span>
  );
}
