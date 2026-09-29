import { NextResponse } from 'next/server'
import { bookSlot, SPEND_BANDS, toE164 } from '@/lib/cal-api'

/**
 * Books the intro call from the /workwithus slot picker. Cal sends the invite and
 * posts its usual webhook to Signal, which stores the lead, pings #leads and sends
 * the CAPI Lead. The browser's fbp/fbc/ua ride along as booking metadata, same as
 * the embed, so that server-side Lead matches the person the pixel saw.
 */

const str = (v: unknown, n: number) => (typeof v === 'string' ? v.trim().slice(0, n) : '')

function validTimeZone(tz: string) {
  try {
    new Intl.DateTimeFormat('en-GB', { timeZone: tz })
    return true
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  let b: Record<string, unknown>
  try {
    b = await req.json()
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
  }

  const start = str(b.start, 40)
  const name = str(b.name, 120)
  const email = str(b.email, 200).toLowerCase()
  const phone = toE164(str(b.phone, 40))
  const spend = str(b.spend, 40)
  const tz = str(b.timeZone, 64)
  // Bots fill every field; people never see this one.
  if (str(b._gotcha, 10)) return NextResponse.json({ ok: true, start })

  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    Number.isNaN(Date.parse(start)) ||
    !(SPEND_BANDS as readonly string[]).includes(spend)
  ) {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
  }
  if (!/^\+\d{7,15}$/.test(phone)) {
    return NextResponse.json({ ok: false, reason: 'phone' }, { status: 400 })
  }

  const meta = (b.meta ?? {}) as Record<string, unknown>
  const metadata: Record<string, string> = { source: 'workwithus-slots' }
  for (const key of ['fbp', 'fbc', 'ua'] as const) {
    const v = str(meta[key], 400)
    if (v) metadata[key] = v
  }

  const result = await bookSlot({
    start,
    name,
    email,
    phone,
    spend,
    timeZone: validTimeZone(tz) ? tz : 'Europe/London',
    metadata,
  })
  return NextResponse.json(result, {
    status: result.ok ? 200 : result.reason === 'taken' ? 409 : result.reason === 'error' ? 502 : 400,
  })
}
