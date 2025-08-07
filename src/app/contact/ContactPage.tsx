"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion, useInView } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  CheckCircle,
  Calendar,
  Send,
  User,
  MessageCircle
} from "lucide-react"
import BlurText from "@/components/BlurText"
import TextPressure from "@/components/TextPressure"

// Enhanced animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
}

// Enhanced AnimatedGradientText component with better animation
const AnimatedGradientText = ({ children, className = "" }) => (
  <span
    className={`bg-clip-text text-transparent inline-block ${className}`}
    style={{
      backgroundImage: "linear-gradient(-45deg, #4CD787, #CFB53B, #9d4edd, #4834D4)",
      backgroundSize: "300% 300%",
      animation: "gradient-animation 6s ease infinite",
    }}
  >
    {children}
  </span>
)

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [calendarLoaded, setCalendarLoaded] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const shouldReduceMotion = useReducedMotion()
  const formRef = useRef(null)
  const isFormInView = useInView(formRef, { once: true })

  // Initialize Calendly widget when component mounts
  useEffect(() => {
    // Add the keyframes animation to the document if it doesn't exist
    if (!document.getElementById("gradient-animation-style")) {
      const style = document.createElement("style")
      style.id = "gradient-animation-style"
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
      // Clean up
      const style = document.getElementById("gradient-animation-style")
      if (style) {
        document.head.removeChild(style)
      }
    }
  }, [])

  useEffect(() => {
    // Add Calendly script if it doesn't exist
    if (!document.querySelector('script[src*="calendly.com"]')) {
      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      script.onload = () => {
        setCalendarLoaded(true)

        // Initialize Calendly with dark mode
        setTimeout(() => {
          if (window.Calendly) {
            const widget = document.querySelector('.calendly-inline-widget')
            if (widget) {
              // Clear any existing content
              widget.innerHTML = ''

              // Initialize with dark mode settings using proper URL parameters
              window.Calendly.initInlineWidget({
                url: 'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?background_color=000000&text_color=ffffff&primary_color=4CD787&hide_gdpr_banner=1',
                parentElement: widget,
                prefill: {},
                utm: {},
                styles: {
                  height: '1000px'
                }
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
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formState.name.trim()) errors.name = "Name is required"
    if (!formState.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) errors.email = "Invalid email format"
    if (!formState.message.trim()) errors.message = "Message is required"
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    setFormErrors({})

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setFormState({ name: "", email: "", message: "" })
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Animated Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black" />

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[#4CD787]/10 to-[#4834D4]/10 rounded-full blur-3xl -top-48 -left-24"
          />
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
            className="absolute w-[500px] h-[500px] bg-gradient-to-l from-[#4834D4]/10 to-[#4CD787]/10 rounded-full blur-3xl top-96 -right-24"
          />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center w-full mb-8">
                <div className="w-full max-w-3xl">
                  <TextPressure
                    fontFamily="IBM Plex Mono"
                    fontUrl="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap"
                    text="Mission Command"
                    textColor="#4CD787"
                    flex={true}
                    alpha={false}
                    stroke={true}
                    width={true}
                    weight={true}
                    italic={false}
                    minFontSize={28}
                  />
                </div>
              </div>
              <p className="text-xl text-foreground/80 font-light max-w-2xl text-center">
                Ready to deploy the elite unit? Contact our command center to discuss your mission requirements and objectives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 relative">
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
                  <p className="text-foreground/70 mb-8">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#4CD787]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Phone</h3>
                    <p className="text-foreground/70">+1 (858) 519-8343</p>
                    <p className="text-foreground/50 text-sm mt-1">Mon-Fri from 8am to 5pm PST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#4CD787]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Email</h3>
                    <p className="text-foreground/70">devxgroupllc@gmail.com</p>
                    <p className="text-foreground/50 text-sm mt-1">We&apos;ll respond as quickly as possible</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#4CD787]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Location</h3>
                    <p className="text-foreground/70">San Diego, California</p>
                    <p className="text-foreground/50 text-sm mt-1">Serving clients worldwide</p>
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
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4CD787]/20 flex items-center justify-center transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5 text-[#4CD787]" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4CD787]/20 flex items-center justify-center transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5 text-[#4CD787]" />
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
                      <Facebook className="w-5 h-5 text-[#4CD787]" />
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
              animate={isFormInView ? "visible" : "hidden"}
              className="lg:col-span-3 bg-black/40 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#4CD787]/10 rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4834D4]/10 rounded-full blur-3xl z-0"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#4CD787]/20 border border-[#4CD787]/30 rounded-lg p-6 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-[#4CD787] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-foreground/70">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/5 border ${formErrors.name ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#4CD787] text-foreground shadow-inner transition-colors duration-300`}
                          placeholder="Enter your full name"
                          required
                        />
                        {formErrors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {formErrors.name}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/5 border ${formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#4CD787] text-foreground shadow-inner transition-colors duration-300`}
                          placeholder="your@email.com"
                          required
                        />
                        {formErrors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {formErrors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 bg-white/5 border ${formErrors.message ? 'border-red-500' : 'border-white/10'} rounded-lg focus:outline-none focus:border-[#4CD787] text-foreground shadow-inner transition-colors duration-300 resize-none`}
                        placeholder="Tell us about your project, timeline, and requirements..."
                        required
                      ></textarea>
                      {formErrors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1"
                        >
                          {formErrors.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        variants={buttonVariants}
                        initial="rest"
                        whileHover={shouldReduceMotion ? {} : "hover"}
                        whileTap={shouldReduceMotion ? {} : "tap"}
                        className="group relative overflow-hidden bg-gradient-to-r from-[#4CD787] to-[#3CC76D] hover:from-[#3CC76D] hover:to-[#4CD787] text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full mr-2"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className={`ml-2 w-5 h-5 transition-transform duration-300 ${isSubmitting ? "" : "group-hover:translate-x-1"}`} />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </form>
                )}
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
            <h2 className="text-3xl font-bold mb-6 text-[#CFB53B]">Schedule a Consultation</h2>
            <p className="text-foreground/70 mb-8">
              Book a time that works for you using our online scheduling tool. No back-and-forth emails needed.
            </p>
          </motion.div>

          <div className="bg-black/40 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 overflow-hidden">
            <div
              className="calendly-inline-widget"
              data-calendly-theme="dark"
              data-url="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?background_color=000000&text_color=ffffff&primary_color=4CD787&hide_gdpr_banner=1"
              style={{ 
                minWidth: "320px", 
                height: "1000px",
                backgroundColor: "#000000",
                border: "none",
                borderRadius: "12px",
                overflow: "hidden"
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
              .calendly-inline-widget[data-calendly-theme="dark"] {
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
            <h2 className="text-3xl font-bold mb-6 text-[#CFB53B]">Frequently Asked Questions</h2>
            <p className="text-foreground/70">Find quick answers to common questions about our services and process.</p>
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
              <h3 className="text-xl font-semibold mb-3 text-[#4CD787] group-hover:text-white transition-colors duration-300">What is your typical response time?</h3>
              <p className="text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                We typically respond to all inquiries within 24 hours during business days. For urgent matters, we
                prioritize faster response times.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#4CD787] group-hover:text-white transition-colors duration-300">Do you work with international clients?</h3>
              <p className="text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                Yes, we work with clients worldwide. Our team is experienced in remote collaboration and can accommodate
                different time zones.
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
                To provide an accurate quote, we need details about your project scope, timeline, technical
                requirements, and any specific features you need.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-colors duration-300 group"
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#4CD787] group-hover:text-white transition-colors duration-300">How do you handle project revisions?</h3>
              <p className="text-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                We include revision rounds in our project plans. The number of revisions depends on your package, but
                we&apos;re always flexible to ensure your satisfaction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
