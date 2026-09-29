# Next Actions — Upper Floor Website
*The punch list.*

- [ ] **Relaunch Meta** on the audit positioning: 1 campaign, website-leads (Cal booking), £30/day, UK broad,
      4 ads — statics "Spending £15k+ a month on Meta?" (re-export 1080×1350, current is 3:4) + "Same 6 ads.
      Bigger budget. Falling ROAS." + videos Arch Ad 1 (cut 43.4–48.5s) and "not even real" (caption the
      hook, cut dead air ~1.6s, add £15k+ overlay, stroke on captions). Watermelon static = first refresh.
- [ ] Update the Cal.com event description to mention the audit; switch the spend question to single-choice.
- [x] Ship the website half of the CAPI work (`CalEmbed.tsx` + `lib/meta.ts`) — shipped 2026-09-29 with the slot picker.
- [ ] Make ONE real booking through the `/workwithus` slot picker on production, check the invite, #leads, and `Schedule`/`Lead` in Events Manager, then cancel it in Cal.
- [ ] Consider making phone optional in Cal (less friction) — then drop the field from `BookCall`.
- [ ] **Optional now — contact form email copy** (enquiries already reach Signal + #leads since 2026-09-23) — add to Vercel env (Production): `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER=<gmail>`, `SMTP_PASS=<gmail app password>`, `CONTACT_EMAIL=info@upperfloor.co`, then redeploy. Form currently errors and sends nothing (affects whole site, found 2026-08-01).
- [x] ~~Add `NEXT_PUBLIC_META_PIXEL_ID` to Vercel~~ — done 2026-09-22, pixel live site-wide.
- [ ] **Click Verify domain** in Meta Business Settings (tag live since 2026-09-22; up to 72h — if it fails, Sharing Debugger → Scrape Again on `https://upperfloor.co/`).
- [ ] Fire a test booking (e.g. from `/`) and confirm `Schedule`/`Lead` in Events Manager → Test events, then cancel it in Cal. Then rank `Schedule`/`Lead` top in Aggregated Event Measurement.
- [ ] Share upperfloor.co/portfolio link with clients once happy.
- [ ] Add new client brands/videos to `BRANDS` in `app/portfolio/PortfolioClient.tsx` as work ships — use the encode recipe in `memory/decisions.md` and a NEW stem per clip (portfolio media is cached immutable).
- [ ] Get real numbers for ION8 / KELV / Dissertation Collective so they can earn a stat or case card on `/workwithus` (currently shown as work only, no claims).
- [ ] Delete / disable the old Calendly event (`calendly.com/upperfloor-info/30min`) so any
      stale links already shared stop taking bookings into a calendar nobody watches.
- [ ] Sanity-check the Cal.com booking end to end on production (book a real slot, confirm the
      Google Meet invite arrives) — the embed is verified, an actual booking is not.
- [x] Custom slot picker on Cal's API — done for `/workwithus` 2026-09-29 (see decisions.md).

