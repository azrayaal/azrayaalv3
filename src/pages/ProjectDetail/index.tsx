import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Globe,
  PenTool,
  PlayCircle,
  type LucideIcon,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { Project, ProjectLinks } from '@/types';
import {
  ImageGallery,
  ProjectCard,
  Seo,
  StatusBadge,
} from '@/components/common';
import {
  Button,
  Container,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
  SectionTitle,
  TagList,
} from '@/components/ui';
import { getAdjacentProjects, getProjectBySlug, getRelatedProjects, siteMeta } from '@/data';
import { cn } from '@/utils/cn';
import { formatIndex } from '@/utils/format';
import NotFound from '@/pages/NotFound';

const linkConfig: { key: keyof ProjectLinks; label: string; icon: LucideIcon }[] = [
  { key: 'demo', label: 'Live demo', icon: PlayCircle },
  { key: 'github', label: 'Source', icon: Code2 },
  { key: 'website', label: 'Website', icon: Globe },
  { key: 'figma', label: 'Design file', icon: PenTool },
];

/** Only the blocks the project actually documents are rendered. */
const narrative = (project: Project) =>
  [
    { id: 'problem', label: 'Problem', body: project.problem },
    { id: 'solution', label: 'Solution', body: project.solution },
    { id: 'result', label: 'Result', body: project.result },
  ].filter((block): block is { id: string; label: string; body: string } => Boolean(block.body));

