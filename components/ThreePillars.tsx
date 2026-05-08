'use client'

import { useEffect, useRef } from 'react'

const PILLARS = [
  {
    number: '01',
    title: 'SOCIAL FIRST',
    body: "We don't just edit episodes. We create scroll-stopping clips engineered for TikTok, Instagram, LinkedIn and YouTube — because that's where your audience actually lives.",
  },
  {
    number: '02',
    title: 'BRAND GROWTH',
    body: "Every episode we produce builds authority, deepens trust with your ideal clients, and compounds over time. This isn't vanity content. It's your best long-term growth channel.",
  },
  {
    number: '03',
    title: 'DISTRIBUTION THAT WORKS',
    body: 'Consistent production and strategic distribution designed to keep your brand visible, trusted and leading the conversation in your space.',
  },
]

export default function ThreePillars() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0px)'
            }, i * 150)
            obs.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <section
      className="px-6 lg:px-12 border-t border-white/[0.06]"
      style={{ backgroundColor: '#000000', paddingTop: '80px', paddingBottom: '80px' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em] mb-4">
          Why It Works
        </p>
        <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight mb-12">
          Three Things That Set Us Apart.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PILLARS.map(({ number, title, body }, i) => (
            <div
              key={number}
              ref={el => { refs.current[i] = el }}
              className="border border-[#1e1e1e] hover:border-[#E07BA3]"
              style={{
                background: '#111111',
                borderRadius: '16px',
                padding: '40px 32px',
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.25s ease',
              }}
            >
              <p style={{ fontSize: '48px', fontWeight: 900, color: '#E07BA3', opacity: 0.4, lineHeight: 1 }}>
                {number}
              </p>
              <h3 className="text-white font-black uppercase text-xl mt-4">{title}</h3>
              <div style={{ width: '32px', height: '2px', backgroundColor: '#E07BA3', margin: '12px 0' }} />
              <p className="text-[#BFBFBF]" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
