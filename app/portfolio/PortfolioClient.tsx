'use client'

import { useState } from 'react'
import { STATIC_ADS, type StaticAd } from './static-ads'
import Image from 'next/image'
import Link from 'next/link'
import { SoundProvider, SoundVideoCard } from '@/components/site/SoundVideo'

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

type Format = 'Videos' | 'Statics'

type Brand = {
  name: string
  logo: string
  website?: string
  logoWidth: number
  logoHeight: number
  /* rendered logo height (px) in the section header */
  displayHeight: number
  /* one-line description of what we make for them */
  blurb: string
  videos: string[]
  statics?: StaticAd[]
  result?: { value: string; label: string }
  videoResults?: Record<string, { value: string; label: string }>
}

const PRIORITY_BRANDS = ['Fastframe', 'Mello', 'True Fuels', 'Aurora', 'KELV', 'Somerwell', 'ION8']
const brandRank = (name: string) => {
  const rank = PRIORITY_BRANDS.indexOf(name)
  return rank < 0 ? PRIORITY_BRANDS.length : rank
}

const BRANDS: Brand[] = [
  {
    name: 'Mello',
    statics: STATIC_ADS.mello,
    website: 'https://www.mellorelief.com',
    logo: '/media/portfolio/logo-mello.png',
    logoWidth: 420,
    logoHeight: 136,
    displayHeight: 28,
    blurb: 'Animated explainers and gifting ads.',
    videos: ['mello-1', 'mello-2', 'mello-3'],
  },
  {
    name: 'True Fuels',
    statics: STATIC_ADS.truefuels,
    logo: '/media/portfolio/logo-truefuels-v1.png',
    logoWidth: 427,
    logoHeight: 70,
    displayHeight: 22,
    blurb: 'Paid social creative.',
    videos: ['truefuels-5', 'truefuels-6', 'truefuels-7', 'truefuels-1', 'truefuels-2', 'truefuels-3', 'truefuels-4'],
  },
  {
    name: 'Somerwell',
    logo: '/media/portfolio/logo-somerwell-v2.svg',
    logoWidth: 613,
    logoHeight: 194,
    displayHeight: 28,
    blurb: 'Podcast-style and musical ads.',
    videos: ['somerwell-1', 'somerwell-2'],
  },
  {
    name: 'Fastframe',
    logo: '/media/portfolio/logo-fastframe.svg',
    logoWidth: 222,
    logoHeight: 30,
    displayHeight: 20,
    blurb: 'UGC ads and product content.',
    videoResults: { 'fastframe-7': { value: '140k', label: 'organic views' } },
    videos: [
      'fastframe-7',
      'fastframe-8',
      'fastframe-9',
      'fastframe-10',
      'fastframe-1',
      'fastframe-2',
      'fastframe-3',
      'fastframe-4',
      'fastframe-5',
      'fastframe-6',
    ],
  },
  {
    name: 'Aurora',
    statics: STATIC_ADS.aurora,
    logo: '/media/portfolio/logo-aurora.png',
    logoWidth: 280,
    logoHeight: 48,
    displayHeight: 20,
    blurb: 'Organic, ASMR, trends and UGC ads for a night-sky projector brand.',
    result: { value: '2000x', label: 'increase in engagement' },
    videos: [
      'aurora-11',
      'aurora-12',
      'aurora-8',
      'aurora-9',
      'aurora-10',
      'aurora-1',
      'aurora-2',
      'aurora-3',
      'aurora-4',
      'aurora-5',
      'aurora-6',
    ],
  },
  {
    name: 'ION8',
    logo: '/media/portfolio/logo-ion8.png',
    logoWidth: 484,
    logoHeight: 240,
    displayHeight: 24,
    blurb: 'Product motion ads and paid creative for an award-winning drinkware brand.',
    videos: ['ion8-1', 'ion8-2', 'ion8-3', 'ion8-4'],
  },
  {
    name: 'Dissertation Collective',
    logo: '/media/portfolio/logo-dissertationcollective.png',
    logoWidth: 773,
    logoHeight: 134,
    displayHeight: 22,
    blurb: 'Talking heads and animated explainers for a dissertation coaching programme.',
    videos: ['dc-1', 'dc-2', 'dc-3', 'dc-4', 'dc-5', 'dc-6'],
  },
  {
    name: 'KELV',
    logo: '/media/portfolio/logo-kelv.png',
    logoWidth: 690,
    logoHeight: 175,
    displayHeight: 18,
    blurb: 'UGC and ad creative for an electrolyte lollipop brand.',
    videos: ['kelv-1', 'kelv-2'],
  },
  {
    name: 'Fidgie',
    logo: '/media/portfolio/logo-fidgie.png',
    logoWidth: 173,
    logoHeight: 66,
    displayHeight: 30,
    blurb: 'UGC ads and organic clips.',
    videos: ['fidgie-2', 'fidgie-3', 'fidgie-4', 'fidgie-5', 'fidgie-1'],
  },
  {
    name: 'Toastybody',
    statics: STATIC_ADS.toastybody,
    logo: '/media/portfolio/logo-toastybody.png',
    logoWidth: 325,
    logoHeight: 64,
    displayHeight: 24,
    blurb: 'UGC ads that took the brand to a $28.5k day.',
    result: { value: '4x', label: 'ROAS' },
    videos: ['toastybody-1', 'toastybody-2'],
  },
  {
    name: 'Glasselle',
    website: 'https://www.glasselle.com',
    logo: '/media/portfolio/logo-glasselle.png',
    logoWidth: 426,
    logoHeight: 113,
    displayHeight: 27,
    blurb: '',
    videos: [],
    statics: STATIC_ADS.glasselle,
  },
]
BRANDS.sort((a, b) => brandRank(a.name) - brandRank(b.name))

