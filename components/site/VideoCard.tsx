'use client'

import { useEffect, useRef } from 'react'

export default function VideoCard({
  src,
  poster,
  caption,
  delay = 0,
  reveal = true,
  className = '',
}: {
  src: string
  poster?: string
  caption?: string
  delay?: number
  reveal?: boolean
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
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
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      {caption && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white">
          {caption}
        </div>
      )}
    </div>
  )
}
