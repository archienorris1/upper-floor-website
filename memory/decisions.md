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

