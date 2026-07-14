import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';

/** Position, scale and drift are fixed rather than random so the composition is stable. */
const drifters = [
  { top: '12%', left: '18%', size: 34, delay: 0, drift: 14, duration: 9 },
  { top: '20%', left: '48%', size: 44, delay: 1.2, drift: -18, duration: 11 },
  { top: '34%', left: '86%', size: 30, delay: 0.6, drift: 12, duration: 10 },
  { top: '58%', left: '8%', size: 38, delay: 2, drift: -12, duration: 12 },
  { top: '66%', left: '66%', size: 26, delay: 1.6, drift: 16, duration: 8.5 },
  { top: '78%', left: '34%', size: 32, delay: 0.9, drift: -14, duration: 13 },
] as const;

/**
 * Pixel sprite drawn from square units — no external asset, and it scales
 * without smoothing because every edge lands on a whole coordinate.
 */
function Sprite({ size }: { size: number }) { 
  return (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden
    shapeRendering="crispEdges"
    className="text-fg-subtle"
  >
    {/* Body */}
    <path
      d="M2 1h8v9H2V1z"
      fill="currentColor"
      fillOpacity="0.35"
    />

    {/* Border */}
    <path
      d="M2 1h8v1H2V1zM2 10h8v1H2v-1zM1 2h1v8H1V2zM10 2h1v8h-1V2z"
      fill="currentColor"
    />

    {/* Eyes */}
    <path
      d="M4 4h1v2H4V4zM7 4h1v2H7V4z"
      fill="var(--color-bg)"
    />

    {/* Arms & Legs */}
    <path
      d="M0 3h1v2H0V3zM11 3h1v2h-1V3zM3 11h1v1H3v-1zM8 11h1v1H8v-1z"
      fill="#5B21B6"
    />
  </svg>
  );
}

interface PixelDriftersProps {
  className?: string;
}

/** Ambient background layer. Purely decorative — hidden from assistive tech. */
export function PixelDrifters({ className }: PixelDriftersProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {drifters.map((drifter, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ top: drifter.top, left: drifter.left }}
          initial={{ opacity: 0, y: 0 }}
          animate={
            reduced
              ? { opacity: 0.5 }
              : { opacity: 0.5, y: [0, drifter.drift, 0] }
          }
          transition={
            reduced
              ? { duration: 0.4 }
              : {
                  opacity: { duration: 1.2, delay: drifter.delay * 0.3 },
                  y: {
                    duration: drifter.duration,
                    delay: drifter.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
          }
        >
          <Sprite size={drifter.size} />
        </motion.div>
      ))}
    </div>
  );
}
