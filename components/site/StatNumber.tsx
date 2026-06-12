'use client'

import { useEffect, useRef } from 'react'

/**
 * Animated stat counter. Server-renders the final value (SEO / no-JS safe),
 * then counts up from 0 the first time it scrolls into view.
 */
export default function StatNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1800,
  className = '',
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const fmt = (n: number) =>
      prefix +
      n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) +
      suffix

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
          el.textContent = fmt(value * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        el.textContent = fmt(0)
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, prefix, suffix, decimals, duration])

  return (
    <span ref={ref} className={className}>
      {prefix +
        value.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix}
    </span>
  )
}
