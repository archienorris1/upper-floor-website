# Progress
*What was done, errors hit, tests run, results.*

## 2026-09-08 — /workwithus copy rounds + site-wide "marketing agency" line
- Four copy passes with Archie: friendly one-line hero, positive work-section title, plain "Book a call"
  CTAs (incl. sticky bar), every "qualify" phrasing removed, Meta ads + creative woven through the page.
- Then swapped "content agency" → "ecom marketing agency" in root metadata, keywords, OG/Twitter,
  Organization JSON-LD, footer, home AdsShowcase intro, /insights intro. Verified live on all pages.
- Commits 1cf99b0 → 4c7fb3c, each verified on production within ~50s of push.

## 2026-09-04 — New client content (ION8, KELV, Dissertation Collective) + video perf
- Encoded 20 new clips from `~/Downloads/portfolio UF content` → `public/media/portfolio/`
  (aurora-7..10, fidgie-2..5, ion8-1..4, kelv-1..2, dc-1..6) + posters; 278 MB → 30 MB.
- `/portfolio`: 7 brands / 35 clips, brand blurbs + clip counts, 4-up grid for sets divisible by 4.
- `/workwithus`: 12-clip wall + "Range" format section + 9-logo ticker; founders photo via next/image.
- `/`: marquee has all 9 logos; ads carousel 5 → 10 clips.
- Perf: lazy poster overlay + staged preload in both video components; `/media` cache headers.
- Verified in the browser pane (DOM audits + screenshots): only hero + 2 eager clips fetch on
  load of /workwithus; 18 of 21 videos `preload=none`; wall 2-col on 375px, 6×2 at 1440px; Cal
  card still 1022px wide; tap-for-sound toggles and mutes the previous card; no horizontal overflow.
- Gotcha: the Browser pane goes `visibilityState=hidden` when not fronted — scrollTo snaps back to 0
  and screenshots paint white; `getBoundingClientRect` audits via javascript_tool still work.

## 2026-08-01 — Portfolio page
- Built `/portfolio` (client portfolio, link-only) — live at upperfloor.co/portfolio, commit `f31848f`.
- Assets self-hosted in `public/media/portfolio/` (15 videos compressed 43→30 MB, posters, 6 logos).
- Verified: prod 200 + correct title, videos serve `206 video/mp4` (range requests OK), mobile + desktop layouts checked in browser, tap-for-sound + auto-mute logic tested.
- Errors hit: corrupted `.next` from building while dev server ran (fixed by clearing cache); next/image refuses SVGs (Fastframe logo uses plain `<img>`).

## 2026-09-02 — Calendly → Cal.com
- Replaced the site's only Calendly widget (`components/site/Booking.tsx`) with Cal.com's
  inline embed, and added a real embed on `/contact` at `#book-call` (previously that page
  just linked back to `/#book` on the home page).
- New: `components/site/CalEmbed.tsx` (reusable) + `lib/booking.ts` (single source for the link).
- Verified: `npm run build` passes (18/18 pages, `/` and `/contact` still static); both embeds
  reach Cal's `loading="done"` and auto-resize (home 1295px, contact 1610px); live availability
  confirmed over postMessage (`slotsFetched`, event id 6918210); contact renders `theme=dark`,
  home light. Zero `calendly` references left in the repo.
- **Debugging trap worth remembering:** both embeds looked permanently broken (stuck at the
  placeholder height, blank screenshots). Cause was NOT the code — the browser preview pane was
  hidden, which collapses the viewport to 0×0, so the iframe had zero width and Cal could never
  measure it to report dimensions. I first mis-blamed passing `theme` in the inline config and
  "fixed" it wrongly; once the viewport was set to 1280×900 everything worked, including with
  `theme` in the config. Lesson: check `innerWidth` before believing an embed is broken.

## 2026-09-02 (later) — Cal.com perceived-speed + desktop sizing
Archie: still slow to appear, and a blank white box loses the booking. Measured the real
breakdown on production (`upperfloor.co`): DOMContentLoaded 471ms → embed.js starts 603ms
(205ms) → iframe document 811ms (1053ms) → **Cal reports ready at 7191ms**. So ~800ms is ours
and ~5.3s is Cal's own app booting inside the iframe, which we cannot speed up.
- Cut our ~800ms: `preconnect` + `dns-prefetch` + `preload as=script` for app.cal.com in
  `app/layout.tsx` (verified they land in `<head>`), so the connection is warm and embed.js
  downloads in parallel with hydration instead of after it.
- Fixed the real complaint with a **calendar-shaped skeleton** in `CalEmbed.tsx` — visible
  immediately, swapped out when Cal sets `loading="done"` (MutationObserver), with a 12s
  timeout so a missed signal can never strand a visitor on a skeleton.
- **Desktop sizing was the sleeper win:** the card was `max-w-3xl` (768px), which forced Cal's
  month view into its narrow stacked layout — the big empty white area on the right in Archie's
  screenshot. Widened to `max-w-5xl` on both pages: the booker goes side-by-side and the
  section height drops from 1295px to **720px**.
- Verified desktop 1440px (card 1024, iframe 1024, height 720) and mobile 375px (card 343, no
  horizontal overflow, skeleton shows then hides).

## 2026-09-02 (evening) — /workwithus landing page for Meta traffic
- New route `app/workwithus/` — self-contained ad landing page, one CTA into the shared Cal.com
  embed (`#book`), noindexed and excluded from `sitemap.ts`.
- Refactor: portfolio's tap-for-sound video card → `components/site/SoundVideo.tsx`
  (`SoundProvider`, `SoundVideoCard`); `PortfolioClient.tsx` now imports it. Behaviour identical.
- `CalEmbed.tsx` gained `onBookingSuccessful`; `MetaPixel.tsx` + `lib/meta.ts` added, env-gated.
- Verified: `tsc --noEmit` clean, `npm run build` 19/19 pages, `/workwithus` static 7.4 kB. DOM
  verification at desktop + mobile (Cal `loading="done"`, no overflow, CTA above fold).
- Errors hit: none in code. Browser preview pane hidden all session → blank screenshots and no
  IntersectionObserver callbacks (hidden documents get no frames). No Chromium on the Mac for a
  headless fallback. Relied on DOM measurements instead.

