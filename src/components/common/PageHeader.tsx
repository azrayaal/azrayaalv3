import type { ReactNode } from 'react';
import { Container, Reveal } from '@/components/ui';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  meta?: ReactNode;
}

/** The masthead every inner page opens with. */
export function PageHeader({ eyebrow, title, description, meta }: PageHeaderProps) {
  return (
    <header className="border-b border-line">
      <Container className="flex flex-col gap-6 pb-12 pt-16 lg:pb-20 lg:pt-24">
        <Reveal className="flex flex-col gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
            {eyebrow}
          </span>

          <h1 className="text-dither text-[clamp(2.5rem,8vw,5rem)] font-medium leading-[1] tracking-tight text-fg-strong">
            {title}
          </h1>

          <p className="max-w-[560px] text-balance text-base leading-6 text-fg-muted">
            {description}
          </p>
        </Reveal>

        {meta && <Reveal delay={0.1}>{meta}</Reveal>}
      </Container>
    </header>
  );
}
