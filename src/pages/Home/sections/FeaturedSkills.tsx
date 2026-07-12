import { ArrowRight } from 'lucide-react';
import type { Skill } from '@/types';
import { Button, Icon, ProgressBar, RevealGroup, RevealItem, Section, SectionTitle } from '@/components/ui';
import { accentText } from '@/utils/accent';
import { cn } from '@/utils/cn';

interface FeaturedSkillsProps {
  skills: Skill[];
}

/** A dense hairline grid rather than cards — the detail lives on the Skills page. */
export function FeaturedSkills({ skills }: FeaturedSkillsProps) {
  return (
    <Section bordered aria-labelledby="featured-skills-heading">
      <SectionTitle
        id="featured-skills-heading"
        eyebrow="Capabilities"
        title="What I work with"
        description="The tools I reach for daily, and the depth behind each one."
        action={
          <Button to="/skills" variant="secondary" size="sm">
            All skills
            <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
          </Button>
        }
      />

      <RevealGroup
        as="ul"
        gap={0.05}
        className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((skill) => (
          <RevealItem
            as="li"
            key={skill.id}
            className="group flex flex-col gap-4 bg-bg p-6 transition-colors duration-300 hover:bg-surface"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Icon name={skill.icon} size={16} className={cn(accentText[skill.color])} />
                <h3 className="text-sm font-semibold text-fg-strong">{skill.name}</h3>
              </div>

              <span className="font-mono text-[11px] text-fg-subtle">
                {skill.years}y · {skill.level}
              </span>
            </div>

            <ProgressBar value={skill.level} color={skill.color} label={`${skill.name} proficiency`} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
