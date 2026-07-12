import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import type { NavItem, Profile } from '@/types';
import { Button } from '@/components/ui';
import { useLockBodyScroll, useScrolled } from '@/hooks';
import { cn } from '@/utils/cn';
import { EASE_OUT } from '@/utils/motion';

interface NavbarProps {
  items: NavItem[];
  profile: Profile;
  ctaLabel: string;
  ctaTo: string;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex min-h-11 items-center rounded-xs px-3 font-mono text-xs uppercase tracking-[1.2px] transition-colors duration-200',
    isActive ? 'text-fg-strong' : 'text-fg-muted hover:text-fg-strong',
  );

export function Navbar({ items, profile, ctaLabel, ctaTo }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);
  const { pathname } = useLocation();

  useLockBodyScroll(open);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent bg-bg',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-3 sm:px-4 lg:px-8"
      >
        <NavLink
          to="/"
          className="group flex items-center gap-2 rounded-xs"
          aria-label={`${profile.name} — home`}
        >
          <span className="text-sm font-semibold tracking-tight text-fg-strong">
            {profile.name}
          </span>
          {/* <span className="rounded-xs border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[1.2px] text-fg-muted transition-colors group-hover:text-fg">
            {profile.initials}
          </span> */}
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button to={ctaTo} size="sm" variant="secondary" className="w-fit"  >
            {ctaLabel}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex size-11 items-center justify-center rounded-md text-fg transition-colors hover:bg-fg/10 md:hidden"
        >
          {open ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="fixed inset-x-0 top-16 z-40 border-b border-line bg-bg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-3 py-4">
              {items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'flex min-h-11 items-center rounded-md px-4 font-mono text-sm uppercase tracking-[1.2px] transition-colors',
                        isActive
                          ? 'bg-surface-2 text-fg-strong'
                          : 'text-fg-muted hover:bg-surface hover:text-fg-strong',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <li className="pt-3">
                <Button to={ctaTo} className="w-full">
                  {ctaLabel}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
