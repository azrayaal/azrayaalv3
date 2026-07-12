import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { GalleryImage } from '@/types';
import { useLockBodyScroll } from '@/hooks';
import { cn } from '@/utils/cn';
import { EASE_OUT } from '@/utils/motion';

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  useLockBodyScroll(isOpen);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) =>
      setOpenIndex((current) =>
        current === null ? current : (current + direction + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close, step]);

  if (images.length === 0) return null;

  const active = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul className={cn('grid gap-4 sm:grid-cols-2', className)}>
        {images.map((image, index) => (
          <li
            key={image.src}
            className={cn('group', index === 0 && images.length > 2 && 'sm:col-span-2')}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open image: ${image.caption ?? image.alt}`}
              className="block w-full overflow-hidden rounded-md border border-line bg-surface transition-colors hover:border-line-strong"
            >
              <span className="block aspect-[16/10] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover opacity-80 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-hover:opacity-100"
                />
              </span>

              {image.caption && (
                <span className="block border-t border-line px-4 py-3 text-left font-mono text-[11px] text-fg-muted">
                  {image.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.caption ?? active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full w-full max-w-[1100px] overflow-hidden rounded-md border border-line bg-surface shadow-overlay"
            >
              <img src={active.src} alt={active.alt} className="max-h-[70vh] w-full object-contain" />

              {active.caption && (
                <figcaption className="border-t border-line px-6 py-4 font-mono text-xs text-fg-muted">
                  {active.caption}
                </figcaption>
              )}
            </motion.figure>

            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              autoFocus
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-md border border-line bg-surface text-fg transition-colors hover:bg-surface-2 sm:right-8 sm:top-8"
            >
              <X aria-hidden size={18} strokeWidth={1.5} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-md border border-line bg-surface text-fg transition-colors hover:bg-surface-2"
                >
                  <ChevronLeft aria-hidden size={18} strokeWidth={1.5} />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-md border border-line bg-surface text-fg transition-colors hover:bg-surface-2"
                >
                  <ChevronRight aria-hidden size={18} strokeWidth={1.5} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
