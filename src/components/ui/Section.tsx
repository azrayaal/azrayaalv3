import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  bordered?: boolean;
  children: ReactNode;
  'aria-labelledby'?: string;
}

/** Vertical rhythm for every band on the page: 32 → 48 → 80px by breakpoint. */
export function Section({
  id,
  className,
  containerClassName,
  bordered = false,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-8 sm:py-12 lg:py-20',
        bordered && 'border-t border-line',
        className,
      )}
      {...rest}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
