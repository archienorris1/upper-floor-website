/* eslint-disable @next/next/no-img-element */

export default function SiteFooter() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-brand-ink px-5 py-12 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <img src="/media/logo-white.png" alt="Upper Floor" className="h-14 w-auto" />
          <nav className="flex gap-6 text-sm text-white/70">
            <a href="/contact" className="hover:text-white">
              Contact
            </a>
            <a href="/insights" className="hover:text-white">
              Insights
            </a>
          </nav>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Upper Floor. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
