/**
 * Cal.com webhook → #leads in Slack.
 *
 * The booking confirmation happens inside Cal's iframe, so the browser-side
 * `bookingSuccessfulV2` hook (used for the Meta Pixel) only fires when the visitor
 * is still on the page. This server-side webhook is the reliable record: Cal calls
 * it whether the booking came from the site, a raw cal.com link, or a reschedule.
 *
 * Set up in Cal → Settings → Developer → Webhooks:
 *   URL     https://www.upperfloor.co/api/webhooks/cal
 *   Secret  same value as CAL_WEBHOOK_SECRET in Vercel
 *   Events  BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED
 */

import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { notifySlack } from '@/lib/slack'

const SECRET = process.env.CAL_WEBHOOK_SECRET ?? ''

const HEADINGS: Record<string, string> = {
  BOOKING_CREATED: '📞 New call booked',
  BOOKING_RESCHEDULED: '🔄 Call rescheduled',
  BOOKING_CANCELLED: '❌ Call cancelled',
}

/** Cal signs the raw body with the webhook secret; reject anything that doesn't match. */
function signatureValid(raw: string, signature: string | null) {
  if (!signature) return false
  const expected = crypto.createHmac('sha256', SECRET).update(raw).digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

function formatWhen(startTime?: string) {
  if (!startTime) return ''
  return new Date(startTime).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  })
}

export async function POST(req: NextRequest) {
  // Without a secret we can't tell a real Cal call from anyone POSTing to this URL.
  if (!SECRET) {
    console.error('Cal webhook hit but CAL_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const raw = await req.text()
  if (!signatureValid(raw, req.headers.get('x-cal-signature-256'))) {
    return NextResponse.json({ error: 'Bad signature' }, { status: 401 })
  }

  const event = JSON.parse(raw)
  const heading = HEADINGS[event.triggerEvent]
  // Cal sends other events (forms, recordings) if they ever get enabled; ack and ignore.
  if (!heading) return NextResponse.json({ ok: true, ignored: event.triggerEvent })

  const booking = event.payload ?? {}
  const attendee = booking.attendees?.[0] ?? {}
  // Whatever the visitor typed into Cal's own booking questions ("what's this about").
  const notes = booking.responses?.notes?.value ?? booking.additionalNotes ?? ''

  await notifySlack(
    heading,
    [
      { label: 'Name', value: attendee.name ?? 'Unknown' },
      { label: 'Email', value: attendee.email ?? '' },
      { label: 'When', value: formatWhen(booking.startTime) },
      { label: 'Timezone', value: attendee.timeZone ?? '' },
      { label: 'Notes', value: typeof notes === 'string' ? notes : '' },
    ],
    booking.uid ? `Cal booking \`${booking.uid}\`` : undefined,
  )

  return NextResponse.json({ ok: true })
}
