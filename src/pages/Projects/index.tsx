import { useMemo } from 'react';
import { PageHeader, ProjectCard, Seo } from '@/components/common';
import {
  Button,
  EmptyState,
  FilterBar,
  RevealGroup,
  RevealItem,
  SearchInput,
  Section,
  Select,
} from '@/components/ui';
import { projectCategories, projects } from '@/data';
import { projectSortOptions, useProjectFilters, type ProjectSort } from '@/hooks';

export default function Projects() {
  const { query, setQuery, category, setCategory, sort, setSort, results, reset, isFiltered } =
    useProjectFilters(projects);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        projectCategories.map((name) => [
          name,
          name === 'All'
            ? projects.length
            : projects.filter((project) => project.category === name).length,
        ]),
      ),
    [],
  );

  return (
    <>
      <Seo
        title="Projects"
        description="Case studies in performance, design systems, and platform engineering."
        path="/projects"
      />

      <PageHeader
        eyebrow={`${projects.length} case studies`}
        title="Selected work"
        description="Every engagement below started with a constraint that mattered latency, accessibility, adoption, or cost. Each one records what changed."
      />

      <Section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search projects"
            placeholder="Search by name, technology, or tag"
            resultCount={results.length}
            className="lg:max-w-[420px] lg:flex-1"
          />

          <Select<ProjectSort>
            label="Sort projects"
            options={projectSortOptions}
            value={sort}
            onChange={setSort}
            className="lg:w-[200px]"
          />
        </div>

        <FilterBar
          label="Filter by category"
          options={projectCategories}
          value={category}
          onChange={setCategory}
          counts={counts}
          className="mt-4"
        />

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
          Showing {results.length} of {projects.length}
        </p>

        {results.length > 0 ? (
          <RevealGroup
            as="ul"
            key={`${category}-${sort}-${query}`}
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((project, index) => (
              <RevealItem as="li" key={project.id} className="flex">
                <ProjectCard project={project} index={index} className="w-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <EmptyState
            className="mt-6"
            title="No projects match that filter"
            description="Try a different technology, category, or clear the filters to see everything."
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
