import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll on route change — the browser would otherwise restore it. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
