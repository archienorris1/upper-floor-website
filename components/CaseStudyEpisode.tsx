import Image from 'next/image'

export default function CaseStudyEpisode() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        <div className="bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col lg:flex-row hover:-translate-y-1 transition-transform duration-200 reveal-on-scroll max-w-[800px]">

          {/* Header image */}
          <div className="relative w-full lg:w-[320px] flex-shrink-0" style={{ height: '240px' }}>
            <Image
              src="/images/podcast-man-glasses.jpg"
              alt="Podcast case study"
              fill
              className="object-cover"
              style={{ objectPosition: 'center top' }}
              sizes="(max-width: 1024px) 100vw, 320px"
            />
            <div
              className="absolute inset-0 lg:hidden"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, #141414 100%)' }}
            />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0) 60%, #141414 100%)' }}
            />
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

            <a
              href="#stats"
              className="text-white text-sm font-medium hover:text-[#E07BA3] transition-colors duration-200 flex items-center gap-2"
            >
              View full case study
              <span className="text-[#E07BA3]">↗</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
