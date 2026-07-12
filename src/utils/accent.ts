import type { AccentColor } from '@/types';

/**
 * Accent colours are a closed set, so their utility classes are looked up
 * rather than interpolated — Tailwind can only see class names it can read.
 */
export const accentText: Record<AccentColor, string> = {
  brand: 'text-brand',
  blue: 'text-blue',
  pink: 'text-pink',
  teal: 'text-teal',
  orange: 'text-orange',
  cyan: 'text-cyan',
};

export const accentBg: Record<AccentColor, string> = {
  brand: 'bg-brand',
  blue: 'bg-blue',
  pink: 'bg-pink',
  teal: 'bg-teal',
  orange: 'bg-orange',
  cyan: 'bg-cyan',
};

export const accentGlow: Record<AccentColor, string> = {
  brand: 'shadow-[0_0_24px_-4px_var(--color-brand)]',
  blue: 'shadow-[0_0_24px_-4px_var(--color-blue)]',
  pink: 'shadow-[0_0_24px_-4px_var(--color-pink)]',
  teal: 'shadow-[0_0_24px_-4px_var(--color-teal)]',
  orange: 'shadow-[0_0_24px_-4px_var(--color-orange)]',
  cyan: 'shadow-[0_0_24px_-4px_var(--color-cyan)]',
};
