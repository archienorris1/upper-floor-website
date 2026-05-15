import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, email, phone, brandName, podcastLink, industry, goal } = body

  if (!firstName || !email || !phone || !brandName || !podcastLink || !industry || !goal) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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
      to: 'info@upperfloor.co',
      replyTo: email,
      subject: `New Podcast Audit Request from ${firstName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: #E07BA3; padding: 24px 32px;">
            <h2 style="margin: 0; color: #000; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">
              New Podcast Audit Request
            </h2>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: 700; color: #E07BA3; width: 160px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; color: #fff;">${firstName}</td>
              </tr>
              <tr style="border-top: 1px solid #222;">
                <td style="padding: 10px 0; font-weight: 700; color: #E07BA3; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; color: #fff;"><a href="mailto:${email}" style="color: #E07BA3;">${email}</a></td>
              </tr>
              <tr style="border-top: 1px solid #222;">
                <td style="padding: 10px 0; font-weight: 700; color: #E07BA3; vertical-align: top;">Phone</td>
                <td style="padding: 10px 0; color: #fff;">${phone}</td>
              </tr>
              <tr style="border-top: 1px solid #222;">
                <td style="padding: 10px 0; font-weight: 700; color: #E07BA3; vertical-align: top;">Brand / Podcast</td>
                <td style="padding: 10px 0; color: #fff;">${brandName}</td>
              </tr>
              <tr style="border-top: 1px solid #222;">
                <td style="padding: 10px 0; font-weight: 700; color: #E07BA3; vertical-align: top;">Podcast Link</td>
                <td style="padding: 10px 0; color: #fff;"><a href="${podcastLink}" style="color: #E07BA3;">${podcastLink}</a></td>
              </tr>
              <tr style="border-top: 1px solid #222;">
                <td style="padding: 10px 0; font-weight: 700; color: #E07BA3; vertical-align: top;">Industry</td>
                <td style="padding: 10px 0; color: #fff;">${industry}</td>
              </tr>
              <tr style="border-top: 1px solid #222;">
                <td style="padding: 10px 0; font-weight: 700; color: #E07BA3; vertical-align: top;">Goal</td>
                <td style="padding: 10px 0; color: #fff;">${goal.replace(/\n/g, '<br/>')}</td>
              </tr>
            </table>
            <p style="color: #555; font-size: 12px; margin-top: 32px; border-top: 1px solid #222; padding-top: 16px;">
              Sent from upperfloor.co free podcast audit form
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
