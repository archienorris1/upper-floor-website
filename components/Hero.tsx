'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import EpisodePreviewButton from './EpisodePreviewButton'

const CARDS = [
  {
    image: '/images/podcast-women-neon.jpg',
    label: 'VISIONARIES',
    sublabel: 'WITH SARAH CHEN',
  },
  {
    image: '/images/podcast-duo-dark.jpg',
    label: 'BUILT DIFFERENT',
    sublabel: 'WITH ALEX MOORE',
  },
  {
    image: '/images/podcast-woman-closeup.jpg',
    label: 'UNFILTERED',
    sublabel: 'WITH JAMES CARTER',
  },
]

const STACK = [
  {
    width: '88%',
    left: '6%',
    bottom: '60px',
    transform: 'translateY(0) scale(1) rotate(1.5deg)',
    opacity: 1,
    zIndex: 3,
  },
  {
    width: '82%',
    left: '9%',
    bottom: '30px',
    transform: 'translateY(0) scale(0.94) rotate(-1.5deg)',
    opacity: 0.8,
    zIndex: 2,
  },
  {
    width: '75%',
    left: '12.5%',
    bottom: '0px',
    transform: 'translateY(0) scale(0.88) rotate(-4deg)',
    opacity: 0.6,
    zIndex: 1,
  },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => setActiveIndex(i => (i + 1) % CARDS.length), 3000)
    return () => clearInterval(id)
  }, [isPaused])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    setIsPaused(true)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) {
        setActiveIndex(i => (i + 1) % CARDS.length)
      } else {
        setActiveIndex(i => (i - 1 + CARDS.length) % CARDS.length)
      }
    }
    setTimeout(() => setIsPaused(false), 3000)
  }, [])

  return (
    <section id="work">

      {/* ── MOBILE LAYOUT (below lg) ── */}
      <div className="lg:hidden flex flex-col" style={{ paddingTop: '100px' }}>

        {/* 1. Headline */}
        <h1
          className="font-black tracking-tight uppercase text-white"
          style={{ padding: '24px 20px 0', fontSize: 'clamp(36px, 9vw, 52px)', lineHeight: 1 }}
        >
          MORE THAN JUST<br />A PODCAST.
        </h1>

        {/* 2. Carousel */}
        <div style={{ padding: '24px 16px 0' }}>
          <div
            style={{ height: '380px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.image}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transform:
                    i === activeIndex
                      ? 'translateX(0)'
                      : i > activeIndex
                      ? 'translateX(100%)'
                      : 'translateX(-100%)',
                }}
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                  sizes="100vw"
                  priority={i === 0}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 50%)' }}
                />
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white font-black text-[11px] uppercase tracking-[0.1em] leading-tight">
                    {card.label}
                  </p>
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.08em] mt-0.5">
                    {card.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to card ${i + 1}`}
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

        {/* 3. Pink subheadline */}
        <p
          className="font-black uppercase"
          style={{
            padding: '32px 20px 16px',
            color: '#E07BA3',
            fontSize: 'clamp(28px, 7vw, 40px)',
            lineHeight: 1.05,
          }}
        >
          BECOME THE MOST TRUSTED VOICE IN YOUR INDUSTRY.
        </p>

        {/* 4. Description */}
        <p style={{ padding: '0 20px 24px', color: '#BFBFBF', fontSize: '14px', lineHeight: 1.6 }}>
          We produce, position and grow podcasts that make your brand the go-to authority in your space.
        </p>

        {/* 5. CTA buttons */}
        <div style={{ padding: '0 20px 48px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <EpisodePreviewButton className="bg-[#E07BA3] text-black font-black border-0 rounded-full text-sm hover:bg-[#cc6d95] transition-colors duration-200 flex items-center justify-center w-full h-[52px]">
            Get a Free Episode Preview →
          </EpisodePreviewButton>
          <a
            href="#work"
            className="border border-white/20 text-white bg-transparent rounded-full font-medium text-sm hover:bg-white/5 transition-colors duration-200 flex items-center justify-center"
            style={{ width: '100%', height: '52px' }}
          >
            View our work
          </a>
        </div>

      </div>

      {/* ── DESKTOP LAYOUT (lg and above) ── */}
      <div
        className="hidden lg:grid grid-cols-2 max-w-[1400px] mx-auto gap-16 items-center px-12 min-h-screen pb-20"
        style={{ paddingTop: '120px' }}
      >

        {/* Left column */}
        <div className="flex flex-col gap-8">
          <h1
            className="font-black tracking-tight leading-[1.0] uppercase"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
          >
            <span className="text-white block">MORE THAN JUST</span>
            <span className="text-white block">A PODCAST.</span>
          </h1>

          <p
            className="text-[#E07BA3] font-black uppercase tracking-tight leading-tight"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', marginTop: '-16px' }}
          >
            Become the most trusted voice<br />in your industry.
          </p>

          <p
            className="text-[#BFBFBF] font-normal max-w-[420px]"
            style={{ fontSize: '16px', lineHeight: '1.6' }}
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

        {/* Right column — stacked card deck */}
        <div
          className="relative"
          style={{ height: '520px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {CARDS.map((card, i) => {
            const pos = (i - activeIndex + CARDS.length) % CARDS.length
            const { width, left, bottom, transform, opacity, zIndex } = STACK[pos]
            const isFront = pos === 0

            return (
              <div
                key={card.image}
                className="absolute overflow-hidden cursor-pointer"
                style={{
                  width,
                  left,
                  bottom,
                  height: '80%',
                  borderRadius: '20px',
                  transform,
                  opacity,
                  zIndex,
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={() => setActiveIndex(i)}
                aria-label={`${card.label} ${card.sublabel}`}
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center top' }}
                  sizes="45vw"
                  priority={i === 0}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 50%)' }}
                />
                {isFront && (
                  <div className="absolute left-4 right-4 z-10" style={{ bottom: '52px' }}>
                    <p className="text-white/50 text-[9px] font-black uppercase tracking-[0.15em] mb-2">
                      Latest Episode
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-full bg-[#E07BA3] flex items-center justify-center flex-shrink-0"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                          <path d="M1 1.5L9 6L1 10.5V1.5Z" fill="black" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-black text-xs leading-tight">
                          The Future of Brand Building
                        </p>
                        <p className="text-white/50 text-[10px] mt-0.5">32:45</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white font-black text-[11px] uppercase tracking-[0.1em] leading-tight">
                    {card.label}
                  </p>
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.08em] mt-0.5">
                    {card.sublabel}
                  </p>
                </div>
              </div>
            )
          })}

          {/* Spinning badge */}
          <div className="absolute top-0 right-0 z-40 w-[88px] h-[88px] translate-x-2 -translate-y-2">
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

          {/* Decorative slash marks */}
          <svg
            className="absolute bottom-16 right-2 opacity-50 z-10"
            width="34" height="60" viewBox="0 0 34 60" fill="none" aria-hidden="true"
          >
            <line x1="0" y1="60" x2="26" y2="0" stroke="#E07BA3" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="8" y1="60" x2="34" y2="0" stroke="#E07BA3" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Dot navigation */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to card ${i + 1}`}
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

      </div>
    </section>
  )
}
