'use client'

import CalEmbed from '@/components/site/CalEmbed'
import { CAL_LINK } from '@/lib/booking'
import { trackMeta } from '@/lib/meta'

/**
 * The conversion. Same Cal.com event as the rest of the site; on a confirmed
 * booking we tell Meta so campaigns can optimise for calls actually booked.
 */
export default function BookCall() {
  return (
    <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <CalEmbed
        calLink={CAL_LINK}
        id="cal-book-workwithus"
        theme="dark"
        minHeight={720}
        onBookingSuccessful={() => {
          trackMeta('Schedule')
          trackMeta('Lead')
        }}
      />
    </div>
  )
}
