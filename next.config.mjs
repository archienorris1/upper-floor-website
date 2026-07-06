/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
