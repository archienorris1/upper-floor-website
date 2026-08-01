# Progress
*What was done, errors hit, tests run, results.*

## 2026-08-01 — Portfolio page
- Built `/portfolio` (client portfolio, link-only) — live at upperfloor.co/portfolio, commit `f31848f`.
- Assets self-hosted in `public/media/portfolio/` (15 videos compressed 43→30 MB, posters, 6 logos).
- Verified: prod 200 + correct title, videos serve `206 video/mp4` (range requests OK), mobile + desktop layouts checked in browser, tap-for-sound + auto-mute logic tested.
- Errors hit: corrupted `.next` from building while dev server ran (fixed by clearing cache); next/image refuses SVGs (Fastframe logo uses plain `<img>`).
