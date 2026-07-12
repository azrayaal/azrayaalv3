/**
 * Content access layer.
 *
 * Pages never import the raw arrays — they call these selectors. When content
 * moves to a CMS, these functions become async fetchers and the pages that call
 * them are the only thing that changes shape.
 */
import type { Project } from '@/types';
import { projects } from './projects';

export * from './portfolio';
export * from './projects';
export * from './skills';
export * from './socials';
export * from './experience';

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

/** Projects sharing a category or tag with the given project. */
export const getRelatedProjects = (project: Project, limit = 3): Project[] =>
  projects
    .filter((candidate) => candidate.id !== project.id)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === project.category ? 2 : 0) +
        candidate.tags.filter((tag) => project.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);

/** Previous/next in publication order, for detail-page navigation. */
export const getAdjacentProjects = (slug: string) => {
  const ordered = [...projects].sort(
    (a, b) => Number(b.year) - Number(a.year) || a.title.localeCompare(b.title),
  );
  const index = ordered.findIndex((project) => project.slug === slug);

  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
};
