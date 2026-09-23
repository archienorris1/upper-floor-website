/*
  Enquiries go to Signal first (which stores them and pings #leads in Slack),
  email second.

  SIGNAL_LEADS_SECRET is the one that matters — the SMTP block below is optional.
  If those vars are unset the route still succeeds, so a missing Gmail app password
  can no longer swallow an enquiry (it did exactly that from 2026-08-01).

  Vercel Dashboard → Project → Settings → Environment Variables:
  SIGNAL_LEADS_SECRET = same value as LEADS_SECRET in the Signal-App project

  Optional email copy:
  SMTP_HOST = smtp.gmail.com
  SMTP_PORT = 587
  SMTP_USER = your-gmail@gmail.com
  SMTP_PASS = your-gmail-app-password
  CONTACT_EMAIL = info@upperfloor.co

  To get a Gmail App Password:
  Google Account → Security → 2-Step Verification
  → App Passwords → Generate
  Use that 16-character password as SMTP_PASS.
  Never use your real Gmail password here.
*/

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { sendLeadToSignal } from '@/lib/leads'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, email, company, message } = body

  if (!firstName || !email || !message) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Signal first: it stores the lead and pings #leads in Slack, and it must not
  // depend on SMTP being configured.
  const slacked = await sendLeadToSignal({
    name: `${firstName} ${lastName ?? ''}`.trim(),
    email,
    company,
    message,
  })

  // No SMTP configured? Signal already has the enquiry — don't fail the visitor.
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    if (slacked) return NextResponse.json({ success: true }, { status: 200 })
    console.error('Contact form: neither Signal nor SMTP configured')
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Upper Floor Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B8A3F;">New Upper Floor Website Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #666;">Name</td>
              <td style="padding: 8px;">${firstName} ${lastName}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #666;">Email</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #666;">Company</td>
              <td style="padding: 8px;">${company || 'Not provided'}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 8px;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">
            Sent from upperfloor.co contact form
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Email send error:', error)
    // The lead is safe in Signal, so only report failure if that missed too.
    if (slacked) return NextResponse.json({ success: true }, { status: 200 })
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
