import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  as?: ElementType;
  featured?: boolean;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({
  as: Tag = 'div',
  featured = false,
  interactive = false,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-md border border-line bg-surface p-6 shadow-raised transition-colors duration-300',
        featured && 'border-2 border-brand bg-surface-2 shadow-glow',
        interactive && 'hover:border-line-strong',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
