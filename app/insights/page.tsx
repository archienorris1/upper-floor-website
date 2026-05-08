import Link from 'next/link'
import Image from 'next/image'
import { ARTICLES } from '@/lib/articles'

export const metadata = {
  title: 'Insights — Upper Floor',
  description: 'Thinking on podcasting, brand building, and what it takes to grow.',
}

export default function InsightsPage() {
  return (
    <main
      className="min-h-screen px-6 lg:px-12 py-24"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em] mb-4">
            Upper Floor
          </p>
          <h1
            className="text-white font-black uppercase tracking-tight leading-none mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Insights
          </h1>
          <p className="text-[#BFBFBF] text-base max-w-[480px]">
            Thinking on podcasting, brand building, and what it takes to grow.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Image */}
              <div className="relative w-full" style={{ height: '200px' }}>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 40%, #141414 100%)' }}
                />
                <span
                  className="absolute top-4 left-4 text-[#E07BA3] text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full z-10"
                  style={{ background: 'rgba(224,123,163,0.15)', border: '1px solid rgba(224,123,163,0.3)' }}
                >
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h2 className="text-white font-black text-base leading-snug group-hover:text-[#E07BA3] transition-colors duration-200">
                  {article.title}
                </h2>
                <p className="text-[#BFBFBF] text-sm leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[#BFBFBF] text-xs">{article.date} · {article.readTime}</p>
                  <span className="text-[#E07BA3]">↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
