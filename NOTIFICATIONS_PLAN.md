# 📬 Contact Messages & Calendly Notifications Implementation Plan

## Overview

This plan outlines how to implement real-time notifications for:
1. **Contact Form Submissions** - Receive instant notifications when users submit messages via footer or contact page
2. **Calendly Bookings** - Get notified immediately when someone schedules a meeting

---

## Phase 1: Contact Form Notifications

### Current System
- **Location:** `src/app/api/contact/route.ts`
- **Frontend:** `src/components/FooterContactForm.tsx`
- **Currently:** Sends email only

### New Flow
```
User submits form → API validates → Sends EMAIL + SMS/TELEGRAM → User gets instant notification
```

---

## Option A: Telegram Notifications (⭐ RECOMMENDED - Easiest)

### Why Telegram?
- ✅ **Free forever** - No per-message costs
- ✅ **Fastest setup** - 5 minutes
- ✅ **Works everywhere** - Any internet connection
- ✅ **Interactive** - Can reply and manage from Telegram
- ✅ **No SMS limits** - Unlimited messages

### Setup Steps

#### 1. Create Telegram Bot
1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Type `/start` and follow the prompts
3. Type `/newbot` and create a bot
4. Copy the **Bot Token** (looks like: `123456789:ABCdefGHIjklmnoPQRstuvWXYZ`)
5. Open your bot and note the **Chat ID** (you'll need to do a test message)

#### 2. Get Your Chat ID
1. Go to this URL in your browser: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe`
   - Replace `<YOUR_BOT_TOKEN>` with your token
2. Send a test message to your bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for `"chat":{"id":123456789}` - that's your Chat ID

#### 3. Add Environment Variables
Create/update `.env.local`:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

#### 4. Install Package
```bash
pnpm add node-telegram-bot-api
```

#### 5. Create Telegram Helper
Create `src/lib/telegram.ts`:
```typescript
const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false })

interface ContactMessage {
  name?: string
  email: string
  message: string
  source: 'footer' | 'contact-page' | 'unknown'
}

export async function sendContactNotification(data: ContactMessage) {
  const text = `
📬 New Contact Message

**Source:** ${data.source === 'footer' ? '📌 Footer' : '💬 Contact Page'}
**Name:** ${data.name || '(not provided)'}
**Email:** ${data.email}

**Message:**
${data.message}
  `.trim()

  try {
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, text, {
      parse_mode: 'Markdown',
    })
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
    throw error
  }
}
```

#### 6. Modify Contact API Route
Update `src/app/api/contact/route.ts`:
```typescript
// Add at top after other imports
import { sendContactNotification } from '@/lib/telegram'

// In the try block, after sendContactEmail:
await sendContactNotification({
  name: parsed.data.name,
  email: parsed.data.email,
  message: parsed.data.message,
  source: parsed.data.source,
})
```

### What You'll Receive
```
📬 New Contact Message

Source: 📌 Footer
Name: John Doe
Email: john@example.com

Message:
I'm interested in learning more about your services. Can you provide pricing?
```

---

## Option B: SMS via Twilio (Alternative)

### Why Twilio?
- ✅ Text messages to your phone
- ✅ Universal - works on any phone
- ❌ Costs ~$0.0075 per SMS
- ❌ Takes longer setup (15+ minutes)

### Setup Steps

#### 1. Create Twilio Account
1. Sign up at [twilio.com](https://www.twilio.com)
2. Get a Twilio phone number
3. Copy: **Account SID**, **Auth Token**, **Phone Number**

#### 2. Add Environment Variables
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_TO_PHONE_NUMBER=+your_phone_number
```

#### 3. Install Package
```bash
pnpm add twilio
```

#### 4. Create SMS Helper
Create `src/lib/sms.ts`:
```typescript
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

interface ContactMessage {
  name?: string
  email: string
  message: string
  source: 'footer' | 'contact-page' | 'unknown'
}

export async function sendSMSNotification(data: ContactMessage) {
  const text = `New message from ${data.name || 'Unknown'} (${data.email}). Source: ${data.source}. Message: "${data.message.substring(0, 100)}..."`

  try {
    await client.messages.create({
      body: text,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.TWILIO_TO_PHONE_NUMBER,
    })
  } catch (error) {
    console.error('Failed to send SMS notification:', error)
    throw error
  }
}
```

#### 5. Modify Contact API Route
Update `src/app/api/contact/route.ts`:
```typescript
// Add at top after other imports
import { sendSMSNotification } from '@/lib/sms'

// In the try block, after sendContactEmail:
await sendSMSNotification({
  name: parsed.data.name,
  email: parsed.data.email,
  message: parsed.data.message,
  source: parsed.data.source,
})
```

---

## Phase 2: Calendly Booking Notifications

### Current System
- **Status:** Calendly embedded on contact page
- **Currently:** No notifications when someone books

### New Flow
```
User books on Calendly → Calendly webhook fires → Your API receives event → You get notified
```

---

## Setup Steps

