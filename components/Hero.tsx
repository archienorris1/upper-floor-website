const WAVE_HEIGHTS = [
  40, 65, 30, 80, 55, 70, 45, 90, 35, 75,
  60, 85, 40, 70, 50, 65, 55, 45, 80, 60,
  35, 75, 85, 50, 65, 70, 45, 80, 55, 40,
  90, 65, 50, 75, 60, 35, 70, 50, 65, 45,
]

export default function Hero() {
  return (
    <section className="min-h-screen bg-black flex items-center pt-24 pb-16" id="work">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Headline */}
          <div>
            <p className="text-[#BFBFBF] text-xs uppercase tracking-[0.2em] mb-8">
              Podcast Agency
            </p>
            <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black tracking-[-0.03em] leading-none uppercase text-white mb-8">
              WE BUILD<br />
              PODCASTS<br />
              THAT GROW<br />
              <span className="text-[#E07BA3]">BRANDS.</span>
            </h1>
            <p className="text-[#BFBFBF] text-lg leading-relaxed mb-10 max-w-[420px]">
              Upper Floor is a full-service podcast agency. We turn brands into authorities — and listeners into leads.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-[#E07BA3] text-black font-black px-7 py-3.5 uppercase tracking-wide text-sm hover:bg-[#cc6d95] transition-colors duration-200"
              >
                BOOK A CALL ↗
              </a>
              <a
                href="#services"
                className="border border-white/30 text-white font-black px-7 py-3.5 uppercase tracking-wide text-sm hover:border-white hover:bg-white hover:text-black transition-all duration-200"
              >
                SEE OUR WORK →
              </a>
            </div>
          </div>

          {/* Right: Stacked podcast cards */}
          <div className="flex flex-col gap-3 w-full max-w-lg lg:max-w-none ml-auto">

            {/* Card 1: BUILT DIFFERENT */}
            <div className="card-hover flex items-center gap-4 bg-[#0a0a0a] border border-white/10 hover:border-white/25 p-4 cursor-pointer">
              {/* REPLACE WITH IMAGE */}
              <div className="w-[60px] h-[60px] flex-shrink-0 bg-[#111111] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3a1a2a] to-[#0a0a0a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#BFBFBF] text-[10px] uppercase tracking-[0.15em] mb-1">EP 47</p>
                <h3 className="text-white font-black uppercase tracking-[-0.02em] text-[15px] leading-tight mb-0.5">
                  BUILT DIFFERENT
                </h3>
                <p className="text-[#BFBFBF] text-xs truncate">
                  Why the best brands don&apos;t follow the playbook
                </p>
              </div>
              <div className="flex-shrink-0 text-right pl-2">
                <p className="text-[#BFBFBF] text-xs">42 MIN</p>
              </div>
            </div>

            {/* Card 2: VISIONARIES */}
            <div className="card-hover flex items-center gap-4 bg-[#0a0a0a] border border-white/10 hover:border-white/25 p-4 cursor-pointer">
              {/* REPLACE WITH IMAGE */}
              <div className="w-[60px] h-[60px] flex-shrink-0 bg-[#111111] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3a] to-[#0a0a0a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#BFBFBF] text-[10px] uppercase tracking-[0.15em] mb-1">EP 23</p>
                <h3 className="text-white font-black uppercase tracking-[-0.02em] text-[15px] leading-tight mb-0.5">
                  VISIONARIES
                </h3>
                <p className="text-[#BFBFBF] text-xs truncate">
                  Redefining leadership in the age of AI
                </p>
              </div>
              <div className="flex-shrink-0 text-right pl-2">
                <p className="text-[#BFBFBF] text-xs">58 MIN</p>
              </div>
            </div>

            {/* Card 3: UNFILTERED — active player */}
            <div className="card-hover flex flex-col gap-4 bg-[#0f0f0f] border border-[#E07BA3]/40 hover:border-[#E07BA3]/70 p-5 cursor-pointer">
              <div className="flex items-center gap-4">
                {/* REPLACE WITH IMAGE */}
                <div className="w-[60px] h-[60px] flex-shrink-0 bg-[#111111] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3a1a25] to-[#0a0a0a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#E07BA3] text-[10px] uppercase tracking-[0.15em] mb-1">
                    NOW PLAYING · EP 12
                  </p>
                  <h3 className="text-white font-black uppercase tracking-[-0.02em] text-[15px] leading-tight mb-0.5">
                    UNFILTERED
                  </h3>
                  <p className="text-[#BFBFBF] text-xs truncate">
                    What it really takes to build from zero
                  </p>
                </div>
                <button
                  className="w-10 h-10 rounded-full bg-[#E07BA3] flex items-center justify-center flex-shrink-0 hover:bg-[#cc6d95] transition-colors"
                  aria-label="Play episode"
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
                    <path d="M1.5 1.5L10.5 7L1.5 12.5V1.5Z" fill="black" />
                  </svg>
                </button>
              </div>

              {/* Waveform visualiser */}
              <div>
                <div className="flex items-end gap-[2px] h-7 mb-2">
                  {WAVE_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-[1px] ${i < 14 ? 'bg-[#E07BA3]' : 'bg-white/15'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between">
                  <span className="text-[#BFBFBF] text-[10px]">14:22</span>
                  <span className="text-[#BFBFBF] text-[10px]">35:00</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
