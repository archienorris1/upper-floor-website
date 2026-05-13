'use client'

import { useEffect, useRef, useState } from 'react'

const WAVE_HEIGHTS = [35, 60, 80, 50, 90, 65, 45, 75]

const PLATFORM_SVGS = [
  {
    title: 'Spotify',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" aria-label="Spotify">
        <circle cx="12" cy="12" r="12" fill="#1DB954"/>
        <path fill="white" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.45-.85 13.2 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25zm-.1 2.8c-.25.35-.75.5-1.1.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.25 1zm-1.3 2.7c-.2.3-.6.4-.9.2-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.3.15.4.55.3.85z"/>
      </svg>
    ),
  },
  {
    title: 'Apple Podcasts',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" aria-label="Apple Podcasts">
        <circle cx="12" cy="12" r="12" fill="#9933CC"/>
        <path fill="white" d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 12.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
      </svg>
    ),
  },
  {
    title: 'YouTube',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" aria-label="YouTube">
        <circle cx="12" cy="12" r="12" fill="#FF0000"/>
        <path fill="white" d="M19.6 8.2c-.2-.8-.8-1.4-1.6-1.6C16.6 6.3 12 6.3 12 6.3s-4.6 0-6 .3c-.8.2-1.4.8-1.6 1.6-.3 1.4-.3 4.3-.3 4.3s0 2.9.3 4.3c.2.8.8 1.4 1.6 1.6 1.4.3 6 .3 6 .3s4.6 0 6-.3c.8-.2 1.4-.8 1.6-1.6.3-1.4.3-4.3.3-4.3s0-2.9-.3-4.3zm-8.9 6.9V8.9l5.2 3.1-5.2 3.1z"/>
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" aria-label="LinkedIn">
        <circle cx="12" cy="12" r="12" fill="#0A66C2"/>
        <path fill="white" d="M8.5 6.5C8.5 7.33 7.83 8 7 8S5.5 7.33 5.5 6.5 6.17 5 7 5s1.5.67 1.5 1.5zM6 9.5h2v9H6v-9zm3.5 0H12v1.2c.4-.7 1.4-1.4 2.5-1.4 2.4 0 3 1.6 3 3.7v5.5h-2v-4.9c0-1.2-.4-2-1.5-2-1.6 0-2 1.2-2 2.4v4.5H9.5v-9z"/>
      </svg>
    ),
  },
]

const cardBase: React.CSSProperties = {
  backgroundColor: '#111111',
  border: '1px solid #1e1e1e',
  borderRadius: '16px',
  padding: '24px',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease',
}

const mobileCardStyle: React.CSSProperties = {
  backgroundColor: '#111111',
  border: '1px solid #1e1e1e',
  borderRadius: '16px',
  padding: '24px',
  height: '100%',
}

function CardTitle({ children }: { children: string }) {
  return (
    <>
      <p className="text-white font-bold text-[13px] uppercase tracking-[0.06em]">{children}</p>
      <span style={{ display: 'block', width: '32px', height: '2px', background: '#E07BA3', margin: '10px 0 14px' }} />
    </>
  )
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <p className="text-[#BFBFBF] text-[13px] leading-[1.65]">{children}</p>
}

