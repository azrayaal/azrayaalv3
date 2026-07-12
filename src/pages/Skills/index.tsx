import { useMemo } from 'react';
import type { SkillCategory } from '@/types';
import { PageHeader, Seo, SkillCard } from '@/components/common';
import {
  Button,
  EmptyState,
  FilterBar,
  RevealGroup,
  RevealItem,
  SearchInput,
  Section,
} from '@/components/ui';
import { skillCategories, skills } from '@/data';
import { useSkillFilters } from '@/hooks';

const filterOptions: readonly (SkillCategory | 'All')[] = ['All', ...skillCategories];

export default function Skills() {
  const { query, setQuery, category, setCategory, groups, results, reset, isFiltered } =
    useSkillFilters(skills, skillCategories);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        filterOptions.map((name) => [
          name,
          name === 'All' ? skills.length : skills.filter((skill) => skill.category === name).length,
        ]),
      ) as Partial<Record<SkillCategory | 'All', number>>,
    [],
  );

  const averageYears = useMemo(
    () => Math.round(skills.reduce((total, skill) => total + skill.years, 0) / skills.length),
    [],
  );

  return (
    <>
      <Seo
        title="Skills"
        description="The technologies I work with, grouped by discipline, with the depth behind each."
        path="/skills"
      />

      <PageHeader
        eyebrow={`${skills.length} technologies · ${averageYears} years average`}
        title="Capabilities"
        description="Grouped by discipline. The number beside each is proficiency, not enthusiasm — I have kept it honest."
      />

      <Section>
        <div className="flex flex-col gap-4">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search skills"
            placeholder="Search a technology"
            resultCount={results.length}
            className="lg:max-w-[420px]"
          />

          <FilterBar
            label="Filter by discipline"
            options={filterOptions}
            value={category}
            onChange={setCategory}
            counts={counts}
          />
        </div>

        {groups.length > 0 ? (
          <div className="mt-12 flex flex-col gap-16">
            {groups.map((group) => (
              <section key={group.category} aria-labelledby={`skills-${group.category}`}>
                <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <h2
                    id={`skills-${group.category}`}
                    className="text-lg font-semibold tracking-tight text-fg-strong"
                  >
                    {group.category}
                  </h2>

                  <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
                    {group.skills.length}{' '}
                    {group.skills.length === 1 ? 'technology' : 'technologies'}
                  </span>
                </div>

                <RevealGroup
                  as="ul"
                  gap={0.05}
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {group.skills.map((skill) => (
                    <RevealItem as="li" key={skill.id} className="flex">
                      <SkillCard skill={skill} className="w-full" />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-12"
            title="Nothing matches that search"
            description="No technology in the list matches your query. Try a broader term."
            action={
              isFiltered && (
                <Button variant="secondary" size="sm" onClick={reset}>
                  Clear filters
                </Button>
              )
            }
          />
        )}
      </Section>
    </>
  );
}
