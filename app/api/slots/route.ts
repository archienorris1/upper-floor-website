import { NextResponse } from 'next/server'
import { freeSlots } from '@/lib/cal-api'

/**
 * Free intro-call times for the /workwithus slot picker (lib/cal-api.ts). The page
 * already has them baked into its HTML; this is the quiet refresh after load, and
 * the re-fetch after someone else takes a time. A minute-old list is fine because
 * booking re-checks with Cal.
 */
// Rebuilt at most once a minute, same as the page that bakes the times in.
export const revalidate = 60

export async function GET() {
  try {
    const slots = await freeSlots()
    return NextResponse.json(
      { ok: true, slots },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
    )
  } catch (err) {
    console.error('[slots]', err)
    return NextResponse.json({ ok: false, slots: [] }, { status: 502 })
  }
}
