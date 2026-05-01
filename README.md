# Upper Floor Website

Production-ready Next.js 14 website for Upper Floor — a full-service podcast agency.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

---

## Deploy to Vercel via GitHub

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Upper Floor website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/upper-floor-website.git
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create a free account)
2. Click **"Add New Project"**
3. Click **"Import"** next to your GitHub repository
4. Vercel will auto-detect Next.js — leave all settings as default
5. Click **"Deploy"**

Your site will be live in ~2 minutes. Every push to `main` will trigger an automatic redeploy.

---

## Adding Real Images

All image placeholder `<div>` elements are marked with `// REPLACE WITH IMAGE` comments. To swap them out:

1. Drop your image files into the `/public` directory
2. Replace the placeholder `<div>` with Next.js `<Image>`:

```tsx
import Image from 'next/image'

// Before:
{/* REPLACE WITH IMAGE */}
<div className="absolute inset-0 bg-[#111111]" />

// After:
<Image
  src="/your-image.jpg"
  alt="Description"
  fill
  className="object-cover"
  priority
/>
```

---

## Brand Reference

| Token     | Value     |
|-----------|-----------|
| Black     | `#000000` |
| White     | `#FFFFFF` |
| Pink      | `#E07BA3` |
| Grey      | `#BFBFBF` |
| Font      | Arial / Helvetica (system) |

---

## Project Structure

```
app/
  layout.tsx        # Metadata and root layout
  page.tsx          # Single-page composition
  globals.css       # Ticker animation + global styles

components/
  Nav.tsx           # Fixed nav, transparent → black on scroll
  Hero.tsx          # Full-height hero with podcast card stack
  Ticker.tsx        # Infinite pink marquee strip
  About.tsx         # Split panel: pink copy + dark images
  Services.tsx      # Two-column: stacked words + service rows
  PodcastSamples.tsx # Three dark podcast show cards
  CaseStudy.tsx     # Headline + 3-stat case study block
  Pricing.tsx       # Single pricing card with checklist
  Stats.tsx         # Count-up stats bar (IntersectionObserver)
  CTA.tsx           # Pink CTA section
  Footer.tsx        # Black footer with links and socials

public/             # Drop images here
```
