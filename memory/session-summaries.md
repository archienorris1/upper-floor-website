# Session Summaries
*Dated wrap-ups. Newest at top.*

# 2026-09-02 (later) — Cal.com booking made to feel fast, and sized for desktop

**TL;DR:** Archie: still slow, and "if all they see is a loading signal they won't book". Measured
the load instead of guessing — only ~800ms of it was ours, ~5s is Cal's own app booting inside the
iframe. Cut our part to ~100ms, and fixed the actual complaint with a calendar-shaped skeleton so
the section never renders as a blank white box. Widening the card also turned out to fix the dead
space in Archie's screenshot.

**What we discussed / decided**
- Archie's screenshot showed a big empty white area right of the calendar on desktop, plus slow load.
- Decided against over-promising "instant": the honest ceiling for an iframe embed is Cal's own
  boot time. Perceived speed (skeleton) is the lever that actually protects bookings.

**What was built**
- `app/layout.tsx` — `preconnect` + `dns-prefetch` + `preload as=script` for app.cal.com
  (verified they land in `<head>`; Next 14 App Router does render a `<head>` in the root layout).
- `CalEmbed.tsx` — calendar-shaped skeleton shown immediately, removed when Cal sets
  `loading="done"` (MutationObserver), with a 12s timeout so a missed signal can't strand anyone.
- Both booking cards `max-w-3xl` → `max-w-5xl`.

**Numbers (measured on production)**
| stage | before | after |
|---|---|---|
| embed.js starts | 603ms | 46–78ms |
| Cal iframe starts | 811ms | 92–136ms |
| Cal reports ready | ~7.2s | ~5–7s |
- Desktop 1440px: card + iframe 1024px, height **720px** (was 1295px), stable across 24s of polling.
- Mobile 375px: card 343px, no horizontal overflow, skeleton shows then hides.

**Gotchas hit**
- Nearly shipped a SECOND wrong fix: `/contact` measured 1295px once, and I hypothesised its 1px
  card border pushed the iframe to 1022px, under a 1024px layout threshold. Tested it live before
  changing anything — contact settles at 720px at 1022px wide, so the hypothesis was wrong and the
  reading was a transient state. No change made. Same discipline that caught the earlier
  theme-in-config mis-diagnosis: verify the hypothesis before coding the fix.
- Single perf samples are noisy (one run read 9.1s, later runs 5.0–7.0s) — take several.

**Next**
- If truly instant is ever required, the only remaining path is to stop embedding Cal's app: build a
  lightweight slot picker against Cal's API and hand off to Cal at the confirm step. Scoped, not started.

# 2026-09-02 — Calendly retired, Cal.com booking live on both pages

**TL;DR:** Swapped the site's booking from Calendly (too slow) to Cal.com, and gave `/contact`
its own real calendar instead of bouncing people to the home page. One reusable embed
component, one shared link constant. Build passes; both embeds verified loading live
availability. Not a single `calendly` reference left in the repo.

**What we discussed / decided**
- Archie supplied the new link: `https://cal.com/upper-floor/upper-floor-intro-call`
  (Upper Floor — Intro Call, 30m, Google Meet, Europe/London).
- Only the URL was needed — the embed code was written here rather than pasted from Cal's
  "Inline embed" dialog.
- Correction to the brief: Archie thought both pages had a Calendly embed. There was only
  ONE (home, `#book`); `/contact`, the nav, hero and insights CTAs were all just `/#book`
  anchors. So swapping one component fixed every route into it.
- Agreed to also add a genuine embed on `/contact` (Archie: "And yeh do this too").

**What was built**
- `components/site/CalEmbed.tsx` — reusable inline embed (`calLink`, `id`, `theme`,
  `minHeight`), including Cal's loader stub written out longhand instead of the minified
  one-liner. embed.js throws unless that queue exists first.
