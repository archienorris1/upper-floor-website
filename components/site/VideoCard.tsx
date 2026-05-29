'use client'

import { useEffect, useRef } from 'react'

export default function VideoCard({
  src,
  caption,
  delay = 0,
}: {
  src: string
  caption?: string
  delay?: number
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
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`reveal-on-scroll reveal-delay-${delay} relative aspect-[9/16] overflow-hidden rounded-2xl bg-brand-ink`}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      {caption && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm font-medium text-white">
          {caption}
        </div>
      )}
    </div>
  )
}
