'use client'

import { motion } from 'framer-motion'
import { Star, Zap, Shield, ArrowRight, Sparkles, Target, Crown, Check } from 'lucide-react'
import { useState } from 'react'
import StarBorder from '@animations/StarBorder'
import TextPressure from '@animations/TextPressure'
import BlurText from '@animations/BlurText'

// Enhanced animation variants
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardHoverVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
  },
}

const shimmerVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: '100%',
  },
}

const sparkleVariants = {
  hidden: { scale: 0, rotate: 0 },
  visible: {
    scale: [0, 1, 0],
    rotate: [0, 180, 360],
  },
}

const pricingPlans = [
  {
    name: 'Starter',
    subtitle: 'Perfect for MVPs',
    price: '$75',
    priceUnit: '/hour',
    originalPrice: '$95',
    description:
      'Ideal for startups and small businesses looking to build their first digital solution',
    icon: Target,
    popular: false,
    color: '#4CD787',
    gradient: 'from-[#4CD787]/20 via-[#4CD787]/10 to-transparent',
    features: [
      'Custom web/mobile development',
      'Basic project management',
      'Email support (24hr response)',
      '2 revision rounds included',
      'Basic documentation',
      '30-day post-launch support',
    ],
    included: [
      'Frontend & Backend Development',
      'Database Design & Setup',
      'Basic API Integration',
      'Responsive Design',
      'Basic Testing & QA',
      'Deployment Assistance',
    ],
  },
  {
    name: 'Professional',
    subtitle: 'Most Popular Choice',
    price: '$100',
    priceUnit: '/hour',
    originalPrice: '$125',
    description:
      'Perfect for growing businesses that need comprehensive solutions and dedicated support',
    icon: Zap,
    popular: true,
    color: '#FFD700',
    gradient: 'from-[#FFD700]/20 via-[#FFD700]/10 to-transparent',
    features: [
      'Advanced custom development',
      'Dedicated project manager',
      'Priority support (12hr response)',
      '5 revision rounds included',
      'Advanced integrations',
      '90-day maintenance included',
      'Performance optimization',
    ],
    included: [
      'Everything in Starter',
      'Advanced API Development',
      'Third-party Integrations',
      'Comprehensive Testing Suite',
      'CI/CD Pipeline Setup',
      'Technical Documentation',
      'Code Review & Optimization',
    ],
  },
  {
    name: 'Enterprise',
    subtitle: 'Ultimate Solution',
    price: '$125',
    priceUnit: '/hour',
    originalPrice: '$160',
    description:
      'For large organizations requiring enterprise-grade solutions with premium support',
    icon: Crown,
    popular: false,
    color: '#9d4edd',
    gradient: 'from-[#9d4edd]/20 via-[#9d4edd]/10 to-transparent',
    features: [
      'Enterprise-grade development',
      'Full-suite project management',
      '24/7 priority support hotline',
      'Unlimited revisions',
      'Enterprise security compliance',
      '1-year maintenance & updates',
      'On-site training sessions',
    ],
    included: [
      'Everything in Professional',
      'Scalable Architecture Design',
      'Security Audits & Compliance',
      'Multi-environment Setup',
      'Dedicated Support Team',
      'SLA Guarantees',
      'Custom Training & Documentation',
    ],
  },
]

// Animated background particles
// Floating particles removed for performance
const particleConfigurations = []

interface PricingPlan {
  name: string
  subtitle: string
  price: string
  priceUnit: string
  originalPrice: string
  description: string
  icon: any // You might want to define a more specific type for the icon component
  popular: boolean
  color: string
  gradient: string
  features: string[]
  included: string[]
}

interface PricingCardProps {
  plan: PricingPlan
}

