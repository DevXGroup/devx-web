import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isEmailConfigured, sendContactEmail } from '@/lib/email'

export const runtime = 'nodejs'

const contactSchema = z
  .object({
    source: z.enum(['footer', 'contact-page', 'unknown']).default('unknown'),
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(120, 'Name is too long')
      .optional()
      .or(z.literal('').transform(() => undefined)),
    email: z
      .string({ message: 'Email is required' })
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email'),
    message: z
      .string({ message: 'Message is required' })
      .trim()
      .min(1, 'Message is required')
      .max(5000, 'Message is too long'),
  })
  .strict()

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid JSON payload',
      },
      { status: 400 }
    )
  }

  const parsed = contactSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message: 'Email service is not configured. Please try again later.',
      },
      { status: 503 }
    )
  }

  try {
    const contactPayload = {
      email: parsed.data.email,
      message: parsed.data.message,
      source: parsed.data.source,
      ...(parsed.data.name ? { name: parsed.data.name } : {}),
    }

    await sendContactEmail(contactPayload)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send contact email', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    )
  }
}
