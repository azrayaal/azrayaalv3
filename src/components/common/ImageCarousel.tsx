import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';
import { EASE_OUT } from '@/utils/motion';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  /** Milliseconds each slide stays on screen before the carousel advances. */
  interval?: number;
  className?: string;
}

export function ImageCarousel({ images, alt, interval = 5000, className }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const count = images.length;

  const step = useCallback(
    (next: 1 | -1) => {
      setDirection(next);
      setIndex((current) => (current + next + count) % count);
    },
    [count],
  );

  const goTo = useCallback(
    (target: number) => {
      setDirection(target > index ? 1 : -1);
      setIndex(target);
    },
    [index],
  );

  // A single image needs no timer, and a paused or reduced-motion carousel is
  // driven by the arrows alone.
  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;

    const timer = window.setTimeout(() => step(1), interval);
    return () => window.clearTimeout(timer);
  }, [count, paused, reducedMotion, interval, index, step]);

  if (count === 0) return null;

  const single = count === 1;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-md border border-line bg-surface',
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role={single ? undefined : 'group'}
      aria-roledescription={single ? undefined : 'carousel'}
      aria-label={single ? undefined : alt}
    >
      <div className="relative aspect-[2/1] w-full">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={single ? alt : `${alt} (${index + 1} of ${count})`}
            custom={direction}
            initial={{ x: reducedMotion ? 0 : `${direction * 100}%`, opacity: reducedMotion ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reducedMotion ? 0 : `${direction * -100}%`, opacity: reducedMotion ? 0 : 1 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: EASE_OUT }}
            className="absolute inset-0 size-full object-cover opacity-90"
          />
        </AnimatePresence>
      </div>

      {!single && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-md border border-line bg-surface/80 text-fg opacity-0 backdrop-blur-sm transition-opacity hover:bg-surface-2 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft aria-hidden size={18} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-md border border-line bg-surface/80 text-fg opacity-0 backdrop-blur-sm transition-opacity hover:bg-surface-2 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight aria-hidden size={18} strokeWidth={1.5} />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {images.map((image, dot) => (
              <button
                key={image}
                type="button"
                onClick={() => goTo(dot)}
                aria-label={`Go to image ${dot + 1}`}
                aria-current={dot === index}
                className={cn(
                  'h-1.5 rounded-full transition-[width,background-color] duration-300',
                  dot === index ? 'w-6 bg-fg-strong' : 'w-1.5 bg-fg-subtle hover:bg-fg-muted',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
