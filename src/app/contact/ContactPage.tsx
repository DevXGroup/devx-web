'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  ArrowRight,
  CheckCircle,
  Calendar,
  Send,
  User,
  MessageCircle,
  X,
} from 'lucide-react'
import BlurText from '@/components/animations/BlurText'
import TextPressure from '@/components/animations/TextPressure'
import Lightning from '@/components/animations/Lightning'

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
import Orb from '@/components/animations/Orb'
import Confetti from '@/components/animations/Confetti'

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

// Enhanced AnimatedGradientText component with better animation
const AnimatedGradientText = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <span
    className={`bg-clip-text text-transparent inline-block ${className}`}
    style={{
      backgroundImage: 'linear-gradient(-45deg, #4CD787, #FFD700, #9d4edd, #4834D4)',
      backgroundSize: '300% 300%',
      animation: 'gradient-animation 6s ease infinite',
    }}
  >
    {children}
  </span>
)

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    agreeToTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [calendarLoaded, setCalendarLoaded] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isTyping, setIsTyping] = useState(false)
  const [typingIntensity, setTypingIntensity] = useState(0)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 })
  const [showExampleModal, setShowExampleModal] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const formRef = useRef(null)
  const isFormInView = useInView(formRef, { once: true })

  // Initialize Calendly widget when component mounts
  useEffect(() => {
    // Add the keyframes animation to the document if it doesn't exist
    if (!document.getElementById('gradient-animation-style')) {
      const style = document.createElement('style')
      style.id = 'gradient-animation-style'
      style.innerHTML = `
      @keyframes gradient-animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `
      document.head.appendChild(style)
    }

    return () => {
      // Clean up typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      // Clean up style
      const style = document.getElementById('gradient-animation-style')
      if (style) {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    // Add Calendly script if it doesn't exist
    if (!document.querySelector('script[src*="calendly.com"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => {
        setCalendarLoaded(true)

        // Initialize Calendly with dark mode
        setTimeout(() => {
          if ((window as any).Calendly) {
            const widget = document.querySelector('.calendly-inline-widget') as HTMLElement
            if (widget) {
              // Initialize with dark mode settings using proper URL parameters
              ;(window as any).Calendly.initInlineWidget({
                url: 'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?background_color=000000&text_color=ffffff&primary_color=4CD787&hide_gdpr_banner=1',
                parentElement: widget,
                prefill: {},
                utm: {},
                styles: {
                  height: '1000px',
                },
              })
            }
          }
        }, 1000)
      }
      document.body.appendChild(script)

      return () => {
        // Clean up script when component unmounts
        const existingScript = document.querySelector('script[src*="calendly.com"]')
        if (existingScript) {
          document.body.removeChild(existingScript)
        }
      }
    } else {
      // Script already exists, set calendar as loaded
      setCalendarLoaded(true)
      return undefined
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormState((prev) => ({ ...prev, [name]: checked }))
    
    // Clear errors when user checks the box
    if ((formErrors as any)[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Capture button position for confetti
    const button = e.target as HTMLFormElement
    const submitButton = button.querySelector('button[type="submit"]') as HTMLButtonElement
    if (submitButton) {
      const rect = submitButton.getBoundingClientRect()
      setConfettiOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2 - 30, // Slightly above button
      })
    }

    setIsSubmitting(true)
    setFormErrors({})

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Only trigger confetti if not already shown to prevent double animation
      if (!showConfetti) {
        setShowConfetti(true)
      }

      // Reset form after showing success message
      setTimeout(() => {
        setFormState({ name: '', email: '', message: '', agreeToTerms: false })
      }, 2000) // Keep form usable

      // Success message stays persistent until page refresh - no auto-reset
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti Animation */}
      <Confetti
        isActive={showConfetti}
        onComplete={() => setShowConfetti(false)}
        duration={3000}
        particleCount={120}
        originX={confettiOrigin.x}
        originY={confettiOrigin.y}
      />
      {/* Hero Section with Lightning Background - Reduced height */}
      <section className="relative pt-0 pb-8 overflow-hidden h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black" />

        {/* Lightning Effect Background - Natural thunderstorm, centered */}
        <div className="absolute -top-24 left-0 right-0 bottom-0 opacity-75 w-full">
          <IntermittentLightning hue={200} xOffset={0} speed={0.8} intensity={0.9} size={1.6} />
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

        <div className="relative container mx-auto px-4 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center mt-8 py-12">
              <div className="flex items-center justify-center w-full">
                <div
                  style={{
                    position: 'relative',
                    height: '100px',
                    width: '400px',
                    padding: '0 20px',
                    marginRight: '30px',
                  }}
                >
                  <TextPressure
                    text="Contact&nbsp;Us  "
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={false}
                    textColor="#4CD787"
                    strokeColor="#FFFFFF"
                    minFontSize={32}
                  />
                </div>
              </div>
              <p
                className="text-lg md:text-xl text-foreground/90 font-light max-w-2xl text-center mb-5 leading-relaxed font-['IBM_Plex_Sans']"
                style={{
                  letterSpacing: '0.025em',
                  fontWeight: '400',
                }}
              >
                Contact us to discuss your mission requirements and objectives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="pt-16 pb-20 relative -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Information Card */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 h-fit"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                  <p
                    className="text-lg md:text-xl text-foreground/90 font-light mb-8 leading-relaxed font-['IBM_Plex_Sans'] mt-6"
                    style={{
                      letterSpacing: '0.025em',
                      fontWeight: '400',
                    }}
                  >
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#4CD787]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Phone</h3>
                    <p className="text-foreground/70">+1 (442)544-0591</p>
                    <p className="text-foreground/50 text-sm mt-1">Mon-Fri from 8am to 5pm PST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#4CD787]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Email</h3>
                    <p className="text-foreground/70">support@devxgroup.io</p>
                    <p className="text-foreground/50 text-sm mt-1">
                      We&apos;ll respond as quickly as possible
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#4CD787]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Locations</h3>
                    <p className="text-foreground/70">
                      San Diego, California{' '}
                      <span className="text-foreground/50 text-sm">(Headquarters)</span>
                    </p>
                    <span className="text-foreground/30 flex justify-left ml-7">{'|'}</span>
                    <p className="text-foreground/30">
                      Kuwait City, Kuwait{' '}
                      <span className="text-foreground/30 text-sm">
                        (Development Partner Location)
                      </span>
                    </p>
                    <p className="text-foreground/50 text-sm mt-2">
                      <span className="text-[#4CD787] font-medium">
                        Serving clients globally through local and remote teams
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-[#4CD787]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Schedule a Call</h3>
                    <p className="text-foreground/70">Book a free consultation</p>
                    <a
                      href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-[#4CD787] hover:underline"
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
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4CD787]/20 flex items-center justify-center transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="w-5 h-5 text-[#4CD787]" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/devx-group-llc/"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4CD787]/20 flex items-center justify-center transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 text-[#4CD787]" />
                    </a>
                    <a
                      href="https://github.com/DevXGroup"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4CD787]/20 flex items-center justify-center transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 text-[#4CD787]" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4CD787]/20 flex items-center justify-center transition-colors duration-300"
                    >
                      <Instagram className="w-5 h-5 text-[#4CD787]" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4CD787]/20 flex items-center justify-center transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
              className="lg:col-span-3 bg-black/40 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#4CD787]/10 rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4834D4]/10 rounded-full blur-3xl z-0"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>

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
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            (formErrors as any).name ? 'border-red-500' : 'border-white/10'
                          } rounded-lg focus:outline-none focus:border-[#4CD787] text-foreground shadow-inner transition-colors duration-300`}
                          placeholder="Enter your full name"
                          required
                        />
                        {(formErrors as any).name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
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
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            (formErrors as any).email ? 'border-red-500' : 'border-white/10'
                          } rounded-lg focus:outline-none focus:border-[#4CD787] text-foreground shadow-inner transition-colors duration-300`}
                          placeholder="your@email.com"
                          required
                        />
                        {(formErrors as any).email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {(formErrors as any).email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Your Message
                      </label>

                      <div className="flex gap-3">
                        {/* Main textarea column */}
                        <div className="flex-1 relative">
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
                                <Orb
                                  hue={isTyping ? 35 : 130}
                                  hoverIntensity={
                                    isTyping ? Math.min(typingIntensity * 2.5, 1.0) : 0.15
                                  }
                                  rotateOnHover={true}
                                  forceHoverState={isTyping}
                                />
                              </div>
                            </div>
                          </div>

                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            rows={16}
                            className={`w-full px-4 py-3 bg-white/15 backdrop-blur-lg border ${
                              (formErrors as any).message ? 'border-red-500' : 'border-white/30'
                            } rounded-lg focus:outline-none focus:border-[#4CD787] text-foreground shadow-inner transition-colors duration-300 resize-none placeholder:text-foreground/40 placeholder:font-light relative z-10`}
                            placeholder="Tell us about your project requirements, timeline, and budget..."
                            required
                          ></textarea>

                          {/* Example button column */}
                          <div className="w-20 justify-right pt-2">
                            <button
                              type="button"
                              onClick={() => setShowExampleModal(true)}
                              className="px-3 py-2 text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-foreground/70 hover:text-foreground transition-all duration-200 backdrop-blur-sm"
                            >
                              Example
                            </button>
                          </div>
                        </div>
                      </div>

                      {(formErrors as any).message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
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
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-[#4CD787]"
                          >
                            <CheckCircle className="w-5 h-5" />
                            <div className="text-sm">
                              <span className="font-semibold">Thank you for your message!</span>
                              <br />
                              <span className="text-foreground/70">Please allow 24hrs for follow up email.</span>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        variants={buttonVariants}
                        initial="rest"
                        whileHover={shouldReduceMotion ? {} : 'hover'}
                        whileTap={shouldReduceMotion ? {} : 'tap'}
                        className="group relative overflow-hidden bg-gradient-to-r from-[#4CD787] to-[#3CC76D] hover:from-[#3CC76D] hover:to-[#4CD787] text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
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
                      </motion.button>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-[#FFD700]">
              Schedule your free Consultation
            </h2>
            <p
              className="text-lg md:text-xl text-foreground/90 font-light mb-8 leading-relaxed font-['IBM_Plex_Sans'] mt-6"
              style={{
                letterSpacing: '0.025em',
                fontWeight: '400',
              }}
            >
              Book a time that works for you using our online scheduling tool. No back-and-forth
              emails needed.
            </p>
          </motion.div>

          <div className="bg-black/40 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 overflow-hidden">
            <div
              className="calendly-inline-widget"
              data-calendly-theme="dark"
              data-url="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?background_color=000000&text_color=ffffff&primary_color=4CD787&hide_gdpr_banner=1"
              style={{
                minWidth: '320px',
                height: '1000px',
                backgroundColor: '#000000',
                border: 'none',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            ></div>

            {/* Enhanced dark mode enforcement */}
            <style jsx global>{`
              /* Force dark theme for entire Calendly widget */
              .calendly-inline-widget {
                background-color: #000000 !important;
                color: #ffffff !important;
                border-radius: 12px;
                overflow: hidden;
              }

              .calendly-inline-widget iframe {
                background-color: #000000 !important;
                border-radius: 12px;
                filter: none !important;
              }

              /* Override Calendly's default white theme */
              .calendly-inline-widget * {
                background-color: transparent !important;
                color: inherit !important;
              }

              /* Specific overrides for common Calendly elements */
              .calendly-popup-content,
              .calendly-overlay,
              [data-calendly-theme],
              .calendly-badge-content,
              .calendly-badge-widget {
                background-color: #000000 !important;
                color: #ffffff !important;
              }

              /* Try to force dark mode through data attributes */
              .calendly-inline-widget[data-calendly-theme='dark'] {
                background-color: #000000 !important;
              }

              /* Additional fallback for stubborn elements */
              .calendly-inline-widget > div,
              .calendly-inline-widget iframe body {
                background-color: #000000 !important;
                color: #ffffff !important;
              }

              /* Hide cookie settings text from Calendly */
              .calendly-cookie-settings {
                display: none !important;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-[#FFD700]">Frequently Asked Questions</h2>
            <p
              className="text-lg md:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans'] mt-6"
              style={{
                letterSpacing: '0.025em',
                fontWeight: '400',
              }}
            >
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
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#4CD787] group-hover:text-white transition-colors duration-300">
                What is your typical response time?
              </h3>
              <p className="text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                We typically respond to all inquiries within 24 hours during business days. For
                urgent matters, we prioritize faster response times.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#4CD787] group-hover:text-white transition-colors duration-300">
                Do you work with international clients?
              </h3>
              <p className="text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                Yes, we work with clients worldwide. Our team is experienced in remote collaboration
                and can accommodate different time zones.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#4CD787] group-hover:text-white transition-colors duration-300">
                What information should I provide for a quote?
              </h3>
              <p className="text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                To provide an accurate quote, we need details about your project scope, timeline,
                technical requirements, and any specific features you need.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#4CD787] group-hover:text-white transition-colors duration-300">
                How do you handle project revisions?
              </h3>
              <p className="text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl p-6 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Message Example</h3>
              <button
                onClick={() => setShowExampleModal(false)}
                className="text-foreground/60 hover:text-foreground transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/5 rounded-lg p-4 text-sm text-foreground/80 leading-relaxed">
              <p className="mb-3">
                <span className="text-[#4CD787] font-medium">Subject:</span> Custom E-commerce
                Platform Development
              </p>
              <p className="mb-4">
                &quot;Hi there! I&apos;m looking to build a custom e-commerce platform for my growing
                business.
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
                I&apos;d love to discuss this project further and see how DevX Group can help bring this
                vision to life. Looking forward to hearing from you!&quot;
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowExampleModal(false)}
                className="px-4 py-2 bg-[#4CD787] hover:bg-[#3CC76D] text-black rounded-lg transition-colors duration-200 font-medium"
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
