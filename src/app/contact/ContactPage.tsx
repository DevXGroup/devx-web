'use client'

import { useState, useEffect, useRef, useCallback, type ChangeEvent, type FormEvent } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  CheckCircle,
  Calendar,
  Send,
  User,
  MessageCircle,
  X,
  Copy,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import BlurText from '@/components/animations/BlurText'
import StarBorder from '@/components/animations/StarBorder'
import { useIsMobile } from '@/hooks/use-mobile'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
        textColor?: string
        primaryColor?: string
        backgroundColor?: string
        branding?: boolean
        prefill?: Record<string, unknown>
        utm?: Record<string, string>
      }) => void
    }
  }
}

const Lightning = dynamic(() => import('@/components/animations/Lightning'), {
  ssr: false,
  loading: () => null,
})

const Orb = dynamic(() => import('@/components/animations/Orb'), {
  ssr: false,
  loading: () => null,
})

const Confetti = dynamic(() => import('@/components/animations/Confetti'), {
  ssr: false,
  loading: () => null,
})

const Particles = dynamic(() => import('@/components/animations/Particles'), {
  ssr: false,
  loading: () => null,
})

// Render TextPressure on the client to avoid hydration mismatch from its layout tweaks
const TextPressureFallback = () => (
  <h1
    className="text-center text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-[#86EFAC] via-[#D8B4FE] to-[#86EFAC] bg-clip-text text-transparent uppercase"
    style={{ fontFamily: 'var(--font-playfair-display)' }}
  >
    Contact Us
  </h1>
)

const TextPressure = dynamic(() => import('@/components/animations/TextPressure'), {
  ssr: false,
  loading: () => <TextPressureFallback />,
})

// Always Visible Lightning with Natural Fade
const IntermittentLightning = ({
  hue,
  xOffset,
  speed,
  intensity,
  size,
}: {
  hue: number
  xOffset: number
  speed: number
  intensity: number
  size: number
}) => {
  const [lightningIntensity, setLightningIntensity] = useState(1.0) // Start at full brightness

  useEffect(() => {
    const createLightningCycle = () => {
      // Flash at full brightness
      setLightningIntensity(1.0) // 100% intensity

      // Hold the brightness briefly
      setTimeout(() => {
        // Fade down to dim level
        setLightningIntensity(0.02) // 2% intensity

        // Wait for next cycle - exactly 5 seconds
        setTimeout(createLightningCycle, 5000) // 5 second delay
      }, 500) // Hold bright for 0.5 seconds
    }

    // Start the cycle after initial delay
    const timer = setTimeout(createLightningCycle, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="w-full h-full"
      animate={{
        opacity: lightningIntensity,
        scale: lightningIntensity > 0.8 ? [1, 1.01, 1] : 1,
      }}
      transition={{
        opacity: {
          duration: lightningIntensity > 0.5 ? 0.1 : 2.0,
          ease: lightningIntensity > 0.5 ? 'linear' : 'easeOut',
        },
        scale: { duration: 0.15, ease: 'easeOut' },
      }}
    >
      <Lightning hue={hue} xOffset={xOffset} speed={speed} intensity={intensity} size={size} />
    </motion.div>
  )
}

// Enhanced animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
  },
  tap: { scale: 0.98 },
}

