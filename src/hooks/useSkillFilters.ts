import { useDeferredValue, useMemo, useState } from 'react';
import type { Skill, SkillCategory } from '@/types';

export type SkillGroup = { category: SkillCategory; skills: Skill[] };

/** Search + category filter, grouped by category for sectioned rendering. */
export function useSkillFilters(source: Skill[], categories: SkillCategory[]) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SkillCategory | 'All'>('All');

  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();

    return source
      .filter((skill) => (category === 'All' ? true : skill.category === category))
      .filter((skill) =>
        needle
          ? `${skill.name} ${skill.description} ${skill.category}`.toLowerCase().includes(needle)
          : true,
      );
  }, [source, deferredQuery, category]);

  const groups = useMemo<SkillGroup[]>(
    () =>
      categories
        .map((name) => ({
          category: name,
          skills: results.filter((skill) => skill.category === name),
        }))
        .filter((group) => group.skills.length > 0),
    [categories, results],
  );

  const reset = () => {
    setQuery('');
    setCategory('All');
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    groups,
    reset,
    isFiltered: query !== '' || category !== 'All',
  };
}
