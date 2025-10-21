declare module 'nodemailer' {
  export interface TransportAuth {
    user: string
    pass: string
  }

  export interface TransportOptions {
    host?: string
    port?: number
    secure?: boolean
    auth?: TransportAuth
  }

  export interface SendMailOptions {
    to: string
    from: string
    replyTo?: string
    subject: string
    text: string
    html: string
  }

  export interface SentMessageInfo {
    accepted: string[]
    rejected: string[]
    pending?: string[]
    response?: string
    messageId?: string
    envelope?: {
      from?: string
      to?: string[]
    }
  }

  export interface Transporter<T = SentMessageInfo> {
    sendMail(mailOptions: SendMailOptions): Promise<T>
  }

  export function createTransport(options: TransportOptions): Transporter

  const nodemailer: {
    createTransport: typeof createTransport
  }

  export default nodemailer
}
