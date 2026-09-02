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
  - Positioning copy: "We don't work with everyone" / "AI isn't the shortcut. Taste is." — selective
    + anti-slop, but the fit list is soft (three ✓ lines + "book anyway") because Archie wants
    lead volume and low ad costs over heavy qualification.
  - Case-study heavy by design (Archie: "portfolio heavy is the move"): 6-clip reel wall from
    `/media/portfolio/` + 4 compact case cards reusing the home-page stats and media.
  - Tracking is env-gated: `components/site/MetaPixel.tsx` renders nothing unless
    `NEXT_PUBLIC_META_PIXEL_ID` is set, so local/dev never fires. `Schedule` + `Lead` fire from
    Cal's `bookingSuccessful` event (new `onBookingSuccessful` prop on `CalEmbed`) because the
    confirmation never leaves the iframe — there's no thank-you URL to hang a pixel on.
  - Tap-for-sound card extracted to `components/site/SoundVideo.tsx` rather than duplicated;
    `/portfolio` now imports it.

