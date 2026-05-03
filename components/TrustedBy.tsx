const companies = [
  { name: 'Calendly', weight: '700', size: '1.1rem' },
  { name: 'monday.com', weight: '900', size: '1rem' },
  { name: 'Clari', weight: '400', size: '1.2rem' },
  { name: 'Brex', weight: '800', size: '1.3rem' },
  { name: 'PandaDoc', weight: '600', size: '1rem' },
  { name: 'Needle', weight: '700', size: '1.05rem' },
  { name: 'Vanta', weight: '900', size: '1.15rem' },
]

export default function TrustedBy() {
  return (
    <section className="py-12 border-t border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="text-[#BFBFBF] text-xs uppercase tracking-[0.2em] mb-8">
          Trusted by teams at
        </p>
        <div className="flex items-center justify-between flex-wrap gap-6">
          {companies.map(({ name, weight, size }) => (
            <span
              key={name}
              className="text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
              style={{ fontWeight: weight, fontSize: size }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
