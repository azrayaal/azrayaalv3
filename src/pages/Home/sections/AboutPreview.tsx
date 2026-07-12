import { ArrowRight } from 'lucide-react';
import type { Profile } from '@/types';
import { Marquee, StatGrid } from '@/components/common';
import { Button, Reveal, Section } from '@/components/ui';

interface AboutPreviewProps {
  profile: Profile;
  /** Rendered as a ticker under the intro — usually the top technologies. */
  ticker: string[];
}

export function AboutPreview({ profile, ticker }: AboutPreviewProps) {
  const [intro] = profile.bio;

  return (
    <Section bordered aria-labelledby="about-preview-heading">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-20">
        <Reveal variant="fadeRight">
          <h2
            id="about-preview-heading"
            className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted"
          >
            About
          </h2>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal>
            <p className="text-balance text-xl leading-8 text-fg sm:text-2xl sm:leading-9">
              {intro}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Button to="/about" variant="secondary" size="sm" className="w-fit">
              Read the full story
              <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
            </Button>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-16 lg:mt-20">
        <StatGrid stats={profile.statistics} />
      </Reveal>

      {/* <Marquee items={ticker} className="mt-8" /> */}
    </Section>
  );
}
