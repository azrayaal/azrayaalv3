import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps {
  as?: ElementType;
  size?: 'default' | 'prose' | 'wide';
  className?: string;
  children: ReactNode;
}

const sizes = {
  default: 'max-w-[1280px]',
  prose: 'max-w-[768px]',
  wide: 'max-w-[1600px]',
} as const;

export function Container({ as: Tag = 'div', size = 'default', className, children }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-3 sm:px-4 lg:px-8', sizes[size], className)}>
      {children}
    </Tag>
  );
}
