import Image from 'next/image'

const featured = {
  title: 'Why most B2B podcasts fail to generate pipeline — and how to fix it',
  date: 'March 12, 2026 · 6 min read',
  image: '/images/insights-featured.jpg',
}

const articles = [
  {
    title: 'Turning your podcast into a predictable demand engine for your sales team',
    date: 'February 28, 2026 · 5 min read',
    image: '/images/insights-thumb-1.jpg',
  },
  {
    title: 'The short-form content strategy that took a fintech podcast to 250K downloads',
    date: 'January 15, 2026 · 7 min read',
    image: '/images/insights-thumb-2.jpg',
  },
]

export default function Insights() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 border-t border-white/[0.06]" id="insights">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em]">
            Insights
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Featured article — left, large */}
          <a
            href="#"
            className="group bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200"
          >
            {/* Photo */}
            <div className="relative w-full h-52">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute top-4 left-4 bg-[#E07BA3] text-black text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full z-10">
                Featured
              </span>
            </div>
            <div className="p-8 flex flex-col gap-4 flex-1">
              <h3 className="text-white font-black text-xl leading-snug group-hover:text-[#E07BA3] transition-colors duration-200">
                {featured.title}
              </h3>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-[#BFBFBF] text-xs">{featured.date}</p>
                <span className="text-[#E07BA3] text-lg">↗</span>
              </div>
            </div>
          </a>

          {/* Right: two smaller articles stacked */}
          <div className="flex flex-col gap-6">
            {articles.map(({ title, date, image }) => (
              <a
                key={title}
                href="#"
                className="group bg-[#141414] border border-white/[0.08] rounded-2xl p-6 flex items-start gap-5 hover:-translate-y-1 transition-transform duration-200"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl border border-white/[0.08] overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-white font-black text-base leading-snug group-hover:text-[#E07BA3] transition-colors duration-200">
                    {title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-[#BFBFBF] text-xs">{date}</p>
                    <span className="text-[#E07BA3]">↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>

        {/* View all */}
        <div className="flex justify-end mt-8">
          <a
            href="#"
            className="text-[#BFBFBF] text-sm hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            View all insights ↗
          </a>
        </div>

      </div>
    </section>
  )
}
