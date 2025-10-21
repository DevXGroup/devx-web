import nodemailer from 'nodemailer'

interface ContactEmailPayload {
  name?: string
  email: string
  message: string
  source: 'footer' | 'contact-page' | 'unknown'
}

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_FORWARD_TO,
  CONTACT_FROM_EMAIL,
} = process.env

const SUPPORT_EMAIL_FALLBACK = 'support@devxgroup.io'

const resolvePort = (port?: string) => {
  if (!port) return undefined
  const parsed = Number(port)
  return Number.isFinite(parsed) ? parsed : undefined
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: resolvePort(SMTP_PORT) ?? 587,
        secure: resolvePort(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      })
    : null

export const isEmailConfigured = () => Boolean(transporter)

export async function sendContactEmail(payload: ContactEmailPayload) {
  if (!transporter) {
    throw new Error('Email transport is not configured. Set SMTP_* environment variables.')
  }

  const to = CONTACT_FORWARD_TO ?? SUPPORT_EMAIL_FALLBACK
  const from = (() => {
    if (CONTACT_FROM_EMAIL) return CONTACT_FROM_EMAIL
    if (SMTP_USER) {
      return SMTP_USER.includes('@')
        ? SMTP_USER
        : `${SUPPORT_EMAIL_FALLBACK.split('@')[0]}@${SMTP_USER}`
    }
    return SUPPORT_EMAIL_FALLBACK
  })()

  const subject = `DevX Website Inquiry (${
    payload.source === 'footer' ? 'Footer' : payload.source === 'contact-page' ? 'Contact Page' : 'Website'
  })`

  const plainText = [
    `Source: ${payload.source}`,
    payload.name ? `Name: ${payload.name}` : null,
    `Email: ${payload.email}`,
    '',
    'Message:',
    payload.message,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111">
      <p><strong>Source:</strong> ${payload.source}</p>
      ${payload.name ? `<p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>` : ''}
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `

  await transporter.sendMail({
    to,
    from,
    replyTo: payload.email,
    subject,
    text: plainText,
    html,
  })
}
