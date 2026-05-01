const shows = [
  {
    name: 'BUILT DIFFERENT',
    episode: 'EP 47',
    description:
      'A weekly show for founders who refuse to follow the playbook. Raw conversations, real lessons, zero fluff.',
    duration: '42 MIN',
    accentFrom: '#3a1a2a',
  },
  {
    name: 'VISIONARIES',
    episode: 'EP 23',
    description:
      'Long-form conversations with the leaders redefining their industries from the inside out.',
    duration: '58 MIN',
    accentFrom: '#1a1a3a',
  },
  {
    name: 'UNFILTERED',
    episode: 'EP 12',
    description:
      'Honest, unscripted conversations about what it really takes to build a business in the modern era.',
    duration: '35 MIN',
    accentFrom: '#2a1018',
  },
]

export default function PodcastSamples() {
  return (
    <section className="bg-black py-24 lg:py-36 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[#BFBFBF] text-xs uppercase tracking-[0.2em] mb-5">Podcast Samples</p>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-[-0.03em] leading-none uppercase text-white">
              HEAR THE<br />DIFFERENCE.
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#E07BA3] font-black uppercase tracking-wide text-sm group flex-shrink-0"
          >
            <span>ALL SHOWS</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shows.map((show) => (
            <div
              key={show.name}
              className="card-hover group bg-[#080808] border border-white/10 hover:border-white/20 p-6 flex flex-col"
            >
              {/* REPLACE WITH IMAGE */}
              <div
                className="aspect-square relative overflow-hidden mb-6"
                style={{ background: `linear-gradient(135deg, ${show.accentFrom} 0%, #111111 60%, #080808 100%)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-white/10 text-xs uppercase tracking-[0.2em] font-black">
                    {show.name}
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <p className="text-[#BFBFBF] text-[10px] uppercase tracking-[0.18em] mb-2">{show.episode}</p>
                <h3 className="text-white font-black uppercase text-xl tracking-[-0.02em] mb-3">
                  {show.name}
                </h3>
                <p className="text-[#BFBFBF] text-sm leading-relaxed flex-1 mb-6">{show.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[#BFBFBF] text-sm">{show.duration}</span>
                  <button
                    className="w-10 h-10 rounded-full bg-[#E07BA3] flex items-center justify-center hover:bg-[#cc6d95] transition-colors duration-200"
                    aria-label={`Play ${show.name}`}
                  >
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
                      <path d="M1.5 1.5L10.5 7L1.5 12.5V1.5Z" fill="black" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
