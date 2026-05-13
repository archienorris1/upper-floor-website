const features = [
  'Unlimited episodes per month',
  'Full audio + video production',
  '10–15 short-form clips per episode',
  'Branded visuals & thumbnails',
  'Weekly content plan',
  'Scheduling across all platforms',
  'Full transcription & show notes',
  'Monthly performance insights report',
  '48–72hr turnaround guaranteed',
]

export default function Pricing() {
  return (
    <section className="bg-black py-24 lg:py-36 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="text-center mb-16">
          <p className="text-[#BFBFBF] text-xs uppercase tracking-[0.2em] mb-5">Pricing</p>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-[-0.03em] leading-none uppercase text-white reveal-headline">
            ONE PLAN.<br />EVERYTHING INCLUDED.
          </h2>
        </div>

        <div className="max-w-[520px] mx-auto">
          <div className="bg-[#080808] border border-white/10 p-8 lg:p-10 reveal-on-scroll">

            {/* Price header */}
            <div className="pb-8 mb-8 border-b border-white/10">
              <p className="text-[#BFBFBF] text-xs uppercase tracking-[0.2em] mb-4">Monthly Retainer</p>
              <div className="flex items-end gap-2">
                <span className="text-[clamp(3rem,6vw,4.5rem)] font-black tracking-[-0.03em] leading-none text-white">
                  £2,500
                </span>
                <span className="text-[#BFBFBF] text-lg mb-1">/month</span>
              </div>
            </div>

            {/* Feature checklist */}
            <ul className="space-y-3.5 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#E07BA3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[#BFBFBF] text-[15px] leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className="block w-full bg-[#E07BA3] text-black text-center font-black uppercase tracking-wide py-4 text-sm hover:bg-[#cc6d95] transition-colors duration-200"
            >
              GET STARTED. FREE SAMPLE FIRST ↗
            </a>

          </div>
        </div>

      </div>
    </section>
  )
}
