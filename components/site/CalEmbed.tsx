'use client'

import { useEffect } from 'react'

const EMBED_JS = 'https://app.cal.com/embed/embed.js'
const ORIGIN = 'https://app.cal.com'

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean
  ns: Record<string, CalFn>
  q: unknown[][]
}

declare global {
  interface Window {
    Cal?: CalFn
  }
}

/**
 * Cal.com's loader stub, written out longhand instead of pasted as a minified
 * one-liner. It defines window.Cal as a queue and appends embed.js; every call
 * made before the script lands is replayed once it does. embed.js throws if this
 * queue isn't already in place, so it has to run before anything else touches Cal.
 */
function installCalStub() {
  if (window.Cal) return

  const enqueue = (target: CalFn, args: unknown[]) => {
    target.q.push(args)
  }

  const cal = function (...args: unknown[]) {
    if (!cal.loaded) {
      cal.ns = {}
      cal.q = cal.q || []
      const script = document.createElement('script')
      script.src = EMBED_JS
      script.async = true
      document.head.appendChild(script)
      cal.loaded = true
    }

    if (args[0] === 'init') {
      const namespace = args[1]
      if (typeof namespace === 'string') {
        if (!cal.ns[namespace]) {
          const api = function (...nsArgs: unknown[]) {
            enqueue(api, nsArgs)
          } as CalFn
          api.q = []
          api.ns = {}
          cal.ns[namespace] = api
        }
        enqueue(cal.ns[namespace], args)
        enqueue(cal, ['initNamespace', namespace])
        return
      }
    }

    enqueue(cal, args)
  } as CalFn

  cal.q = []
  cal.ns = {}
  window.Cal = cal
}

type Props = {
  /** Cal.com booking link, e.g. "upper-floor/upper-floor-intro-call". */
  calLink: string
  /** Stable DOM id the calendar mounts into. Must be unique on the page. */
  id: string
  /** Match the surrounding section so the calendar doesn't glare. */
  theme?: 'light' | 'dark'
  /** Reserved height, so the page doesn't jump while the calendar loads. */
  minHeight?: number
  className?: string
}

export default function CalEmbed({
  calLink,
  id,
  theme = 'light',
  minHeight = 700,
  className,
}: Props) {
  useEffect(() => {
    installCalStub()

    const cal = window.Cal
    if (!cal) return

    // One namespace per mount point, so two embeds never fight over the same one.
    const namespace = id

    cal('init', namespace, { origin: ORIGIN })
    cal.ns[namespace]('inline', {
      elementOrSelector: `#${id}`,
      calLink,
      // theme is set here as well as in ui() below: this one themes the container
      // and loading skeleton, ui() themes the calendar inside the iframe.
      config: { layout: 'month_view', theme },
    })
    cal.ns[namespace]('ui', {
      theme,
      layout: 'month_view',
      hideEventTypeDetails: false,
      cssVarsPerTheme: {
        light: { 'cal-brand': '#1B8A3F' },
        dark: { 'cal-brand': '#1B8A3F' },
      },
    })
  }, [calLink, id, theme])

  return <div id={id} className={className} style={{ minHeight, width: '100%' }} />
}
