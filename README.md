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

## Project shape

A project only has to declare what it actually has. Required: `title`, `shortDescription`, `description`, `category`, `status`, `year`, `role`, `techStack`, `tags`, `color`. Everything else is optional — `duration`, `teamSize`, `links`, `highlights`, `features`, `problem` / `solution` / `result`, `architecture`, `gallery`.

The detail page renders each of those sections **only when its data exists**, so a lightly documented project never shows an empty heading. Add a `problem`/`solution`/`result` to a project and the case-study narrative appears; add `architecture` and the layer breakdown appears. Nothing to configure.

## Contact form

The form posts to `api/contact.ts`, a Vercel serverless function that relays the message over SMTP using **your own Gmail account** — no third-party mail service, and no credential ever reaches the browser.

**Setup (once):**

1. Turn on 2-Step Verification on the Google account you want to send from.
2. Create an App Password at <https://myaccount.google.com/apppasswords> (16 characters — this is *not* your account password).
3. In Vercel → Project → Settings → **Environment Variables**, add:

   | Key | Value |
   | --- | --- |
   | `MAIL_USER` | the Gmail address that sends the mail |
   | `MAIL_APP_PASSWORD` | the App Password from step 2 |
   | `MAIL_TO` | *(optional)* where enquiries land; defaults to `MAIL_USER` |

4. Redeploy. Without these variables the endpoint returns a 500 and the form shows a failure message with a direct mailto fallback.

The visitor's address goes in `Reply-To`, so hitting reply in Gmail answers them directly. A hidden honeypot field silently drops bot submissions.

**Local development:** `npm run dev` (Vite) does not run the `api/` function, so submitting locally will 404. Use `npx vercel dev` with a `.env` file (see `.env.example`) to exercise the endpoint end to end.

## Notes

- Images are deterministic grayscale placeholders (`picsum.photos`) derived from each project slug. Replace `media()` in `src/data/portfolio.ts` with real asset URLs.
- The contact form has no backend: a valid submission composes a `mailto:` in the user's mail client rather than pretending to send.
- `profile.resumeUrl` points at `/resume.pdf` — drop the file into `public/`.
# azrayaalv3
