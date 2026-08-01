import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected work from Upper Floor — UGC ads and organic social content for ecommerce brands like Aurora, Fastframe, Toastybody and Fidgie.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio | Upper Floor',
    description:
      'Selected work from Upper Floor — UGC ads and organic social content for ecommerce brands.',
    type: 'website',
    url: 'https://upperfloor.co/portfolio',
    siteName: 'Upper Floor',
    images: [
      {
        url: '/media/portfolio/aurora-1-poster.jpg',
        width: 480,
        height: 854,
        alt: 'Upper Floor portfolio — selected work',
      },
    ],
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
