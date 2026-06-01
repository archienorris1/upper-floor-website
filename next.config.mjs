/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Multi-zone: proxy /signal/* to the Signal app (a separate Next.js deployment
  // running under basePath '/signal'). Keeps the competitive-intel tool at
  // upperfloor.co/signal without colliding with this site's routes or assets.
  async rewrites() {
    return [
      { source: '/signal', destination: 'https://upper-floor-signal.vercel.app/signal' },
      { source: '/signal/:path*', destination: 'https://upper-floor-signal.vercel.app/signal/:path*' },
    ]
  },
}

export default nextConfig