export const TICKER_LOGOS = [
  { src: '/media/portfolio/logo-mello.png', alt: 'Mello', w: 420, h: 136, height: 24 },
  { src: '/media/portfolio/logo-truefuels-v1.png', alt: 'True Fuels', w: 427, h: 70, height: 19 },
  { src: '/media/portfolio/logo-somerwell-v2.svg', alt: 'Somerwell', w: 613, h: 194, height: 26 },
  { src: '/media/portfolio/logo-fastframe.svg', alt: 'Fastframe', w: 222, h: 30, height: 17 },
  { src: '/media/portfolio/logo-ion8.png', alt: 'ION8', w: 484, h: 240, height: 22 },
  { src: '/media/portfolio/logo-songarchitect.png', alt: 'Song Architect', w: 305, h: 147, height: 38 },
  { src: '/media/portfolio/logo-dissertationcollective.png', alt: 'Dissertation Collective', w: 773, h: 134, height: 20 },
  { src: '/media/portfolio/logo-toastybody.png', alt: 'Toastybody', w: 325, h: 64, height: 22 },
  { src: '/media/portfolio/logo-kelv.png', alt: 'KELV', w: 690, h: 175, height: 16 },
  { src: '/media/portfolio/logo-nootropict.png', alt: 'Nootropict', w: 334, h: 61, height: 17 },
  { src: '/media/portfolio/logo-aurora.png', alt: 'Aurora', w: 280, h: 48, height: 16 },
  { src: '/media/portfolio/logo-fidgie.png', alt: 'Fidgie', w: 173, h: 66, height: 26 },
]
TICKER_LOGOS.sort((a, b) => brandRank(a.alt) - brandRank(b.alt))

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
  const logoClassName = `${className} ${/logo-(truefuels|somerwell)-/.test(src) ? 'brightness-0 invert' : ''}`
  const style = {
    height: displayHeight,
    width: 'auto' as const,
    maxWidth: 'none' as const,
  }
  if (src.endsWith('.svg')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} style={style} className={logoClassName} />
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={logoClassName}
    />
  )
}

/* ─────────────────────────────────────────────
   Brand section
   ───────────────────────────────────────────── */

/** Desktop grid: 4-up when the set divides by four, otherwise 3-up; pairs sit centred. */
function gridClass(count: number) {
  if (count <= 2) return 'md:flex md:justify-center'
  if (count % 4 === 0) return 'md:grid md:grid-cols-3 md:gap-6 xl:grid-cols-4'
  return 'md:grid md:grid-cols-3 md:gap-6'
}

