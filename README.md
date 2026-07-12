# Portfolio — Azra Yaal

A production-grade personal portfolio. React 19, TypeScript, Tailwind v4, React Router, Framer Motion, Lucide.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle
npm run preview
```

## The one rule

**No content lives in a component.** Every string, image, number and link renders from `src/data/`. Components take props; pages read from the data layer and pass them down. That separation is what makes a CMS migration a data-layer change rather than a rewrite.

## Structure

```
src/
  components/
    ui/          Primitives — Button, Card, Badge, Tag, Section, Reveal, Counter…
    common/      Composed, domain-aware — ProjectCard, Timeline, ImageGallery, Seo…
    layout/      Shell — Navbar, Footer, RootLayout, PageTransition, ScrollToTop
  pages/         One folder per route; Home splits into sections/
  data/          Content + selectors (the CMS seam)
  types/         Content contracts
  hooks/         useProjectFilters, useSkillFilters, useMediaQuery, useScrolled…
  utils/         cn, date formatting, accent-colour maps, motion variants
  styles/        globals.css — every design token lives here
```

## Adding content

| Want to… | Edit |
| --- | --- |
| Add a project | `src/data/projects.ts` — the detail page renders from the object; the route is `/projects/:slug` |
| Add a skill | `src/data/skills.ts` — grouping, filtering and search pick it up automatically |
| Change bio, stats, availability | `src/data/portfolio.ts` |
| Change roles / timeline | `src/data/experience.ts` |
| Change social links | `src/data/socials.ts` |

Icons are referenced by Lucide name (e.g. `"Gauge"`). New names must be registered in `src/components/ui/Icon.tsx` — an explicit registry, so the bundle only carries the icons actually in use.

## Moving to a CMS

`src/data/index.ts` is the only module pages import from. It exports the collections plus selectors (`getProjectBySlug`, `getRelatedProjects`, `getAdjacentProjects`). Replace those with async fetchers that satisfy `src/types/index.ts` and no component changes.

## Design system

Tokens are defined once in `src/styles/globals.css` under `@theme` — surfaces, text, lines, accents, radii, elevation. There are no hard-coded colours or spacing values in components; everything resolves to a token.

Two techniques worth knowing:

- `.text-dither` masks live text into a dot matrix for display headings. The text stays real text — selectable, searchable, readable by screen readers.
- Hairline grids (stat blocks, feature grids) come from a `gap-px` grid over a `bg-line` parent rather than per-cell borders, so no cell ever double-borders.

## Accessibility

Semantic landmarks, a skip link, 44px minimum touch targets, labelled controls, `aria-live` result counts, and a cyan double-ring focus indicator on every interactive element. Every animation has a designed reduced-motion path — `prefers-reduced-motion` renders content statically rather than hiding it.

## Notes

- Images are deterministic grayscale placeholders (`picsum.photos`) derived from each project slug. Replace `media()` in `src/data/portfolio.ts` with real asset URLs.
- The contact form has no backend: a valid submission composes a `mailto:` in the user's mail client rather than pretending to send.
- `profile.resumeUrl` points at `/resume.pdf` — drop the file into `public/`.
# azrayaalv3
