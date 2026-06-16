const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Sanitise inputs (strip HTML)
  const clean = s => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Gmail SMTP transporter — credentials come from Vercel env vars
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,        // e.g. yourname@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD, // 16-char App Password from Google
    },
  });

  const emailSubject = subject
    ? `[Portfolio] ${subject}`
    : `[Portfolio] New message from ${name}`;

  const htmlBody = `
  <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
    <div style="background:#06090F;padding:24px 32px;border-radius:10px 10px 0 0">
      <p style="font-family:monospace;font-size:12px;color:#38BDF8;letter-spacing:.1em;margin:0">PORTFOLIO CONTACT</p>
      <h2 style="color:#E2EEFF;margin:8px 0 0;font-size:22px">New message from ${clean(name)}</h2>
    </div>
    <div style="background:#ffffff;padding:28px 32px;border:1px solid #e2e8f0;border-top:none">
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <tr style="border-bottom:1px solid #f1f5f9">
          <td style="padding:10px 0;font-size:13px;color:#64748b;width:90px">From</td>
          <td style="padding:10px 0;font-size:14px">
            <strong>${clean(name)}</strong>
            &nbsp;·&nbsp;
            <a href="mailto:${clean(email)}" style="color:#38BDF8;text-decoration:none">${clean(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;font-size:13px;color:#64748b">Subject</td>
          <td style="padding:10px 0;font-size:14px">${clean(subject || '(no subject)')}</td>
        </tr>
      </table>
      <div style="background:#f8fafc;border-left:3px solid #38BDF8;padding:16px 20px;border-radius:0 6px 6px 0">
        <p style="font-size:12px;color:#94a3b8;margin:0 0 10px;text-transform:uppercase;letter-spacing:.08em">Message</p>
        <p style="font-size:15px;line-height:1.75;color:#0f172a;margin:0;white-space:pre-wrap">${clean(message)}</p>
      </div>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f1f5f9">
        <a href="mailto:${clean(email)}?subject=Re: ${encodeURIComponent(emailSubject)}"
           style="display:inline-block;background:#38BDF8;color:#06090F;text-decoration:none;padding:10px 22px;border-radius:6px;font-size:13px;font-weight:600">
          Reply to ${clean(name)} →
        </a>
      </div>
    </div>
    <div style="background:#f8fafc;padding:14px 32px;border-radius:0 0 10px 10px;border:1px solid #e2e8f0;border-top:none">
      <p style="font-size:11px;color:#94a3b8;margin:0">
        Sent via <a href="https://pranjay-portfolio.vercel.app" style="color:#38BDF8">pranjay-portfolio.vercel.app</a>
      </p>
    </div>
  </div>`;

  try {
    await transporter.sendMail({
      from: `"Portfolio — Pranjay Dhawan" <${process.env.GMAIL_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to: 'pdhawan50_be23@thapar.edu',
      subject: emailSubject,
      text: `From: ${name} <${email}>\nSubject: ${subject || '—'}\n\n${message}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mailer error:', err.message);
    return res.status(500).json({
      error: 'Could not send your message. Please email pdhawan50_be23@thapar.edu directly.',
    });
  }
}