### 1. Create Calendly Webhook Endpoint
Create `src/app/api/calendly-webhook/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendContactNotification } from '@/lib/telegram'

export const runtime = 'nodejs'

interface CalendlyWebhookPayload {
  event: string
  payload: {
    invitee: {
      name: string
      email: string
    }
    event: {
      name: string
      scheduled_event: {
        start_time: string
        end_time: string
      }
    }
  }
}

// Verify webhook signature for security
function verifySignature(request: NextRequest, body: string): boolean {
  const signature = request.headers.get('calendly-webhook-signature')
  if (!signature) return false

  const secret = process.env.CALENDLY_WEBHOOK_SECRET
  if (!secret) {
    console.warn('CALENDLY_WEBHOOK_SECRET not configured')
    return false
  }

  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('base64')

  return signature === `sha256=${hash}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()

    // Verify webhook signature
    if (!verifySignature(request, body)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload: CalendlyWebhookPayload = JSON.parse(body)

    // Only handle booking events
    if (payload.event !== 'invitee.created') {
      return NextResponse.json({ status: 'ignored' })
    }

    const { invitee, event } = payload.payload
    const startTime = new Date(event.scheduled_event.start_time).toLocaleString()

    // Send Telegram notification
    await sendContactNotification({
      name: invitee.name,
      email: invitee.email,
      message: `📅 Meeting booked: "${event.name}" at ${startTime}`,
      source: 'contact-page',
    })

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
```

### 2. Get Calendly Webhook Secret
1. Go to [Calendly Developer Settings](https://calendly.com/app/settings/integrations/webhooks)
2. Create a new webhook subscription
3. Set webhook URL to: `https://yoursite.com/api/calendly-webhook`
4. Subscribe to: `invitee.created`
5. Copy the **Webhook Secret**

### 3. Add Environment Variables
```env
CALENDLY_WEBHOOK_SECRET=your_webhook_secret_here
```

### 4. Deploy and Test
```bash
pnpm build
pnpm start
```

Test by booking a meeting through Calendly - you should get a Telegram notification!

---

## Implementation Checklist

### Phase 1: Telegram Contact Notifications
- [ ] Create Telegram bot with @BotFather
- [ ] Get Bot Token and Chat ID
- [ ] Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to `.env.local`
- [ ] Run `pnpm add node-telegram-bot-api`
- [ ] Create `src/lib/telegram.ts`
- [ ] Modify `src/app/api/contact/route.ts` to import and call Telegram function
- [ ] Test by submitting footer form
- [ ] Verify Telegram notification received
- [ ] Run `pnpm lint:fix` and `pnpm build`
- [ ] Commit changes

### Phase 2: Calendly Webhook Notifications
- [ ] Create `src/app/api/calendly-webhook/route.ts`
- [ ] Go to Calendly Developer Settings and create webhook
- [ ] Get webhook secret
- [ ] Add `CALENDLY_WEBHOOK_SECRET` to `.env.local`
- [ ] Update webhook URL to production domain
- [ ] Test by booking a Calendly meeting
- [ ] Verify Telegram notification received
- [ ] Run `pnpm lint:fix` and `pnpm build`
- [ ] Commit changes

### (Optional) Phase 3: SMS Fallback
- [ ] Create Twilio account
- [ ] Get credentials (SID, Token, Phone numbers)
- [ ] Add to `.env.local`
- [ ] Run `pnpm add twilio`
- [ ] Create `src/lib/sms.ts`
- [ ] Modify contact route to also call SMS function
- [ ] Test SMS delivery
- [ ] Run `pnpm lint:fix` and `pnpm build`

---

## Environment Variables Summary

### For Telegram (Phase 1)
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmnoPQRstuvWXYZ
TELEGRAM_CHAT_ID=987654321
```

### For Calendly (Phase 2)
```env
CALENDLY_WEBHOOK_SECRET=your_webhook_secret
```

### For SMS/Twilio (Optional)
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_TO_PHONE_NUMBER=+your_number
```

---

## Resources & Documentation

### Telegram
- [node-telegram-bot-api - npm](https://www.npmjs.com/package/node-telegram-bot-api)
- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Guide](https://t.me/botfather)

### Twilio
- [Twilio SMS Quickstart](https://www.twilio.com/docs/messaging/quickstart)
- [How to Send SMS with Node.js](https://www.twilio.com/en-us/blog/how-to-send-sms-node-js)

### Calendly
- [Calendly Webhooks Overview](https://help.calendly.com/hc/en-us/articles/223195488-Webhooks-overview)
- [Calendly Developer API](https://developer.calendly.com/getting-started)
- [Webhooks Guide for 2025](https://zeeg.me/en/blog/post/calendly-webhooks)

---

## Recommended Implementation Order

1. **Start with Phase 1 (Telegram)** - Quickest to set up, instant gratification
2. **Then Phase 2 (Calendly Webhook)** - Builds on Phase 1's Telegram setup
3. **Optional Phase 3 (SMS)** - Add as backup or preference

**Total estimated time:** 30-45 minutes for both critical phases

---

## Notes

- All notifications use the same Telegram bot/channel for consistency
- Webhook signature verification ensures only legitimate Calendly requests are processed
- No external services called unless explicitly configured in `.env.local`
- Graceful error handling - failures don't break the contact form
- Ready for production use with proper environment variable management

