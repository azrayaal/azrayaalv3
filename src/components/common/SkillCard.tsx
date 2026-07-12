import type { Skill } from '@/types';
import { Icon } from '@/components/ui';
import { accentText } from '@/utils/accent';
import { cn } from '@/utils/cn';

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export function SkillCard({ skill, className }: SkillCardProps) {
  return (
    <article
      className={cn(
        'group flex flex-col gap-4 rounded-md border border-line bg-surface p-6 shadow-raised transition-colors duration-300 hover:border-line-strong',
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex size-9 items-center justify-center rounded-xs border border-line bg-surface-2 transition-colors duration-300 group-hover:border-line-strong',
              accentText[skill.color],
            )}
          >
            <Icon name={skill.icon} size={16} />
          </span>

          <div>
            <h3 className="text-sm font-semibold text-fg-strong">{skill.name}</h3>
            <p className="font-mono text-[11px] text-fg-subtle">
              {skill.years} {skill.years === 1 ? 'year' : 'years'}
            </p>
          </div>
        </div>

        {/* <span className="font-mono text-xs tabular-nums text-fg-muted">{skill.level}</span> */}
      </header>

      <p className="text-sm leading-6 text-fg-muted">{skill.description}</p>

      {/* <ProgressBar
        value={skill.level}
        color={skill.color}
        label={`${skill.name} proficiency`}
        className="mt-auto"
      /> */}
    </article>
  );
}