- `lib/booking.ts` — `CAL_LINK` / `CAL_URL`, the single place the booking link lives.
- `components/site/Booking.tsx` — Calendly widget + script removed; `#book` id kept so all
  existing CTAs still work untouched.
- `app/contact/page.tsx` — new "Rather just talk it through?" section at `#book-call` with a
  dark-themed embed; the "book a free intro call" link now points there, not `/#book`.

**Gotchas hit**
- npm registry unreachable (proxy) — `@calcom/embed-react` could not be installed, so the
  vanilla embed was used. No dependency added; swap is contained in `CalEmbed.tsx` if wanted.
- **The big one:** both embeds appeared permanently broken — stuck at placeholder height,
  blank screenshots. The real cause was the hidden browser preview pane collapsing the
  viewport to 0×0, so the iframe had zero width and Cal could never report its dimensions.
  I mis-diagnosed it first as `theme` in the inline config and "fixed" that incorrectly;
  re-tested at 1280×900 and `theme` in config is in fact correct (it themes the loading
  skeleton). Check `innerWidth` before trusting an embed failure in a headless pane.
- Cal's calendar renders fine but does NOT composite into this pane's screenshots — verified
  structurally instead (`loading="done"`, auto-resize, `slotsFetched` postMessage payloads).

**Next**
- ⚠️ Contact form SMTP env vars STILL missing in Vercel (open since 2026-08-01) — the form on
  `/contact` still can't email. Now less critical since that page has a working calendar, but
  still broken.
- Consider deleting the old Calendly event so no stale links stay bookable.

# 2026-08-01 — Client portfolio page shipped to upperfloor.co/portfolio

**TL;DR:** Rebuilt the Canva client portfolio (msstraining.my.canva.site/upperfloorportfolio) as a native, mobile-first page at `/portfolio`, self-hosting all 15 videos + 6 client logos. Live in production. Found that the site's contact form has never been able to send email (SMTP env vars missing in Vercel).

**What we discussed / decided**
- Purpose: a link-only portfolio to send clients — not in the site nav, but indexable + in sitemap.
- Video UX: autoplay muted in view, tap for sound (one video unmuted at a time, auto-mutes when scrolled away), poster frames so cards never load blank.
- Design: dark (#0E0E0E) minimal — compact Upper Floor logo masthead (first video sits above the fold on a phone, per Archie's request), scrolling client-logo ticker, per-brand sections (`AURORA ─── 01` headers), closing "Want content like this?" CTA → /contact + info@upperfloor.co.
- Layout: mobile = horizontal snap-scroll rows of 9:16 cards (72vw, peek of next); desktop = 3-col grid.
- Kept it pure creative showcase — no per-brand results/stats copy.

**What was built**
- `app/portfolio/page.tsx` (metadata) + `app/portfolio/PortfolioClient.tsx` (all sections + video logic).
- `public/media/portfolio/`: 15 videos pulled from Canva CDN, renamed per brand (aurora 1–6, fastframe 1–6, toastybody 1–2, fidgie 1), compressed 43→30 MB (H.264 CRF 26), poster JPGs via ffmpeg, 6 client logos (PNGs alpha-trimmed with Pillow; Fastframe recovered as SVG from a blob URL and recoloured white — plain `<img>` since next/image won't serve SVGs).
- `/portfolio` added to sitemap.ts.
- Deployed: commit `f31848f`, Vercel build Ready, verified live (200, videos streaming with range requests).

**Gotchas hit**
- Running `next build` while the dev server is up corrupts `.next` ("Cannot find module './948.js'") — stop server or clear `.next`.
- ScrollReveal's reveal-on-scroll relies on rAF, which is throttled in hidden/headless tabs — looked broken in the preview pane, fine on real devices.

**Next**
- ⚠️ Contact form is silently broken in production: `/api/contact` needs SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/CONTACT_EMAIL in Vercel (Gmail app password required — Archie must add these himself). Until then, form submissions error and no enquiry emails arrive.
