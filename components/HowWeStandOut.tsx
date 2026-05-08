'use client'

import { useEffect, useRef } from 'react'

const WAVE_HEIGHTS = [35, 60, 80, 50, 90, 65, 45, 75]

const PLATFORM_ICONS = [
  { label: 'S', bg: '#1DB954', title: 'Spotify' },
  { label: 'A', bg: '#ffffff', color: '#000', title: 'Apple' },
  { label: 'Y', bg: '#FF0000', title: 'YouTube' },
  { label: 'In', bg: '#0A66C2', title: 'LinkedIn' },
]

const PIPELINE_STEPS = [
  { icon: '🎙', label: 'RECORD' },
  { icon: '▶', label: 'EDIT' },
  { icon: '✂', label: 'CLIPS' },
  { icon: '📅', label: 'DISTRIBUTE' },
  { icon: '📊', label: 'GROW' },
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

  useEffect(() => {
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
  }, [])

  const r = (i: number) => (el: HTMLElement | null) => { refs.current[i] = el }

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
          .hwso-bar     { grid-column: 1 / span 4; }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.1em] mb-4">
          How We Stand Out
        </p>
        <div className="mb-12">
          <h2
            className="text-white font-black uppercase leading-none tracking-tight"
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

        {/* Bento grid */}
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
            <CardBody>Podcast production built around growth, positioning and consistency — not just recording episodes.</CardBody>
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
            <div className="flex items-center gap-1.5 mt-4 flex-wrap">
              {PLATFORM_ICONS.map(({ label, bg, color, title }) => (
                <div
                  key={title}
                  title={title}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '28px',
                    height: '28px',
                    backgroundColor: bg,
                    borderRadius: '50%',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: color ?? '#fff',
                  }}
                >
                  {label}
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

          {/* ── FULL WIDTH BOTTOM BAR ── */}
          <div
            ref={r(14) as React.Ref<HTMLDivElement>}
            className="hwso-bar hover:border-[#E07BA3]"
            style={{
              ...cardBase,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              padding: '28px 32px',
            }}
          >
            {/* Left: label + body */}
            <div style={{ maxWidth: '340px' }}>
              <p className="text-white font-bold uppercase text-[16px]" style={{ letterSpacing: '0.05em' }}>
                Full Content Engine
              </p>
              <div style={{ width: '32px', height: '2px', background: '#E07BA3', margin: '8px 0' }} />
              <p className="text-[#BFBFBF] text-[13px]">
                One recording transformed into a complete pipeline of long and short form content.
              </p>
            </div>

            {/* Right: pipeline steps */}
            <div className="flex items-center gap-2 flex-wrap">
              {PIPELINE_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <span style={{ fontSize: '20px', color: '#E07BA3', lineHeight: 1 }}>{step.icon}</span>
                    <span
                      className="text-[#BFBFBF]"
                      style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <span style={{ color: '#444', fontSize: '14px', alignSelf: 'center', marginBottom: '14px' }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
