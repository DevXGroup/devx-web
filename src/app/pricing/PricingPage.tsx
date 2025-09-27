'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { Check, Star, Zap, Users, Shield, ArrowRight, Sparkles, Target, Crown } from 'lucide-react'
import { useRef, useState } from 'react'
import TextPressure from '@animations/TextPressure'

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

const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    scale: 1.03,
    y: -12,
    rotateX: 5,
    rotateY: 2,
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
interface FloatingParticleConfig {
  delay: number
  size: string
  color: string
  left: string
  top: string
  duration: number
}

const FloatingParticle = ({
  delay,
  size,
  color,
  left,
  top,
  duration,
}: FloatingParticleConfig) => (
  <motion.div
    className="absolute rounded-full opacity-20"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      left,
      top,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
)
const particleConfigurations: FloatingParticleConfig[] = [
  { delay: 0, size: '6px', color: '#4CD787', left: '6%', top: '22%', duration: 7 },
  { delay: 0.5, size: '8px', color: '#FFD700', left: '27%', top: '18%', duration: 8.5 },
  { delay: 1, size: '9px', color: '#9d4edd', left: '52%', top: '72%', duration: 8 },
  { delay: 1.5, size: '7px', color: '#4CD787', left: '74%', top: '24%', duration: 9 },
  { delay: 2, size: '10px', color: '#FFD700', left: '43%', top: '12%', duration: 10 },
  { delay: 2.5, size: '8px', color: '#9d4edd', left: '9%', top: '58%', duration: 7.5 },
  { delay: 3, size: '11px', color: '#4CD787', left: '14%', top: '48%', duration: 9.5 },
  { delay: 3.5, size: '7px', color: '#FFD700', left: '18%', top: '6%', duration: 8.2 },
  { delay: 4, size: '9px', color: '#9d4edd', left: '59%', top: '62%', duration: 9.7 },
  { delay: 4.5, size: '6px', color: '#4CD787', left: '33%', top: '82%', duration: 8.8 },
  { delay: 5, size: '7px', color: '#FFD700', left: '8%', top: '76%', duration: 7.8 },
  { delay: 5.5, size: '10px', color: '#9d4edd', left: '88%', top: '66%', duration: 9.3 },
  { delay: 6, size: '8px', color: '#4CD787', left: '61%', top: '54%', duration: 8.9 },
  { delay: 6.5, size: '6px', color: '#FFD700', left: '4%', top: '64%', duration: 8.4 },
  { delay: 7, size: '9px', color: '#9d4edd', left: '46%', top: '8%', duration: 9.1 },
]

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
  index: number
  isYearly: boolean
}

