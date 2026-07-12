import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types';
import { FeaturedShowcase, ProjectCard } from '@/components/common';
import { Button, Reveal, RevealGroup, RevealItem, Section, SectionTitle } from '@/components/ui';

interface FeaturedWorkProps {
  featured: Project[];
  latest: Project[];
}

export function FeaturedWork({ featured, latest }: FeaturedWorkProps) {
  return (
    <Section bordered aria-labelledby="featured-work-heading">
      <SectionTitle
        id="featured-work-heading"
        eyebrow="Selected work"
        title="Featured projects"
        description="The engagements where the constraint was real and the outcome is measurable."
        action={
          <Button to="/projects" variant="secondary" size="sm">
            See all projects
            <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
          </Button>
        }
      />

      <Reveal>
        <FeaturedShowcase projects={featured} />
      </Reveal>

      <div className="mt-16 lg:mt-20">
        <Reveal className="mb-8 flex items-baseline justify-between gap-4">
          <h3 className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
            Latest releases
          </h3>
          <span className="font-mono text-[11px] text-fg-subtle">{latest.length} shown</span>
        </Reveal>

        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((project, index) => (
            <RevealItem as="li" key={project.id} className="flex">
              <ProjectCard project={project} index={index} className="w-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
