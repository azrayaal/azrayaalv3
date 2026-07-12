import type { Project } from '@/types';
import { media } from './portfolio';

/** Builds the media set for a project from its slug so the data stays terse. */
const shots = (slug: string, captions: string[]) =>
  captions.map((caption, i) => ({
    src: media(`${slug}-${i + 1}`, 1600, 1000),
    alt: `${caption} — screenshot ${i + 1}`,
    caption,
  }));

export const projects: Project[] = [
  {
    id: 'prj-01',
    slug: 'northwind-commerce',
    title: 'Northwind Commerce',
    shortDescription:
      'A headless storefront rebuilt for speed — 4.1s to 1.2s LCP across 12M monthly sessions.',
    description:
      'Northwind runs one of Southeast Asia’s largest home goods marketplaces. Their storefront had grown into a 2.4MB client bundle with a spinner on every route. We rebuilt it as a streaming, server-first React application with an edge cache in front, then held the line with an enforced performance budget in CI.',
    thumbnail: media('northwind-commerce-thumb', 1200, 800),
    coverImage: media('northwind-commerce-cover', 2000, 1000),
    images: [media('northwind-commerce-1'), media('northwind-commerce-2')],
    gallery: shots('northwind-commerce', [
      'Product listing with streamed facets',
      'Cart drawer and checkout hand-off',
      'Merchandising console',
    ]),
    category: 'Platform',
    status: 'live',
    featured: true,
    publishedDate: '2025-03-18',
    lastUpdated: '2026-05-02',
    techStack: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Redis', 'Vercel', 'PostgreSQL'],
    features: [
      {
        title: 'Streaming product pages',
        description:
          'Above-the-fold content renders from the edge in under 200ms; facets and recommendations stream in behind Suspense boundaries.',
      },
      {
        title: 'Performance budget in CI',
        description:
          'Every pull request runs Lighthouse against seeded fixtures. A regression over budget fails the build, not a dashboard nobody reads.',
      },
      {
        title: 'Merchandising console',
        description:
          'Non-engineers reorder shelves, schedule campaigns, and preview changes against live traffic without a deploy.',
      },
      {
        title: 'Resilient checkout',
        description:
          'Checkout degrades to a server-rendered form when JavaScript fails, so a bad network never costs a conversion.',
      },
    ],
    highlights: [
      'LCP 4.1s → 1.2s at the 75th percentile',
      'Client bundle reduced by 68%',
      'Conversion up 19% quarter over quarter',
    ],
    tags: ['performance', 'commerce', 'edge', 'react'],
    role: 'Lead Frontend Engineer',
    duration: '9 months',
    teamSize: 7,
    links: {
      github: 'https://github.com/azrayaal/northwind-commerce',
      demo: 'https://northwind.example.com',
      website: 'https://northwind.example.com',
    },
    problem:
      'The storefront shipped 2.4MB of JavaScript before a single product was visible. Mobile users on 4G waited over four seconds for the largest paint, and the team had no way to tell which pull request made it worse.',
    solution:
      'We moved rendering to the server, streamed everything below the fold, and cached aggressively at the edge with tag-based invalidation. Then we made performance a build-time contract rather than a quarterly cleanup.',
    result:
      'Largest Contentful Paint dropped to 1.2s at p75, the bundle shrank by two thirds, and conversion rose 19% in the first full quarter after launch. No regression has shipped since the budget landed.',
    architecture: [
      { layer: 'Edge', detail: 'Vercel edge network with tag-based ISR invalidation' },
      { layer: 'Application', detail: 'Next.js App Router, React Server Components, Suspense streaming' },
      { layer: 'Data', detail: 'GraphQL gateway over PostgreSQL, Redis read-through cache' },
      { layer: 'Observability', detail: 'RUM pipeline into ClickHouse, Lighthouse CI gate on every PR' },
    ],
    color: 'brand',
  },
  {
    id: 'prj-02',
    slug: 'orbit-design-system',
    title: 'Orbit Design System',
    shortDescription:
      'A component library and token pipeline adopted by 40 engineers across six product teams.',
    description:
      'Orbit is the design system behind a fintech suite of six products. It ships as a versioned component library, a token pipeline that feeds Figma and code from one source, and a documentation site with live, editable examples.',
    thumbnail: media('orbit-design-system-thumb', 1200, 800),
    coverImage: media('orbit-design-system-cover', 2000, 1000),
    images: [media('orbit-design-system-1'), media('orbit-design-system-2')],
    gallery: shots('orbit-design-system', [
      'Token pipeline and theme editor',
      'Component documentation with live playground',
      'Accessibility audit dashboard',
    ]),
    category: 'Design System',
    status: 'live',
    featured: true,
    publishedDate: '2024-08-05',
    lastUpdated: '2026-06-11',
    techStack: ['React', 'TypeScript', 'Radix UI', 'Tailwind CSS', 'Storybook', 'Style Dictionary'],
    features: [
      {
        title: 'One source of truth for tokens',
        description:
          'Design tokens compile from a single JSON graph into CSS variables, Tailwind theme, iOS, and a Figma library.',
      },
      {
        title: 'Accessibility as a test',
        description:
          'Every component ships with axe assertions and keyboard interaction tests. A component cannot merge without them.',
      },
      {
        title: 'Codemods on every breaking change',
        description:
          'Major versions ship with a migration script, so upgrading is a command rather than a project.',
      },
      {
        title: 'Live documentation',
        description:
          'Docs render the real component from the published package — the examples cannot drift from the code.',
      },
    ],
    highlights: [
      '92% component adoption across six products',
      'UI defects down 41% year over year',
      'Zero WCAG AA violations in production audits',
    ],
    tags: ['design-system', 'accessibility', 'tooling', 'react'],
    role: 'Design Systems Lead',
    duration: '14 months',
    teamSize: 4,
    links: {
      github: 'https://github.com/azrayaal/orbit',
      demo: 'https://orbit.example.com',
      figma: 'https://figma.com/@azrayaal',
    },
    problem:
      'Six product teams had six button components, four date pickers, and no agreement on what "primary" meant. Design review had become an archaeology exercise.',
    solution:
      'We built the primitives once, made the token graph the single source both Figma and code read from, and shipped accessibility and migration tooling alongside the components so adoption was cheaper than the alternative.',
    result:
      'Adoption reached 92% within three quarters without a mandate. UI defect volume fell 41% and the design team stopped shipping redlines entirely.',
    architecture: [
      { layer: 'Tokens', detail: 'Style Dictionary graph → CSS vars, Tailwind preset, Figma variables' },
      { layer: 'Primitives', detail: 'Radix UI behaviour layer with a bespoke visual layer' },
      { layer: 'Distribution', detail: 'Versioned npm packages, changesets, automated codemods' },
      { layer: 'Docs', detail: 'Storybook + MDX rendering the published package' },
    ],
    color: 'blue',
  },
  {
    id: 'prj-03',
    slug: 'atlas-analytics',
    title: 'Atlas Analytics',
    shortDescription:
      'A real-time product analytics console rendering millions of events without dropping a frame.',
    description:
      'Atlas gives product teams a live view of user behaviour across web and mobile. The hard part was never the charts — it was keeping a virtualised, filterable event stream at 60fps while a million rows a minute arrive over a websocket.',
    thumbnail: media('atlas-analytics-thumb', 1200, 800),
    coverImage: media('atlas-analytics-cover', 2000, 1000),
    images: [media('atlas-analytics-1'), media('atlas-analytics-2')],
    gallery: shots('atlas-analytics', [
      'Live funnel with cohort breakdown',
      'Virtualised event explorer',
      'Retention grid',
    ]),
    category: 'Web App',
    status: 'live',
    featured: true,
    publishedDate: '2025-09-30',
    lastUpdated: '2026-04-20',
    techStack: ['React', 'TypeScript', 'D3', 'WebSockets', 'ClickHouse', 'Go', 'Docker'],
    features: [
      {
        title: 'Streaming event explorer',
        description:
          'A virtualised table backed by a ring buffer keeps memory flat regardless of how long the tab stays open.',
      },
      {
        title: 'Composable funnels',
        description:
          'Funnels, cohorts, and retention grids share one query builder, so a saved segment works everywhere.',
      },
      {
        title: 'Query cancellation',
        description:
          'Every panel aborts its in-flight query when filters change. No stale render ever lands.',
      },
    ],
    highlights: [
      'Sustained 60fps at 1M events per minute',
      'p95 query latency under 400ms',
      'Flat memory profile over 12-hour sessions',
    ],
    tags: ['data-viz', 'real-time', 'performance'],
    role: 'Senior Frontend Engineer',
    duration: '11 months',
    teamSize: 6,
    links: {
      github: 'https://github.com/azrayaal/atlas-analytics',
      demo: 'https://atlas.example.com',
    },
    problem:
      'The previous console froze whenever a customer with real traffic opened it. Charts re-rendered on every websocket frame and the event table held every row it had ever seen in memory.',
    solution:
      'We batched incoming frames into animation-frame-aligned flushes, virtualised the table over a fixed ring buffer, and moved aggregation into ClickHouse so the browser only ever renders what is on screen.',
    result:
      'The console now holds 60fps under the heaviest customer’s traffic, p95 query latency sits under 400ms, and memory stays flat across day-long sessions.',
    architecture: [
      { layer: 'Ingest', detail: 'Go collector → Kafka → ClickHouse materialised views' },
      { layer: 'Transport', detail: 'Websocket fan-out with animation-frame-aligned batching' },
      { layer: 'Render', detail: 'React + D3 scales, virtualised table over a fixed ring buffer' },
      { layer: 'Query', detail: 'Shared query builder with abort-on-change semantics' },
    ],
    color: 'teal',
  },
  {
    id: 'prj-04',
    slug: 'signal-mobile',
    title: 'Signal Mobile Banking',
    shortDescription:
      'The first WCAG 2.2 AA certified banking app in the region, shipped to 800k customers.',
    description:
      'Signal is a mobile banking client for a regional bank. Accessibility was not a compliance checkbox here — a meaningful share of the customer base uses screen readers or large text, and the previous app was unusable for them.',
    thumbnail: media('signal-mobile-thumb', 1200, 800),
    coverImage: media('signal-mobile-cover', 2000, 1000),
    images: [media('signal-mobile-1'), media('signal-mobile-2')],
    gallery: shots('signal-mobile', [
      'Account overview at 200% text scale',
      'Transfer flow with screen reader annotations',
      'Biometric authentication',
    ]),
    category: 'Mobile App',
    status: 'live',
    featured: true,
    publishedDate: '2024-02-12',
    lastUpdated: '2025-11-08',
    techStack: ['React Native', 'TypeScript', 'Expo', 'Reanimated', 'Node.js', 'AWS'],
    features: [
      {
        title: 'Screen reader first',
        description:
          'Every flow was designed against VoiceOver and TalkBack before it was designed against a mockup.',
      },
      {
        title: 'Dynamic type to 200%',
        description:
          'Layouts reflow rather than truncate. No fixed heights, no clipped balances, no lost buttons.',
      },
      {
        title: 'Offline-tolerant transfers',
        description:
          'Transfers queue locally and reconcile on reconnect with idempotency keys, so a dropped signal never double-sends.',
      },
    ],
    highlights: [
      'WCAG 2.2 AA certified — a regional first',
      '800k active customers',
      'Support tickets for accessibility down 73%',
    ],
    tags: ['mobile', 'accessibility', 'fintech'],
    role: 'Mobile Tech Lead',
    duration: '16 months',
    teamSize: 9,
    links: {
      demo: 'https://signal.example.com',
      website: 'https://signal.example.com',
    },
    problem:
      'The incumbent app failed basic screen reader navigation, clipped balances above 130% text scale, and lost transfers whenever the connection dropped mid-flow.',
    solution:
      'We rebuilt the client with accessibility as an acceptance criterion on every ticket, reflowing layouts instead of fixing heights, and made the transfer pipeline idempotent and offline-tolerant.',
    result:
      'The app became the first in the region certified WCAG 2.2 AA, serves 800k active customers, and accessibility-related support tickets fell 73%.',
    architecture: [
      { layer: 'Client', detail: 'React Native + Expo, Reanimated for gesture-driven surfaces' },
      { layer: 'Sync', detail: 'Local queue with idempotency keys, reconciled on reconnect' },
      { layer: 'Backend', detail: 'Node.js BFF on AWS Lambda, core banking over gRPC' },
      { layer: 'Assurance', detail: 'Automated a11y suite on device farm, per-release manual audit' },
    ],
    color: 'pink',
  },
  {
    id: 'prj-05',
    slug: 'forge-ci',
    title: 'Forge CI',
    shortDescription:
      'A build orchestrator that cut median pipeline time from 24 minutes to 5.',
    description:
      'Forge is an internal CI orchestrator built for a monorepo of 180 packages. It computes the affected graph from the diff, distributes work across a warm pool of runners, and caches at the task level rather than the job level.',
    thumbnail: media('forge-ci-thumb', 1200, 800),
    coverImage: media('forge-ci-cover', 2000, 1000),
    images: [media('forge-ci-1'), media('forge-ci-2')],
    gallery: shots('forge-ci', [
      'Pipeline graph with cache hits',
      'Runner pool utilisation',
      'Flaky test quarantine',
    ]),
    category: 'Developer Tool',
    status: 'live',
    featured: false,
    publishedDate: '2023-11-02',
    lastUpdated: '2026-01-27',
    techStack: ['Go', 'TypeScript', 'Kubernetes', 'gRPC', 'Redis', 'Terraform'],
    features: [
      {
        title: 'Affected-graph scheduling',
        description:
          'Only packages touched by the diff — and their dependents — run. Everything else replays from cache.',
      },
      {
        title: 'Warm runner pool',
        description:
          'Runners keep dependencies hot, so a pipeline starts executing in seconds rather than provisioning for minutes.',
      },
      {
        title: 'Flake quarantine',
        description:
          'Tests that fail non-deterministically are quarantined automatically and reported to their owning team.',
      },
    ],
    highlights: [
      'Median pipeline 24min → 5min',
      '84% task-level cache hit rate',
      'CI spend reduced by 38%',
    ],
    tags: ['devops', 'tooling', 'monorepo'],
    role: 'Platform Engineer',
    duration: '7 months',
    teamSize: 3,
    links: { github: 'https://github.com/azrayaal/forge-ci' },
    problem:
      'A 24-minute median pipeline meant engineers context-switched away from every pull request. Worse, the whole monorepo rebuilt on every commit regardless of what changed.',
    solution:
      'We modelled the repository as a task graph, cached at task granularity keyed on content hashes, and scheduled only the affected subgraph across a pool of pre-warmed runners.',
    result:
      'Median pipeline time fell to 5 minutes with an 84% cache hit rate, and CI spend dropped 38% despite a 20% increase in commit volume.',
    architecture: [
      { layer: 'Scheduler', detail: 'Go service computing the affected subgraph from the diff' },
      { layer: 'Execution', detail: 'Kubernetes runner pool kept warm with prefetched dependencies' },
      { layer: 'Cache', detail: 'Content-addressed task cache on S3 with Redis index' },
      { layer: 'Interface', detail: 'TypeScript CLI and web dashboard over gRPC-web' },
    ],
    color: 'orange',
  },
  {
    id: 'prj-06',
    slug: 'lumen-ai-copilot',
    title: 'Lumen Copilot',
    shortDescription:
      'An in-product AI assistant that answers from your own data, with citations you can click.',
    description:
      'Lumen Copilot is an assistant embedded in a B2B SaaS product. It answers questions grounded in the customer’s own workspace, streams tokens as they arrive, and cites every claim back to the record it came from.',
    thumbnail: media('lumen-ai-copilot-thumb', 1200, 800),
    coverImage: media('lumen-ai-copilot-cover', 2000, 1000),
    images: [media('lumen-ai-copilot-1'), media('lumen-ai-copilot-2')],
    gallery: shots('lumen-ai-copilot', [
      'Streaming answer with inline citations',
      'Retrieval trace inspector',
      'Prompt evaluation harness',
    ]),
    category: 'AI / ML',
    status: 'in-progress',
    featured: true,
    publishedDate: '2026-01-14',
    lastUpdated: '2026-07-01',
    techStack: ['React', 'TypeScript', 'Python', 'FastAPI', 'pgvector', 'PostgreSQL', 'Docker'],
    features: [
      {
        title: 'Citations, not vibes',
        description:
          'Every sentence in an answer links to the source record. Unsupported claims are suppressed rather than smoothed over.',
      },
      {
        title: 'Streaming with interruption',
        description:
          'Answers stream token by token and can be interrupted, edited, and re-run without losing conversation state.',
      },
      {
        title: 'Evaluation harness',
        description:
          'A golden set runs on every prompt change. Regressions in grounding or refusal behaviour block the deploy.',
      },
    ],
    highlights: [
      '91% of answers rated grounded by reviewers',
      'First token in under 600ms',
      'Deflects 34% of support conversations',
    ],
    tags: ['ai', 'rag', 'streaming'],
    role: 'Founding Engineer',
    duration: 'Ongoing',
    teamSize: 5,
    links: { demo: 'https://lumen.example.com', figma: 'https://figma.com/@azrayaal' },
    problem:
      'Customers could not find answers buried across thousands of workspace records, and a generic chatbot bolted on top produced confident, unciteable, occasionally wrong answers.',
    solution:
      'We built retrieval over the customer’s own corpus with per-tenant isolation, forced the model to cite or abstain, and put an evaluation harness in front of every prompt change.',
    result:
      'Reviewers rate 91% of answers as fully grounded, the first token arrives in under 600ms, and the assistant now deflects roughly a third of inbound support conversations.',
    architecture: [
      { layer: 'Retrieval', detail: 'pgvector hybrid search with per-tenant row-level isolation' },
      { layer: 'Orchestration', detail: 'FastAPI streaming over SSE with tool-calling loop' },
      { layer: 'Client', detail: 'React streaming renderer with interruptible message state' },
      { layer: 'Evaluation', detail: 'Golden-set harness gating every prompt and model change' },
    ],
    color: 'cyan',
  },
  {
    id: 'prj-07',
    slug: 'meridian-docs',
    title: 'Meridian Docs',
    shortDescription:
      'Documentation infrastructure with typed content, live examples, and zero broken links.',
    description:
      'Meridian is the documentation platform behind a developer product. Content is authored in MDX, validated against a schema at build time, and every code sample is executed in CI so the docs cannot describe an API that no longer exists.',
    thumbnail: media('meridian-docs-thumb', 1200, 800),
    coverImage: media('meridian-docs-cover', 2000, 1000),
    images: [media('meridian-docs-1'), media('meridian-docs-2')],
    gallery: shots('meridian-docs', [
      'API reference generated from types',
      'Runnable code samples',
      'Search with typo tolerance',
    ]),
    category: 'Developer Tool',
    status: 'live',
    featured: false,
    publishedDate: '2024-05-21',
    lastUpdated: '2025-12-15',
    techStack: ['TypeScript', 'MDX', 'Next.js', 'Algolia', 'Vercel', 'Tailwind CSS'],
    features: [
      {
        title: 'Executable samples',
        description:
          'Every code block in the docs runs in CI against the real package. A broken sample fails the build.',
      },
      {
        title: 'Typed frontmatter',
        description:
          'Content schemas are TypeScript types. Authors get autocomplete and a red squiggle instead of a runtime surprise.',
      },
      {
        title: 'Link integrity',
        description:
          'Internal and anchor links are validated on every build. Broken links never reach production.',
      },
    ],
    highlights: [
      'Zero broken links since launch',
      'Search success rate 88%',
      'Time-to-first-API-call down 44%',
    ],
    tags: ['docs', 'dx', 'tooling'],
    role: 'Frontend Engineer',
    duration: '5 months',
    teamSize: 3,
    links: {
      github: 'https://github.com/azrayaal/meridian-docs',
      website: 'https://meridian.example.com',
    },
    problem:
      'Documentation drifted from the SDK within weeks of every release. Samples stopped compiling, links rotted, and support absorbed the difference.',
    solution:
      'We made the docs a typed artifact of the codebase: schemas for content, execution for samples, validation for links — all enforced at build time.',
    result:
      'Not a single broken link or non-compiling sample has shipped since launch, and median time-to-first-successful-API-call dropped 44%.',
    architecture: [
      { layer: 'Content', detail: 'MDX with typed frontmatter validated at build' },
      { layer: 'Reference', detail: 'API pages generated from TypeScript declarations' },
      { layer: 'Assurance', detail: 'Sample execution and link validation in CI' },
      { layer: 'Search', detail: 'Algolia index rebuilt per deploy with section-level records' },
    ],
    color: 'blue',
  },
  {
    id: 'prj-08',
    slug: 'cadence-scheduling',
    title: 'Cadence',
    shortDescription:
      'Team scheduling across timezones, built around conflict resolution rather than calendars.',
    description:
      'Cadence solves scheduling for distributed teams. Rather than showing five calendars side by side, it models constraints — working hours, focus blocks, timezone fairness — and proposes slots that nobody has to negotiate.',
    thumbnail: media('cadence-scheduling-thumb', 1200, 800),
    coverImage: media('cadence-scheduling-cover', 2000, 1000),
    images: [media('cadence-scheduling-1'), media('cadence-scheduling-2')],
    gallery: shots('cadence-scheduling', [
      'Constraint-based slot proposals',
      'Timezone fairness view',
      'Focus-block protection',
    ]),
    category: 'Web App',
    status: 'live',
    featured: false,
    publishedDate: '2023-06-09',
    lastUpdated: '2025-08-19',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Vitest'],
    features: [
      {
        title: 'Constraint solver',
        description:
          'Slots are proposed by a solver weighing working hours, focus blocks, and how often each timezone has taken the unsociable hour.',
      },
      {
        title: 'Timezone fairness',
        description:
          'The system tracks who has absorbed the early call and rotates the burden rather than defaulting to headquarters.',
      },
      {
        title: 'Calendar sync without lock-in',
        description:
          'Two-way sync with Google and Microsoft calendars, with conflict detection that survives concurrent edits.',
      },
    ],
    highlights: [
      'Median time-to-schedule down from 3 days to 4 minutes',
      '0 double-bookings across 40k meetings',
      'Adopted by 120 distributed teams',
    ],
    tags: ['productivity', 'scheduling', 'saas'],
    role: 'Full-stack Engineer',
    duration: '8 months',
    teamSize: 4,
    links: {
      github: 'https://github.com/azrayaal/cadence',
      demo: 'https://cadence.example.com',
    },
    problem:
      'Scheduling a meeting across four timezones took days of asynchronous negotiation, and the same two people always took the 6am call.',
    solution:
      'We modelled scheduling as a constraint problem rather than a calendar rendering problem, and made fairness an explicit, tracked variable.',
    result:
      'Median time-to-schedule fell from three days to four minutes, with zero double-bookings across 40,000 meetings.',
    architecture: [
      { layer: 'Solver', detail: 'Weighted constraint solver over working hours and fairness ledger' },
      { layer: 'Sync', detail: 'Two-way CalDAV/Graph sync with optimistic conflict detection' },
      { layer: 'Data', detail: 'PostgreSQL via Prisma, event-sourced booking log' },
      { layer: 'Client', detail: 'React with optimistic updates and rollback' },
    ],
    color: 'teal',
  },
  {
    id: 'prj-09',
    slug: 'prism-motion',
    title: 'Prism Motion',
    shortDescription:
      'An open-source animation primitives library — 14k stars, 400k weekly downloads.',
    description:
      'Prism is a small library of animation primitives for React. It exists because most motion libraries make the easy things easy and the interruptible, gesture-driven, accessibility-aware things nearly impossible.',
    thumbnail: media('prism-motion-thumb', 1200, 800),
    coverImage: media('prism-motion-cover', 2000, 1000),
    images: [media('prism-motion-1'), media('prism-motion-2')],
    gallery: shots('prism-motion', [
      'Interruptible spring playground',
      'Gesture-driven sheet primitive',
      'Reduced-motion fallbacks',
    ]),
    category: 'Developer Tool',
    status: 'live',
    featured: false,
    publishedDate: '2022-10-30',
    lastUpdated: '2026-06-28',
    techStack: ['TypeScript', 'React', 'Rollup', 'Vitest', 'Playwright'],
    features: [
      {
        title: 'Interruptible by default',
        description:
          'Animations retarget from their current velocity rather than snapping. Gestures feel like physics, not playback.',
      },
      {
        title: 'Reduced motion is a first-class path',
        description:
          'Every primitive ships a designed reduced-motion fallback rather than simply disabling itself.',
      },
      {
        title: '3.2kB gzipped',
        description:
          'No runtime dependencies. Tree-shakeable primitives that stay out of the critical path.',
      },
    ],
    highlights: [
      '14k GitHub stars',
      '400k weekly npm downloads',
      '3.2kB gzipped, zero dependencies',
    ],
    tags: ['open-source', 'animation', 'library'],
    role: 'Author & Maintainer',
    duration: 'Ongoing',
    teamSize: 1,
    links: {
      github: 'https://github.com/azrayaal/prism-motion',
      demo: 'https://prism.example.com',
    },
    problem:
      'Existing motion libraries treated animation as playback. The moment a user grabbed a sheet mid-transition, everything snapped, jittered, or fought the gesture.',
    solution:
      'Prism models every animation as a spring with retargetable velocity, so an interruption is a new target rather than a cancelled timeline.',
    result:
      'The library has 14k stars and 400k weekly downloads, and ships in production at several companies whose interaction quality I admire.',
    architecture: [
      { layer: 'Core', detail: 'Velocity-preserving spring integrator on requestAnimationFrame' },
      { layer: 'Bindings', detail: 'React hooks with concurrent-safe subscriptions' },
      { layer: 'Testing', detail: 'Deterministic clock in Vitest, visual regression via Playwright' },
    ],
    color: 'pink',
  },
  {
    id: 'prj-10',
    slug: 'harbor-infra-console',
    title: 'Harbor',
    shortDescription:
      'An infrastructure console that makes the blast radius of a change visible before you make it.',
    description:
      'Harbor is an internal console for managing cloud infrastructure. Its central idea is that no destructive action should be a surprise: every change previews its blast radius, its cost delta, and what depends on the thing you are about to touch.',
    thumbnail: media('harbor-infra-console-thumb', 1200, 800),
    coverImage: media('harbor-infra-console-cover', 2000, 1000),
    images: [media('harbor-infra-console-1'), media('harbor-infra-console-2')],
    gallery: shots('harbor-infra-console', [
      'Blast-radius preview before apply',
      'Cost delta on every plan',
      'Dependency graph explorer',
    ]),
    category: 'Platform',
    status: 'in-progress',
    featured: false,
    publishedDate: '2025-12-03',
    lastUpdated: '2026-06-30',
    techStack: ['React', 'TypeScript', 'Go', 'Terraform', 'Kubernetes', 'AWS', 'GraphQL'],
    features: [
      {
        title: 'Blast-radius preview',
        description:
          'Before applying, Harbor shows every downstream resource a change touches and which services depend on them.',
      },
      {
        title: 'Cost delta on every plan',
        description:
          'Plans surface the monthly cost difference alongside the diff, so budget is a design input rather than a monthly surprise.',
      },
      {
        title: 'Typed guardrails',
        description:
          'Policies are code. A destructive change to a production database requires two approvals, enforced by the console, not by convention.',
      },
    ],
    highlights: [
      'Zero unplanned production outages since rollout',
      'Infrastructure spend down 22%',
      'Mean time to change reduced 3x',
    ],
    tags: ['infrastructure', 'devops', 'platform'],
    role: 'Platform Engineer',
    duration: 'Ongoing',
    teamSize: 5,
    links: { github: 'https://github.com/azrayaal/harbor' },
    problem:
      'Infrastructure changes were applied from laptops against plans nobody fully read. Cost surprises arrived monthly and outages arrived without warning.',
    solution:
      'Harbor puts the dependency graph, the blast radius, and the cost delta in front of the engineer at the moment of decision, and enforces policy in code rather than in review culture.',
    result:
      'No unplanned production outage has occurred since rollout, infrastructure spend fell 22%, and the mean time to land a change dropped threefold.',
    architecture: [
      { layer: 'Planner', detail: 'Go service wrapping Terraform plan with graph enrichment' },
      { layer: 'Policy', detail: 'OPA policies evaluated pre-apply, enforced at the API' },
      { layer: 'Cost', detail: 'Pricing model diffed against the plan graph' },
      { layer: 'Console', detail: 'React + GraphQL with an interactive dependency graph' },
    ],
    color: 'brand',
  },
];

export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;

export const featuredProjects = projects.filter((p) => p.featured);
