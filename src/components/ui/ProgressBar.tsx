import { motion } from 'framer-motion';
import type { AccentColor } from '@/types';
import { usePrefersReducedMotion } from '@/hooks';
import { accentBg } from '@/utils/accent';
import { cn } from '@/utils/cn';
import { EASE_OUT } from '@/utils/motion';

interface ProgressBarProps {
  value: number;
  label: string;
  color?: AccentColor;
  className?: string;
}

/** Animates from zero to `value` when scrolled into view. */
export function ProgressBar({ value, label, color = 'brand', className }: ProgressBarProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn('h-[3px] w-full overflow-hidden rounded-pill bg-surface-3', className)}
    >
      <motion.div
        className={cn('h-full rounded-pill', accentBg[color])}
        initial={reduced ? false : { width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: EASE_OUT }}
        style={reduced ? { width: `${value}%` } : undefined}
      />
    </div>
  );
}
