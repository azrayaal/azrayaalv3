import type { Transition, Variants } from 'framer-motion';

export const EASE_OUT: Transition['ease'] = [0.22, 1, 0.36, 1];

export const transition: Transition = { duration: 0.6, ease: EASE_OUT };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition },
};

/** Parent variant: children reveal in sequence rather than all at once. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const variantsByName = { fadeUp, fadeLeft, fadeRight, fade, scaleIn } as const;

export type MotionVariantName = keyof typeof variantsByName;
