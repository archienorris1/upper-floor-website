const navLinks = ['WORK', 'ABOUT', 'SERVICES', 'RESOURCES']

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <a
            href="#"
            className="text-white font-black text-xl tracking-[-0.03em] uppercase hover:text-[#E07BA3] transition-colors duration-200"
          >
            UPPER FLOOR
          </a>

          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#BFBFBF] text-sm hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
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

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[#BFBFBF] text-sm">
            © {new Date().getFullYear()} Upper Floor. All rights reserved.
          </p>
          <a
            href="#contact"
            className="bg-[#E07BA3] text-black text-sm font-black px-5 py-2.5 uppercase tracking-wide hover:bg-[#cc6d95] transition-colors duration-200"
          >
            BOOK A CALL ↗
          </a>
        </div>

      </div>
    </footer>
  )
}
