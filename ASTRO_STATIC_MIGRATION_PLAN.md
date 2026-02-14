# Migration Plan: Gatsby v2 -> Astro Static Site

## Goal

Revive the current photography portfolio by migrating from legacy Gatsby v2 to a modern, low-maintenance **Astro static site** while preserving:

- existing content structure (`content/galleries`)
- gallery URLs/slugs
- current visual style
- SEO and performance baseline

## Target Stack

- Astro 5
- TypeScript (recommended; JS acceptable)
- `sass` (replace `node-sass`)
- Optional React island only for interactive gallery/lightbox
- Static output: default Astro static build

## Scope

### In scope

- Home page with gallery cards
- Gallery detail pages generated from markdown + image folders
- Existing SCSS styles and layout
- Static image handling and optimization
- Metadata, sitemap, robots

### Out of scope (Phase 1)

- CMS/admin UI
- SSR/hybrid rendering
- Auth, comments, dynamic backend features
- Major redesign

## Current-State Risks to Remove

- Legacy Node/React/Gatsby stack on unsupported tooling
- Deprecated Gatsby image/GraphQL pipeline
- `node-sass` end-of-life
- Fragile old plugin ecosystem

## Migration Strategy (Recommended for this content-heavy site)

Create a **fresh Astro app** and migrate content/templates incrementally with URL parity as the primary constraint.

Reasoning:

- Best fit for mostly static content + images
- Minimal client-side JS by default
- Simpler content pipeline than Gatsby GraphQL

## Execution Plan

## Phase 0: Prep (0.5 day)

1. Create migration branch: `codex/astro-static-migration`.
2. Lock baseline:
   - Capture current production URLs and screenshots.
   - Export gallery slug list.
3. Choose Node LTS target for local/CI (22 or 24).
4. Confirm hosting target for static output.

## Phase 1: Scaffold Astro App (0.5 day)

1. Initialize Astro project in repo root (or `apps/web`).
2. Enable integrations as needed:
   - `@astrojs/sitemap`
   - optional `@astrojs/react` (only if needed for lightbox/masonry)
3. Add global SCSS and migrate base assets.
4. Set up lint/format/build scripts and CI check.

## Phase 2: Data and Content Layer (0.5-1 day)

1. Keep content source:
   - `content/galleries/*.md`
   - image folders per gallery
2. Implement loader utilities:
   - parse frontmatter (`title`, `order`, `featuredPhoto`)
   - parse markdown body
   - derive slug from filename
3. Build shared model types:
   - `GalleryIndexItem`
   - `GalleryDetail`
4. Sort by `order` to preserve current behavior.

## Phase 3: Routing and Static Generation (1 day)

1. Index route `/`:
   - render ordered gallery card grid.
2. Gallery route `/[slug]/`:
   - generate static paths for all galleries.
   - render markdown body + image grid + lightbox.
3. Add `404` route.
4. Ensure trailing slash strategy matches current URLs.

## Phase 4: UI and Interactivity Parity (0.5-1 day)

1. Port header/footer/layout and SCSS with minimal visual drift.
2. Replace legacy dependencies:
   - Gatsby image components -> Astro image strategy (`astro:assets` or static `<img>`)
   - `react-images` -> lightweight Astro/React lightbox implementation
3. Keep interactivity isolated to a small island if React is used.

## Phase 5: SEO + Analytics + Optional PWA (0.5 day)

1. Migrate metadata to Astro layout/page head usage.
2. Enable sitemap + robots.
3. Update analytics:
   - replace old UA tag with GA4 if analytics is still required.
4. Keep PWA/offline optional for Phase 2.

## Phase 6: QA and Cutover (0.5 day)

1. URL parity check against legacy slug list.
2. Validate no broken image/link references.
3. Run Lighthouse sanity pass on index + one gallery page.
4. Deploy to staging, validate, then cut over DNS/hosting.

## Deliverables

- Astro site buildable with `npm run build`
- Static output (`dist/`)
- URL parity checklist/report
- Updated `README.md` with run/deploy instructions
- Rollback instructions

## Acceptance Criteria

- All existing gallery pages resolve under same slugs.
- Markdown content and all gallery images render correctly.
- No Gatsby runtime/plugins remain.
- Build succeeds on modern Node LTS in CI.
- Visual regressions are minor and approved.

## Risk Register and Mitigations

- Lightbox behavior mismatch:
  - Mitigation: start simple with tested modal; add advanced UX later.
- Image optimization differences:
  - Mitigation: prioritize correctness, optimize pipeline after parity.
- CSS drift from legacy class system:
  - Mitigation: preserve class names first, refactor only after parity.

## Suggested Timeline

- Total: ~2.5-4.5 working days
  - Fast path (parity-focused): 2.5-3 days
  - With polish and extra optimization: 4-4.5 days

## Immediate Next Steps

1. Keep both plans and choose framework (`Next.js` vs `Astro`).
2. If Astro is selected, start Phase 0 and Phase 1 in `codex/astro-static-migration`.
3. Deliver first parity build (home + one gallery) before full migration.
