import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Profile } from '@/types';
import { PixelDrifters } from '@/components/common';
import { AnimatedText, Container } from '@/components/ui';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_OUT } from '@/utils/motion';

interface HeroProps {
  profile: Profile;
  projectCount: number;
}

export function Hero({ profile, projectCount }: HeroProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-end overflow-hidden pb-12 pt-24 lg:pb-20">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <PixelDrifters />

      <Container className="relative">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <div className="flex max-w-[760px] flex-col gap-6">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-muted"
            >
              {/* <span
                aria-hidden
                className="size-1.5 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]"
              />
              {profile.availability} */}
            </motion.p>

            <AnimatedText
              as="h1"
              text={profile.headline}
              delay={0.1}
              className="text-dither text-[clamp(3rem,10vw,6rem)] font-medium leading-[0.95] tracking-tight text-fg-strong"
            />

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
              className="max-w-[520px] text-base leading-6 text-fg-muted"
            >
              {profile.summary}
            </motion.p>

            <motion.dl
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-2 grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[1.2px] sm:max-w-[420px]"
            >
              <div className="flex flex-col gap-1">
                <dt className="text-fg-subtle">Role</dt>
                <dd className="text-fg">{profile.title}</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="text-fg-subtle">Based in</dt>
                <dd className="text-fg">{profile.location}</dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
            className="flex flex-col items-start gap-4 lg:items-end"
          >
            {/* Inverted panel — the one bright surface on the page, so it reads as the primary action. */}
            <Link
              to="/projects"
              className="group flex min-h-11 w-full items-center justify-between gap-8 rounded-md bg-fg-strong px-6 py-5 text-bg transition-colors duration-300 hover:bg-fg sm:w-auto"
            >
              <span className="text-lg font-semibold tracking-tight">View selected work</span>
              <ArrowRight
                aria-hidden
                size={20}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <p className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
              {projectCount} case studies ·{' '}
              <Link to="/contact" className="text-fg-muted underline-offset-4 hover:text-fg-strong hover:underline">
                Or say hello
              </Link>
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
