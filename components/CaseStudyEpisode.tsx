import Image from 'next/image'

// Waveform: 60 bars, symmetric (up + down from center), ~50% played
const BARS = Array.from({ length: 60 }, (_, i) => {
  const heights = [
    30, 55, 70, 45, 80, 60, 90, 40, 65, 50,
    75, 85, 55, 70, 45, 90, 35, 65, 80, 50,
    60, 75, 40, 85, 55, 70, 45, 80, 60, 35,
    35, 60, 80, 45, 70, 55, 85, 40, 75, 60,
    50, 80, 65, 35, 90, 45, 70, 55, 85, 75,
    50, 45, 90, 60, 70, 80, 40, 65, 55, 30,
  ]
  return heights[i] ?? 50
})

export default function CaseStudyEpisode() {
  const played = 30 // ~50% of 60 bars

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT CARD */}
        <div className="bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200 reveal-on-scroll">
          {/* Header image */}
          <div className="relative w-full flex-shrink-0" style={{ height: '200px' }}>
            <Image
              src="/images/podcast-man-glasses.jpg"
              alt="Podcast case study"
              fill
              className="object-cover"
              style={{ objectPosition: 'center top' }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, #141414 100%)' }} />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col gap-8 flex-1">
            <div>
              <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em] mb-6">
                Case Study
              </p>
              <h2
                className="text-white font-black leading-tight tracking-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                From 0 to 50k downloads/month.
              </h2>
            </div>

            {/* Stats row */}
            <div id="stats" className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-white text-2xl font-black">+320%</p>
                <p className="text-[#BFBFBF] text-xs mt-1">Audience growth</p>
              </div>
              <div>
                <p className="text-white text-2xl font-black">120+</p>
                <p className="text-[#BFBFBF] text-xs mt-1">Inbound leads</p>
              </div>
              <div>
                <p className="text-white text-2xl font-black">3</p>
                <p className="text-[#BFBFBF] text-xs mt-1">Enterprise deals closed</p>
              </div>
            </div>

            <p className="text-[#BFBFBF] text-sm leading-relaxed">
              We repositioned the show, rebuilt distribution across key platforms, and created content that now drives consistent pipeline for the business.
            </p>

            <a href="#stats" className="text-white text-sm font-medium hover:text-[#E07BA3] transition-colors duration-200 flex items-center gap-2">
              View full case study
              <span className="text-[#E07BA3]">↗</span>
            </a>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-8 flex flex-col gap-6 hover:-translate-y-1 transition-transform duration-200 reveal-on-scroll">
          <p className="text-[#BFBFBF] text-xs font-medium uppercase tracking-[0.2em]">
            Latest Episode
          </p>

          <h3 className="text-white font-black text-xl leading-snug">
            The future of embedded finance and B2B platforms
          </h3>

          {/* Show artwork */}
          <div className="relative w-full aspect-square max-w-[180px] rounded-xl overflow-hidden border border-white/[0.08]">
            <Image
              src="/images/episode-artwork.jpg"
              alt="API Perspectives podcast artwork"
              fill
              className="object-cover"
              sizes="180px"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-3 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-black text-sm text-center leading-tight">
                API PERSPECTIVES
              </p>
              <p className="text-[#BFBFBF] text-xs mt-0.5">by Needle</p>
            </div>
          </div>

          {/* Waveform visualisation */}
          <div>
            {/* Symmetric bars (up + down from center) */}
            <div className="flex items-center gap-[2px]" style={{ height: '48px' }}>
              {BARS.map((h, i) => {
                const isPLayed = i < played
                const halfH = (h / 100) * 20 // max 20px each side from center
                return (
                  <div key={i} className="flex flex-col items-center gap-[1px]" style={{ flex: 1 }}>
                    <div
                      className={`w-full rounded-full ${isPLayed ? 'bg-[#E07BA3]' : 'bg-white/10'}`}
                      style={{ height: `${halfH}px` }}
                    />
                    <div
                      className={`w-full rounded-full ${isPLayed ? 'bg-[#E07BA3]' : 'bg-white/10'}`}
                      style={{ height: `${halfH}px` }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Time labels */}
            <div className="flex justify-between mt-2">
              <span className="text-[#BFBFBF] text-xs">24:27</span>
              <span className="text-[#BFBFBF] text-xs">48:35</span>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-[#BFBFBF] text-xs font-medium">1x</span>
            <button
              aria-label="Rewind 15 seconds"
              className="text-[#BFBFBF] hover:text-white transition-colors text-sm"
            >
              ← 15s
            </button>
            {/* Large pink play button */}
            <button
              aria-label="Play"
              className="w-12 h-12 rounded-full bg-[#E07BA3] flex items-center justify-center hover:bg-[#cc6d95] transition-colors duration-200 flex-shrink-0"
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
                <path d="M2 1.5L12.5 8L2 14.5V1.5Z" fill="black" />
              </svg>
            </button>
            <button
              aria-label="Forward 15 seconds"
              className="text-[#BFBFBF] hover:text-white transition-colors text-sm"
            >
              15s →
            </button>
            <button
              aria-label="More options"
              className="text-[#BFBFBF] hover:text-white transition-colors text-sm"
            >
              ···
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
