import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_OUT } from '@/utils/motion';

interface PageTransitionProps {
  children: ReactNode;
}

/** Wraps each route so navigation cross-fades rather than snapping. */
export function PageTransition({ children }: PageTransitionProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
