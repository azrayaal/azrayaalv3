import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { stagger, variantsByName, type MotionVariantName } from '@/utils/motion';

/**
 * Motion components are created once at module scope — building them during
 * render would remount the subtree on every pass.
 */
const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  span: motion.span,
} as const;

type Tag = keyof typeof tags;

interface RevealProps extends ComponentPropsWithoutRef<typeof motion.div> {
  as?: Tag;
  variant?: MotionVariantName;
  delay?: number;
  amount?: number;
  children: ReactNode;
}

/** Scroll-triggered entrance. Renders statically when reduced motion is set. */
export function Reveal({
  as = 'div',
  variant = 'fadeUp',
  delay = 0,
  amount = 0.2,
  children,
  ...rest
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  // Cast widens the union of motion tags to a single renderable type.
  const Component = tags[as] as ElementType;

  if (reduced) {
    return (
      <Component className={rest.className} id={rest.id}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variantsByName[variant]}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}

interface RevealGroupProps extends ComponentPropsWithoutRef<typeof motion.div> {
  as?: Tag;
  gap?: number;
  delay?: number;
  amount?: number;
  children: ReactNode;
}

/** Parent for staggered reveals. Children must be `RevealItem`. */
export function RevealGroup({
  as = 'div',
  gap = 0.08,
  delay = 0,
  amount = 0.12,
  children,
  ...rest
}: RevealGroupProps) {
  const reduced = usePrefersReducedMotion();
  // Cast widens the union of motion tags to a single renderable type.
  const Component = tags[as] as ElementType;

  if (reduced) {
    return <Component className={rest.className}>{children}</Component>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={stagger(gap, delay)}
      {...rest}
    >
      {children}
    </Component>
  );
}

interface RevealItemProps extends ComponentPropsWithoutRef<typeof motion.div> {
  as?: Tag;
  variant?: MotionVariantName;
  children: ReactNode;
}

export function RevealItem({ as = 'div', variant = 'fadeUp', children, ...rest }: RevealItemProps) {
  const reduced = usePrefersReducedMotion();
  // Cast widens the union of motion tags to a single renderable type.
  const Component = tags[as] as ElementType;

  if (reduced) {
    return <Component className={rest.className}>{children}</Component>;
  }

  return (
    <Component variants={variantsByName[variant]} {...rest}>
      {children}
    </Component>
  );
}
