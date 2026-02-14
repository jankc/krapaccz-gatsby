# Frontend Improvements Plan (Astro Migration)

## Goal
Polish the migrated Astro site to production quality while preserving the current visual identity and gallery behavior.

## Guiding Constraints
- Keep URL/content parity intact.
- Prefer low-risk, incremental improvements.
- Optimize performance and accessibility without redesigning the brand.

## Work Plan

### Phase 1: Performance and Rendering

#### 1) Reduce gallery JS payload on initial load
- Change `/src/pages/[slug].astro` from eager hydration to interaction-aware hydration where possible.
- Ensure the lightbox island is loaded only when needed.
- Verify no regressions in gallery click/open behavior.

Acceptance criteria:
- Gallery page first load JS is reduced.
- Lightbox still opens immediately on thumbnail click.

#### 2) Add responsive image pipeline
- Replace raw `<img>` usage on key surfaces with Astro image optimization strategy.
- Generate responsive sizes/formats for gallery cards and gallery thumbnails.
- Keep visual output identical (crop/aspect ratio preserved).

Acceptance criteria:
- Thumbnails and gallery images serve responsive formats/sizes.
- No broken images, no noticeable visual drift.

### Phase 2: SEO and Indexing

#### 3) Improve metadata and social cards
- Extend `/src/layouts/BaseLayout.astro` with canonical URL, Open Graph, Twitter metadata.
- Add per-gallery metadata support (title/description/image).
- Set language metadata correctly for site content.

Acceptance criteria:
- Home and gallery pages expose complete social/SEO tags.
- Link previews display expected title/image.

#### 4) Add robots and cache strategy
- Add `robots.txt` in Astro/public output flow.
- Define cache strategy guidance for static hosting (`_astro` assets and images).
- Document hosting header recommendations in README.

Acceptance criteria:
- `robots.txt` exists and references sitemap.
- Caching guidance is documented and actionable.

### Phase 3: Accessibility and UX Quality

#### 5) Lightbox accessibility polish
- Ensure focus trap while modal is open.
- Return focus to triggering thumbnail after close.
- Confirm keyboard navigation and labels are complete.

Acceptance criteria:
- Keyboard-only navigation works end-to-end.
- Focus behavior is predictable and accessible.

### Phase 4: Typography and Asset Hygiene

#### 6) Remove runtime Google Fonts import
- Replace `@import url(...)` font loading from SCSS with local/self-hosted font files.
- Keep visual typography close to current appearance.

Acceptance criteria:
- No runtime Google Fonts CSS import remains.
- Typography rendering remains stable across pages.

### Phase 5: Styling Modernization and Design Polish

#### 7) Remove Sass technical debt properly
- Gradually replace legacy Sass patterns (`@import`, deprecated functions, old skel utilities) with modern Sass/CSS.
- Remove warning silencing once migration is complete.
- Preserve existing layout/spacing behavior.

Acceptance criteria:
- Sass build has no deprecation warnings without silencing.
- Styling parity remains acceptable.

#### 8) Add subtle modern hover polish
- Replace darkening-heavy hover with a bright, clean interaction style (e.g. slight scale, ring/border accent, soft glow).
- Keep effect understated and consistent with portfolio tone.

Acceptance criteria:
- Hover feels modern but not flashy.
- Thumbnails remain full brightness at rest.

## Recommended Execution Order
1. JS payload optimization
2. Responsive images
3. Metadata/social tags
4. Robots + cache strategy
5. Lightbox accessibility
6. Font self-hosting
7. Sass modernization
8. Final hover polish tune

## Definition of Done
- Performance improved measurably (smaller initial JS/image payload).
- SEO/social coverage complete.
- Lightbox is keyboard and focus accessible.
- No Sass deprecation warnings (without suppressing them).
- Visual style remains faithful to current site.