function PricingCard({ plan, index, isYearly }: PricingCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const IconComponent = plan.icon
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      variants={cardHoverVariants}
      initial="rest"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={shouldReduceMotion ? {} : 'hover'}
      className={`relative bg-black/40 backdrop-blur-xl rounded-2xl border ${
        plan.popular
          ? 'border-[#FFD700] ring-2 ring-[#FFD700]/30 shadow-2xl shadow-[#FFD700]/20'
          : 'border-white/10'
      } flex flex-col group transition-all duration-500 overflow-hidden perspective-1000 h-full`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        animate={
          isHovered
            ? {
                background: [
                  `linear-gradient(135deg, ${plan.color}20, transparent)`,
                  `linear-gradient(225deg, ${plan.color}30, transparent)`,
                  `linear-gradient(135deg, ${plan.color}20, transparent)`,
                ],
              }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          variants={shimmerVariants}
          initial="hidden"
          animate={isHovered ? 'visible' : 'hidden'}
        />
      </div>

      {/* Sparkle effects */}
      {plan.popular && (
        <>
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-[#FFD700] rounded-full"
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="absolute top-12 right-8 w-1 h-1 bg-[#4CD787] rounded-full"
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          />
        </>
      )}

      <div className="relative z-10 p-6 flex flex-col h-full">
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
            <h3 className="text-xl font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300">
              {plan.name}
            </h3>
            <p className="text-xs font-medium" style={{ color: plan.color }}>
              {plan.subtitle}
            </p>
          </div>
        </div>

        {/* Pricing section with enhanced styling */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
              {plan.price}
            </span>
            <span className="text-sm text-white/60">{plan.priceUnit}</span>
            <motion.span
              className="text-xs text-white/40 line-through ml-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {plan.originalPrice}
            </motion.span>
          </div>
          <motion.div
            className="inline-block bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            Save{' '}
            {Math.round(
              ((parseInt(plan.originalPrice.slice(1)) - parseInt(plan.price.slice(1))) /
                parseInt(plan.originalPrice.slice(1))) *
                100
            )}
            %
          </motion.div>
        </div>

        <p className="text-white/70 text-xs leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300">
          {plan.description}
        </p>

        {/* Features section with improved spacing */}
        <div className="mb-4 flex-grow">
          <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
            <Check className="w-3 h-3" style={{ color: plan.color }} />
            Core Features
          </h4>
          <ul className="space-y-2">
            {plan.features.map((feature: string, featureIndex: number) => (
              <motion.li
                key={feature}
                className="flex items-start text-xs text-white/80 group-hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.1 * featureIndex }}
              >
                <Check
                  className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0"
                  style={{ color: plan.color }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* What's included section with accordion-like reveal */}
        <div className="mb-6">
          <h4
            className="text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
            style={{ color: plan.color }}
          >
            <ArrowRight className="w-3 h-3" />
            What&apos;s Included
          </h4>
          <motion.ul
            className="space-y-1.5 text-xs text-white/60"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {plan.included.map((item: string, itemIndex: number) => (
              <motion.li
                key={item}
                className="flex items-start leading-relaxed group-hover:text-white/80 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.6 + 0.1 * itemIndex }}
              >
                <span
                  className="w-1 h-1 rounded-full mr-2 mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: plan.color }}
                />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Enhanced CTA button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
          <a
            href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block w-full text-center py-3 px-4 rounded-lg font-semibold text-sm
              transition-all duration-300 relative overflow-hidden group/button
              ${
                plan.popular
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#E6D055] text-black shadow-lg shadow-[#FFD700]/30 hover:shadow-xl hover:shadow-[#FFD700]/40'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40'
              }
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Schedule a Strategy Call
              <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
            </span>

            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function PricingPage() {
  const shouldReduceMotion = useReducedMotion()
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-24">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />

        {/* Floating particles */}
        {particleConfigurations.map((config, i) => (
          <FloatingParticle
            key={i}
            delay={config.delay}
            size={config.size}
            color={config.color}
            left={config.left}
            top={config.top}
            duration={config.duration}
          />
        ))}

        {/* Larger animated blobs */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-[#4CD787]/10 rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: '10%',
            top: '20%',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-3xl"
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          style={{
            right: '10%',
            bottom: '20%',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-2 pb-8 text-center mt-9 py-9">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUpVariants}>
              <div className="flex items-center justify-center w-full">
                <div
                  style={{
                    position: 'relative',
                    height: '100px',
                    width: '300px',
                    padding: '0 20px',
                    marginRight: '0px',
                  }}
                >
                  <TextPressure
                    text="&nbsp;Pricing&nbsp;"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={false}
                    textColor="#FFFFFF"
                    strokeColor="#FFFFFF"
                    minFontSize={39}
                  />
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={fadeInUpVariants}
              className="text-lg md:text-xl text-white/90 font-light mb-8 leading-relaxed max-w-3xl mx-auto font-['IBM_Plex_Sans'] mt-6"
              style={{
                letterSpacing: '0.025em',
                fontWeight: '400',
              }}
            >
              Transparent, competitive hourly rates with no hidden fees.
              <span className="text-[#4CD787] font-medium"> Choose the perfect plan</span> for your
              project needs.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
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
      <section className="relative py-12">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {pricingPlans.map((plan, index) => (
              <div key={plan.name} className="relative flex flex-col h-full">
                {/* Popular badge positioned above card */}
                {plan.popular && (
                  <div className="flex justify-center mb-4">
                    <motion.div
                      className="bg-gradient-to-r from-[#FFD700] to-[#E6D055] text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5"
                      animate={{
                        y: [0, -1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                      <Sparkles className="w-3 h-3" />
                    </motion.div>
                  </div>
                )}
                <div className="flex-1">
                  <PricingCard plan={plan} index={index} isYearly={isYearly} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative pt-20 pb-0">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Need Something{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CD787] to-[#FFD700]">
                  Custom
                </span>
                ?
              </h2>
              <p
                className="text-lg md:text-xl text-white/90 font-light mb-8 leading-relaxed font-['IBM_Plex_Sans'] mt-6"
                style={{
                  letterSpacing: '0.025em',
                  fontWeight: '400',
                }}
              >
                Every project is unique. Let&apos;s discuss your specific requirements and create a
                tailored solution that perfectly fits your vision and budget.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4CD787] to-[#66E6A4] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#4CD787]/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Schedule a Strategy Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  {/* Button shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </a>
              </motion.div>

              <motion.p
                className="mt-6 text-sm text-white/60"
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
