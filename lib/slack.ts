/**
 * Slack lead alerts. Every lead the site produces — contact-form enquiries and
 * Cal.com bookings — is posted to #leads via an Incoming Webhook.
 *
 * SLACK_WEBHOOK_URL is server-only (never NEXT_PUBLIC_): the URL is a credential,
 * anyone holding it can post into the workspace. Unset = no-op, so local dev and
 * previews stay quiet instead of erroring.
 */

type Field = { label: string; value: string }

const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL ?? ''

/** Slack renders mrkdwn, so these three characters have to be escaped in user input. */
function escape(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Post a lead to Slack. Never throws: a Slack outage must not cost us the lead
 * itself, so callers carry on and the failure is logged for the Vercel logs.
 */
export async function notifySlack(title: string, fields: Field[], context?: string) {
  if (!WEBHOOK_URL) return false

  const body = {
    // Fallback text for notifications//unfurls, where blocks aren't rendered.
    text: title,
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: title, emoji: true } },
      {
        type: 'section',
        fields: fields
          .filter((f) => f.value)
          .map((f) => ({
            type: 'mrkdwn',
            text: `*${f.label}*\n${escape(f.value)}`,
          })),
      },
      ...(context
        ? [{ type: 'context', elements: [{ type: 'mrkdwn', text: escape(context) }] }]
        : []),
    ],
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) console.error('Slack webhook failed:', res.status, await res.text())
    return res.ok
  } catch (error) {
    console.error('Slack webhook error:', error)
    return false
  }
}
