import { Link } from 'react-router-dom';
import type { NavItem, Profile, SocialLink } from '@/types';
import { Container } from '@/components/ui';
import { SocialLinks } from '@/components/common/SocialLinks';

interface FooterProps {
  profile: Profile;
  nav: NavItem[];
  socials: SocialLink[];
}

export function Footer({ profile, nav, socials }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-10 py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link to="/" className="w-fit text-sm font-semibold text-fg-strong">
              {profile.name}
            </Link>

            <p className="max-w-[320px] text-sm leading-6 text-fg-muted">{profile.tagline}</p>

            <p className="font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
              {profile.location} · {profile.timezone}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
              Navigate
            </h2>

            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-9 items-center text-sm text-fg-muted transition-colors hover:text-fg-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[1.2px] text-fg-subtle">
              Elsewhere
            </h2>

            <SocialLinks links={socials} variant="list" />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-fg-subtle">
            © {year} {profile.name}. All rights reserved.
          </p>

          <p className="font-mono text-[11px] text-fg-subtle">
            Built with my fingers.
          </p>
        </div>
      </Container>
    </footer>
  );
}
