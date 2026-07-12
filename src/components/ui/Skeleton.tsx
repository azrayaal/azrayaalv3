import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden className={cn('animate-pulse rounded-xs bg-surface-2', className)} />;
}

/** Route-level fallback matching the shape of a card grid. */
export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-3 py-20 sm:px-4 lg:px-8" role="status" aria-label="Loading">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-6 h-14 w-2/3 max-w-[540px]" />
      <Skeleton className="mt-4 h-4 w-full max-w-[420px]" />

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-72 rounded-md" />
        ))}
      </div>
    </div>
  );
}
