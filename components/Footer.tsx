import Image from 'next/image'

const colOne = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
]

const colTwo = [
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
  { label: 'Client Portal', href: '/login' },
]

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-white/[0.06] py-16 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Top row — 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <a href="#" aria-label="Upper Floor — home">
              <Image
                src="/logo.png"
                alt="Upper Floor"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <p className="text-[#BFBFBF] text-sm leading-relaxed max-w-[200px]">
              B2B podcast production agency for growth-focused companies.
            </p>
          </div>

          {/* Col 2: Work / Process / About */}
          <nav aria-label="Footer navigation group 1">
            <ul className="flex flex-col gap-3">
              {colOne.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[#BFBFBF] text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Insights / Contact / Careers */}
          <nav aria-label="Footer navigation group 2">
            <ul className="flex flex-col gap-3">
              {colTwo.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[#BFBFBF] text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Social icons */}
          <div className="flex items-start gap-4">
            {socialLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="text-[#BFBFBF] hover:text-white transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom row: copyright */}
        <div className="pt-8 border-t border-white/[0.06]">
          <p className="text-[#BFBFBF] text-sm">
            © 2026 Upper Floor. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
