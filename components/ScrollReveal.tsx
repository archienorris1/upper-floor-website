'use client'

import { useEffect } from 'react'

const REVEAL_SELECTOR = '.reveal-on-scroll, .reveal-headline, .reveal-scale, .reveal-slide-right'

export default function ScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    const observeElements = (root: Element | Document) => {
      const els = root.querySelectorAll(REVEAL_SELECTOR)
      els.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          io.observe(el)
        }
      })
    }

    requestAnimationFrame(() => {
      observeElements(document)
    })

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches(REVEAL_SELECTOR)) {
              io.observe(node)
            }
            observeElements(node)
          }
        })
      })
    })

    mo.observe(document.body, { childList: true, subtree: true })

    const timeout = setTimeout(() => mo.disconnect(), 5000)

    return () => {
      io.disconnect()
      mo.disconnect()
      clearTimeout(timeout)
    }
  }, [])

  return null
}