export default function HowWeStandOut() {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [activeScrollIndex, setActiveScrollIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const section = refs.current[0]?.closest('section')
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          refs.current.forEach((el, i) => {
            if (!el) return
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0px)'
            }, Math.min(i * 60, 600))
          })
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [isMobile])

  const r = (i: number) => (el: HTMLElement | null) => { refs.current[i] = el }

  const handleMobileScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.clientWidth * 0.8 + 16
    const index = Math.round(el.scrollLeft / cardWidth)
    setActiveScrollIndex(Math.min(index, mobileCards.length - 1))
  }

  const mobileCards = [
    { key: 'hero', render: () => (
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{
          ...mobileCardStyle,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(224,123,163,0.15) 0%, transparent 70%), #0d0d0d',
        }}
      >
        <p className="text-white font-bold leading-tight text-xl">We don&apos;t just make podcasts.</p>
        <p className="text-[#E07BA3] font-bold leading-tight text-xl">We build brands.</p>
        <p className="text-[#BFBFBF] mt-4 text-sm">Strategy. Production. Growth.</p>
        <p className="text-[#E07BA3] text-[13px]">All in one podcast agency.</p>
      </div>
    )},
    { key: 'sound', render: () => (
      <div className="flex flex-col" style={mobileCardStyle}>
        <CardTitle>Custom Sound Design</CardTitle>
        <CardBody>Intro music, transitions and audio treatment tailored to your brand and show identity.</CardBody>
        <div className="flex items-end gap-[3px] mt-4" style={{ height: '36px' }}>
          {WAVE_HEIGHTS.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: '#E07BA3', borderRadius: '2px', transformOrigin: 'bottom', animation: `hwsoWave ${0.7 + (i % 4) * 0.15}s ease-in-out ${i * 0.08}s infinite` }} />
          ))}
        </div>
      </div>
    )},
    { key: 'clips', render: () => (
      <div className="flex flex-col" style={mobileCardStyle}>
        <CardTitle>Platform Native Clips</CardTitle>
        <CardBody>Short form content designed for the way people actually watch on Reels, TikTok, Shorts and LinkedIn.</CardBody>
        <div className="flex items-end mt-5">
          {[{ h: 100, border: '#333' }, { h: 110, border: '#E07BA3' }, { h: 100, border: '#333' }].map((phone, i) => (
            <div key={i} style={{ width: '55px', height: `${phone.h}px`, background: '#1a1a1a', borderRadius: '10px', border: `2px solid ${phone.border}`, marginLeft: i > 0 ? '-8px' : '0', flexShrink: 0 }} />
          ))}
        </div>
      </div>
    )},
    { key: 'strategic', render: () => (
      <div className="flex flex-col" style={mobileCardStyle}>
        <CardTitle>Strategic Production</CardTitle>
        <CardBody>Podcast production built around growth, positioning and consistency. Not just recording episodes.</CardBody>
      </div>
    )},
    { key: 'fast', render: () => (
      <div className="flex flex-col" style={mobileCardStyle}>
        <CardTitle>Fast Turnarounds</CardTitle>
        <CardBody>Episodes delivered within 48–72 hours every week without fail.</CardBody>
        <div className="inline-flex items-center gap-1.5 mt-4 self-start" style={{ background: '#E07BA3', color: '#000', borderRadius: '100px', padding: '8px 16px', fontSize: '13px', fontWeight: 700 }}>
          ⏱ 48–72 HOURS
        </div>
      </div>
    )},
    { key: 'growth', render: () => (
      <div className="flex flex-col" style={mobileCardStyle}>
        <CardTitle>Growth Insights</CardTitle>
        <CardBody>Monthly reporting that shows what&apos;s performing, why it&apos;s working and how to improve it.</CardBody>
        <div className="mt-4">
          <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="hwsoGradM" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E07BA3" stopOpacity="0.3" /><stop offset="100%" stopColor="#E07BA3" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 46 L40 38 L80 28 L120 18 L160 10 L200 4" stroke="#E07BA3" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M0 46 L40 38 L80 28 L120 18 L160 10 L200 4 L200 50 L0 50 Z" fill="url(#hwsoGradM)" />
          </svg>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-white font-bold text-[13px]">24.6K</span>
            <span className="text-[#E07BA3] font-bold text-[13px]">+37%</span>
          </div>
        </div>
      </div>
    )},
    { key: 'distribution', render: () => (
      <div className="flex flex-col" style={mobileCardStyle}>
        <CardTitle>Content Distribution</CardTitle>
        <CardBody>Scheduling, posting and optimisation handled across every key platform.</CardBody>
        <div className="flex items-center gap-2 mt-4">
          {PLATFORM_SVGS.map(({ title, svg }) => (
            <div key={title} title={title} className="flex-shrink-0">{svg}</div>
          ))}
        </div>
      </div>
    )},
  ]

  return (
    <section
      className="px-6 lg:px-12 border-t border-white/[0.06]"
      style={{ backgroundColor: '#000000', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <style>{`
        @keyframes hwsoWave {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        @media (min-width: 1024px) {
          .hwso-card-5  { grid-column: 1;           grid-row: 2; }
          .hwso-hero    { grid-column: 2 / span 2;  grid-row: 2; }
          .hwso-card-6  { grid-column: 4;           grid-row: 2 / span 2; }
          .hwso-card-7  { grid-column: 1;           grid-row: 3; }
          .hwso-card-8  { grid-column: 2;           grid-row: 3; }
          .hwso-card-9  { grid-column: 3;           grid-row: 3; }
          .hwso-card-10 { grid-column: 1;           grid-row: 4; }
          .hwso-card-11 { grid-column: 2;           grid-row: 4; }
          .hwso-card-12 { grid-column: 3;           grid-row: 4; }
          .hwso-card-13 { grid-column: 4;           grid-row: 4; }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.1em] mb-4">
          How We Stand Out
        </p>
        <div className="mb-12">
          <h2
            className="text-white font-black uppercase leading-none tracking-tight reveal-headline"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            We Don&apos;t Just Make Podcasts.
          </h2>
          <h2
            className="text-[#E07BA3] font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            We Build Brands.
          </h2>
          <p className="text-[#BFBFBF] text-base mt-4">
            Strategy. Production. Growth.<br />All in one podcast agency.
          </p>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        {isMobile ? (
          <>
            <div
              ref={scrollRef}
              className="mobile-swipe-scroll"
              onScroll={handleMobileScroll}
              style={{ marginLeft: '-24px', marginRight: '-24px', paddingLeft: '24px', paddingRight: '24px' }}
            >
              {mobileCards.map((card) => (
                <div key={card.key} style={{ flex: '0 0 80vw', scrollSnapAlign: 'center' }}>
                  {card.render()}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {mobileCards.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to card ${i + 1}`}
                  onClick={() => {
                    const el = scrollRef.current
                    if (!el) return
                    const cardWidth = el.clientWidth * 0.8 + 16
                    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
                  }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeScrollIndex ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === activeScrollIndex ? '#E07BA3' : '#333',
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          /* Desktop: bento grid */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

            {/* ── ROW 1 ── */}

            {/* Card 1 — Custom Sound Design */}
            <div
              ref={r(0) as React.Ref<HTMLDivElement>}
              className="hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Custom Sound Design</CardTitle>
              <CardBody>Intro music, transitions and audio treatment tailored to your brand and show identity.</CardBody>
              <div className="flex items-end gap-[3px] mt-4" style={{ height: '36px' }}>
                {WAVE_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      backgroundColor: '#E07BA3',
                      borderRadius: '2px',
                      transformOrigin: 'bottom',
                      animation: `hwsoWave ${0.7 + (i % 4) * 0.15}s ease-in-out ${i * 0.08}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card 2 — Professional Audio */}
            <div
              ref={r(1) as React.Ref<HTMLDivElement>}
              className="hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Professional Audio</CardTitle>
              <CardBody>Crisp studio quality sound engineered for clarity, consistency and long form listening.</CardBody>
              <div
                className="flex items-center justify-center mt-4 flex-1"
                style={{ background: '#1a1a1a', borderRadius: '12px', minHeight: '80px' }}
              >
                <svg width="28" height="44" viewBox="0 0 28 44" fill="none" aria-hidden="true">
                  <rect x="8" y="0" width="12" height="28" rx="6" fill="#E07BA3" />
                  <path d="M4 20c0 5.523 4.477 10 10 10s10-4.477 10-10" stroke="#E07BA3" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <line x1="14" y1="30" x2="14" y2="38" stroke="#E07BA3" strokeWidth="2" strokeLinecap="round" />
                  <line x1="9" y1="38" x2="19" y2="38" stroke="#E07BA3" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 3 — Episode Structuring */}
            <div
              ref={r(2) as React.Ref<HTMLDivElement>}
              className="hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Episode Structuring</CardTitle>
              <CardBody>Strategic pacing and conversation flow designed to hold attention and create stronger episodes.</CardBody>
              <div className="mt-5 px-1">
                <div className="relative flex items-center justify-between">
                  <div
                    className="absolute left-0 right-0"
                    style={{ height: '1.5px', backgroundColor: '#333', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  {['HOOK', 'BUILD', 'PEAK', 'RESOLUTION'].map((label) => (
                    <div key={label} className="relative flex flex-col items-center gap-2 z-10">
                      <div
                        style={{
                          width: label === 'PEAK' ? '12px' : '8px',
                          height: label === 'PEAK' ? '12px' : '8px',
                          borderRadius: '50%',
                          backgroundColor: label === 'PEAK' ? '#E07BA3' : '#444',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: '9px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: label === 'PEAK' ? '#E07BA3' : '#555',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4 — Visual Creative Direction */}
            <div
              ref={r(3) as React.Ref<HTMLDivElement>}
              className="hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Visual Creative Direction</CardTitle>
              <CardBody>A consistent visual style across every episode and set.</CardBody>
              <div className="flex items-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: '40px',
                      height: '60px',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      flexShrink: 0,
                    }}
                  />
                ))}
                <div className="flex items-center justify-center" style={{ width: '28px', height: '28px', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <line x1="7" y1="1" x2="7" y2="13" stroke="#E07BA3" strokeWidth="2" strokeLinecap="round" />
                    <line x1="1" y1="7" x2="13" y2="7" stroke="#E07BA3" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── ROW 2 ── */}

            {/* Card 5 — Strategic Production */}
            <div
              ref={r(4) as React.Ref<HTMLDivElement>}
              className="hwso-card-5 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Strategic Production</CardTitle>
              <CardBody>Podcast production built around growth, positioning and consistency. Not just recording episodes.</CardBody>
            </div>

            {/* Hero statement card */}
            <div
              ref={r(5) as React.Ref<HTMLDivElement>}
              className="hwso-hero hover:border-[#E07BA3] flex flex-col items-center justify-center text-center"
              style={{
                ...cardBase,
                background: 'radial-gradient(ellipse at 50% 100%, rgba(224,123,163,0.15) 0%, transparent 70%), #0d0d0d',
                minHeight: '180px',
              }}
            >
              <p className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)' }}>
                We don&apos;t just make podcasts.
              </p>
              <p className="text-[#E07BA3] font-bold leading-tight" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)' }}>
                We build brands.
              </p>
              <p className="text-[#BFBFBF] mt-4 text-sm">Strategy. Production. Growth.</p>
              <p className="text-[#E07BA3]" style={{ fontSize: '13px' }}>All in one podcast agency.</p>
            </div>

            {/* Card 6 — Platform Native Clips (tall, row-span 2) */}
            <div
              ref={r(6) as React.Ref<HTMLDivElement>}
              className="hwso-card-6 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Platform Native Clips</CardTitle>
              <CardBody>Short form content designed for the way people actually watch on Reels, TikTok, Shorts and LinkedIn.</CardBody>
              <div className="flex items-end mt-5">
                {[
                  { h: 100, border: '#333' },
                  { h: 110, border: '#E07BA3' },
                  { h: 100, border: '#333' },
                ].map((phone, i) => (
                  <div
                    key={i}
                    style={{
                      width: '55px',
                      height: `${phone.h}px`,
                      background: '#1a1a1a',
                      borderRadius: '10px',
                      border: `2px solid ${phone.border}`,
                      marginLeft: i > 0 ? '-8px' : '0',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card 7 — Fast Turnarounds */}
            <div
              ref={r(7) as React.Ref<HTMLDivElement>}
              className="hwso-card-7 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Fast Turnarounds</CardTitle>
              <CardBody>Episodes delivered within 48–72 hours every week without fail.</CardBody>
              <div
                className="inline-flex items-center gap-1.5 mt-4 self-start"
                style={{
                  background: '#E07BA3',
                  color: '#000',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                ⏱ 48–72 HOURS
              </div>
            </div>

            {/* ── ROW 3 (cols 1–3, col 4 = Card 6 continues) ── */}

            {/* Card 8 — Attention Led Editing */}
            <div
              ref={r(8) as React.Ref<HTMLDivElement>}
              className="hwso-card-8 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Attention Led Editing</CardTitle>
              <CardBody>We identify the moments most likely to hold attention, drive engagement and get shared.</CardBody>
              <div
                className="flex items-end gap-[3px] mt-4 px-2"
                style={{ height: '50px', background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', padding: '8px' }}
              >
                {[60, 80, 55].map((h, i) => (
                  <div
                    key={i}
                    style={{ flex: 1, height: `${h}%`, backgroundColor: '#E07BA3', borderRadius: '2px' }}
                  />
                ))}
              </div>
            </div>

            {/* Card 9 — Content Distribution */}
            <div
              ref={r(9) as React.Ref<HTMLDivElement>}
              className="hwso-card-9 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Content Distribution</CardTitle>
              <CardBody>Scheduling, posting and optimisation handled across every key platform.</CardBody>
              <div className="flex items-center gap-2 mt-4">
                {PLATFORM_SVGS.map(({ title, svg }) => (
                  <div key={title} title={title} className="flex-shrink-0">
                    {svg}
                  </div>
                ))}
              </div>
            </div>

            {/* ── ROW 4 ── */}

            {/* Card 10 — Consistent Brand Presence */}
            <div
              ref={r(10) as React.Ref<HTMLDivElement>}
              className="hwso-card-10 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Consistent Brand Presence</CardTitle>
              <CardBody>A repeatable content system that keeps your brand visible week after week.</CardBody>
              <div className="flex items-center mt-4">
                {[3, -3, 3, -3].map((deg, i) => (
                  <div
                    key={i}
                    style={{
                      width: '30px',
                      height: '50px',
                      background: '#1a1a1a',
                      borderRadius: '4px',
                      transform: `rotate(${deg}deg)`,
                      marginLeft: i > 0 ? '-6px' : '0',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card 11 — Growth Insights */}
            <div
              ref={r(11) as React.Ref<HTMLDivElement>}
              className="hwso-card-11 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Growth Insights</CardTitle>
              <CardBody>Monthly reporting that shows what&apos;s performing, why it&apos;s working and how to improve it.</CardBody>
              <div className="mt-4">
                <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="hwsoGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E07BA3" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#E07BA3" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 46 L40 38 L80 28 L120 18 L160 10 L200 4" stroke="#E07BA3" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M0 46 L40 38 L80 28 L120 18 L160 10 L200 4 L200 50 L0 50 Z" fill="url(#hwsoGrad)" />
                </svg>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-white font-bold text-[13px]">24.6K</span>
                  <span className="text-[#E07BA3] font-bold text-[13px]">+37%</span>
                </div>
              </div>
            </div>

            {/* Card 12 — Authority Building */}
            <div
              ref={r(12) as React.Ref<HTMLDivElement>}
              className="hwso-card-12 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Authority Building</CardTitle>
              <CardBody>Podcast content designed to position your brand as the trusted voice in your industry.</CardBody>
              <div
                className="mt-4"
                style={{ background: '#1a1a1a', borderRadius: '8px', padding: '10px 12px', height: '60px' }}
              >
                <div style={{ width: '70%', height: '7px', background: '#333', borderRadius: '3px', marginBottom: '6px' }} />
                <div style={{ width: '55%', height: '5px', background: '#2a2a2a', borderRadius: '3px', marginBottom: '4px' }} />
                <div style={{ width: '40%', height: '5px', background: '#2a2a2a', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Card 13 — Creative Direction */}
            <div
              ref={r(13) as React.Ref<HTMLDivElement>}
              className="hwso-card-13 hover:border-[#E07BA3] flex flex-col"
              style={cardBase}
            >
              <CardTitle>Creative Direction</CardTitle>
              <CardBody>Titles, hooks, thumbnails and rollout strategy shaped to maximise reach and retention.</CardBody>
              <div className="flex items-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: '50px',
                      height: '36px',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '4px',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  )
}
