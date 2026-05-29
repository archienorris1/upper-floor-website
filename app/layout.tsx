import type { Metadata } from 'next'
import '@fontsource/ovo/400.css'
import '@fontsource/open-sauce-sans/300.css'
import '@fontsource/open-sauce-sans/400.css'
import '@fontsource/open-sauce-sans/500.css'
import '@fontsource/open-sauce-sans/600.css'
import '@fontsource/open-sauce-sans/700.css'
import './globals.css'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Upper Floor — Good products deserve better content',
  description:
    'Upper Floor builds content that performs. Scroll-stopping ads and organic content that grows brands — because the best ads don’t feel like ads.',
  keywords: [
    'content agency',
    'UGC ads',
    'performance content',
    'organic social',
    'brand content',
    'paid social creative',
  ],
  openGraph: {
    title: 'Upper Floor — Good products deserve better content',
    description: 'Content that performs. Because the best ads don’t feel like ads.',
    type: 'website',
    siteName: 'Upper Floor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upper Floor — Good products deserve better content',
    description: 'Content that performs. Because the best ads don’t feel like ads.',
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
        <ScrollReveal />
      </body>
    </html>
  )
}
