'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import EpisodePreviewButton from './EpisodePreviewButton'

const CARDS = [
  {
    title: 'PODCAST DUO',
    episode: 'EP 47',
    image: '/images/podcast-duo-dark.jpg',
  },
  {
    title: 'THE BUSINESS SHIFT',
    episode: 'EP 23',
    image: '/images/podcast-women-neon.jpg',
  },
  {
    title: 'UNFILTERED',
    episode: 'EP 12',
    image: '/images/podcast-woman-closeup.jpg',
  },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const next = useCallback(() => setActiveIndex(i => (i + 1) % CARDS.length), [])
  const prev = useCallback(() => setActiveIndex(i => (i - 1 + CARDS.length) % CARDS.length), [])

  const pauseAndResume = useCallback(() => {
    setIsPaused(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setIsPaused(false), 2000)
  }, [])

  // Auto-advance every 3 s, pause while isPaused
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 3000)
    return () => clearInterval(id)
  }, [isPaused, next])

  // Cleanup resume timer on unmount
  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current) }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    pauseAndResume()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
    }
  }

  const goTo = (i: number) => { setActiveIndex(i); pauseAndResume() }

  return (
    <section className="min-h-screen pb-20 px-6 lg:px-12" style={{ paddingTop: '120px' }} id="work">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8">
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em]">
            B2B Podcast Production Agency
          </p>

          <h1
            className="font-black tracking-tight leading-[1.0] uppercase"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
          >
            <span className="text-white block">MORE THAN JUST</span>
            <span className="text-white block">A PODCAST.</span>
            <span className="text-[#E07BA3] block">BECOME THE MOST</span>
            <span className="text-[#E07BA3] block">TRUSTED VOICE</span>
            <span className="text-[#E07BA3] block">IN YOUR INDUSTRY.</span>
          </h1>

          <p
            className="text-[#BFBFBF] font-normal max-w-[420px] sm:text-base text-sm"
            style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '24px' }}
          >
            We produce, position and grow podcasts that make your brand the go-to authority in your space.
          </p>

          <div className="flex flex-wrap gap-4">
            <EpisodePreviewButton className="bg-[#E07BA3] text-black font-black border-0 rounded-full px-6 py-3 text-sm hover:bg-[#cc6d95] transition-colors duration-200 inline-flex items-center gap-1.5">
              Get a Free Episode Preview →
            </EpisodePreviewButton>
            <a
              href="#work"
              className="border border-white/20 text-white bg-transparent rounded-full px-6 py-3 font-medium text-sm hover:bg-white/5 transition-colors duration-200"
            >
              View our work
            </a>
          </div>

          <p className="text-[#BFBFBF] text-sm">
            Trusted by B2B brands across SaaS, finance and tech.
          </p>
        </div>

        {/* RIGHT COLUMN — desktop portrait carousel 3:4 */}
        <div className="relative hidden lg:flex flex-col">
          <div
            className="relative w-full overflow-hidden rounded-[20px]"
            style={{ aspectRatio: '3/4' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.image}
                className="absolute inset-0"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 1 : 0,
                  transition: 'opacity 0.7s ease',
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                  sizes="(max-width: 1024px) 0px, 45vw"
                  priority={i === 0}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 55%)' }}
                />
                <div className="absolute bottom-5 left-5 z-10">
                  <p className="text-white/50 text-[10px] uppercase tracking-[0.18em]">{card.episode}</p>
                  <p className="text-white/80 font-black text-sm uppercase tracking-tight mt-0.5">{card.title}</p>
                </div>
              </div>
            ))}

            {/* Spinning circular badge — inside top-right of card */}
            <div className="absolute top-3 right-3 z-40 w-[88px] h-[88px]">
              <svg viewBox="0 0 88 88" className="spin-badge w-full h-full" aria-hidden="true">
                <defs>
                  <path id="badgeCircle" d="M 44,44 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <circle cx="44" cy="44" r="43" fill="#161616" stroke="#E07BA3" strokeWidth="1" />
                <text fill="#E07BA3" fontSize="7.5" fontWeight="700" letterSpacing="1.5">
                  <textPath href="#badgeCircle">
                    STRATEGY · PRODUCTION · GROWTH · SHOW ·
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E07BA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
            </div>

            {/* Decorative pink slash marks — inside lower-right of card */}
            <svg
              className="absolute bottom-16 right-3 opacity-50 z-10"
              width="34" height="60" viewBox="0 0 34 60" fill="none" aria-hidden="true"
            >
              <line x1="0" y1="60" x2="26" y2="0" stroke="#E07BA3" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="8" y1="60" x2="34" y2="0" stroke="#E07BA3" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Dot indicators below card */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? '24px' : '8px',
                  height: '8px',
                  backgroundColor: i === activeIndex ? '#E07BA3' : '#333333',
                }}
              />
            ))}
          </div>
        </div>

        {/* MOBILE carousel — 16:9, dots overlaid inside */}
        <div
          className="relative lg:hidden overflow-hidden rounded-[20px]"
          style={{ aspectRatio: '16/9' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {CARDS.map((card, i) => (
            <div
              key={`m-${card.image}`}
              className="absolute inset-0"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                zIndex: i === activeIndex ? 1 : 0,
                transition: 'opacity 0.7s ease',
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                style={{ objectPosition: 'center top' }}
                sizes="100vw"
                priority={i === 0}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 55%)' }}
              />
            </div>
          ))}
          {/* Overlaid dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? '20px' : '6px',
                  height: '6px',
                  backgroundColor: i === activeIndex ? '#E07BA3' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
