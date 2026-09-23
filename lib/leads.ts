/**
 * Website → Signal. Contact-form enquiries are posted to Signal's /api/leads,
 * which stores them in `inbound_leads` and pings #leads in Slack.
 *
 * Signal owns leads (it already holds the Slack bot, the CRM and the staff UI),
 * so the site stays a thin forwarder. Cal.com bookings don't come through here at
 * all — Cal posts them to Signal directly via its own webhook.
 *
 * SIGNAL_LEADS_SECRET is server-only and must match LEADS_SECRET in Signal.
 * Unset = no-op, so local dev and previews never write to the live CRM.
 */

const ENDPOINT = process.env.SIGNAL_LEADS_URL ?? 'https://signal.upperfloor.co/api/leads'
const SECRET = process.env.SIGNAL_LEADS_SECRET ?? ''

export type Lead = {
  name: string
  email: string
  company?: string
  message: string
}

/**
 * Send a lead to Signal. Never throws: if Signal is down the visitor must still
 * get a success screen, and the email copy below is the backstop.
 */
export async function sendLeadToSignal(lead: Lead) {
  if (!SECRET) return false

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SECRET}`,
      },
      body: JSON.stringify({ source: 'contact_form', ...lead }),
    })
    if (!res.ok) console.error('Signal leads failed:', res.status, await res.text())
    return res.ok
  } catch (error) {
    console.error('Signal leads error:', error)
    return false
  }
}
