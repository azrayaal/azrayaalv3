import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { TagList } from '@/components/ui';
import { StatusBadge } from './StatusBadge';
import { formatIndex } from '@/utils/format';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-md border border-line bg-surface shadow-raised',
        'transition-colors duration-300 hover:border-line-strong focus-within:border-line-strong',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <img
          src={project.thumbnail}
          alt={`${project.title} — ${project.shortDescription}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover opacity-70 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:opacity-100"
        />

        {index !== undefined && (
          <span className="absolute left-4 top-4 font-mono text-[11px] text-fg-muted mix-blend-difference">
            {formatIndex(index)}
          </span>
        )}

        <span className="absolute right-4 top-4 rounded-xs bg-bg/70 px-2 py-1 font-mono text-[11px] uppercase tracking-[1.2px] text-fg backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <header className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold leading-6 text-fg-strong">
            {/* Stretched link keeps the whole card clickable without nesting interactive elements. */}
            <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </h3>

          <ArrowUpRight
            aria-hidden
            size={16}
            strokeWidth={1.5}
            className="mt-1 shrink-0 text-fg-subtle transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg-strong"
          />
        </header>

        <p className="text-sm leading-6 text-fg-muted">{project.shortDescription}</p>

        <TagList items={project.techStack} limit={4} className="mt-auto pt-2" />

        <footer className="flex items-center justify-between border-t border-line pt-4">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[11px] text-fg-subtle">
            {project.year}
          </span>
        </footer>
      </div>
    </article>
  );
}
