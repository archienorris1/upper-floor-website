/**
 * Meta (Facebook) Pixel helpers. <MetaPixel /> is mounted site-wide in the root
 * layout but only loads when NEXT_PUBLIC_META_PIXEL_ID is set, so nothing fires
 * in local dev.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

type Fbq = (...args: unknown[]) => void

declare global {
  interface Window {
    fbq?: Fbq
  }
}

/**
 * Fire a standard Meta event (e.g. "Schedule", "Lead"). No-op if the pixel isn't loaded.
 * `eventId` lets Meta deduplicate this against the same event sent server-side (CAPI).
 */
export function trackMeta(event: string, params?: Record<string, unknown>, eventId?: string) {
  if (typeof window === 'undefined' || !window.fbq) return
  if (eventId) window.fbq('track', event, params ?? {}, { eventID: eventId })
  else window.fbq('track', event, params)
}

/**
 * The event_id for a Cal booking's Lead. Signal sends the same Lead server-side from
 * the Cal webhook with this exact id (lib/metaCapi.ts leadEventId), which is how Meta
 * knows the two are one conversion. Change both or neither.
 */
export function calLeadEventId(bookingUid: string) {
  return `cal-booking-${bookingUid}`
}

function cookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const hit = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : undefined
}

/**
 * Browser identifiers for the server-side event, stored as Cal booking metadata.
 * Cal returns them in the webhook, so Signal's CAPI event can match the same person
 * the pixel saw. The /workwithus slot picker sends these as-is to /api/book.
 */
export function metaBrowserIds(): Record<string, string> {
  const out: Record<string, string> = {}
  const fbp = cookie('_fbp')
  const fbc = cookie('_fbc')
  if (fbp) out.fbp = fbp
  if (fbc) out.fbc = fbc
  if (typeof navigator !== 'undefined') out.ua = navigator.userAgent.slice(0, 400)
  return out
}

/** metaBrowserIds() as the metadata[...] query params the Cal embed passes through. */
export function calMetaMetadata(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(metaBrowserIds()).map(([k, v]) => [`metadata[${k}]`, v]),
  )
}
