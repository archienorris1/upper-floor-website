# Next Actions — Upper Floor Website
*The punch list.*

- [ ] **Fix contact form email** — add to Vercel env (Production): `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER=<gmail>`, `SMTP_PASS=<gmail app password>`, `CONTACT_EMAIL=info@upperfloor.co`, then redeploy. Form currently errors and sends nothing (affects whole site, found 2026-08-01).
- [ ] **/workwithus go-live:** add `NEXT_PUBLIC_META_PIXEL_ID=<pixel id>` to Vercel env (Production) and redeploy, then fire a test booking and confirm `Schedule`/`Lead` show in Meta Events Manager — without the var the pixel never loads and campaigns can't optimise for booked calls.
- [ ] Share upperfloor.co/portfolio link with clients once happy.
- [ ] Optional: add new client brands/videos to `BRANDS` in `app/portfolio/PortfolioClient.tsx` as work ships.
- [ ] Delete / disable the old Calendly event (`calendly.com/upperfloor-info/30min`) so any
      stale links already shared stop taking bookings into a calendar nobody watches.
- [ ] Sanity-check the Cal.com booking end to end on production (book a real slot, confirm the
      Google Meet invite arrives) — the embed is verified, an actual booking is not.
- [ ] Optional (only if "instant" becomes a hard requirement): replace the Cal.com iframe with a
      custom slot picker on Cal's API, handing off to Cal only at the confirm step. ~5s of the
      current load is Cal's own app booting and cannot be optimised from our side.