const exampleProjectRequest = `Subject: Custom E-commerce Platform Development

"Hi there! I'm looking to build a custom e-commerce platform for my growing business.

Key Requirements:
• Inventory management system
• Payment processing (Stripe/PayPal)
• Customer analytics dashboard
• Mobile-responsive design
• SEO optimization

Timeline: 3-4 months
Budget: $45,000 - $55,000

I'd love to discuss this project further and see how DevX Group can help bring this vision to life. Looking forward to hearing from you!"`

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    agreeToTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isTyping, setIsTyping] = useState(false)
  const [typingIntensity, setTypingIntensity] = useState(0)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 })
  const [showExampleModal, setShowExampleModal] = useState(false)
  const [hasCopiedExample, setHasCopiedExample] = useState(false)
  const [showLightning, setShowLightning] = useState(false)
  const [confettiReady, setConfettiReady] = useState(false)
  const [showOrb, setShowOrb] = useState(false)
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const formRef = useRef(null)
  const isFormInView = useInView(formRef, { once: true })
  const isMobile = useIsMobile()
  const calendlyContainerRef = useRef<HTMLDivElement | null>(null)
  const calendlyScriptPromiseRef = useRef<Promise<void> | null>(null)
  const [calendlyHeight, setCalendlyHeight] = useState(1100)
  const clampCalendlyHeight = useCallback(
    (height: number) => {
      const minHeight = isMobile ? 1180 : 1000
      const maxHeight = isMobile ? 1800 : 1600
      return Math.min(Math.max(height, minHeight), maxHeight)
    },
    [isMobile]
  )
  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false)
  }, [])
  const calendlyEmbedUrl =
    'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?hide_gdpr_banner=1&embed_type=Inline&background_color=050505&text_color=E2E8F0&primary_color=4CD787'

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateHeight = () => {
      const viewportHeight = typeof window.innerHeight !== 'undefined' ? window.innerHeight : 0
      const baseHeight = viewportHeight + (isMobile ? 420 : 240)
      const nextHeight = clampCalendlyHeight(baseHeight)

      setCalendlyHeight((previous) => (previous === nextHeight ? previous : nextHeight))
    }

    updateHeight()

    try {
      window.addEventListener('resize', updateHeight)
    } catch (error) {
      console.error('Failed to add resize event listener:', error)
    }

    try {
      window.addEventListener('orientationchange', updateHeight)
    } catch (error) {
      console.error('Failed to add orientationchange event listener:', error)
    }

    return () => {
      try {
        window.removeEventListener('resize', updateHeight)
      } catch (error) {
        console.error('Failed to remove resize event listener:', error)
      }

      try {
        window.removeEventListener('orientationchange', updateHeight)
      } catch (error) {
        console.error('Failed to remove orientationchange event listener:', error)
      }
    }
  }, [clampCalendlyHeight, isMobile])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const allowedOrigins = new Set(['https://calendly.com', 'https://calendly.eu'])

    const handleMessage = (event: MessageEvent) => {
      if (!allowedOrigins.has(event.origin)) {
        return
      }

      const data = event.data
      if (!data || typeof data !== 'object') {
        return
      }

      if (data.event === 'calendly.page_height') {
        const payload = data.payload
        if (!payload) {
          return
        }
        const incomingHeight = Number(payload.height)
        if (!Number.isFinite(incomingHeight) || incomingHeight <= 0) {
          return
        }

        const bufferedHeight = incomingHeight + (isMobile ? 160 : 120)
        const nextHeight = clampCalendlyHeight(bufferedHeight)
        setCalendlyHeight((previous) => (previous === nextHeight ? previous : nextHeight))
      }
    }

    try {
      window.addEventListener('message', handleMessage)
    } catch (error) {
      console.error('Failed to add message event listener:', error)
    }

    return () => {
      try {
        window.removeEventListener('message', handleMessage)
      } catch (error) {
        console.error('Failed to remove message event listener:', error)
      }
    }
  }, [clampCalendlyHeight, isMobile])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const containerElement = calendlyContainerRef.current
    if (!containerElement) {
      return
    }

    let isCancelled = false
    let observer: IntersectionObserver | null = null

    const initializeWidget = () => {
      if (
        isCancelled ||
        !window.Calendly ||
        typeof window.Calendly.initInlineWidget !== 'function' ||
        !containerElement.isConnected
      ) {
        return
      }

      containerElement.innerHTML = ''

      try {
        window.Calendly.initInlineWidget({
          url: calendlyEmbedUrl,
          parentElement: containerElement,
          textColor: '#E2E8F0',
          primaryColor: '#4CD787',
          backgroundColor: '#050505',
          branding: false,
        })
      } catch (error) {
        console.error('Failed to initialize Calendly widget:', error)
      }
    }

    const loadCalendly = () => {
      if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
        initializeWidget()
        return
      }

      if (!calendlyScriptPromiseRef.current) {
        calendlyScriptPromiseRef.current = new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://assets.calendly.com/assets/external/widget.js'
          script.async = true
          script.onload = () => {
            if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
              resolve()
            } else {
              reject(new Error('Calendly widget function not available after script load'))
            }
          }
          script.onerror = () => reject(new Error('Failed to load Calendly widget script'))
          document.head.appendChild(script)
        })
      }

      calendlyScriptPromiseRef.current
        ?.then(() => {
          if (!isCancelled) {
            initializeWidget()
          }
        })
        .catch((error) => {
          calendlyScriptPromiseRef.current = null
          if (process.env.NODE_ENV !== 'production') {
            console.error('Calendly initialization error:', error)
          }
        })
    }

    // Use IntersectionObserver to lazy-load Calendly only when section is near viewport
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry?.isIntersecting) {
            loadCalendly()
            observer?.disconnect()
          }
        },
        {
          rootMargin: '200px', // Start loading 200px before section is visible
        }
      )

      observer.observe(containerElement)
    } else {
      // Fallback for browsers without IntersectionObserver
      loadCalendly()
    }

    return () => {
      isCancelled = true
      if (observer) {
        observer.disconnect()
      }
      containerElement.innerHTML = ''
    }
  }, [calendlyEmbedUrl])

  // Defer WebGL-heavy lightning animation to improve LCP
  // Wait for hero section to be visible before loading
  useEffect(() => {
    let idleHandle: number | null = null
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null
    let observer: IntersectionObserver | null = null

    const enableLightning = () => {
      setShowLightning(true)
    }

    // Only load lightning after LCP is captured (after hero is painted)
    const heroSection = document.querySelector('section[data-contact-hero]')

    if (heroSection && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry?.isIntersecting) {
            // Hero is visible, wait a bit longer for LCP
            if (typeof window !== 'undefined') {
              const requestIdle = window.requestIdleCallback?.bind(window)
              if (requestIdle) {
                idleHandle = requestIdle(
                  () => {
                    enableLightning()
                  },
                  { timeout: 2500 }
                )
              }
            }

            if (idleHandle === null) {
              timeoutHandle = setTimeout(enableLightning, 1800)
            }

            observer?.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(heroSection)
    } else {
      // Fallback: Much longer delay to ensure LCP happens first
      timeoutHandle = setTimeout(enableLightning, 1800)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
      if (idleHandle !== null && typeof window !== 'undefined') {
        window.cancelIdleCallback?.(idleHandle)
      }
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }
    }
  }, [])

  // Prepare gradient animation styles and handle cleanup
  useEffect(() => {
    // Add the keyframes animation to the document if it doesn't exist
    if (typeof document !== 'undefined' && !document.getElementById('gradient-animation-style')) {
      try {
        const style = document.createElement('style')
        style.id = 'gradient-animation-style'
        style.innerHTML = `
      @keyframes gradient-animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `
        if (document.head) {
          document.head.appendChild(style)
        }
      } catch (error) {
        console.error('Failed to create gradient animation style:', error)
      }
    }

    return () => {
      // Clean up typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
        copyTimeoutRef.current = null
      }
      // Clean up style
      if (typeof document !== 'undefined') {
        try {
          const style = document.getElementById('gradient-animation-style')
          if (style && document.head && style.parentNode === document.head) {
            document.head.removeChild(style)
          }
        } catch (error) {
          console.error('Failed to remove gradient animation style:', error)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (showConfetti) {
      setConfettiReady(true)
    }
  }, [showConfetti])

  useEffect(() => {
    if ((isFormInView || isTyping) && !showOrb) {
      setShowOrb(true)
    }
  }, [isFormInView, isTyping, showOrb])

  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Debounced typing detection to prevent rapid state changes
    if (!isTyping) {
      setIsTyping(true)
    }

    // Update intensity smoothly without rapid changes
    setTypingIntensity(Math.min(value.length / 20, 1.2))

    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout with reduced delay for more responsive animation
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      setTypingIntensity(0)
    }, 400) // Very quick response

    // Clear errors when user starts typing
    if ((formErrors as any)[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
    if (submitError) {
      setSubmitError(null)
    }
  }

  const validateForm = () => {
    const errors: any = {}
    if (!formState.name.trim()) errors.name = 'Name is required'
    if (!formState.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      errors.email = 'Invalid email format'
    if (!formState.message.trim()) errors.message = 'Message is required'
    return errors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      // Scroll to first error field for better UX
      const errorFields = ['name', 'email', 'message']
      const firstErrorField = errorFields.find((field) => errors[field as keyof typeof errors])
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element?.focus()
      }
      return
    }

    // Capture button position for confetti with defensive checks
    const form = e.currentTarget
    let submitButton: HTMLButtonElement | null = null
    if (form && typeof form.querySelector === 'function') {
      submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null
    }

    if (submitButton && typeof submitButton.getBoundingClientRect === 'function') {
      const rect = submitButton.getBoundingClientRect()
      setConfettiOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2 - 30, // Slightly above button
      })
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
          source: 'contact-page',
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      })

      if (!response.ok) {
        let data: any = null
        try {
          data = await response.json()
        } catch {
          // If response.json() fails, set a default error
          setSubmitError(
            'We could not send your message. Please try again or email support@devxgroup.io.'
          )
          return
        }

        const apiErrors = (data?.errors ?? {}) as Record<string, string[]>
        const nextErrors: Record<string, string> = {}
        if (apiErrors.name?.[0]) nextErrors.name = apiErrors.name[0]
        if (apiErrors.email?.[0]) nextErrors.email = apiErrors.email[0]
        if (apiErrors.message?.[0]) nextErrors.message = apiErrors.message[0]
        if (Object.keys(nextErrors).length > 0) {
          setFormErrors(nextErrors)
        }

        setSubmitError(
          data?.message ??
            'We could not send your message. Please try again or email support@devxgroup.io.'
        )
        return
      }

      setIsSubmitted(true)
      setShowConfetti(true)

      // Reset form after showing success message
      setTimeout(() => {
        setFormState({ name: '', email: '', message: '', agreeToTerms: false })
      }, 2000)
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitError('We could not send your message. Please email support@devxgroup.io directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyExample = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }

    const onSuccess = () => {
      setHasCopiedExample(true)
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }
      copyTimeoutRef.current = setTimeout(() => {
        setHasCopiedExample(false)
        copyTimeoutRef.current = null
      }, 2000)
    }

    try {
      // Use writeText directly - most reliable method for plain text
      await navigator.clipboard.writeText(exampleProjectRequest)
      onSuccess()
    } catch (error) {
      console.error('Failed to copy example text to clipboard:', error)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti Animation */}
      {confettiReady && (
        <Confetti
          isActive={showConfetti}
          onComplete={handleConfettiComplete}
          duration={3000}
          particleCount={120}
          originX={confettiOrigin.x}
          originY={confettiOrigin.y}
        />
      )}
      {/* Hero Section with Lightning Background - Reduced height for better LCP */}
      <section
        data-contact-hero
        className="relative pt-0 pb-8 overflow-hidden h-[45vh] min-h-[400px]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black" />

        {/* Lightning Effect Background - Natural thunderstorm, centered */}
        <div className="absolute -top-24 left-0 right-0 bottom-0 opacity-75 w-full">
          {showLightning && (
            <IntermittentLightning hue={200} xOffset={0} speed={0.8} intensity={0.9} size={1.6} />
          )}
        </div>

        {/* Bottom fade-out overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' }}
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[#4CD787]/10 to-[#4834D4]/10 rounded-full blur-3xl -top-48 -left-24"
          />
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              delay: 1,
            }}
            className="absolute w-[500px] h-[500px] bg-gradient-to-l from-[#4834D4]/10 to-[#4CD787]/10 rounded-full blur-3xl top-96 -right-24"
          />
        </div>

        <div className="relative container mx-auto px-3 sm:px-4 pt-12 sm:pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center mt-2 sm:mt-4 md:mt-6 py-4 sm:py-8 md:py-3">
              <div className="flex items-center justify-center w-full mb-2 sm:mb-4">
                <div className="relative h-[80px] sm:h-[100px] w-full max-w-[570px] p-0 m-0 mx-auto">
                  <TextPressure
                    text="&nbsp;&nbsp;Contact&nbsp;Us&nbsp;&nbsp;  "
                    fontFamily="var(--font-playfair-display)"
                    flex={false}
                    alpha={false}
                    stroke={false}
                    width={false}
                    weight={true}
                    italic={false}
                    minFontSize={32}
                  />
                </div>
              </div>
              <p className="section-subtitle max-w-2xl text-center mt-0 mb-4 text-sm sm:text-base md:text-lg px-2">
                Contact us to discuss your mission requirements and objectives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="pt-1 pb-12 sm:pb-20 relative">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Information Card */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 h-fit"
            >
              <div className="space-y-8">
                <div>
                  <BlurText
                    text="Contact Information"
                    className="justify-start text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-editorial"
                    delay={50}
                    startDelay={100}
                    stepDuration={0.4}
                    once={true}
                  />
                  <p className="subtitle-lg mb-8 mt-6">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="heading-subsection text-foreground">Phone</h3>
                    <a
                      href="tel:+14425440591"
                      className="text-body text-zinc-400 hover:text-white transition-colors duration-200 hover:underline"
                      aria-label="Call DevX Group at +1 (442) 544-0591"
                    >
                      +1 (442) 544-0591
                    </a>
                    <p className="text-body-small text-zinc-500 mt-1">
                      Mon-Fri from 8am to 5pm PST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="heading-subsection text-foreground">Email</h3>
                    <a
                      href="mailto:support@devxgroup.io"
                      className="text-body text-foreground/70 hover:text-white transition-colors duration-200 hover:underline"
                      aria-label="Email DevX Group at support@devxgroup.io"
                    >
                      support@devxgroup.io
                    </a>
                    <p className="text-body-small text-foreground/50 mt-1">
                      We&apos;ll respond as quickly as possible
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="heading-subsection text-foreground">Locations</h3>
                    <p className="text-body text-foreground/70">
                      San Diego, California{' '}
                      <span className="text-body-small text-foreground/50">(Headquarters)</span>
                    </p>
                    <span className="text-foreground/30 flex justify-left ml-7">{'|'}</span>
                    <p className="text-body text-foreground/30">
                      Kuwait City, Kuwait{' '}
                      <span className="text-body-small text-foreground/30">
                        (Development Partner Location)
                      </span>
                    </p>
                    <p className="text-body-small text-foreground/50 mt-2">
                      <span className="text-white font-medium">
                        Serving clients globally through local and remote teams
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="heading-subsection text-foreground">
                      Schedule a Free Consultation
                    </h3>
                    <p className="text-body text-foreground/70">
                      We&apos;ll tailor the session to your project
                    </p>
                    <a
                      href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-body text-[#D1FAE5] hover:underline"
                    >
                      View availability →
                    </a>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="pt-8 border-t border-white/10">
                  <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.youtube.com/channel/UC6Zqx3Bhwbberq_MEmlgpIw"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/devx-group-llc/"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://github.com/DevXGroup"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://www.instagram.com/devx_group/"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Card */}
            <motion.div
              ref={formRef}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isFormInView ? 'visible' : 'hidden'}
              className="lg:col-span-3 bg-black/40 backdrop-blur-sm p-4 sm:p-6 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#4CD787]/10 rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4834D4]/10 rounded-full blur-3xl z-0"></div>

              <div className="relative z-10">
                <BlurText
                  text="Send us a message"
                  className="justify-start text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-editorial"
                  delay={50}
                  startDelay={100}
                  stepDuration={0.4}
                  once={true}
                />

                <div className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2"
                        >
                          <User className="w-4 h-4" />
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          autoComplete="name"
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            (formErrors as any).name ? 'border-red-500' : 'border-white/10'
                          } rounded-lg focus:outline-none focus:border-white text-foreground shadow-inner transition-colors duration-300`}
                          placeholder="Enter your full name"
                          required
                        />
                        {(formErrors as any).name && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {(formErrors as any).name}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            (formErrors as any).email ? 'border-red-500' : 'border-white/10'
                          } rounded-lg focus:outline-none focus:border-white text-foreground shadow-inner transition-colors duration-300`}
                          placeholder="your@email.com"
                          required
                        />
                        {(formErrors as any).email && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {(formErrors as any).email}
                          </motion.p>
                        )}
                      </div>
                    </div>
                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-4"
                      >
                        {submitError}
                      </motion.p>
                    )}

                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Your Message
                      </label>

                      {/* Main textarea container */}
                      <div className="relative">
                        {/* WebGL Orb Animation - centered in textarea, larger size */}
                        <div
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          style={{ zIndex: 1 }}
                        >
                          <div
                            className="w-40 h-40 opacity-30 rounded-full overflow-hidden"
                            style={{
                              background: 'transparent',
                              isolation: 'isolate',
                              willChange: 'transform',
                              backfaceVisibility: 'hidden',
                            }}
                          >
                            <div
                              className="w-full h-full"
                              style={{
                                contain: 'strict',
                                transform: 'translateZ(0)',
                              }}
                            >
                              {showOrb && (
                                <Orb
                                  hue={isTyping ? 35 : 130}
                                  hoverIntensity={
                                    isTyping ? Math.min(typingIntensity * 2.5, 1.0) : 0.15
                                  }
                                  rotateOnHover={true}
                                  forceHoverState={isTyping}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={16}
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            (formErrors as any).message ? 'border-red-500' : 'border-white/10'
                          } rounded-lg focus:outline-none focus:border-white text-foreground shadow-inner transition-colors duration-300 resize-none placeholder:text-foreground/40 placeholder:font-light relative z-10 pr-24`}
                          placeholder="Tell us about your project requirements, timeline, and budget..."
                          required
                        ></textarea>

                        {/* Example button positioned inside */}
                        <button
                          type="button"
                          onClick={() => setShowExampleModal(true)}
                          className="absolute top-3 right-4 z-20 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-foreground/70 hover:text-foreground transition-all duration-200 backdrop-blur-sm shadow-sm"
                          style={{ transform: 'translate(14px, -14px)' }}
                        >
                          See Example
                        </button>
                      </div>

                      {(formErrors as any).message && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-400 text-sm mt-1"
                        >
                          {(formErrors as any).message}
                        </motion.p>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      {/* Success Message */}
                      <div className="flex-1 mr-4">
                        {isSubmitted && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="flex items-center gap-2 text-[#4CD787]"
                          >
                            <CheckCircle className="w-5 h-5" />
                            <div className="text-sm">
                              <span className="font-semibold">Thank you for your message!</span>
                              <br />
                              <span className="text-foreground/70">
                                Please allow 24hrs for follow up email.
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div style={{ transform: 'translateY(-20px)' }}>
                        <StarBorder
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative overflow-hidden bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                          color="#FFFFFF"
                          speed="3s"
                        >
                          <span className="relative z-10 flex items-center">
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: 'linear',
                                  }}
                                  className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full mr-2"
                                />
                                Sending...
                              </>
                            ) : isSubmitted ? (
                              <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Message Sent!
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send
                                  className={`ml-2 w-5 h-5 transition-transform duration-300 ${
                                    isSubmitting ? '' : 'group-hover:translate-x-1'
                                  }`}
                                />
                              </>
                            )}
                          </span>
                        </StarBorder>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendly Embed Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <BlurText
              text="Schedule a Free Consultation"
              className="justify-center heading-section text-white mb-6 font-editorial"
              delay={50}
              startDelay={150}
              stepDuration={0.4}
              once={true}
            />
            <p className="subtitle-lg mb-8 mt-6">
              Book a time that works for you using our online scheduling tool. No back-and-forth
              emails needed.
            </p>
          </motion.div>

          <div className="bg-[#050505] p-4 md:p-6 rounded-2xl border border-white/10 shadow-[0_0_35px_rgba(4,4,8,0.45)] overflow-hidden">
            <div className="relative rounded-xl">
              <div
                ref={calendlyContainerRef}
                className="w-full rounded-xl overflow-hidden"
                style={{
                  minWidth: '320px',
                  minHeight: calendlyHeight,
                  height: calendlyHeight,
                  backgroundColor: '#050505',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-xl border border-white/10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* FAQ Section */}
      <section className="py-20 relative z-[5000]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <BlurText
              text="Frequently Asked Questions"
              className="justify-center heading-section text-white mb-6 font-editorial"
              delay={50}
              startDelay={150}
              stepDuration={0.4}
              once={true}
            />
            <p className="subtitle-lg mt-6">
              Find quick answers to common questions about our services and process.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="heading-subsection mb-3 text-white transition-colors duration-300">
                What is your typical response time?
              </h3>
              <p className="text-body text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                We typically respond to all inquiries within 24 hours during business days. For
                urgent matters, we prioritize faster response times.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="heading-subsection mb-3 text-white transition-colors duration-300">
                Do you work with international clients?
              </h3>
              <p className="text-body text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                Yes, we work with clients worldwide. Our team is experienced in remote collaboration
                and can accommodate different time zones.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="heading-subsection mb-3 text-white transition-colors duration-300">
                What information should I provide for a quote?
              </h3>
              <p className="text-body text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                To provide an accurate quote, we need details about your project scope, timeline,
                technical requirements, and any specific features you need.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="heading-subsection mb-3 text-white transition-colors duration-300">
                How do you handle project revisions?
              </h3>
              <p className="text-body text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                We include revision rounds in our project plans. The number of revisions depends on
                your package, but we&apos;re always flexible to ensure your satisfaction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Example Modal */}
      {showExampleModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
          onClick={() => setShowExampleModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl p-6 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Message Example</h3>
                <p className="text-foreground/60 text-sm mt-1">
                  Copy the template below to fast-track your outreach.
                </p>
              </div>
              <button
                onClick={() => setShowExampleModal(false)}
                className="text-foreground/60 hover:text-foreground transition-colors p-1"
                aria-label="Close example modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/5 rounded-lg p-4 text-sm text-foreground/80 leading-relaxed">
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="leading-relaxed">
                  <span className="text-[#4CD787] font-medium">Subject:</span> Custom E-commerce
                  Platform Development
                </p>
                <button
                  type="button"
                  onClick={handleCopyExample}
                  className={`p-1 transition-colors focus:outline-none ${
                    hasCopiedExample ? 'text-[#4CD787]' : 'text-foreground/60 hover:text-foreground'
                  }`}
                  aria-label="Copy example request text"
                >
                  {hasCopiedExample ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="mb-4">
                &quot;Hi there! I&apos;m looking to build a custom e-commerce platform for my
                growing business.
              </p>
              <p className="mb-4">
                <span className="text-[#FFD700] font-medium">Key Requirements:</span>
                <br />
                • Inventory management system
                <br />
                • Payment processing (Stripe/PayPal)
                <br />
                • Customer analytics dashboard
                <br />
                • Mobile-responsive design
                <br />• SEO optimization
              </p>
              <p className="mb-4">
                <span className="text-[#4CD787] font-medium">Timeline:</span> 3-4 months
                <br />
                <span className="text-[#4CD787] font-medium">Budget:</span> $45,000 - $55,000
              </p>
              <p>
                I&apos;d love to discuss this project further and see how DevX Group can help bring
                this vision to life. Looking forward to hearing from you!&quot;
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowExampleModal(false)}
                className="px-4 py-2 bg-white hover:bg-zinc-200 text-black rounded-lg transition-colors duration-200 font-medium"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
