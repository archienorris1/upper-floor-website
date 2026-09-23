# Bugs & Risks
*Open issues and watch-outs.*

- **MOSTLY RESOLVED 2026-09-23 — Contact form enquiries no longer lost**: they now go to Signal → #leads,
  and email is optional. The email copy still won't send until the SMTP vars are added (below).
- ~~**OPEN** — Contact form can't send email in production~~ (found 2026-08-01). `/api/contact` needs SMTP_* + CONTACT_EMAIL env vars in Vercel; only NEXT_PUBLIC_PORTAL_URL exists. Submissions 500 and no enquiries arrive. Fix = add vars (Gmail app password) + redeploy.
- Watch-out: don't run `next build` while `npm run dev` is running — both write `.next` and the dev server crashes with "Cannot find module './NNN.js'". Fix: stop server / `rm -rf .next`.
- Portfolio videos now ~68 MB total (35 clips) — genuinely lazy since 2026-09-04 (nothing fetches until a clip is a screen away), but keep an eye on Vercel bandwidth if `/workwithus` gets heavy Meta traffic.
- `/media/portfolio/*` is served `immutable` for a year: overwriting a file in place will leave returning visitors on the old clip. Always add a new filename.
- Watch-out: an embed that looks broken in the browser preview pane may be fine. A hidden pane
  collapses the viewport to 0×0, so iframes get zero width and third-party embeds (Cal.com)
  never report dimensions — they sit at placeholder height and screenshot blank. Check
  `innerWidth` first; set an explicit viewport (e.g. 1280×900) before diagnosing (2026-09-02).
- Booking now depends on a third-party script (`app.cal.com/embed/embed.js`) loaded at runtime.
  If Cal.com is down or blocked, the `#book` / `#book-call` sections render an empty box —
  the `/contact` email form and info@upperfloor.co remain the fallback path.
- Watch-out (extends the hidden-pane note): a hidden preview document gets NO rAF frames, so
  `IntersectionObserver` callbacks never fire and screenshots paint white even after `scrollTo`.
  Scroll-reveal, sticky-CTA hide and autoplay can't be verified there — front the pane or check
  the DOM instead. There is no Chrome/Chromium on this Mac for a headless fallback (2026-09-02).
- ~~Meta Pixel dormant until `NEXT_PUBLIC_META_PIXEL_ID` set~~ — RESOLVED 2026-09-22 (set in Vercel,
  live site-wide). Watch-out: it's a `NEXT_PUBLIC_` var, baked in at build — changing it needs a redeploy.

