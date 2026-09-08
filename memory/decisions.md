# Decisions — Upper Floor Website
*Long-form behind each D entry.*

- Next.js 14 App Router + Tailwind — standard agency-site stack here, deployed on Vercel.

- **Cal.com replaces Calendly for booking** (2026-09-02) — Calendly's widget was too slow.
  Swapped the one inline Calendly widget for Cal.com's official inline embed, and added a
  second embed on `/contact` so visitors no longer get bounced to the home page to book.
  - Event: `upper-floor/upper-floor-intro-call` (30m, Google Meet, Europe/London).
  - The link lives in ONE place, `lib/booking.ts` (`CAL_LINK`) — change it there only.
  - Used the **vanilla** Cal embed (loader stub + `app.cal.com/embed/embed.js`), not
    `@calcom/embed-react`: npm registry was unreachable at the time, and the vanilla route
    adds no dependency. If the React package is ever wanted, the swap is contained entirely
    within `components/site/CalEmbed.tsx`.
  - Theme is passed BOTH in the inline `config` (themes the container + loading skeleton)
    and in the `ui()` call (themes the calendar inside the iframe). Home = light on the white
    card, `/contact` = dark on the ink background. Brand green `#1B8A3F` set as `cal-brand`.
  - **Perf posture (2026-09-02):** the booking card is `max-w-5xl`, NOT `max-w-3xl` — under
    ~1000px Cal's month view collapses into a tall stacked layout with dead space. Keep the
    preconnect/preload tags in `app/layout.tsx`; and keep the skeleton, because ~5s of the
    load is Cal's own app booting inside the iframe and cannot be optimised away from here.

- **`/workwithus` is the paid-traffic landing page** (2026-09-02) — built for Meta ads, optimised
  for booked calls, not pre-qualification.
  - Self-contained on purpose: no `SiteNav`, no footer nav, no links out except `mailto:`. Every
    CTA is an `#book` anchor into the same `CAL_LINK` event as the rest of the site.
  - `robots: noindex, follow` and NOT in `app/sitemap.ts` — keeps it from competing with `/` in
    search and keeps ad attribution clean. Flip both if organic indexing is ever wanted.
  - Positioning copy (revised 2026-09-08, Archie): hero is now "Let's see if we can help." — friendly,
    not protective; the old "We don't work with everyone / should we work with you" read as
    gatekeeping. Section titles must stay positive and never knock other agencies (the work wall is
    "content people stop scrolling for", not "…doesn't look like an agency made it"). The
    "AI isn't the shortcut. Taste is." block and the soft fit list stay. CTAs are plain "Book a call"
    (no "see if you qualify"). **Core offer is Meta ads + creative** (Archie, 2026-09-08): copy
    should present both, creative-only is available but not the lead.
  - Case-study heavy by design (Archie: "portfolio heavy is the move"): 6-clip reel wall from
    `/media/portfolio/` + 4 compact case cards reusing the home-page stats and media.
  - Tracking is env-gated: `components/site/MetaPixel.tsx` renders nothing unless
    `NEXT_PUBLIC_META_PIXEL_ID` is set, so local/dev never fires. `Schedule` + `Lead` fire from
    Cal's `bookingSuccessful` event (new `onBookingSuccessful` prop on `CalEmbed`) because the
    confirmation never leaves the iframe — there's no thank-you URL to hang a pixel on.
  - Tap-for-sound card extracted to `components/site/SoundVideo.tsx` rather than duplicated;
    `/portfolio` now imports it.


- **Lazy video loading + immutable media cache** (2026-09-04) — Archie: "videos load pretty slowly …
  everything should load instantly". Root cause was not bitrate (old clips were already ~0.9 Mbps)
  but *how many* clips fetched at once: every `<video>` had a `poster` attribute (fetched eagerly)
  and `preload="metadata"`, so /portfolio with 35 clips and the home carousel (10 clips × 3 copies)
  opened dozens of media requests on load, competing with Cal.com.
  - Fix in `components/site/SoundVideo.tsx` + `VideoCard.tsx`: poster is a lazy `<img>` overlay that
    fades out on the `playing` event (so it also stays up when autoplay is blocked, e.g. iOS
    low-power mode); `preload="none"` → `metadata` at rootMargin 100% → `auto` at 25% → `play()` at
    35% visible. `eager` prop (high-priority poster + `auto`) only for the first two cards.
  - `next.config.mjs` `headers()`: `/media/portfolio/*` = 1 year immutable, rest of `/media/*` = 7 days
    + SWR. Consequence: replacing a portfolio clip means a new filename.
  - Encode recipe (`scratchpad/encode.sh`, worth keeping): `scale=720:1280` pad to 9:16, `libx264
    -preset slow -crf 27 -maxrate 1100k -bufsize 2200k -g 60`, `aac 80k`, `-movflags +faststart`,
    poster = frame at 1s scaled 480×854 JPEG q4. 20 new clips (278 MB of sources, mostly 10-bit
    HEVC) → 30 MB. Deliberately H.264-only (no HEVC/AV1 second source) to keep the component simple;
    revisit if bandwidth ever matters more than simplicity.
  - `me-jack.png` (2.0 MB, served raw on / and /workwithus) → `me-jack.jpg` 139 KB via next/image.

- **/workwithus content expansion** (2026-09-04) — Meta traffic lands here, so it has to prove range
  and quality, not just "we do UGC". Added: 9-logo ticker (ION8, KELV, Dissertation Collective new),
  a 12-clip "Recent work" wall (desktop 6×2, tablet 4×3, mobile 2-col grid that opens with 6 + a
  "Show 6 more clips" button so the page stays short), and a "Range" section with one labelled
  clip per format (UGC, Talking head, Animated, Motion ad, ASMR, Organic). Still self-contained:
  no link out to /portfolio, every CTA is `#book`. One page-level `SoundProvider` so only one clip
  on the whole page has sound.
  - New-brand logos: ION8 from their Shopify header PNG (inverted to white); Dissertation Collective
    from their footer wordmark PNG (black → white, blue accents kept); KELV has no image logo — the
    site renders the text "KELV" in Cinzel Bold, uppercase, 0.12em tracking, so that was rendered
    to PNG with Pillow. No stats/claims were added for the three new brands (none known).

- **Company line: ecom marketing agency** (2026-09-08, Archie) — core offer is Meta ads management +
  the creative that feeds it; creative-only is available but never the lead. Swapped every
  "content agency" string site-wide (root metadata title/description/keywords/OG/Twitter, Organization
  JSON-LD, footer, home AdsShowcase intro, /insights intro). Left the insights article
  "What an Ecom Content Agency Actually Does" untouched — its slug is a live URL and the piece is
  about the topic, not our positioning. Keyword targets now lead with "ecom marketing agency" and
  "Meta ads agency"; watch Search Console for the old "content agency" queries.

- **Jack owns the /workwithus voice** (2026-09-08) — his copy went in verbatim (only "meta" → "Meta"
  in a title). Tone to match in future: short, warm, a little wry ("the odd thing that doesn't quite
  fit into a category", "a hundred AI ads before lunch"). The page's four headline blocks are now:
  hero "Let's see if we can help." · "Creative and Meta. We're into it." · "Content in all shapes and
  sizes" · "AI isn't the shortcut. Taste is."
