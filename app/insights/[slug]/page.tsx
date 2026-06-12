import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ARTICLES, getArticle, getRelatedArticles } from '@/lib/articles'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/insights/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.dateISO,
      url: `/insights/${article.slug}`,
      images: [{ url: article.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const related = getRelatedArticles(article.slug, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.dateISO,
    image: `https://upperfloor.co${article.image}`,
    author: {
      '@type': 'Organization',
      name: 'Upper Floor',
      url: 'https://upperfloor.co',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Upper Floor',
      logo: {
        '@type': 'ImageObject',
        url: 'https://upperfloor.co/media/logo-black.png',
      },
    },
    mainEntityOfPage: `https://upperfloor.co/insights/${article.slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://upperfloor.co' },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://upperfloor.co/insights' },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://upperfloor.co/insights/${article.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteNav />
      <main className="min-h-screen bg-brand-ink px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-[720px]">
          {/* Back link */}
          <Link
            href="/insights"
            className="mb-10 inline-flex items-center gap-1.5 text-sm text-brand-green hover:underline"
          >
            ← Back to Insights
          </Link>

          {/* Category pill */}
          <div className="mb-6">
            <span className="rounded-full border border-brand-green/40 bg-brand-green/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-5 font-serif text-4xl leading-tight text-white md:text-5xl">
            {article.title}
          </h1>

          {/* Meta */}
          <p className="mb-5 text-sm text-white/60">
            {article.date} · {article.readTime}
          </p>

          {/* Divider */}
          <div className="mb-10 h-0.5 w-12 bg-brand-green" />

          {/* Article body */}
          <div className="flex flex-col gap-6">
            {article.content.map((block, i) => {
              if (block.type === 'intro') {
                return (
                  <p key={i} className="text-xl font-medium leading-relaxed text-white">
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'h2') {
                return (
                  <h2 key={i} className="mt-6 font-serif text-2xl leading-snug text-white">
                    {block.text}
                  </h2>
                )
              }
              return (
                <p key={i} className="text-lg leading-8 text-white/90">
                  {block.text}
                </p>
              )
            })}
          </div>

          {/* Keep reading — internal links between the SEO articles */}
          {related.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-10">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                Keep reading
              </h2>
              <ul className="flex flex-col gap-5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/insights/${r.slug}`}
                      className="group flex items-baseline justify-between gap-4"
                    >
                      <span className="font-serif text-xl leading-snug text-white transition-colors duration-200 group-hover:text-brand-green md:text-2xl">
                        {r.title}
                      </span>
                      <span className="shrink-0 text-brand-green">↗</span>
                    </Link>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{r.excerpt}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CTA box */}
          <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-brand-green/30 bg-brand-green/[0.08] p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
              Ready to make better content?
            </p>
            <p className="font-serif text-2xl leading-tight text-white">
              Good products deserve better content.
            </p>
            <p className="max-w-[400px] text-sm leading-relaxed text-white/70">
              Book a free 30-minute intro call and let’s figure out if we’re a good fit.
            </p>
            <a
              href="/#book"
              className="mt-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
            >
              Let’s Talk →
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
