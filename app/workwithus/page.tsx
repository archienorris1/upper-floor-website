/* eslint-disable @next/next/no-img-element */

import type { Metadata } from 'next'
import Image from 'next/image'
import StatNumber from '@/components/site/StatNumber'
import VideoCard from '@/components/site/VideoCard'
import MetaPixel from '@/components/site/MetaPixel'
import { SoundProvider } from '@/components/site/SoundVideo'
import WorkGrid from './WorkGrid'
import FormatGrid from './FormatGrid'
import BookCall from './BookCall'
import StickyCta from './StickyCta'

/*
  Paid-traffic landing page. Deliberately self-contained: no site nav, no
  links out, one job — get the visitor to book the Cal.com intro call.
  Kept out of the sitemap and noindexed so it never competes with the
  home page in search and attribution stays clean.
*/

export const metadata: Metadata = {
  title: 'Work With Us',
  description:
    'Upper Floor is a marketing agency for ecom brands: Meta ads management plus the creative that feeds it, from UGC and talking heads to animated explainers and product motion ads. Real creative direction, no slop. Book a free call.',
  alternates: { canonical: '/workwithus' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Work With Upper Floor',
    description:
      'Meta ads and the creative behind them for ecom brands doing real numbers. Book a free call.',
    type: 'website',
    url: 'https://upperfloor.co/workwithus',
    siteName: 'Upper Floor',
    images: [{ url: '/media/hero-poster.jpg', width: 1280, height: 720, alt: 'Upper Floor' }],
  },
}

const CTA_LABEL = 'Book a call'

const ctaClass =
  'inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-xl'

const TICKER_LOGOS = [
  { src: '/media/portfolio/logo-fastframe.svg', alt: 'Fastframe', height: 17 },
  { src: '/media/portfolio/logo-ion8.png', alt: 'ION8', height: 22 },
  { src: '/media/portfolio/logo-songarchitect.png', alt: 'Song Architect', height: 38 },
  { src: '/media/portfolio/logo-dissertationcollective.png', alt: 'Dissertation Collective', height: 20 },
  { src: '/media/portfolio/logo-toastybody.png', alt: 'Toastybody', height: 22 },
  { src: '/media/portfolio/logo-kelv.png', alt: 'KELV', height: 16 },
  { src: '/media/portfolio/logo-nootropict.png', alt: 'Nootropict', height: 17 },
  { src: '/media/portfolio/logo-aurora.png', alt: 'Aurora', height: 16 },
  { src: '/media/portfolio/logo-fidgie.png', alt: 'Fidgie', height: 26 },
]

const STATS = [
  { value: 700, prefix: '$', suffix: 'k', label: 'revenue in a single month', brand: 'Aurora' },
  { value: 28500, prefix: '$', suffix: '', label: 'revenue in a single day', brand: 'Toastybody' },
  { value: 30.86, decimals: 2, suffix: 'x', label: 'ROAS on a top ad set', brand: 'Nootropict' },
  { value: 1, suffix: 'M+', label: 'organic views in 30 days', brand: 'Song Architect' },
]

const PILLARS = [
  {
    num: '01',
    title: 'Creative and media, one team',
    body: 'Every piece starts with a real idea: the hook, the angle, the reason to stop scrolling. The same people run the Meta account, so what the ad manager tells us goes straight back into the next brief.',
  },
  {
    num: '02',
    title: 'AI where it earns its place',
    body: 'We use AI to produce more variations, test faster and find winners sooner. Never to replace the thinking, and never where you would notice.',
  },
  {
    num: '03',
    title: 'A quality bar we actually hold',
    body: 'If we would not run it for our own brand, it does not ship, and that goes for the ad account as much as the creative. That is why we keep the client list short.',
  },
]

const FIT = [
  'You sell a physical product that people can see on camera.',
  'You are running Meta ads, or ready to, and want creative that scales them.',
  'You care how the brand looks, not just what the CPM is.',
]