function BrandSection({ brand, index, format }: { brand: Brand; index: number; format: Format }) {
  const isVideo = format === 'Videos'
  const statics = brand.statics ?? []
  const count = isVideo ? brand.videos.length : statics.length
  const pair = count <= 2
  const cardClass = `w-[72vw] max-w-[340px] flex-none snap-center md:w-full ${pair ? 'md:max-w-[340px]' : 'md:max-w-none'}`
  const logo = (
    <BrandLogo
      src={brand.logo}
      alt={brand.name}
      width={brand.logoWidth}
      height={brand.logoHeight}
      displayHeight={brand.displayHeight}
      className="shrink-0"
    />
  )

  return (
    <section data-portfolio-brand={brand.name} className="py-14 md:py-20">
      {/* header */}
      <div className="mx-auto mb-7 max-w-[1200px] px-6 md:mb-10 lg:px-12 reveal-on-scroll">
        <div className="flex items-center gap-5 md:gap-8">
          {brand.website ? <a href={brand.website}>{logo}</a> : logo}
          <div className="h-px flex-1 bg-white/10" />
          <span className="shrink-0 text-xs font-medium tracking-[0.25em] text-white/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">
            {isVideo
              ? <>{brand.blurb} <span className="text-white/25">· {count} {count === 1 ? 'clip' : 'clips'}</span></>
              : <>{count} static {count === 1 ? 'ad' : 'ads'}</>}
          </p>
          {isVideo && brand.result && (
            <p className="flex shrink-0 items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-[#E07BA3]">{brand.result.value}</span>
              <span className="text-xs text-white/70">{brand.result.label}</span>
            </p>
          )}
        </div>
      </div>

      {/* Swipe row on mobile, grid on desktop */}
      <div
        className={`hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:mx-auto md:max-w-[1200px] md:snap-none md:gap-6 md:overflow-visible lg:px-12 ${gridClass(
          count
        )}`}
      >
        {isVideo ? brand.videos.map((id, i) => (
          <div key={id} className={cardClass}>
            <SoundVideoCard id={id} eager={index === 0 && i < 2} />
            {brand.videoResults?.[id] && (
              <p className="mt-3 flex items-baseline gap-2 px-1">
                <span className="text-2xl font-bold tracking-tight text-[#E07BA3]">{brand.videoResults[id].value}</span>
                <span className="text-xs text-white/70">{brand.videoResults[id].label}</span>
              </p>
            )}
          </div>
        )) : statics.map(ad => {
          const src = `/media/portfolio/statics/${ad.id}.webp`
          return (
            <a
              key={ad.id}
              href={src}
              target="_blank"
              rel="noopener"
              aria-label={`Open full-size ${brand.name} ad in a new tab: ${ad.alt}`}
              className={`${cardClass} self-start rounded-2xl focus-visible:outline-white`}
            >
              <Image
                src={src}
                alt={`${brand.name} — ${ad.alt}`}
                width={ad.width}
                height={ad.height}
                unoptimized
                className="block h-auto w-full rounded-2xl"
              />
            </a>
          )
        })}
        {/* trailing spacer so the last card can centre on mobile */}
        <div className="w-2 flex-none md:hidden" aria-hidden="true" />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

const videoBrands = BRANDS.filter(brand => brand.videos.length)
const staticBrands = BRANDS.filter(brand => brand.statics?.length)
const clipCount = videoBrands.reduce((total, brand) => total + brand.videos.length, 0)
const staticCount = staticBrands.reduce((total, brand) => total + (brand.statics?.length ?? 0), 0)
const staticLogos = staticBrands.map(brand => ({
  src: brand.logo, alt: brand.name, w: brand.logoWidth, h: brand.logoHeight, height: brand.displayHeight,
}))

export default function PortfolioClient() {
  const [format, setFormat] = useState<Format>('Videos')
  const isVideo = format === 'Videos'
  const brands = isVideo ? videoBrands : staticBrands
  const logos = isVideo ? TICKER_LOGOS : staticLogos

  return (
    <main className="min-h-screen bg-[#0E0E0E] text-white">
      {/* ── Hero — compact masthead so the work sits above the fold ── */}
      <header className="flex flex-col items-center px-6 pb-8 pt-10 text-center md:pb-10 md:pt-14">
        <Image
          src="/media/portfolio/logo-upperfloor-v2.svg"
          alt="Upper Floor"
          width={833}
          height={476}
          priority
          className="hero-load hero-load-1 w-24 md:w-32"
        />
        <p className="hero-load hero-load-2 mt-5 text-[11px] font-medium tracking-[0.4em] text-white/40">
          CLIENT PORTFOLIO
        </p>
        <p className="hero-load hero-load-3 mt-2 text-sm text-white/50">
          {isVideo
            ? `${clipCount} clips across ${brands.length} brands. Tap any clip for sound.`
            : `${staticCount} static ads across ${brands.length} brands. Tap any ad to enlarge.`}
        </p>
      </header>

      {/* ── Client logo ticker ── */}
      <div className="overflow-hidden border-y border-white/10 py-5">
        <div className="ticker-track items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex min-w-[100vw] shrink-0 items-center justify-around" aria-hidden={copy === 1}>
              {logos.map((logo) => (
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

      <fieldset className="mx-auto mt-8 grid w-48 grid-cols-2 rounded-full border border-white/15 bg-white/5 p-1">
        <legend className="sr-only">Portfolio format</legend>
        <span aria-hidden="true" className={`col-start-1 row-start-1 rounded-full bg-white transition-transform duration-200 ${isVideo ? '' : 'translate-x-full'}`} />
        {(['Videos', 'Statics'] as const).map((value, i) => (
          <label key={value} className={`relative row-start-1 cursor-pointer ${i === 0 ? 'col-start-1' : 'col-start-2'}`}>
            <input
              type="radio"
              name="portfolio-format"
              checked={format === value}
              onChange={() => setFormat(value)}
              aria-controls="portfolio-gallery"
              className="peer sr-only"
            />
            <span className={`block rounded-full py-2.5 text-center text-sm font-semibold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white ${format === value ? 'text-black' : 'text-white/70'}`}>
              {value}
            </span>
          </label>
        ))}
      </fieldset>

      <div id="portfolio-gallery">
        <SoundProvider key={format}>
          {brands.map((brand, i) => (
            <BrandSection key={brand.name} brand={brand} index={i} format={format} />
          ))}
        </SoundProvider>
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
  )
}