function PricingCard({ plan }: PricingCardProps) {
  const IconComponent = plan.icon
  const [isHovered, setIsHovered] = useState(false)
  const savingsPercent = Math.round(
    ((parseInt(plan.originalPrice.slice(1)) - parseInt(plan.price.slice(1))) /
      parseInt(plan.originalPrice.slice(1))) *
      100
  )

  return (
    <StarBorder
      as="div"
      className="h-full w-full p-0 bg-zinc-900/40 backdrop-blur-md rounded-2xl overflow-hidden min-h-[640px] md:min-h-[700px]"
      color={plan.color}
      speed="4s"
      thickness={2}
    >
      <div
        className="relative z-10 p-6 flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header section */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="w-6 h-6" style={{ color: plan.color }} />
          </motion.div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300">
              {plan.name}
            </h3>
            <p className="text-sm md:text-xs font-medium" style={{ color: plan.color }}>
              {plan.subtitle}
            </p>
          </div>
        </div>

        {/* Pricing section with enhanced styling */}
        <div className="mb-4 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
              {plan.price}
            </span>
            <span className="text-sm text-zinc-400">{plan.priceUnit}</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.span
              className="text-sm md:text-lg text-zinc-400 line-through font-semibold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {plan.originalPrice}
            </motion.span>
            <motion.span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-200 text-[11px] font-semibold uppercase tracking-[0.1em] border border-emerald-300/30 shadow-[0_0_25px_rgba(134,239,172,0.25)]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, type: 'spring', stiffness: 260, damping: 18 }}
            >
              <Sparkles className="w-3 h-3" />
              Save {savingsPercent}%
            </motion.span>
          </div>
        </div>

        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors duration-300">
          {plan.description}
        </p>

        {/* Features section with improved spacing */}
        <div className="mb-4 flex-grow">
          <h4 className="text-sm md:text-xs font-bold text-white mb-3 uppercase tracking-wide text-left">
            Core Features
          </h4>
          <ul className="space-y-2 text-left">
            {plan.features.map((feature: string, featureIndex: number) => (
              <motion.li
                key={feature}
                className="flex items-start gap-2 text-sm md:text-base text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * featureIndex }}
              >
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* What's included section with accordion-like reveal */}
        <div className="mb-6">
          <h4
            className="text-sm md:text-xs font-bold mb-3 uppercase tracking-wide flex items-center gap-2"
            style={{ color: plan.color }}
          >
            <ArrowRight className="w-4 h-4" />
            What&apos;s Included
          </h4>
          <motion.ul
            className="space-y-2 text-sm md:text-base text-zinc-400 text-left"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {plan.included.map((item: string, itemIndex: number) => (
              <motion.li
                key={item}
                className="flex items-start leading-relaxed group-hover:text-white/85 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + 0.1 * itemIndex }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mr-2 mt-2 flex-shrink-0"
                  style={{ backgroundColor: plan.color }}
                />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Enhanced CTA button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
          <StarBorder
            as="a"
            href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block w-full text-center py-3 px-4 rounded-lg font-semibold text-sm
              transition-all duration-300 relative overflow-hidden group/button
              ${
                plan.popular
                  ? 'bg-zinc-900/80 text-white border border-white/40 shadow-lg hover:shadow-xl hover:shadow-white/20'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40'
              }
            `}
            color="#FFFFFF"
            speed="3s"
            thickness={1}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Schedule a Free Consultation
              <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
            </span>

            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </StarBorder>
        </motion.div>
      </div>
    </StarBorder>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-16 md:pt-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />

        {/* Floating particles and heavy blobs removed for performance - using simple gradient instead */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-zinc-950/50 to-black z-0" />
      </div>

      {/* Hero Section */}
      <section className="relative text-center pt-6 md:pt-8 pb-10 md:pb-12">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInVariants}>
              <div className="flex items-center justify-center w-full">
                <div
                  style={{
                    position: 'relative',
                    height: '100px',
                    width: '100%',
                    maxWidth: '400px',
                    padding: '0',
                    margin: '0 auto',
                  }}
                >
                  <TextPressure
                    text="&nbsp;Pricing&nbsp;"
                    fontFamily="var(--font-playfair-display)"
                    flex={false}
                    alpha={false}
                    stroke={false}
                    width={false}
                    weight={true}
                    italic={false}
                    minFontSize={54}
                  />
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={fadeInVariants}
              className="section-subtitle text-white/90 mb-8 max-w-3xl mx-auto mt-4 text-center"
            >
              Transparent, competitive hourly rates with no hidden fees.
              <span className="text-[#4CD787] font-medium"> Choose the perfect plan</span> for your
              project needs.
            </motion.p>

            <motion.div
              variants={fadeInVariants}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 bg-[#4CD787]/10 text-[#4CD787] px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm border border-[#4CD787]/20">
                <Star className="w-4 h-4 fill-current" />
                No Setup Fees
              </div>
              <div className="flex items-center gap-2 bg-[#FFD700]/10 text-[#FFD700] px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm border border-[#FFD700]/20">
                <Shield className="w-4 h-4" />
                100% Satisfaction Guarantee
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-12 z-[5000]">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="relative flex flex-col h-full">
                <div className="flex-1 h-full relative group">
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-3 left-0 right-0 mx-auto w-max z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 backdrop-blur-md shadow-[0_0_15px_rgba(253,224,71,0.1)]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </motion.div>
                  )}
                  <PricingCard plan={plan} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative pt-20 pb-0 z-[6000]">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/10 p-12 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <BlurText
                text="Need Something Custom?"
                className="justify-center heading-section text-white mb-6"
                delay={150}
                once={false}
              />
              <p className="subtitle-lg mb-8 mt-6">
                Every project is unique. Let&apos;s discuss your specific requirements and create a
                tailored solution that perfectly fits your vision and budget.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <StarBorder
                  as="a"
                  href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-zinc-900/50 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-white/20 transition-all duration-300 relative overflow-hidden group"
                  color="#FFFFFF"
                  speed="3s"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Schedule a Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  {/* Button shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </StarBorder>
              </motion.div>

              <motion.p
                className="mt-6 text-sm text-zinc-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Free consultation • Response within 24 hours • No commitment required
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fade transition to footer */}
      <div className="relative h-16 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />
    </div>
  )
}
