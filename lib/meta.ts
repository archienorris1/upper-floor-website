/**
 * Meta (Facebook) Pixel helpers. The pixel only loads on pages that render
 * <MetaPixel />, and only when NEXT_PUBLIC_META_PIXEL_ID is set — so nothing
 * fires in local dev or on the rest of the site.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

type Fbq = (...args: unknown[]) => void

declare global {
  interface Window {
    fbq?: Fbq
  }
}

/** Fire a standard Meta event (e.g. "Schedule", "Lead"). No-op if the pixel isn't loaded. */
export function trackMeta(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', event, params)
}
