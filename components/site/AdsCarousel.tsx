'use client'

import { useCallback, useEffect, useRef } from 'react'
import VideoCard from './VideoCard'

type Clip = { src: string; poster?: string }

/**
 * Endless looping clip carousel. The clip list is rendered three times and
 * the scroll position is kept inside the middle copy — crossing either
 * boundary teleports by exactly one copy-width, which is invisible because
 * the content is identical. Swipe on touch, drag or arrows with a mouse.
 */
export default function AdsCarousel({ clips }: { clips: Clip[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const setWidth = useRef(0)
  const animRaf = useRef(0)
  const animating = useRef(false)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const measure = () => {
      setWidth.current = el.scrollWidth / 3
    }
    measure()
    el.scrollLeft = setWidth.current

    const onScroll = () => {
      // arrow animations handle their own wrapping
      if (animating.current) return
      const w = setWidth.current
      if (!w) return
      if (el.scrollLeft < w * 0.5) el.scrollLeft += w
      else if (el.scrollLeft > w * 1.5) el.scrollLeft -= w
    }

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
      cancelAnimationFrame(animRaf.current)
    }
  }, [])

  // Mouse drag-to-scroll (touch already scrolls natively)
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let down = false
    let startX = 0
    let startLeft = 0

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cancelAnimationFrame(animRaf.current)
      animating.current = false
      down = true
      startX = e.clientX
      startLeft = el.scrollLeft
      el.setPointerCapture(e.pointerId)
      el.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      el.scrollLeft = startLeft - (e.clientX - startX)
    }
    const onUp = () => {
      down = false
      el.style.cursor = ''
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [])

  // Arrow advance: a self-driven scroll animation that wraps mid-flight,
  // so it can run forever in either direction without hitting an edge.
  const nudge = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const w = el.scrollWidth / 3
    if (!w) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20
    const step = (card ? card.getBoundingClientRect().width : 260) + gap

    cancelAnimationFrame(animRaf.current)
    animating.current = true

    const from = el.scrollLeft
    const to = from + dir * step
    const start = performance.now()
    const DURATION = 420

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      let pos = from + (to - from) * eased
      // keep the position inside the middle copy at every frame
      if (pos < w * 0.5) pos += w
      else if (pos > w * 1.5) pos -= w
      el.scrollLeft = pos
      if (t < 1) {
        animRaf.current = requestAnimationFrame(tick)
      } else {
        animating.current = false
      }
    }
    animRaf.current = requestAnimationFrame(tick)
  }, [])

  const arrowClass =
    'absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg text-brand-ink shadow-lg ring-1 ring-brand-ink/10 transition-all duration-300 hover:scale-110 hover:bg-brand-ink hover:text-white md:flex'

  return (
    <div className="relative mt-10 md:mt-16">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent md:w-20" />

      <button type="button" aria-label="Previous videos" onClick={() => nudge(-1)} className={`${arrowClass} left-3`}>
        ←
      </button>
      <button type="button" aria-label="Next videos" onClick={() => nudge(1)} className={`${arrowClass} right-3`}>
        →
      </button>

      <div
        ref={scrollerRef}
        className="flex cursor-grab select-none snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:snap-none md:gap-5"
      >
        {[0, 1, 2].map((copy) =>
          clips.map((clip, i) => (
            <div
              key={`${copy}-${clip.src}`}
              data-card
              aria-hidden={copy !== 1 || undefined}
              className="w-[58vw] shrink-0 snap-center sm:w-[40vw] md:w-[250px] md:snap-align-none"
            >
              <VideoCard src={clip.src} poster={clip.poster} reveal={false} delay={(i % 5) + 1} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
