import { motion } from 'framer-motion';
import type { ElementType } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';
import { EASE_OUT } from '@/utils/motion';

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  delay?: number;
  className?: string;
}

const word = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/**
 * Word-by-word entrance. The full string stays in the accessibility tree as a
 * single label; the animated spans are hidden from it.
 */
export function AnimatedText({ text, as: Tag = 'span', delay = 0, className }: AnimatedTextProps) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  if (reduced) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
        className="inline-flex flex-wrap"
      >
        {words.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-block overflow-hidden pb-[0.06em]">
            <motion.span variants={word} className={cn('inline-block', index > 0 && 'ml-[0.25em]')}>
              {item}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
