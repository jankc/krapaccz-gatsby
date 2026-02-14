# Migration Plan: Gatsby v2 -> Next.js Static Site

## Goal
Revive the current photography portfolio by migrating it from legacy Gatsby v2 to a modern, low-maintenance **static Next.js site** while preserving:
- existing content structure (`content/galleries`)
- gallery URLs/slugs
- current visual style
- SEO and performance baseline

## Target Stack
- Next.js 16 (App Router)
- React 19
- TypeScript (recommended; JS acceptable if you prefer)
- `sass` (replace `node-sass`)
- Static output: `output: "export"` (fully static build)

## Scope
### In scope
- Home page with gallery cards
- Gallery detail pages generated from markdown + image folders
- Existing SCSS styles and layout
- Static image optimization workflow compatible with export
- Metadata, sitemap, robots, favicon/manifest

### Out of scope (Phase 1)
- CMS/admin UI
- Server-side rendering features
- Auth, comments, or dynamic APIs
- Major redesign

## Current-State Risks to Remove
- Legacy Node/React/Gatsby stack no longer practical on modern tooling
- Deprecated image pipeline (`gatsby-image` / GraphQL fragments)
- `node-sass` end-of-life
- Build reproducibility risk from old plugin ecosystem

## Migration Strategy (Recommended)
Use a **fresh Next.js app** inside the same repo, then move content/components incrementally.

Reasoning:
- Lower risk than upgrading Gatsby across many major versions
- Easier testing during migration
- Clear rollback path until cutover day

## Execution Plan

## Phase 0: Prep (0.5 day)
1. Create migration branch: `codex/next-static-migration`.
2. Lock baseline:
   - Capture current production URLs and screenshots.
   - Export list of gallery slugs.
3. Decide runtime:
   - Preferred Node LTS version for local/CI (22 or 24).
4. Define hosting target (Netlify/Vercel/GitHub Pages/S3+CDN) for static artifact requirements.

## Phase 1: Scaffold Next Static App (0.5 day)
1. Initialize Next.js app in repo root (or `apps/web`) with App Router.
2. Configure static export in `next.config.*`:
   - `output: "export"`
   - `images: { unoptimized: true }` (or a static-compatible loader)
3. Add global SCSS and move base assets (`src/assets` equivalent).
4. Add lint/format scripts and CI install/build checks.

## Phase 2: Content and Data Layer (0.5-1 day)
1. Keep existing content source:
   - `content/galleries/*.md` frontmatter
   - image folders per gallery
2. Implement file-system data loader:
   - Parse markdown + frontmatter (title/order/featuredPhoto/body)
   - Generate slug from file name
3. Build shared typed model:
   - `GalleryIndexItem`
   - `GalleryDetail`
4. Sort galleries by `order` to match current behavior.

## Phase 3: Route Migration (1 day)
1. Home page:
   - Render gallery grid cards (title + featured image + link).
2. Gallery pages:
   - Route pattern: `/<slug>/` to match existing URLs.
   - Use `generateStaticParams()` for full static generation.
   - Render markdown body + masonry image layout + lightbox.
3. Error pages:
   - Add custom `not-found` page.

## Phase 4: UI/Behavior Parity (0.5-1 day)
1. Port header/footer/layout and SCSS with minimal visual drift.
2. Replace legacy dependencies:
   - `gatsby-image` -> `next/image` (or plain `<img>` for export simplicity)
   - `react-images` -> modern lightbox package or lightweight custom modal
3. Verify mobile behavior and gallery interactions.

## Phase 5: SEO + Analytics + PWA Decisions (0.5 day)
1. Move metadata to Next metadata API.
2. Add sitemap/robots generation.
3. Migrate analytics:
   - Replace UA (`UA-...`) with GA4 measurement ID if still needed.
4. Decide on PWA/offline:
   - Keep optional; skip initially unless required.

## Phase 6: QA, Perf, and Cutover (0.5 day)
1. URL parity check:
   - Old vs new slug list and route availability.
2. Asset check:
   - No missing images, no broken links.
3. Performance sanity:
   - Lighthouse quick pass on index + 1 gallery page.
4. Production deploy to staging.
5. DNS/hosting cutover.

## Deliverables
- Next.js static site buildable with `npm run build`
- Generated static output (`out/` or platform equivalent)
- URL parity report
- Migration notes in `README.md`
- Rollback instructions

## Acceptance Criteria
- All existing gallery pages are accessible under the same slugs.
- All current markdown content and gallery images render correctly.
- No dependency on Gatsby runtime/plugins remains.
- Project builds on modern Node LTS in CI.
- Visual regressions are minor and approved.

## Risk Register and Mitigations
- Lightbox behavior mismatch:
  - Mitigation: implement minimal, tested modal-first gallery fallback.
- Static image optimization differences:
  - Mitigation: start with unoptimized static-safe setup; optimize later.
- Styling drift from legacy CSS grid classes:
  - Mitigation: preserve class names initially, refactor only after parity.

## Suggested Timeline
- Total: ~3-5 working days
  - Fast path (strict parity, no redesign): 3 days
  - With polish + perf tuning: 5 days

## Immediate Next Steps
1. Approve this plan and confirm hosting target for static output.
2. Start Phase 0 and Phase 1 in a migration branch.
3. Ship a first parity build (index + one gallery) before full content cutover.
