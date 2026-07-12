import { ArrowLeft } from 'lucide-react';
import { PixelDrifters, Seo } from '@/components/common';
import { Button, Container } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page does not exist." path="/404" />

      <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden py-20">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <PixelDrifters />

        <Container className="relative">
          <div className="flex max-w-[520px] flex-col gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted">
              Error 404
            </span>

            <h1 className="text-dither text-[clamp(3rem,10vw,6rem)] font-medium leading-[0.95] tracking-tight text-fg-strong">
              Nothing here
            </h1>

            <p className="text-base leading-6 text-fg-muted">
              The page you asked for does not exist, or it moved and left no forwarding address.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button to="/">
                <ArrowLeft aria-hidden size={16} strokeWidth={1.5} />
                Back home
              </Button>

              <Button to="/projects" variant="secondary">
                Browse projects
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
