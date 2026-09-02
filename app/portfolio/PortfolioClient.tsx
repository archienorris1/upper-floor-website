'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SoundProvider, SoundVideoCard } from '@/components/site/SoundVideo'

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

type Brand = {
  name: string
  logo: string
  logoWidth: number
  logoHeight: number
  /* rendered logo height (px) in the section header */
  displayHeight: number
  videos: string[]
}

const BRANDS: Brand[] = [
  {
    name: 'Aurora',
    logo: '/media/portfolio/logo-aurora.png',
    logoWidth: 280,
    logoHeight: 48,
    displayHeight: 20,
    videos: [
      'aurora-1',
      'aurora-2',
      'aurora-3',
      'aurora-4',
      'aurora-5',
      'aurora-6',
    ],
  },
  {
    name: 'Fastframe',
    logo: '/media/portfolio/logo-fastframe.svg',
    logoWidth: 222,
    logoHeight: 30,
    displayHeight: 20,
    videos: [
      'fastframe-1',
      'fastframe-2',
      'fastframe-3',
      'fastframe-4',
      'fastframe-5',
      'fastframe-6',
    ],
  },
  {
    name: 'Toastybody',
    logo: '/media/portfolio/logo-toastybody.png',
    logoWidth: 325,
    logoHeight: 64,
    displayHeight: 24,
    videos: ['toastybody-1', 'toastybody-2'],
  },
  {
    name: 'Fidgie',
    logo: '/media/portfolio/logo-fidgie.png',
    logoWidth: 173,
    logoHeight: 66,
    displayHeight: 30,
    videos: ['fidgie-1'],
  },
]

const TICKER_LOGOS = [
  { src: '/media/portfolio/logo-fastframe.svg', alt: 'Fastframe', w: 222, h: 30, height: 17 },
  { src: '/media/portfolio/logo-songarchitect.png', alt: 'Song Architect', w: 305, h: 147, height: 38 },
  { src: '/media/portfolio/logo-toastybody.png', alt: 'Toastybody', w: 325, h: 64, height: 22 },
  { src: '/media/portfolio/logo-nootropict.png', alt: 'Nootropict', w: 334, h: 61, height: 17 },
  { src: '/media/portfolio/logo-aurora.png', alt: 'Aurora', w: 280, h: 48, height: 16 },
  { src: '/media/portfolio/logo-fidgie.png', alt: 'Fidgie', w: 173, h: 66, height: 26 },
]

/* ─────────────────────────────────────────────
   Logo image — plain <img> for SVGs (next/image
   won't optimise them), next/image for PNGs
   ───────────────────────────────────────────── */

function BrandLogo({
  src,
  alt,
  width,
  height,
  displayHeight,
  className = '',
}: {
  src: string
  alt: string
  width: number
  height: number
  displayHeight: number
  className?: string
}) {
  const style = {
    height: displayHeight,
    width: 'auto' as const,
    maxWidth: 'none' as const,
  }
  if (src.endsWith('.svg')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} style={style} className={className} />
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={className}
    />
  )
}

/* ─────────────────────────────────────────────
   Brand section
   ───────────────────────────────────────────── */

function BrandSection({ brand, index }: { brand: Brand; index: number }) {
  const single = brand.videos.length === 1

  return (
    <section className="py-14 md:py-20">
      {/* header */}
      <div className="mx-auto mb-7 flex max-w-[1200px] items-center gap-5 px-6 md:mb-10 md:gap-8 lg:px-12 reveal-on-scroll">
        <BrandLogo
          src={brand.logo}
          alt={brand.name}
          width={brand.logoWidth}
          height={brand.logoHeight}
          displayHeight={brand.displayHeight}
          className="shrink-0"
        />
        <div className="h-px flex-1 bg-white/10" />
        <span className="shrink-0 text-xs font-medium tracking-[0.25em] text-white/30">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* videos — swipe row on mobile, grid on desktop */}
      <div
        className={`hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:mx-auto md:max-w-[1200px] md:snap-none md:overflow-visible lg:px-12 ${
          single
            ? 'md:justify-center'
            : 'md:grid md:grid-cols-3 md:gap-6'
        }`}
      >
        {brand.videos.map((id) => (
          <div
            key={id}
            className={`w-[72vw] max-w-[340px] flex-none snap-center md:w-full ${
              single ? 'md:max-w-[340px]' : 'md:max-w-none'
            }`}
          >
            <SoundVideoCard id={id} />
          </div>
        ))}
        {/* trailing spacer so the last card can centre on mobile */}
        <div className="w-2 flex-none md:hidden" aria-hidden="true" />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function PortfolioClient() {
  return (
    <SoundProvider>
      <main className="min-h-screen bg-[#0E0E0E] text-white">
        {/* ── Hero — compact masthead so the work sits above the fold ── */}
        <header className="flex flex-col items-center px-6 pb-8 pt-10 text-center md:pb-10 md:pt-14">
          <Image
            src="/media/portfolio/logo-upperfloor.png"
            alt="Upper Floor"
            width={620}
            height={354}
            priority
            className="hero-load hero-load-1 w-24 md:w-32"
          />
          <p className="hero-load hero-load-2 mt-5 text-[11px] font-medium tracking-[0.4em] text-white/40">
            CLIENT PORTFOLIO
          </p>
          <p className="hero-load hero-load-3 mt-2 text-sm text-white/50">
            Selected work for ecom brands.
          </p>
        </header>

        {/* ── Client logo ticker ── */}
        <div className="overflow-hidden border-y border-white/10 py-5">
          <div className="ticker-track items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {TICKER_LOGOS.map((logo) => (
                  <div
                    key={`${copy}-${logo.alt}`}
                    className="mx-8 flex items-center md:mx-12"
                  >
                    <BrandLogo
                      src={logo.src}
                      alt={copy === 0 ? logo.alt : ''}
                      width={logo.w}
                      height={logo.h}
                      displayHeight={logo.height}
                      className="opacity-60"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Brand sections ── */}
        <div>
          {BRANDS.map((brand, i) => (
            <BrandSection key={brand.name} brand={brand} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <section className="border-t border-white/10 px-6 py-24 text-center md:py-32">
          <h2
            className="mx-auto max-w-[700px] font-black leading-tight tracking-tight reveal-on-scroll"
            style={{ fontSize: 'clamp(1.9rem, 6vw, 3.2rem)' }}
          >
            Want content like this for your brand?
          </h2>
          <div className="mt-10 reveal-on-scroll reveal-delay-1">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-white px-9 py-4 text-sm font-black text-black transition-colors duration-200 hover:bg-white/85"
            >
              Get in touch →
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/40 reveal-on-scroll reveal-delay-2">
            or email{' '}
            <a
              href="mailto:info@upperfloor.co"
              className="text-white/70 underline underline-offset-4 hover:text-white"
            >
              info@upperfloor.co
            </a>
          </p>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Upper Floor · upperfloor.co
        </footer>
      </main>
    </SoundProvider>
  )
}
