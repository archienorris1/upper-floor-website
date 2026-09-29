/**
 * Cal.com's public API, for the instant slot picker on /workwithus.
 *
 * The inline embed boots a whole app in an iframe and takes seconds to show a
 * calendar, longest on a phone inside Instagram's browser, which is exactly where
 * paid traffic lands. So the page asks Cal for the free times itself (on the server,
 * baked into the HTML) and books through the API: the times are on screen the moment
 * the page is, and booking is a tap, then name, email, phone and a spend band.
 *
 * Both endpoints are public for a public event type, so no key is needed. Cal still
 * sends the invite and posts its usual webhook to Signal, so leads, Slack and CAPI
 * work exactly as they do for an embed booking.
 *
 * The event's required questions are name, email, phone (Cal's attendeePhoneNumber,
 * E.164 only) and the spend band below. Adding a required question in Cal breaks
 * API bookings until the picker asks it too; the picker then falls back to the embed
 * only if the times fail to load, so check a test booking after any Cal form change.
 *
 *   CAL_EVENT_TYPE_ID  overrides the id if the event is ever recreated
 */
import { CAL_LINK } from './booking'

const API = 'https://api.cal.com/v2'
const EVENT_TYPE_ID = Number(process.env.CAL_EVENT_TYPE_ID || 6918210)

/**
 * The Cal booking question "What is your current ad spend on meta pm?". The key is
 * the field's slug in the event type, not its label; Signal reads the same key.
 * Required by Cal, so the picker always asks it.
 */
export const SPEND_FIELD = 'What-is-your-current-ad-spend-on-meta-pm'
export const SPEND_BANDS = ['£0 - 1k', '£1 - 15k', '£15 - 50k', '£50k and above'] as const

/** Free start times (ISO instants) over the next `days` days. */
export async function freeSlots(days = 21): Promise<string[]> {
  const [username, eventTypeSlug] = CAL_LINK.split('/')
  const start = new Date()
  const end = new Date(start.getTime() + days * 86_400_000)
  const qs = new URLSearchParams({
    username,
    eventTypeSlug,
    start: start.toISOString(),
    end: end.toISOString(),
    timeZone: 'UTC',
  })
  const res = await fetch(`${API}/slots?${qs}`, {
    headers: { 'cal-api-version': '2024-09-04' },
    signal: AbortSignal.timeout(5000),
    // Short, so a booking made elsewhere drops off within a minute. Booking re-checks anyway.
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Cal slots ${res.status}`)
  const body = (await res.json()) as { data?: Record<string, Array<{ start: string }>> }
  return Object.values(body.data ?? {})
    .flat()
    .map((s) => new Date(s.start).toISOString())
    .filter((iso) => Date.parse(iso) > Date.now())
    .sort()
}

export type BookingResult =
  | { ok: true; uid?: string; start: string }
  | { ok: false; reason: 'taken' | 'invalid' | 'phone' | 'error' }

/**
 * Cal only takes E.164 ("+447911123456"). People type "07911 123 456", so: drop the
 * spacing, turn a leading 00 into +, and read a lone leading 0 as a UK number.
 */
export function toE164(raw: string): string {
  let n = raw.replace(/[^\d+]/g, '')
  if (n.startsWith('00')) n = `+${n.slice(2)}`
  else if (n.startsWith('0')) n = `+44${n.slice(1)}`
  else if (!n.startsWith('+')) n = `+${n}`
  return n
}

export async function bookSlot(input: {
  start: string
  name: string
  email: string
  phone: string
  timeZone: string
  spend: string
  metadata: Record<string, string>
}): Promise<BookingResult> {
  try {
    const res = await fetch(`${API}/bookings`, {
      method: 'POST',
      headers: { 'cal-api-version': '2024-08-13', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start: new Date(input.start).toISOString(),
        eventTypeId: EVENT_TYPE_ID,
        attendee: {
          name: input.name,
          email: input.email,
          phoneNumber: input.phone,
          timeZone: input.timeZone,
          language: 'en',
        },
        bookingFieldsResponses: { [SPEND_FIELD]: [input.spend] },
        metadata: input.metadata,
      }),
      signal: AbortSignal.timeout(15000),
    })
    const body = (await res.json().catch(() => ({}))) as {
      data?: { uid?: string; start?: string }
      error?: { message?: string }
    }
    if (res.ok) return { ok: true, uid: body.data?.uid, start: body.data?.start ?? input.start }
    const message = body.error?.message ?? `Cal responded ${res.status}`
    console.error('[book]', res.status, message)
    if (/no longer available|not available|already|conflict|busy/i.test(message)) {
      return { ok: false, reason: 'taken' }
    }
    if (/attendeePhoneNumber/i.test(message)) return { ok: false, reason: 'phone' }
    return { ok: false, reason: res.status === 400 ? 'invalid' : 'error' }
  } catch (err) {
    console.error('[book] failed', err)
    return { ok: false, reason: 'error' }
  }
}