export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);

  // Unknown slug is a missing page, not an empty project page.
  if (!project) return <NotFound />;

  const related = getRelatedProjects(project);
  const { previous, next } = getAdjacentProjects(project.slug);
  const links = linkConfig.filter((link) => project.links[link.key]);

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Year', value: project.year },
    project.teamSize && {
      label: 'Team',
      value: `${project.teamSize} ${project.teamSize === 1 ? 'person' : 'people'}`,
    },
    { label: 'Category', value: project.category },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  const story = narrative(project);
  const architecture = project.architecture ?? [];
  const features = project.features ?? [];
  const gallery = project.gallery ?? [];

  return (
    <>
      <Seo
        title={project.title}
        description={project.shortDescription}
        image={project.coverImage}
        path={`/projects/${project.slug}`}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.shortDescription,
          url: `${siteMeta.url}/projects/${project.slug}`,
          image: project.coverImage,
          datePublished: project.year,
          keywords: project.tags.join(', '),
        }}
      />

      <header className="border-b border-line">
        <Container className="pb-12 pt-8 lg:pb-16">
          <Link
            to="/projects"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted transition-colors hover:text-fg-strong"
          >
            <ArrowLeft aria-hidden size={14} strokeWidth={1.5} />
            All projects
          </Link>

          <Reveal className="mt-8 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge status={project.status} />
              <span aria-hidden className="text-fg-subtle">
                /
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                {project.category}
              </span>
              <span aria-hidden className="text-fg-subtle">
                /
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                {project.year}
              </span>
            </div>

            <h1 className="text-dither text-[clamp(2.5rem,8vw,5rem)] font-medium leading-[1] tracking-tight text-fg-strong">
              {project.title}
            </h1>

            <p className="max-w-[640px] text-balance text-lg leading-7 text-fg-muted">
              {project.shortDescription}
            </p>

            {links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {links.map(({ key, label, icon: LinkIcon }, index) => (
                  <Button
                    key={key}
                    href={project.links[key] as string}
                    variant={index === 0 ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    <LinkIcon aria-hidden size={16} strokeWidth={1.5} />
                    {label}
                    <ArrowUpRight aria-hidden size={14} strokeWidth={1.5} />
                  </Button>
                ))}
              </div>
            )}
          </Reveal>
        </Container>

        <Container>
          <Reveal variant="scaleIn" className="overflow-hidden rounded-md border border-line bg-surface">
            <img
              src={project.coverImage}
              alt={`${project.title} — cover`}
              className="aspect-[2/1] w-full object-cover opacity-90"
            />
          </Reveal>
        </Container>

        <Container className="py-12">
          {/* Hairlines come from each cell's own border rather than a gap over a
              filled parent — a project with three facts leaves no grey ghost cell. */}
          <dl className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-2 border-b border-r border-line bg-bg p-6"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
                  {fact.label}
                </dt>
                <dd className="text-sm font-semibold text-fg-strong">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      <Section aria-labelledby="overview-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2
                id="overview-heading"
                className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted"
              >
                Overview
              </h2>

              <Reveal>
                <p className="max-w-[680px] text-balance text-xl leading-8 text-fg">
                  {project.description}
                </p>
              </Reveal>
            </div>

            {story.length > 0 && (
              <RevealGroup className="flex flex-col gap-10">
                {story.map((block) => (
                  <RevealItem key={block.id} className="border-t border-line pt-8">
                    <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                      {block.label}
                    </h3>
                    <p className="max-w-[680px] text-base leading-7 text-fg">{block.body}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>

          <Reveal variant="fadeLeft" className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                  Highlights
                </h2>

                <ul className="flex flex-col gap-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 border-b border-line pb-3 text-sm leading-6 text-fg"
                    >
                      <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-teal" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                Tech stack
              </h2>
              <TagList items={project.techStack} />
            </div>

            <div>
              <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
                Details
              </h2>

              <dl className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex justify-between border-b border-line pb-3">
                  <dt className="text-fg-subtle">Year</dt>
                  <dd className="text-fg">{project.year}</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <dt className="text-fg-subtle">Role</dt>
                  <dd className="text-fg">{project.role}</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-3">
                  <dt className="text-fg-subtle">Status</dt>
                  <dd className="text-fg">{project.status}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {architecture.length > 0 && (
        <Section bordered aria-labelledby="architecture-heading">
          <SectionTitle
            id="architecture-heading"
            eyebrow="Under the hood"
            title="Architecture"
            description="How the system is put together, layer by layer."
          />

          <RevealGroup as="ul" className="flex flex-col">
            {architecture.map((layer, index) => (
              <RevealItem
                as="li"
                key={layer.layer}
                className={cn(
                  'grid gap-2 border-t border-line py-6 md:grid-cols-[80px_200px_1fr] md:items-baseline md:gap-8',
                  index === architecture.length - 1 && 'border-b',
                )}
              >
                <span className="font-mono text-[11px] text-fg-subtle">{formatIndex(index)}</span>
                <h3 className="text-base font-semibold text-fg-strong">{layer.layer}</h3>
                <p className="text-sm leading-6 text-fg-muted">{layer.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {features.length > 0 && (
        <Section bordered aria-labelledby="features-heading">
          <SectionTitle id="features-heading" eyebrow="What it does" title="Features" />

          <RevealGroup as="ul" className="grid gap-px border border-line bg-line md:grid-cols-2">
            {features.map((feature, index) => (
              <RevealItem
                as="li"
                key={feature.title}
                className="flex flex-col gap-3 bg-bg p-6 transition-colors duration-300 hover:bg-surface lg:p-8"
              >
                <span className="font-mono text-[11px] text-fg-subtle">{formatIndex(index)}</span>
                <h3 className="text-base font-semibold text-fg-strong">{feature.title}</h3>
                <p className="text-sm leading-6 text-fg-muted">{feature.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {gallery.length > 0 && (
        <Section bordered aria-labelledby="gallery-heading">
          <SectionTitle
            id="gallery-heading"
            eyebrow="Screens"
            title="Gallery"
            description="Select an image to open it full size."
          />

          <Reveal>
            <ImageGallery images={gallery} />
          </Reveal>
        </Section>
      )}

      {related.length > 0 && (
        <Section bordered aria-labelledby="related-heading">
          <SectionTitle
            id="related-heading"
            eyebrow="Keep reading"
            title="Related work"
          />

          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <RevealItem as="li" key={item.id} className="flex">
                <ProjectCard project={item} index={index} className="w-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* The divider is a border on the "next" link, not a filled gap — a filled
          parent would tint the container padding and any empty cell grey. */}
      <nav aria-label="Project navigation" className="border-t border-line">
        <Container className="grid sm:grid-cols-2">
          {previous ? (
            <Link
              to={`/projects/${previous.slug}`}
              className="group flex flex-col gap-2 px-4 py-10 transition-colors hover:bg-surface sm:-ml-4"
            >
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
                <ArrowLeft
                  aria-hidden
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Previous
              </span>
              <span className="text-lg font-semibold text-fg-strong">{previous.title}</span>
            </Link>
          ) : (
            <span aria-hidden />
          )}

          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="group flex flex-col items-end gap-2 border-t border-line px-4 py-10 text-right transition-colors hover:bg-surface sm:-mr-4 sm:border-l sm:border-t-0"
            >
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
                Next
                <ArrowRight
                  aria-hidden
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="text-lg font-semibold text-fg-strong">{next.title}</span>
            </Link>
          )}
        </Container>
      </nav>
    </>
  );
}
