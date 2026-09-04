/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Self-hosted media. Next serves /public with `max-age=0, must-revalidate`, which
  // means every visit re-checks each clip and poster. Portfolio files are named
  // per clip and never edited in place (replace = new filename), so they can be
  // cached for a year; the rest of /media gets a week with background revalidation.
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/media/portfolio/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  // The old "Signal" prototype (upper-floor-signal.vercel.app, abandoned) used to be
  // proxied here at /signal. It's been replaced by the current Signal app, now live at
  // its own subdomain (signal.upperfloor.co) — so old /signal links redirect there
  // instead of being served from this site.
  async redirects() {
    return [
      { source: '/signal', destination: 'https://signal.upperfloor.co', permanent: true },
      { source: '/signal/:path*', destination: 'https://signal.upperfloor.co', permanent: true },
    ]
  },
}

export default nextConfig
