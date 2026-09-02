'use client'

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

/**
 * One portfolio clip. `id` is the file stem under /media/portfolio/
 * (e.g. "aurora-1" → aurora-1.mp4 + aurora-1-poster.jpg).
 */
export function SoundVideoCard({ id }: { id: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { unmutedId, setUnmutedId } = useContext(SoundContext)
  const unmuted = unmutedId === id
  const unmutedRef = useRef(unmuted)
  unmutedRef.current = unmuted

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const io = new IntersectionObserver(
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
            // Auto-mute when scrolled out of view, like a social feed
            if (unmutedRef.current) setUnmutedId(null)
          }
        })
      },
      { threshold: 0.35 }
    )

    io.observe(video)
    return () => io.disconnect()
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
      className="group relative block w-full overflow-hidden rounded-2xl bg-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <video
        ref={videoRef}
        src={`/media/portfolio/${id}.mp4`}
        poster={`/media/portfolio/${id}-poster.jpg`}
        muted={!unmuted}
        loop
        playsInline
        preload="metadata"
        className="aspect-[9/16] w-full object-cover"
      />

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
