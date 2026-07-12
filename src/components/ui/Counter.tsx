import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';
import { EASE_OUT } from '@/utils/motion';

interface CounterProps {
  value: number | string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = '',
  duration = 1.4,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();

  const isNumber = typeof value === 'number';

  const [display, setDisplay] = useState<number | string>(
    reduced || !isNumber ? value : 0
  );

  useEffect(() => {
    if (!isNumber || !inView || reduced) return;

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, reduced, value, duration, isNumber]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {display}
      {suffix}
    </span>
  );
}