import { ArrowRight } from 'lucide-react';
import type { Profile, SocialLink } from '@/types';
import { PixelDrifters, SocialLinks } from '@/components/common';
import { Button, Container, Reveal } from '@/components/ui';

interface CallToActionProps {
  profile: Profile;
  socials: SocialLink[];
}

export function CallToAction({ profile, socials }: CallToActionProps) {
  return (
    <section className="relative overflow-hidden border-t border-line py-20 lg:py-32">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <PixelDrifters />

      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-dither text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1] tracking-tight text-fg-strong">
            {profile.tagline}
          </h2>

          {/* <p className="max-w-[520px] text-balance text-base leading-6 text-fg-muted">
            {profile.availability}. If you are building something where the details matter, I would
            like to hear about it.
          </p> */}

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button to="/contact">
              Start a conversation
              <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
            </Button>

            <Button href={profile.resumeUrl} variant="secondary" download>
              Download résumé
            </Button>
          </div>

          <SocialLinks links={socials} className="mt-4 justify-center" />
        </Reveal>
      </Container>
    </section>
  );
}
