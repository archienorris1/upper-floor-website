# Bugs & Risks
*Open issues and watch-outs.*

- **OPEN — Contact form can't send email in production** (found 2026-08-01). `/api/contact` needs SMTP_* + CONTACT_EMAIL env vars in Vercel; only NEXT_PUBLIC_PORTAL_URL exists. Submissions 500 and no enquiries arrive. Fix = add vars (Gmail app password) + redeploy.
- Watch-out: don't run `next build` while `npm run dev` is running — both write `.next` and the dev server crashes with "Cannot find module './NNN.js'". Fix: stop server / `rm -rf .next`.
- Portfolio videos ~30 MB total — lazy-loaded so fine on mobile, but keep an eye on Vercel bandwidth if the link gets heavy traffic.
