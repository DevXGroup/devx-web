'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function FooterContactForm() {
  const [formState, setFormState] = useState({
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<{ email?: string; message?: string }>({})

  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (submitError) {
      setSubmitError(null)
    }
  }

  const validateForm = () => {
    const errors: { email?: string; message?: string } = {}
    if (!formState.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Invalid email format'
    }
    if (!formState.message.trim()) {
      errors.message = 'Message is required'
    }
    return errors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setIsSubmitting(true)
    setFormErrors({})
    setSubmitError(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'footer',
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        const apiErrors = (data?.errors ?? {}) as Record<string, string[]>
        const nextErrors: { email?: string; message?: string } = {}
        if (apiErrors.email?.[0]) nextErrors.email = apiErrors.email[0]
        if (apiErrors.message?.[0]) nextErrors.message = apiErrors.message[0]
        if (Object.keys(nextErrors).length > 0) {
          setFormErrors(nextErrors)
        }
        setSubmitError(data?.message ?? 'We could not send your message. Please try again shortly.')
        return
      }

      setIsSubmitted(true)
      setFormState({ email: '', message: '' })
      setTimeout(() => {
        setIsSubmitted(false)
      }, 4000)
    } catch {
      setSubmitError('We could not send your message. Please email support@devxgroup.io directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 lg:mb-6 text-white flex items-end h-8">
        Get in touch
      </h3>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 rounded-lg p-6 text-center backdrop-blur-sm"
        >
          <CheckCircle className="w-12 h-12 text-[#4CD787] mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Message Sent!</h3>
          <p className="text-zinc-400 text-sm">We&apos;ll be in touch shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="mb-1.5 text-xs font-medium text-zinc-400">Email</p>
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="email"
              className={`bg-zinc-900/50 border ${
                formErrors.email ? 'border-red-500/50' : 'border-white/10'
              } text-zinc-200 placeholder:text-zinc-500 text-sm focus:border-white/20 focus:ring-0 transition-all duration-300 rounded-lg`}
            />
            {formErrors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400/90 text-xs mt-1.5"
              >
                {formErrors.email}
              </motion.p>
            )}
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-zinc-400">Message</p>
            <Textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className={`bg-zinc-900/50 border ${
                formErrors.message ? 'border-red-500/50' : 'border-white/10'
              } text-zinc-200 placeholder:text-zinc-500 min-h-[100px] text-sm focus:border-white/20 focus:ring-0 transition-all duration-300 rounded-lg resize-none`}
            />
            {formErrors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400/90 text-xs mt-1.5"
              >
                {formErrors.message}
              </motion.p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-zinc-200 text-sm font-semibold transition-all duration-300 rounded-lg py-5 mt-2 shadow-lg shadow-white/5 hover:shadow-white/10"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          {submitError && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs"
            >
              {submitError}
            </motion.p>
          )}
        </form>
      )}
    </div>
  )
}
