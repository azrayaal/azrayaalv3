import { useDeferredValue, useMemo, useState } from 'react';
import type { Project } from '@/types';

export type ProjectSort = 'newest' | 'oldest' | 'a-z';

export const projectSortOptions: { value: ProjectSort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'a-z', label: 'Alphabetical' },
];

const matchesQuery = (project: Project, query: string) => {
  const haystack = [
    project.title,
    project.shortDescription,
    project.category,
    ...project.techStack,
    ...project.tags,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
};

/** Projects within a year have no finer ordering, so title breaks the tie. */
const byYear = (a: Project, b: Project) => Number(b.year) - Number(a.year);

const comparators: Record<ProjectSort, (a: Project, b: Project) => number> = {
  newest: (a, b) => byYear(a, b) || a.title.localeCompare(b.title),
  oldest: (a, b) => byYear(b, a) || a.title.localeCompare(b.title),
  'a-z': (a, b) => a.title.localeCompare(b.title),
};

/** Search + category filter + sort over a project collection. */
export function useProjectFilters(source: Project[]) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [sort, setSort] = useState<ProjectSort>('newest');

  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();

    return source
      .filter((project) => (category === 'All' ? true : project.category === category))
      .filter((project) => (needle ? matchesQuery(project, needle) : true))
      .sort(comparators[sort]);
  }, [source, deferredQuery, category, sort]);

  const reset = () => {
    setQuery('');
    setCategory('All');
    setSort('newest');
  };

  const isFiltered = query !== '' || category !== 'All';

  return { query, setQuery, category, setCategory, sort, setSort, results, reset, isFiltered };
}
