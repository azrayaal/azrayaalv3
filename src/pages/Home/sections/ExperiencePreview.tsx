import { ArrowRight } from 'lucide-react';
import type { Experience } from '@/types';
import { Timeline } from '@/components/common';
import { Button, Section, SectionTitle } from '@/components/ui';

interface ExperiencePreviewProps {
  experiences: Experience[];
}

export function ExperiencePreview({ experiences }: ExperiencePreviewProps) {
  return (
    <Section bordered aria-labelledby="experience-heading">
      <SectionTitle
        id="experience-heading"
        eyebrow="Career"
        title="Where I've been"
        description="Nine years across platform, design systems, and product engineering."
        action={
          <Button to="/about" variant="secondary" size="sm">
            Full history
            <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
          </Button>
        }
      />

      <Timeline items={experiences} compact />
    </Section>
  );
}
