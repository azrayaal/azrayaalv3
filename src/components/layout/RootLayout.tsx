import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PageSkeleton } from '@/components/ui';
import { primaryNav, profile, socialLinks } from '@/data';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { PageTransition } from './PageTransition';
import { ScrollToTop } from './ScrollToTop';

/**
 * The only place content is bound to the shell. Routes render into `Outlet`
 * and know nothing about navigation or the footer.
 */
export function RootLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-md bg-brand px-4 py-2 text-sm font-semibold text-fg-strong focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <ScrollToTop />

      <Navbar items={primaryNav} profile={profile} ctaLabel="Get in touch" ctaTo="/contact" />

      <main id="main" className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          {/* Keyed on the path so each navigation replays the entrance. */}
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </Suspense>
      </main>

      <Footer profile={profile} nav={primaryNav} socials={socialLinks} />
    </div>
  );
}