const CALL_STEPS = [
  {
    num: '1',
    title: 'Book a slot',
    body: '30 minutes on Google Meet. No prep, no deck.',
  },
  {
    num: '2',
    title: 'We look at your brand',
    body: 'Your product, your Meta account, the creative you are running now, and where the gaps are.',
  },
  {
    num: '3',
    title: 'If it is a fit, we make you something',
    body: 'A piece of creative for your brand, free, so you can judge the work before you spend a penny.',
  },
]

const FAQ = [
  {
    q: 'What is the free content?',
    a: 'A piece of content made for your brand, usually a UGC-style ad or an organic clip, that you can run straight away. If you qualify on the call, we make it. No strings.',
  },
  {
    q: 'Do you run the ads as well as make the creative?',
    a: 'Yes. Most clients hand us the Meta account and the creative together, because the two feed each other: what we see in the ad manager shapes the next brief. If you only need creative, we can do that too.',
  },
  {
    q: 'What does the call cost?',
    a: 'Nothing. The call and the free content are on us. If we go on to work together, we quote based on what you actually need.',
  },
  {
    q: 'Why isn&rsquo;t this for everyone?',
    a: 'Because we keep our client list small enough to do the work properly. We need to know the product can carry great content and that there is a real business behind it.',
  },
  {
    q: 'Do I need to prepare anything?',
    a: 'No. Turn up with your product and a rough idea of the content you are currently running. We will take it from there.',
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">{children}</p>
  )
}

function CaseCard({
  brand,
  tag,
  stat,
  line,
  body,
  media,
  delay = 0,
}: {
  brand: React.ReactNode
  tag: string
  stat: React.ReactNode
  line: string
  body: string
  media: React.ReactNode
  delay?: number
}) {
  return (
    <article
      className={`reveal-on-scroll reveal-delay-${delay} grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[150px_1fr] sm:items-center md:p-7`}
    >
      <div className="mx-auto w-full max-w-[220px] sm:max-w-none">{media}</div>
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="text-white">{brand}</div>
          <span className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
            {tag}
          </span>
        </div>
        <p className="mt-5 font-serif text-3xl leading-tight text-white md:text-4xl">{stat}</p>
        <p className="mt-1 text-lg text-white/80">{line}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">{body}</p>
      </div>
    </article>
  )
}

