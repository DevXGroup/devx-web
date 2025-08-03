'use client'

import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import { Check, Star, Zap, Users, Shield, ArrowRight, Sparkles, Target, Crown } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import BlurText from '@/components/BlurText'

// Enhanced animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
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
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const shimmerVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: '100%',
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
}

const sparkleVariants = {
  hidden: { scale: 0, rotate: 0 },
  visible: {
    scale: [0, 1, 0],
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
    },
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
    color: '#CFB53B',
    gradient: 'from-[#CFB53B]/20 via-[#CFB53B]/10 to-transparent',
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
const FloatingParticle = ({ delay = 0, size = 4, color = '#4CD787' }) => (
  <motion.div
    className="absolute rounded-full opacity-20"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      delay: delay,
      ease: 'easeInOut',
    }}
  />
)

function PricingCard({ plan, index, isYearly }) {
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
          ? 'border-[#CFB53B] ring-2 ring-[#CFB53B]/30 shadow-2xl shadow-[#CFB53B]/20'
          : 'border-white/10'
      } flex flex-col h-full group transition-all duration-500 overflow-hidden perspective-1000`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Popular badge with enhanced styling */}
      {plan.popular && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
          <motion.div
            className="bg-gradient-to-r from-[#CFB53B] to-[#E6D055] text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5"
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
            className="absolute top-4 right-4 w-2 h-2 bg-[#CFB53B] rounded-full"
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

      <div
        className={`relative z-10 ${plan.popular ? 'pt-12 px-6 pb-6' : 'p-6'} h-full flex flex-col`}
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
            <h3 className="text-xl font-bold text-white group-hover:text-[#CFB53B] transition-colors duration-300">
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
            {plan.features.slice(0, 5).map((feature, featureIndex) => (
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
            {plan.features.length > 5 && (
              <li className="text-white/40 text-xs italic ml-5">
                +{plan.features.length - 5} more features...
              </li>
            )}
          </ul>
        </div>

        {/* What's included section with accordion-like reveal */}
        <div className="mb-6">
          <h4
            className="text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
            style={{ color: plan.color }}
          >
            <ArrowRight className="w-3 h-3" />
            What's Included
          </h4>
          <motion.ul
            className="space-y-1.5 text-xs text-white/60"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {plan.included.slice(0, 3).map((item, itemIndex) => (
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
            {plan.included.length > 3 && (
              <li className="text-white/40 italic text-xs">
                +{plan.included.length - 3} more features...
              </li>
            )}
          </motion.ul>
        </div>

        {/* Enhanced CTA button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
          <Link
            href="/contact"
            className={`
              block w-full text-center py-3 px-4 rounded-lg font-semibold text-sm
              transition-all duration-300 relative overflow-hidden group/button
              ${
                plan.popular
                  ? 'bg-gradient-to-r from-[#CFB53B] to-[#E6D055] text-black shadow-lg shadow-[#CFB53B]/30 hover:shadow-xl hover:shadow-[#CFB53B]/40'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40'
              }
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started Today
              <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
            </span>

            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function PricingPage() {
  const shouldReduceMotion = useReducedMotion()
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={Math.random() * 6 + 2}
            color={['#4CD787', '#CFB53B', '#9d4edd'][i % 3]}
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
          className="absolute w-[500px] h-[500px] bg-[#CFB53B]/10 rounded-full blur-3xl"
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
      <section className="relative pt-32 pb-20 text-center">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUpVariants} className="mb-8">
              <BlurText
                text="Pricing Plans"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white flex items-center justify-center"
                delay={133}
                animateBy="words"
                direction="top"
              />
            </motion.div>

            <motion.p
              variants={fadeInUpVariants}
              className="text-xl md:text-2xl text-white/80 font-light mb-8 leading-relaxed max-w-3xl mx-auto"
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
              <div className="flex items-center gap-2 bg-[#CFB53B]/10 text-[#CFB53B] px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm border border-[#CFB53B]/20">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {pricingPlans.map((plan, index) => (
              <div key={plan.name} className="max-h-[650px]">
                <PricingCard plan={plan} index={index} isYearly={isYearly} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20">
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
                Need Something
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CD787] to-[#CFB53B]">
                  Custom
                </span>
                ?
              </h2>
              <p className="text-xl text-white/80 font-light mb-8 leading-relaxed">
                Every project is unique. Let's discuss your specific requirements and create a
                tailored solution that perfectly fits your vision and budget.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4CD787] to-[#66E6A4] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#4CD787]/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Get Custom Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  {/* Button shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
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
    </div>
  )
}
