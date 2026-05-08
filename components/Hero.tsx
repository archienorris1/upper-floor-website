'use client'

import { useState, useEffect } from 'react'
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

// pos 0 = front, pos 1 = mid, pos 2 = back
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

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => setActiveIndex(i => (i + 1) % CARDS.length), 2500)
    return () => clearInterval(id)
  }, [isPaused])

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
            className="text-[#BFBFBF] font-normal max-w-[420px]"
            style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '0' }}
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

        {/* RIGHT COLUMN — stacked card deck, desktop only */}
        <div
          className="relative hidden lg:block"
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
                aria-label={`${card.label} — ${card.sublabel}`}
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

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 50%)' }}
                />

                {/* Front card episode player */}
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

                {/* Bottom label */}
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

          {/* Spinning circular badge — top-right, above cards */}
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

          {/* Decorative pink slash marks — lower right */}
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
