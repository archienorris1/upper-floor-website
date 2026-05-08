const testimonials = [
  {
    quote:
      'The production quality was outstanding from day one. Our podcast went from something we were embarrassed to share to something we actively promote to prospects.',
    name: 'James R.',
    role: 'SaaS Founder',
  },
  {
    quote:
      'Upper Floor completely transformed how we think about our podcast. Within 60 days we had inbound leads referencing specific episodes.',
    name: 'Sarah M.',
    role: 'Fintech Marketing Lead',
  },
  {
    quote:
      'Handing over production was the best decision we made. The clips alone tripled our LinkedIn reach.',
    name: 'Daniel K.',
    role: 'B2B Consultancy',
  },
  {
    quote:
      'The turnaround is incredible. We record, they handle everything else. It genuinely feels like we have an entire media team behind us.',
    name: 'Rachel T.',
    role: 'Professional Services',
  },
]

const Stars = () => (
  <div className="flex gap-0.5 mb-5" aria-label="5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#E07BA3" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <section className="px-6 lg:px-12 border-t border-white/[0.06]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.1em] mb-4">
          What Our Clients Say
        </p>
        <h2 className="text-white font-black text-3xl uppercase tracking-tight mb-12">
          The Proof Is In The Pudding.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testimonials.map(({ quote, name, role }) => (
            <div
              key={name}
              className="bg-[#111111] border border-[#222222] rounded-2xl p-8 flex flex-col hover:border-[#E07BA3] transition-colors duration-200"
            >
              <Stars />
              <p className="text-white text-base leading-relaxed italic flex-1">
                &ldquo;{quote}&rdquo;
              </p>
              <p className="text-[#BFBFBF] text-sm font-bold mt-4">
                — {name}, {role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
