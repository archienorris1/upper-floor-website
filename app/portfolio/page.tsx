import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected work from Upper Floor — UGC ads, talking heads, animated explainers, motion ads and organic content for brands like Aurora, ION8, KELV, Dissertation Collective, Fastframe, Toastybody and Fidgie.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio | Upper Floor',
    description:
      'Selected work from Upper Floor — UGC ads, animation, motion ads and organic content for ecom brands.',
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
