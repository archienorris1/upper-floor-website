export default function Hero() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-6 lg:px-12" id="work">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8">
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em]">
            B2B Podcast Production Agency
          </p>

          <h1
            className="font-black tracking-tight leading-[1.0] uppercase"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
          >
            <span className="text-white block">PODCASTS THAT</span>
            <span className="text-white block">DRIVE PIPELINE,</span>
            <span className="text-[#E07BA3] block">NOT VANITY.</span>
          </h1>

          <p className="text-[#BFBFBF] text-lg leading-relaxed max-w-[480px]">
            We produce, grow and scale podcasts that actually drive pipeline — not vanity metrics.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-[#fde8ef] text-[#c05080] border border-[#E07BA3]/30 rounded-full px-6 py-3 font-medium text-sm hover:bg-[#fbd5e3] transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              Book a strategy call <span>↗</span>
            </a>
            <a
              href="#work"
              className="border border-white/20 text-white bg-transparent rounded-full px-6 py-3 font-medium text-sm hover:bg-white/5 transition-colors duration-200"
            >
              View our work
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center -space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#7c5cbf] border-2 border-[#0d0d0d]" />
              <div className="w-9 h-9 rounded-full bg-[#4a8fc7] border-2 border-[#0d0d0d]" />
              <div className="w-9 h-9 rounded-full bg-[#e08060] border-2 border-[#0d0d0d]" />
            </div>
            <p className="text-[#BFBFBF] text-sm">
              Trusted by B2B brands across SaaS, finance and tech.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN — stacked landscape photo cards */}
        <div className="relative hidden lg:block" style={{ height: '540px' }}>

          {/* Card 1 — landscape, upper right, rotated +3deg */}
          <div
            className="absolute bg-[#1a1a1a] rounded-2xl border border-white/[0.08] overflow-hidden"
            style={{
              width: '90%',
              height: '52%',
              top: 0,
              right: 0,
              transform: 'rotate(3deg)',
              transformOrigin: 'top right',
            }}
          >
            {/* REPLACE WITH IMAGE */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a1c1c] via-[#1a1a1a] to-[#0f0f0f]" />
          </div>

          {/* Card 2 — landscape, lower left, rotated -2deg */}
          <div
            className="absolute bg-[#1a1a1a] rounded-2xl border border-white/[0.08] overflow-hidden"
            style={{
              width: '85%',
              height: '50%',
              bottom: 40,
              left: 0,
              transform: 'rotate(-2deg)',
              transformOrigin: 'bottom left',
            }}
          >
            {/* REPLACE WITH IMAGE */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1c1e2a] via-[#1a1a1a] to-[#0f0f0f]" />
          </div>

          {/* Spinning circular badge — overlaps top-right corner */}
          <div className="absolute top-0 right-0 z-20 w-[88px] h-[88px] translate-x-3 -translate-y-3">
            <svg
              viewBox="0 0 88 88"
              className="spin-badge w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="badgeCircle"
                  d="M 44,44 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <circle cx="44" cy="44" r="43" fill="#161616" stroke="#E07BA3" strokeWidth="1" />
              <text fill="#E07BA3" fontSize="7.5" fontWeight="700" letterSpacing="1.5">
                <textPath href="#badgeCircle">
                  STRATEGY · PRODUCTION · GROWTH · SHOW ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E07BA3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
          </div>

          {/* Decorative pink slash marks — lower right */}
          <svg
            className="absolute bottom-20 right-4 opacity-50 z-10"
            width="34"
            height="60"
            viewBox="0 0 34 60"
            fill="none"
            aria-hidden="true"
          >
            <line x1="0" y1="60" x2="26" y2="0" stroke="#E07BA3" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="8" y1="60" x2="34" y2="0" stroke="#E07BA3" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Navigation indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[#BFBFBF] text-sm select-none">
            <button aria-label="Previous" className="hover:text-white transition-colors duration-200">←</button>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-0.5 bg-white/20 rounded-full" />
              <span className="w-5 h-0.5 bg-[#E07BA3] rounded-full" />
              <span className="text-xs text-[#BFBFBF] mx-1">2/5</span>
              <span className="w-5 h-0.5 bg-white/20 rounded-full" />
              <span className="w-5 h-0.5 bg-white/20 rounded-full" />
            </div>
            <button aria-label="Next" className="hover:text-white transition-colors duration-200">→</button>
          </div>

        </div>

      </div>
    </section>
  )
}