export default function WorkWithUsPage() {
  return (
    <SoundProvider>
      <main className="min-h-screen bg-brand-ink text-white">
        <MetaPixel />

        {/* ── Header — logo + one button, nowhere else to go ── */}
        <header className="fixed inset-x-0 top-0 z-50 bg-brand-ink/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
            <img src="/media/logo-white.png" alt="Upper Floor" className="h-10 w-auto md:h-12" />
            <a
              href="#book"
              className="rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg"
            >
              Book a call
            </a>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden">
          <video
            className="hero-zoom absolute inset-0 h-full w-full object-cover opacity-50"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/hero-poster.jpg"
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/70 via-brand-ink/50 to-brand-ink" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(27,138,63,0.25),transparent_60%)]" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-32 text-center md:pb-28 md:pt-40">
            <p className="hero-load hero-load-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Work with Upper Floor
            </p>
            <h1 className="hero-load hero-load-2 mt-6 font-serif text-[2.6rem] leading-[1.05] tracking-headline md:text-7xl">
              Let&rsquo;s see if we can help.
            </h1>
            <p className="hero-load hero-load-3 mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Upper Floor is the marketing agency behind $700k months for ecom brands, with real
              creative direction, hands-on Meta ads management and zero slop.
            </p>
            <a href="#book" className={`hero-load hero-load-4 mt-9 ${ctaClass}`}>
              {CTA_LABEL}
            </a>
            <p className="hero-load hero-load-4 mt-4 text-xs text-white/50">
              Free 30-minute call · No pitch deck · No commitment
            </p>
          </div>
        </section>

        {/* ── Client logo ticker ── */}
        <div className="overflow-hidden border-y border-white/10 py-5">
          <div className="ticker-track items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {TICKER_LOGOS.map((logo) => (
                  <div key={`${copy}-${logo.alt}`} className="mx-8 flex items-center md:mx-12">
                    <img
                      src={logo.src}
                      alt={copy === 0 ? logo.alt : ''}
                      style={{ height: logo.height, width: 'auto', maxWidth: 'none' }}
                      className="opacity-60"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Results strip ── */}
        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`reveal-on-scroll reveal-delay-${i + 1} text-center`}>
                <p className="font-serif text-4xl leading-none text-white md:text-5xl">
                  <StatNumber
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </p>
                <p className="mt-3 text-sm text-white/70">{s.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/40">{s.brand}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Work ── */}
        <section className="py-10 md:py-16">
          <div className="reveal-on-scroll mx-auto mb-8 max-w-6xl px-5 text-center md:mb-12 md:px-8">
            <Eyebrow>Recent work</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
              content people stop scrolling for
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/70 md:text-lg">
              Meta ads and the creative that feeds them, for nine brands from night-sky projectors to
              electrolyte lollipops. Tap a clip for sound.
            </p>
          </div>
          <WorkGrid />
        </section>

        {/* ── Range ── */}
        <section className="py-16 md:py-24">
          <div className="reveal-on-scroll mx-auto mb-8 max-w-6xl px-5 text-center md:mb-12 md:px-8">
            <Eyebrow>Range</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">every format your brand will need</h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/70 md:text-lg">
              One team runs the Meta account and makes the creative for it. No hand-off between an
              ads agency and a content agency, no drop in quality between formats.
            </p>
          </div>
          <FormatGrid />
          <div className="reveal-on-scroll mt-12 px-5 text-center">
            <a href="#book" className={ctaClass}>
              {CTA_LABEL}
            </a>
          </div>
        </section>

        {/* ── Case studies ── */}
        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="reveal-on-scroll text-center">
              <Eyebrow>Case studies</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">the numbers behind the clips</h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
              <CaseCard
                delay={1}
                brand={<img src="/media/aurora-logo-white.png" alt="Aurora" className="h-5 w-auto md:h-6" loading="lazy" />}
                tag="organic + paid"
                stat={<StatNumber value={700} prefix="$" suffix="k" />}
                line="in a single month"
                body="A constant stream of feed-native video: trends, room transformations, unboxings and UGC. Organic that builds the brand, ads that close the sale."
                media={<VideoCard src="/media/aurora-trend.mp4" poster="/media/poster-aurora-trend.jpg" reveal={false} />}
              />
              <CaseCard
                delay={2}
                brand={<span className="font-serif text-2xl font-semibold lowercase tracking-tight">toastybody</span>}
                tag="ugc ads"
                stat={<StatNumber value={28500} prefix="$" />}
                line="in a single day"
                body="One winning creative changes everything. Real faces, native delivery, hooks that earn the first three seconds and CTAs that close."
                media={<VideoCard src="/media/toasty-ugc.mp4" poster="/media/poster-toasty-ugc.jpg" reveal={false} />}
              />
              <CaseCard
                delay={3}
                brand={<span className="font-sans text-xl font-semibold tracking-wide">NOOTROPICT.</span>}
                tag="paid ads"
                stat={<StatNumber value={30.86} decimals={2} suffix="x ROAS" />}
                line="on a top performing ad set"
                body="The ads in the market were weak, so we made the creative ourselves: UGC and statics built around stronger hooks. A 2600% revenue spike in seven days."
                media={
                  <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-white/5 shadow-md">
                    <Image
                      src="/media/nootropic-product-v2.png"
                      alt="Nootropict product creative"
                      fill
                      sizes="(min-width: 640px) 150px, 220px"
                      className="object-cover"
                    />
                  </div>
                }
              />
              <CaseCard
                delay={4}
                brand={
                  <span className="flex flex-col font-sans text-lg font-bold leading-tight">
                    <span>song</span>
                    <span className="underline decoration-2 underline-offset-2">architect</span>
                  </span>
                }
                tag="organic"
                stat={<StatNumber value={1000000} suffix="+" />}
                line="organic views in 30 days"
                body="Our own music brand, grown with organic carousels alone. No ads. One how-to carousel passed 400,000 views on its own."
                media={
                  <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-white/5 shadow-md">
                    <Image
                      src="/media/sa-carousels.png"
                      alt="Song Architect organic carousel creative"
                      fill
                      sizes="(min-width: 640px) 150px, 220px"
                      className="object-cover"
                    />
                  </div>
                }
              />
            </div>

            <div className="reveal-on-scroll mt-12 text-center">
              <a href="#book" className={ctaClass}>
                {CTA_LABEL}
              </a>
            </div>
          </div>
        </section>

        {/* ── No slop ── */}
        <section className="bg-brand-green px-5 py-20 text-white md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Why we&rsquo;re selective</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">AI isn&rsquo;t the shortcut. Taste is.</h2>
              <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
                Anyone can generate two hundred videos a day now. Most of it is slop, and your
                customers can smell it. We use AI to move faster where it helps, but every piece
                still starts with a brief, a hook and a human who cares how it looks.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
              {PILLARS.map((p, i) => (
                <div key={p.num} className={`reveal-on-scroll reveal-delay-${i + 1} rounded-3xl bg-brand-ink p-7 md:p-8`}>
                  <p className="font-serif text-4xl text-brand-green">{p.num}</p>
                  <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who it's for + what happens on the call ── */}
        <section className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-16">
            <div className="reveal-on-scroll">
              <Eyebrow>Who this is for</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">we do our best work with brands that&hellip;</h2>
              <ul className="mt-8 space-y-4">
                {FIT.map((item) => (
                  <li key={item} className="flex gap-4 text-base text-white/85">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-white/55">
                Not sure that&rsquo;s you? Book the call anyway. The worst case is a free, honest
                opinion on your content from people who do this every day.
              </p>
            </div>

            <div className="reveal-on-scroll reveal-delay-2">
              <Eyebrow>What happens on the call</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">three steps, thirty minutes</h2>
              <ol className="mt-8 space-y-6">
                {CALL_STEPS.map((s) => (
                  <li key={s.num} className="flex gap-5">
                    <span className="font-serif text-3xl leading-none text-brand-green">{s.num}</span>
                    <div>
                      <p className="text-lg font-semibold">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Founders ── */}
        <section className="bg-white px-5 py-16 text-brand-ink md:py-24">
          <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">Who you&rsquo;ll talk to</p>
            <div className="mt-6 overflow-hidden rounded-3xl">
              <Image
                src="/media/me-jack.jpg"
                alt="Archie Norris and Jack Buster-Weston"
                width={1536}
                height={1024}
                sizes="(min-width: 768px) 768px, 100vw"
                className="w-full object-cover"
              />
            </div>
            <p className="mt-6 font-serif text-2xl md:text-3xl">Archie Norris and Jack Buster-Weston</p>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-ink/70">
              The founders, not a sales rep. We have grown our own brands and communities, and we
              make the creative and run the Meta ads that sell more.
            </p>
          </div>
        </section>

        {/* ── Booking ── */}
        <section id="book" className="scroll-mt-20 px-4 py-20 md:px-8 md:py-28">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center">
            <Eyebrow>Book your call</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">pick a time that suits you</h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/75 md:text-lg">
              Pick a slot below. Thirty minutes, free, and if it is a fit we make you a piece of
              creative on us.
            </p>
          </div>
          <BookCall />
        </section>

        {/* ── FAQ ── */}
        <section className="px-5 pb-24 md:px-8 md:pb-32">
          <div className="mx-auto max-w-2xl">
            <h2 className="reveal-on-scroll text-center font-serif text-3xl md:text-4xl">questions, answered</h2>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="text-brand-green transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href="#book" className={ctaClass}>
                {CTA_LABEL}
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/10 px-5 py-8 pb-24 text-center text-xs text-white/40 md:pb-8">
          © {new Date().getFullYear()} Upper Floor · upperfloor.co ·{' '}
          <a href="mailto:info@upperfloor.co" className="hover:text-white">
            info@upperfloor.co
          </a>
        </footer>

        <StickyCta />
      </main>
    </SoundProvider>
  )
}
