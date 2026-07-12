import { SearchX } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-md border border-dashed border-line bg-surface px-6 py-16 text-center',
        className,
      )}
    >
      <SearchX aria-hidden size={24} strokeWidth={1.25} className="text-fg-subtle" />

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-fg-strong">{title}</h3>
        <p className="max-w-[420px] text-sm leading-6 text-fg-muted">{description}</p>
      </div>

      {action}
    </div>
  );
}
