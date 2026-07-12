import { Download, Mail } from 'lucide-react';
import { PageHeader, Seo, StatGrid, Timeline } from '@/components/common';
import {
  Button,
  Icon,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
  SectionTitle,
} from '@/components/ui';
import { achievements, education, experiences, profile } from '@/data';

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description={profile.summary}
        path="/about"
        image={profile.avatar}
      />

      <PageHeader
        eyebrow={`${profile.title} · Since ${profile.experienceSince}`}
        title="About"
        description={profile.summary}
        meta={
          <div className="flex flex-wrap gap-3">
            <Button href={profile.resumeUrl} download size="sm" variant="white">
              <Download aria-hidden size={16} strokeWidth={1.5} />
              Résumé
            </Button>

            <Button to="/contact" variant="secondary" size="sm">
              <Mail aria-hidden size={16} strokeWidth={1.5} />
              Get in touch
            </Button>
          </div>
        }
      />

      <Section aria-labelledby="bio-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
          <div className="flex flex-col gap-6">
            <h2
              id="bio-heading"
              className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted"
            >
              Biography
            </h2>

            <RevealGroup className="flex max-w-[680px] flex-col gap-6">
              {profile.bio.map((paragraph, index) => (
                <RevealItem key={paragraph}>
                  <p
                    className={
                      index === 0
                        ? 'text-balance text-xl leading-8 text-fg sm:text-2xl sm:leading-9'
                        : 'text-base leading-7 text-fg-muted'
                    }
                  >
                    {paragraph}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal variant="fadeLeft" className="lg:sticky lg:top-24 lg:self-start">
            <figure className="overflow-hidden rounded-md border border-line bg-surface">
              <img
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover opacity-90"
              />

              <figcaption className="flex flex-col gap-1 border-t border-line px-5 py-4">
                <span className="text-sm font-semibold text-fg-strong">{profile.name}</span>
                <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                  {profile.location} · {profile.timezone}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section bordered aria-labelledby="stats-heading">
        <SectionTitle
          id="stats-heading"
          eyebrow="By the numbers"
          title="Track record"
          description="The measurable outcomes of my work, and the constraints that made them matter."
        />

        <StatGrid stats={profile.statistics} />
      </Section>

      <Section bordered aria-labelledby="career-heading">
        <SectionTitle
          id="career-heading"
          eyebrow="Career journey"
          title="Experience"
          description="The roles, companies, and locations that shaped my career, and the work that made them matter."
        />

        <Timeline items={experiences} />
      </Section>

      <Section bordered aria-labelledby="education-heading">
        <SectionTitle
          id="education-heading"
          eyebrow="Foundation"
          title="Education"
        />

        <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <RevealItem
              as="li"
              key={item.id}
              className="flex flex-col gap-3 rounded-md border border-line bg-surface p-6 shadow-raised"
            >
              <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                {item.startYear} — {item.endYear}
              </span>

              <div>
                <h3 className="text-base font-semibold text-fg-strong">{item.degree}</h3>
                <p className="mt-1 text-sm text-fg-muted">
                  {item.institution} · {item.location}
                </p>
              </div>

              <p className="text-sm leading-6 text-fg-muted">{item.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* <Section bordered aria-labelledby="achievements-heading">
        <SectionTitle
          id="achievements-heading"
          eyebrow="Recognition"
          title="Achievements"
          description="Awards, talks, and the occasional certificate that meant something."
        />

        <RevealGroup as="ul" className="grid gap-px border border-line bg-line md:grid-cols-2">
          {achievements.map((item) => (
            <RevealItem
              as="li"
              key={item.id}
              className="group flex gap-5 bg-bg p-6 transition-colors duration-300 hover:bg-surface lg:p-8"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xs border border-line bg-surface-2 text-fg-muted transition-colors duration-300 group-hover:text-brand">
                <Icon name={item.icon} size={18} />
              </span>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-base font-semibold text-fg-strong">{item.title}</h3>
                  <span className="font-mono text-[11px] text-fg-subtle">{item.year}</span>
                </div>

                <p className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                  {item.issuer}
                </p>

                <p className="text-sm leading-6 text-fg-muted">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section> */}
    </>
  );
}
