import Link from 'next/link'
import Image from 'next/image'
import { ARTICLES } from '@/lib/articles'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'

export const metadata = {
  title: 'Insights for Ecom Brands',
  description:
    'Thinking from an ecom content agency: UGC ads, organic social, creative strategy and how to turn an ecommerce store into a brand worth buying.',
  alternates: {
    canonical: '/insights',
  },
}

export default function InsightsPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-brand-ink px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
              Upper Floor
            </p>
            <h1 className="mb-5 font-serif text-5xl leading-none text-white md:text-7xl">
              Insights
            </h1>
            <p className="max-w-[480px] text-base text-white/70">
              Thinking on ecom content, UGC ads, organic growth and what it takes to build a brand
              worth buying.
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-transform duration-200 hover:-translate-y-1"
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
                  <span
                    className="absolute left-4 top-4 z-10 rounded-full border border-brand-green/40 bg-brand-green/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white"
                  >
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2 className="text-base font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-brand-green">
                    {article.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-white/70">{article.excerpt}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-white/50">
                      {article.date} · {article.readTime}
                    </p>
                    <span className="text-brand-green">↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
