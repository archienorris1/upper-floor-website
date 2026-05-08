import type { Metadata } from 'next'
import './globals.css'
import EpisodePreviewModal from '@/components/EpisodePreviewModal'

export const metadata: Metadata = {
  title: 'Upper Floor — Podcast Agency',
  description:
    'We build podcasts that grow brands. Upper Floor is a full-service podcast agency and growth engine turning audiences into pipeline.',
  keywords: [
    'podcast agency',
    'podcast production',
    'brand growth',
    'podcast marketing',
    'b2b podcast',
    'video podcast',
  ],
  openGraph: {
    title: 'Upper Floor — Podcast Agency',
    description: 'We build podcasts that grow brands.',
    type: 'website',
    siteName: 'Upper Floor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upper Floor — Podcast Agency',
    description: 'We build podcasts that grow brands.',
  },
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
        <EpisodePreviewModal />
      </body>
    </html>
  )
}
