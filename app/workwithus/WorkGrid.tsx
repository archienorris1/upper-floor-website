'use client'

import { SoundProvider, SoundVideoCard } from '@/components/site/SoundVideo'

/** File stems under /media/portfolio — a spread across clients, best-first. */
const CLIPS = ['aurora-1', 'fastframe-1', 'toastybody-1', 'aurora-4', 'fastframe-3', 'fidgie-1']

/**
 * Reel wall. Swipe row on mobile, six-up on desktop. Each clip autoplays muted
 * and unmutes on tap, same behaviour as /portfolio.
 */
export default function WorkGrid() {
  return (
    <SoundProvider>
      <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-auto md:grid md:max-w-6xl md:snap-none md:grid-cols-3 md:gap-4 md:overflow-visible md:px-8 lg:grid-cols-6">
        {CLIPS.map((id, i) => (
          <div
            key={id}
            className={`reveal-on-scroll reveal-delay-${(i % 6) + 1} w-[62vw] max-w-[300px] flex-none snap-center md:w-full md:max-w-none`}
          >
            <SoundVideoCard id={id} />
          </div>
        ))}
        <div className="w-2 flex-none md:hidden" aria-hidden="true" />
      </div>
    </SoundProvider>
  )
}
