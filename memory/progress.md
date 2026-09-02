# Progress
*What was done, errors hit, tests run, results.*

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

