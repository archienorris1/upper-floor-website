'use client'

import { useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

const CARDS = [
  {
    ep: 'EP 01',
    show: 'BUILT DIFFERENT',
    teaser: 'How a SaaS founder turned a weekly podcast into their #1 inbound channel.',
    slug: 'built-different',
    color: '#1a0f14',
  },
  {
    ep: 'EP 02',
    show: 'VISIONARIES',
    teaser: 'A fintech brand went from 0 to 50K monthly downloads in under 6 months.',
    slug: 'visionaries',
    color: '#0f1a14',
  },
  {
    ep: 'EP 03',
    show: 'UNFILTERED',
    teaser: 'How raw leadership conversations built a community of 10,000 loyal listeners.',
    slug: 'unfiltered',
    color: '#0f0f1a',
  },
  {
    ep: 'EP 04',
    show: 'THE GROWTH LAB',
    teaser: 'A B2B consultancy that became the go-to voice in their space through podcasting.',
    slug: 'the-growth-lab',
    color: '#1a140f',
  },
  {
    ep: 'EP 05',
    show: 'PIPELINE',
    teaser: 'Sales and revenue content that generated 120+ qualified inbound leads.',
    slug: 'pipeline',
    color: '#1a1a0f',
  },
  {
    ep: 'EP 06',
    show: 'DEEP WORK',
    teaser: 'Focus and performance content that built an audience of senior decision makers.',
    slug: 'deep-work',
    color: '#0f1a1a',
  },
]

const ALL_CARDS = [...CARDS, ...CARDS]

export default function OurWork() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const rafRef = useRef<number>(0)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const tick = useCallback(() => {
    const track = trackRef.current
    if (track && !pausedRef.current) {
      track.scrollLeft += 0.4
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft -= track.scrollWidth / 2
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  const pause = () => {
    pausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  const resume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false
    }, 2000)
  }

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section
      className="border-t border-white/[0.06]"
      id="our-work"
      style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#000000' }}
    >
      {/* Header */}
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto flex items-end justify-between mb-10">
        <div>
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em] mb-4">
            Our Work
          </p>
          <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight">
            Shows We&apos;ve Built.
          </h2>
        </div>

        {/* Arrow nav */}
        <div className="flex gap-3">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="w-12 h-12 rounded-full border border-white/[0.12] bg-[#111111] flex items-center justify-center hover:bg-[#E07BA3] hover:border-[#E07BA3] transition-colors duration-200 flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="w-12 h-12 rounded-full border border-white/[0.12] bg-[#111111] flex items-center justify-center hover:bg-[#E07BA3] hover:border-[#E07BA3] transition-colors duration-200 flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-scroll hide-scrollbar pl-6 lg:pl-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab' }}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {ALL_CARDS.map((card, i) => (
          <div
            key={`${card.slug}-${i}`}
            className="group flex-shrink-0 border border-[#1e1e1e] hover:border-[#E07BA3] overflow-hidden"
            style={{
              width: '280px',
              borderRadius: '16px',
              backgroundColor: '#111111',
              transition: 'border-color 0.25s ease',
            }}
          >
            {/* Video placeholder */}
            <div
              className="w-full flex flex-col items-center justify-center relative"
              style={{
                height: '420px',
                background: `linear-gradient(135deg, ${card.color} 0%, #0d0d0d 100%)`,
              }}
            >
              <p className="text-white/10 font-black uppercase text-center leading-none"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', letterSpacing: '-0.02em' }}>
                {card.show}
              </p>
              <div
                className="absolute w-14 h-14 rounded-full bg-[#E07BA3]/20 border border-[#E07BA3]/40 flex items-center justify-center"
              >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
                  <path d="M2 1.5L14 9L2 16.5V1.5Z" fill="#E07BA3" />
                </svg>
              </div>
              <p className="absolute top-4 left-4 text-white/30 text-[10px] font-black uppercase tracking-[0.15em]">
                {card.ep}
              </p>
            </div>

            {/* Info section — expands on hover */}
            <div
              className="h-20 group-hover:h-[140px] overflow-hidden"
              style={{ transition: 'height 0.3s ease' }}
            >
              <div className="p-5 flex flex-col gap-2">
                <p className="text-white font-black text-sm uppercase tracking-tight leading-tight">
                  {card.show}
                </p>
                <p className="text-[#BFBFBF] text-xs leading-relaxed">
                  {card.teaser}
                </p>
                <Link
                  href={`/case-studies/${card.slug}`}
                  className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100"
                  style={{ transition: 'opacity 0.3s ease 0.1s' }}
                >
                  Read the Story →
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Trailing space */}
        <div className="flex-shrink-0 w-6 lg:w-12" />
      </div>
    </section>
  )
}
