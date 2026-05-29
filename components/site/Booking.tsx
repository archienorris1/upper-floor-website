'use client'

import Script from 'next/script'

export default function Booking() {
  return (
    <section id="book" className="scroll-mt-24 bg-brand-green px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">Let’s Talk</h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-white/90 md:text-lg">
          We’re easy to talk to. Book a free 30-minute intro call and let’s figure out if we’re a
          good fit.
        </p>

        {/* Calendly inline widget */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-xl">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/upperfloor-info/30min?hide_event_type_details=1&hide_gdpr_banner=1"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  )
}
