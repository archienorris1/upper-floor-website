import type { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/articles'

const SITE_URL = 'https://upperfloor.co'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = ARTICLES.map((article) => ({
    url: `${SITE_URL}/insights/${article.slug}`,
    lastModified: new Date(article.dateISO),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...articles,
  ]
}
