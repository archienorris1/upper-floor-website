# Upper Floor — Website — CLAUDE.md
*Last updated: 2026-09-02 · Owner: Archie Norris · Stage: shipped (production)*

## A · What this folder is
The production marketing website for **Upper Floor** — a full-service podcast/content
agency. Next.js 14. Part of the Upper Floor venture (the agency that houses Signal + all clients).

## B · The Goal
- **North Star:** a polished agency site that converts visitors into agency enquiries.
- **Done looks like:** production-ready, responsive, deployed on Vercel.
- **Out of scope:** the Signal product, the client portal (separate folders).

## C · Stack
- **Languages:** TypeScript
- **Frameworks:** Next.js 14 (App Router) · React 18 · Tailwind CSS
- **Hosting:** Vercel
- **Run locally:** `npm run dev`
- **Key files:** `app/` · `components/` · `lib/` · `public/` · `README.md`

## D · Decisions
*One line each. Long-form → `memory/decisions.md`.*
- `2026` — Next.js 14 App Router + Tailwind, because it's the standard agency-site stack here
- `2026-08` — `/portfolio` is a link-only client portfolio (no nav link, in sitemap); 15 videos self-hosted in `public/media/portfolio/`, autoplay-muted tap-for-sound
- `2026-08` — never run `next build` while the dev server is up (shared `.next` corrupts)
- `2026-09` — booking is **Cal.com**, not Calendly (Calendly was too slow); one shared
  `CalEmbed` component + `CAL_LINK` in `lib/booking.ts`, embedded on `/` (`#book`) and `/contact` (`#book-call`)
- `2026-09` — booking cards are `max-w-5xl`, never `max-w-3xl` (under ~1000px Cal collapses to a
  tall stacked layout); keep the app.cal.com preconnect/preload in `layout.tsx` and the skeleton
  in `CalEmbed` — ~5s of the load is Cal's own app and can't be optimised from here
- `2026-09` — `/workwithus` is the Meta-ads landing page: self-contained (no nav, no links out),
  noindexed + out of the sitemap, one CTA (`#book` Cal embed). Meta Pixel is env-gated by
  `NEXT_PUBLIC_META_PIXEL_ID` (`components/site/MetaPixel.tsx`) and fires `Schedule` + `Lead`
  on Cal's `bookingSuccessful` event; the tap-for-sound clips are shared with `/portfolio`
  via `components/site/SoundVideo.tsx`

## E · Memory Map
`memory/` (B.L.A.S.T. scheme): `project-brief` · `task-plan` · `findings` · `progress` ·
`decisions` · `current-strategy` · `next-actions` · `bugs-and-risks` · `session-summaries`.

## F · References
- **Wiki:** [[Obsidian WIKI]] (`../Obsidian WIKI/`)

## Memory & Wiki (3-tier memory system)
- **Memory Save** — when I say *save / wrap up / remember this*, write a dated summary to `memory/session-summaries.md` (newest at top): H1 · TL;DR · What we discussed / decided / next. Never without an explicit trigger.
- **Wiki sync** — durable, cross-project knowledge → ingest up into [[Obsidian WIKI]] (`../Obsidian WIKI/`) and `[[link]]` back; proactively flag at session end.
- Voice/tone → global `~/.claude/CLAUDE.md`.
