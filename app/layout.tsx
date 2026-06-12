import type { Metadata } from 'next'
import '@fontsource/ovo/400.css'
import '@fontsource/open-sauce-sans/300.css'
import '@fontsource/open-sauce-sans/400.css'
import '@fontsource/open-sauce-sans/500.css'
import '@fontsource/open-sauce-sans/600.css'
import '@fontsource/open-sauce-sans/700.css'
import './globals.css'
import ScrollReveal from '@/components/ScrollReveal'

const SITE_URL = 'https://upperfloor.co'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Upper Floor | Ecom Content Agency',
    template: '%s | Upper Floor',
  },
  description:
    'Upper Floor is the ecom content agency behind brands doing $700k months. UGC ads, organic social and creative strategy that turn ecommerce products into brands people buy.',
  keywords: [
    'ecom content agency',
    'ecommerce content agency',
    'UGC ads agency',
    'content agency for ecommerce brands',
    'ecommerce creative agency',
    'UGC ads',
    'organic social for ecommerce',
    'paid social creative',
    'ecommerce brand building',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Upper Floor | Ecom Content Agency',
    description:
      'UGC ads, organic social and creative strategy that turn ecommerce products into brands people buy. Good products deserve better content.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Upper Floor',
    locale: 'en_GB',
    images: [
      {
        url: '/media/hero-poster.jpg',
        width: 1280,
        height: 720,
        alt: 'Upper Floor, the ecom content agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upper Floor | Ecom Content Agency',
    description:
      'UGC ads, organic social and creative strategy that turn ecommerce products into brands people buy.',
    images: ['/media/hero-poster.jpg'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Upper Floor',
  url: SITE_URL,
  logo: `${SITE_URL}/media/logo-black.png`,
  description:
    'Upper Floor is an ecom content agency. UGC ads, organic social and creative strategy for ecommerce brands.',
  email: 'info@upperfloor.co',
  founder: [
    { '@type': 'Person', name: 'Archie Norris' },
    { '@type': 'Person', name: 'Jack Buster-Weston' },
  ],
  knowsAbout: [
    'ecommerce content',
    'UGC ads',
    'organic social media',
    'paid social creative',
    'ecommerce brand building',
  ],
}

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Upper Floor',
  url: SITE_URL,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ScrollReveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </body>
    </html>
  )
}
