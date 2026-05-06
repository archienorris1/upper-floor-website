const LOGO_WIDTHS = [120, 100, 140, 110, 130, 105]

export default function TrustedBy() {
  return (
    <section className="py-12 border-t border-b border-white/[0.06] relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10" style={{ background: 'linear-gradient(to right, #0d0d0d, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10" style={{ background: 'linear-gradient(to left, #0d0d0d, transparent)' }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="text-[#BFBFBF] text-xs uppercase tracking-[0.2em] mb-8">
          Trusted by teams at
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          {LOGO_WIDTHS.map((w, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-[#333] flex-shrink-0"
              style={{ width: `${w}px`, height: '32px', borderRadius: '6px' }}
              aria-hidden="true"
            >
              {/* REPLACE WITH CLIENT LOGO */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
