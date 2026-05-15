import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ARTICLES, getArticle } from '@/lib/articles'
import EpisodePreviewButton from '@/components/EpisodePreviewButton'

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) return {}
  return {
    title: `${article.title} — Upper Floor`,
    description: article.excerpt,
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  return (
    <main
      className="min-h-screen px-6 lg:px-12 py-24"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="max-w-[720px] mx-auto">

        {/* Back link */}
        <Link
          href="/insights"
          className="text-[#E07BA3] text-sm hover:underline inline-flex items-center gap-1.5 mb-10"
        >
          ← Back to Insights
        </Link>

        {/* Category pill */}
        <div className="mb-6">
          <span
            className="text-[#E07BA3] text-[11px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full"
            style={{ background: 'rgba(224,123,163,0.12)', border: '1px solid rgba(224,123,163,0.25)' }}
          >
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-white font-black leading-tight tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2 }}
        >
          {article.title}
        </h1>

        {/* Meta */}
        <p className="text-[#BFBFBF] text-sm mb-5">
          {article.date} · {article.readTime}
        </p>

        {/* Pink divider */}
        <div style={{ width: '48px', height: '2px', backgroundColor: '#E07BA3', marginBottom: '40px' }} />

        {/* Article body */}
        <div className="flex flex-col gap-6">
          {article.content.map((block, i) => {
            if (block.type === 'intro') {
              return (
                <p
                  key={i}
                  className="text-white font-medium"
                  style={{ fontSize: '20px', lineHeight: 1.7 }}
                >
                  {block.text}
                </p>
              )
            }
            if (block.type === 'h2') {
              return (
                <h2
                  key={i}
                  className="text-white font-black"
                  style={{ fontSize: '22px', lineHeight: 1.3, marginTop: '40px' }}
                >
                  {block.text}
                </h2>
              )
            }
            return (
              <p
                key={i}
                className="text-white"
                style={{ fontSize: '18px', lineHeight: 1.8 }}
              >
                {block.text}
              </p>
            )
          })}
        </div>

        {/* CTA box */}
        <div
          className="mt-16 rounded-2xl flex flex-col gap-4 items-start"
          style={{
            background: 'linear-gradient(135deg, #1a0d12 0%, #111111 100%)',
            border: '1px solid rgba(224,123,163,0.25)',
            padding: '40px',
          }}
        >
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.15em]">
            Ready to build your podcast?
          </p>
          <p className="text-white font-black text-2xl leading-tight">
            Let us show you what we can do. For free.
          </p>
          <p className="text-[#BFBFBF] text-sm leading-relaxed max-w-[400px]">
            We&apos;ll produce a full episode preview at no cost so you can see exactly what Upper Floor delivers before committing to anything.
          </p>
          <EpisodePreviewButton className="mt-2 bg-[#E07BA3] text-black font-black text-sm px-6 py-3 rounded-full hover:bg-[#cc6d95] transition-colors duration-200">
            Get Your Free Podcast Audit →
          </EpisodePreviewButton>
        </div>

      </div>
    </main>
  )
}
