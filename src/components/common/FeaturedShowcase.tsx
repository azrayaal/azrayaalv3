import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { useMediaQuery } from '@/hooks';
import { accentText } from '@/utils/accent';
import { cn } from '@/utils/cn';
import { formatIndex } from '@/utils/format';
import { EASE_OUT } from '@/utils/motion';

interface FeaturedShowcaseProps {
  projects: Project[];
}

/**
 * A list of projects paired with a single preview pane: pointing at — or
 * keyboard-focusing — a row swaps the image. Below the desktop breakpoint the
 * pane is dropped and each row carries its own thumbnail.
 */
export function FeaturedShowcase({ projects }: FeaturedShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const active = projects[activeIndex];

  if (projects.length === 0) return null;

  return (
    <div className="grid overflow-hidden rounded-md border border-line bg-surface lg:grid-cols-[1fr_460px]">
      <ul className="divide-y divide-line">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={project.id}>
              <Link
                to={`/projects/${project.slug}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={cn(
                  'group relative flex items-center gap-4 px-6 py-5 transition-colors duration-300 sm:gap-6 sm:px-8 sm:py-6',
                  isActive && isDesktop ? 'bg-surface-2' : 'hover:bg-surface-2',
                )}
              >
                <span
                  className={cn(
                    'font-mono text-[11px] transition-colors duration-300',
                    isActive ? accentText[project.color] : 'text-fg-subtle',
                  )}
                >
                  {formatIndex(index)}
                </span>

                {/* Row thumbnail stands in for the preview pane on small screens. */}
                <img
                  src={project.thumbnail}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="hidden size-12 shrink-0 rounded-xs border border-line object-cover opacity-80 sm:block lg:hidden"
                />

                <div className="min-w-0 flex-1">
                  <h3
                    className={cn(
                      'truncate text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-300',
                      isActive ? 'text-fg-strong' : 'text-fg-muted group-hover:text-fg',
                    )}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-1 truncate font-mono text-xs transition-colors duration-300',
                      isActive ? 'text-fg-muted' : 'text-fg-subtle',
                    )}
                  >
                    {project.role} · {project.category}
                  </p>
                </div>

                <ArrowUpRight
                  aria-hidden
                  size={16}
                  strokeWidth={1.5}
                  className={cn(
                    'shrink-0 transition-[opacity,transform] duration-300',
                    isActive
                      ? 'text-fg-strong opacity-100'
                      : 'text-fg-subtle opacity-0 group-hover:opacity-100',
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        aria-hidden
        className="relative hidden overflow-hidden border-l border-line bg-surface-2 lg:block"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={active.id}
            src={active.coverImage}
            alt=""
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-6 pt-16">
          <p className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
            {[active.year, active.teamSize && `${active.teamSize} people`]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <p className="mt-2 text-sm leading-6 text-fg">{active.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
