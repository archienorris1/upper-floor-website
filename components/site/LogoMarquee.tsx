'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from 'react'

const LOGOS = [
  { src: '/media/logo-fastframe.png', alt: 'FastFrame' },
  { src: '/media/logo-songarchitect.png', alt: 'Song Architect' },
  { src: '/media/logo-toastybody.png', alt: 'Toastybody' },
  { src: '/media/logo-nootropict.png', alt: 'Nootropict' },
  { src: '/media/aurora-logo-white.png', alt: 'Aurora' },
]

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12 md:gap-20 md:pr-20"
    >
      {LOGOS.map((logo) => (
        // every logo lives in an identical box so they all read the same size
        <div key={logo.src} className="flex h-9 w-36 items-center justify-center md:h-11 md:w-44">
          <img
            src={logo.src}
            alt={ariaHidden ? '' : logo.alt}
            className="max-h-full max-w-full object-contain opacity-90"
            decoding="async"
          />
        </div>
      ))}
    </div>
  )
}

/**
 * Continuously drifting logo strip. Driven by requestAnimationFrame rather
 * than a CSS animation so it keeps moving even when the OS has
 * "Reduce Motion" enabled (it's slow, linear, and decorative).
 */
export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let raf = 0
    let x = 0
    let last: number | null = null
    let speed = 0
    const MAX_SPEED = 36 // px per second
    let visible = true

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) last = null // avoid a big jump when we come back
    })
    io.observe(track)

    const step = (now: number) => {
      raf = requestAnimationFrame(step)
      if (!visible) return
      if (last == null) {
        last = now
        return
      }
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      speed += (MAX_SPEED - speed) * 0.04 // ease up to cruising speed
      const half = track.scrollWidth / 2
      if (half > 0) {
        x = (x + speed * dt) % half
        track.style.transform = `translate3d(${-x}px,0,0)`
      }
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  return (
    <div className="relative mt-6 overflow-hidden md:mt-9">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-green to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-green to-transparent md:w-32" />
      <div ref={trackRef} className="flex w-max items-center">
        <LogoRow />
        <LogoRow ariaHidden />
      </div>
    </div>
  )
}
