'use client'

/* eslint-disable @next/next/no-img-element */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

/* ─────────────────────────────────────────────
   Tap-for-sound video cards, shared by /portfolio
   and /workwithus. Videos autoplay muted when in
   view; tapping one unmutes it and mutes the rest.

   Loading is deliberately lazy. A card renders only
   its poster (a lazy <img>, not the poster attribute,
   which browsers fetch eagerly for every <video> on
   the page) until it is within about a viewport of
   the screen, then it starts buffering. With 30+
   clips on a page, letting every <video> fetch on
   mount is what made the pages feel sluggish.
   ───────────────────────────────────────────── */

const SoundContext = createContext<{
  unmutedId: string | null
  setUnmutedId: (id: string | null) => void
}>({ unmutedId: null, setUnmutedId: () => {} })

/** Wrap any group of SoundVideoCards so only one plays with sound at a time. */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [unmutedId, setUnmutedId] = useState<string | null>(null)
  return (
    <SoundContext.Provider value={{ unmutedId, setUnmutedId }}>{children}</SoundContext.Provider>
  )
}

/** One screen ahead: fetch just the container metadata so play() can start within a round trip. */
const META_ROOT_MARGIN = '100% 0px'
/** A quarter screen ahead: buffer properly, the clip is about to play. */
const AUTO_ROOT_MARGIN = '25% 0px'
/** Play once this much of the clip is on screen. */
const PLAY_THRESHOLD = 0.35

export const portfolioSrc = (id: string) => `/media/portfolio/${id}.mp4`
export const portfolioPoster = (id: string) => `/media/portfolio/${id}-poster.jpg`

type Props = {
  /** File stem under /media/portfolio (e.g. "aurora-1" → aurora-1.mp4 + aurora-1-poster.jpg). */
  id: string
  /** Above-the-fold cards: fetch the poster at high priority and buffer on mount. */
  eager?: boolean
  /** Optional format tag shown top-left (e.g. "UGC"). */
  label?: string
  className?: string
}

export function SoundVideoCard({ id, eager = false, label, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { unmutedId, setUnmutedId } = useContext(SoundContext)
  const unmuted = unmutedId === id
  const unmutedRef = useRef(unmuted)
  unmutedRef.current = unmuted
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // 1. Staged warm-up. Nothing is fetched on mount; a screen ahead we pull the
    //    metadata, a quarter screen ahead we buffer for real. Keeps a 35-clip
    //    page from downloading everything at once (and away from Cal.com).
    const raise = (level: 'metadata' | 'auto') => {
      if (video.preload === 'auto') return
      if (level === 'auto' || video.preload === 'none') video.preload = level
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
      io.observe(video)
      return io
    }
    const metaIo = stage('metadata', META_ROOT_MARGIN)
    const autoIo = stage('auto', AUTO_ROOT_MARGIN)

    // 2. Play / pause on visibility, like a social feed.
    const playIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Unmuted autoplay is blocked without a fresh gesture —
              // fall back to muted playback
              if (!video.muted) {
                setUnmutedId(null)
                video.muted = true
                video.play().catch(() => {})
              }
            })
          } else {
            video.pause()
            // Auto-mute when scrolled out of view
            if (unmutedRef.current) setUnmutedId(null)
          }
        })
      },
      { threshold: PLAY_THRESHOLD }
    )
    playIo.observe(video)

    return () => {
      metaIo.disconnect()
      autoIo.disconnect()
      playIo.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleSound = useCallback(() => {
    setUnmutedId(unmuted ? null : id)
  }, [unmuted, id, setUnmutedId])

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={unmuted ? 'Mute video' : 'Play video with sound'}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${className}`}
    >
      <video
        ref={videoRef}
        src={portfolioSrc(id)}
        muted={!unmuted}
        loop
        playsInline
        preload={eager ? 'auto' : 'none'}
        onPlaying={() => setPlaying(true)}
        className="block aspect-[9/16] w-full object-cover"
      />

      {/* Poster overlay: lazy, and it stays up if autoplay is blocked (low-power mode). */}
      <img
        src={portfolioPoster(id)}
        alt=""
        aria-hidden="true"
        width={480}
        height={854}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : undefined}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          playing ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {label && (
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
          {label}
        </span>
      )}

      {/* sound state indicator */}
      <span
        className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-200 ${
          unmuted ? 'bg-white text-black' : 'bg-black/50 text-white'
        }`}
        aria-hidden="true"
      >
        {unmuted ? (
          /* speaker on */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        ) : (
          /* speaker muted */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
            <line x1="15" y1="9" x2="21" y2="15" />
            <line x1="21" y1="9" x2="15" y2="15" />
          </svg>
        )}
      </span>
    </button>
  )
}
