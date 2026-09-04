'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react'

/**
 * Muted autoplay clip (home-page case studies and carousel, /workwithus case
 * cards). Same lazy strategy as SoundVideoCard: nothing but a lazy poster is
 * fetched until the card is about a viewport away, then it buffers and plays
 * once ~35% visible.
 */
export default function VideoCard({
  src,
  poster,
  caption,
  delay = 0,
  reveal = true,
  eager = false,
  className = '',
}: {
  src: string
  poster?: string
  caption?: string
  delay?: number
  reveal?: boolean
  /** Above-the-fold cards: buffer on mount and fetch the poster immediately. */
  eager?: boolean
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Staged warm-up: metadata a screen ahead, full buffering a quarter screen ahead.
    const raise = (level: 'metadata' | 'auto') => {
      if (el.preload === 'auto') return
      if (level === 'auto' || el.preload === 'none') el.preload = level
    }
    if (eager) raise('auto')
    const stage = (level: 'metadata' | 'auto', rootMargin: string) => {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            raise(level)
            io.disconnect()
          }
        },
        { rootMargin }
      )
      io.observe(el)
      return io
    }
    const metaIo = stage('metadata', '100% 0px')
    const autoIo = stage('auto', '25% 0px')

    const playIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.35 }
    )
    playIo.observe(el)

    return () => {
      metaIo.disconnect()
      autoIo.disconnect()
      playIo.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`${reveal ? `reveal-on-scroll reveal-delay-${delay}` : ''} group relative aspect-[9/16] overflow-hidden rounded-2xl bg-brand-ink shadow-md transition-shadow duration-500 hover:shadow-2xl ${className}`}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        muted
        loop
        playsInline
        preload={eager ? 'auto' : 'none'}
        onPlaying={() => setPlaying(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      {caption && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white">
          {caption}
        </div>
      )}
    </div>
  )
}
