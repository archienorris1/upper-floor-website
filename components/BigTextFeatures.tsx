'use client'

import { useEffect, useRef } from 'react'

const SECTIONS = [
  {
    number: '01',
    headline: 'WE ARE SOCIAL FIRST.',
    description:
      "We don't just edit episodes. We create scroll-stopping clips engineered for TikTok, Instagram, LinkedIn and YouTube. That's where your audience actually lives.",
    bg: '#FFFFFF',
    numberColor: '#000000',
    headlineColor: '#000000',
    pillBg: '#111111',
    pillText: '#FFFFFF',
  },
  {
    number: '02',
    headline: 'WE BUILD BRANDS.',
    description:
      "Every episode we produce builds authority. It deepens trust with your ideal clients. It compounds over time. This isn't vanity content. It's your best long-term growth channel.",
    bg: '#E07BA3',
    numberColor: '#000000',
    headlineColor: '#000000',
    pillBg: '#FFFFFF',
    pillText: '#000000',
  },
  {
    number: '03',
    headline: 'WE LEAD DISTRIBUTION.',
    description:
      'Consistent production and strategic distribution. Designed to keep your brand visible, trusted and leading the conversation in your space.',
    bg: '#000000',
    numberColor: '#E07BA3',
    headlineColor: '#FFFFFF',
    pillBg: '#E07BA3',
    pillText: '#000000',
  },
]

export default function BigTextFeatures() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const pillRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    sectionRefs.current.forEach((el, i) => {
      if (!el) return
      const pill = pillRefs.current[i]
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (prefersReduced) {
              el.style.opacity = '1'
              el.style.transform = 'none'
              if (pill) {
                pill.style.opacity = '1'
                pill.style.transform = 'none'
              }
            } else {
              el.style.transition = 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)'
              el.style.opacity = '1'
              el.style.transform = 'translateY(0) rotate(0deg)'
              if (pill) {
                setTimeout(() => {
                  pill.style.transition = 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
                  pill.style.opacity = '1'
                  pill.style.transform = 'translateY(0)'
                }, 300)
              }
            }
            obs.disconnect()
          }
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
    })
  }, [])

  return (
    <>
      {SECTIONS.map((section, i) => (
        <section
          key={section.number}
          style={{
            backgroundColor: section.bg,
            paddingTop: '160px',
            paddingBottom: '160px',
          }}
          className="big-text-section px-6 lg:px-12"
        >
          <div className="max-w-[1200px] mx-auto text-center">
            <p
              style={{
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: section.numberColor,
                marginBottom: '24px',
              }}
            >
              {section.number}
            </p>

            <h2
              ref={(el) => { sectionRefs.current[i] = el }}
              style={{
                fontSize: 'clamp(60px, 10vw, 160px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: section.headlineColor,
                textTransform: 'uppercase' as const,
                opacity: 0,
                transform: 'translateY(60px) rotate(-2deg)',
              }}
            >
              {section.headline}
            </h2>

            <div
              ref={(el) => { pillRefs.current[i] = el }}
              style={{
                display: 'inline-block',
                backgroundColor: section.pillBg,
                borderRadius: '100px',
                padding: '20px 32px',
                maxWidth: '600px',
                marginTop: '40px',
                opacity: 0,
                transform: 'translateY(30px)',
              }}
            >
              <p
                style={{
                  color: section.pillText,
                  fontSize: '15px',
                  lineHeight: '1.7',
                  margin: 0,
                }}
              >
                {section.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
