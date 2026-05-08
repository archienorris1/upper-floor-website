import Image from 'next/image'
import Link from 'next/link'
import { ARTICLES } from '@/lib/articles'

const [featured, ...rest] = ARTICLES.slice(0, 3)

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
          <Link
            href={`/insights/${featured.slug}`}
            className="group bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="relative w-full h-52">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute top-4 left-4 bg-[#E07BA3] text-black text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full z-10">
                {featured.category}
              </span>
            </div>
            <div className="p-8 flex flex-col gap-4 flex-1">
              <h3 className="text-white font-black text-xl leading-snug group-hover:text-[#E07BA3] transition-colors duration-200">
                {featured.title}
              </h3>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-[#BFBFBF] text-xs">{featured.date} · {featured.readTime}</p>
                <span className="text-[#E07BA3] text-lg">↗</span>
              </div>
            </div>
          </Link>

          {/* Right: two smaller articles stacked */}
          <div className="flex flex-col gap-6">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group bg-[#141414] border border-white/[0.08] rounded-2xl p-6 flex items-start gap-5 hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl border border-white/[0.08] overflow-hidden">
                  <Image
                    src={article.thumbImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-white font-black text-base leading-snug group-hover:text-[#E07BA3] transition-colors duration-200">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-[#BFBFBF] text-xs">{article.date} · {article.readTime}</p>
                    <span className="text-[#E07BA3]">↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* View all */}
        <div className="flex justify-end mt-8">
          <Link
            href="/insights"
            className="text-[#BFBFBF] text-sm hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            View all insights ↗
          </Link>
        </div>

      </div>
    </section>
  )
}
