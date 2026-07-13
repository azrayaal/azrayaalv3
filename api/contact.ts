import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

/**
 * Contact form endpoint.
 *
 * Runs as a Vercel serverless function and delivers through the owner's own
 * Gmail account over SMTP — no third-party mail service, and the credentials
 * never reach the browser. Configure in Vercel → Settings → Environment
 * Variables:
 *
 *   MAIL_USER          the Gmail address that sends (and receives) the mail
 *   MAIL_APP_PASSWORD  a Google App Password (not the account password)
 *   MAIL_TO            optional — where enquiries land; defaults to MAIL_USER
 */

const MAX_LENGTH = { name: 120, email: 200, message: 5000 } as const;

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string,
  );

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, message, company } = (request.body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill every field they find, humans never see this one.
  if (typeof company === 'string' && company.trim() !== '') {
    return response.status(200).json({ ok: true });
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    name.trim().length === 0 ||
    !isEmail(email) ||
    message.trim().length < 12 ||
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    message.length > MAX_LENGTH.message
  ) {
    return response.status(400).json({ error: 'Please check the form and try again.' });
  }

  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.error('Mail credentials are not configured.');
    return response.status(500).json({ error: 'Email is not configured on the server.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    await transporter.sendMail({
      // Gmail rejects a spoofed From, so the site sends as itself and the
      // visitor's address goes in Reply-To — hitting reply answers them.
      from: `Portfolio contact <${user}>`,
      to: process.env.MAIL_TO || user,
      replyTo: `${name} <${email}>`,
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n---\nFrom: ${name} <${email}>`,
      html: `
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        <hr />
        <p>From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      `,
    });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return response
      .status(502)
      .json({ error: 'Could not send the message. Please email directly.' });
  }
}
