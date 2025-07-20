"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { Check, Star, Zap, Users, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, useMemo } from "react"
import BlurText from "@/components/BlurText"

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

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
}
const pricingPlans = [
  {
    name: "Starter",
    price: "$50-75/hr",
    description: "Perfect for small businesses and startups",
    icon: Users,
    popular: false,
    features: [
      "Custom software development",
      "Basic project management",
      "Email support (48hr response)",
      "2 revision rounds",
      "Basic documentation",
      "30-day bug fixes"
    ],
    included: [
      "Frontend & Backend Development",
      "Database Design",
      "Basic Testing",
      "Deployment Support"
    ]
  },
  {
    name: "Professional",
    price: "$75-100/hr",
    description: "Most popular for growing businesses",
    icon: Zap,
    popular: true,
    features: [
      "Advanced custom software development",
      "Dedicated project manager",
      "Priority email and phone support",
      "5 revision rounds",
      "Advanced integrations",
      "90-day maintenance",
      "Performance optimization"
    ],
    included: [
      "Everything in Starter",
      "API Development & Integration",
      "Advanced Testing Suite",
      "CI/CD Pipeline Setup",
      "Technical Documentation"
    ]
  },
  {
    name: "Enterprise",
    price: "$100-150/hr",
    description: "For large organizations with complex needs",
    icon: Shield,
    popular: false,
    features: [
      "Comprehensive software solutions",
      "Full-suite project management",
      "24/7 priority support",
      "Unlimited revisions",
      "Enterprise-grade security",
      "1-year maintenance included",
      "Custom training sessions"
    ],
    included: [
      "Everything in Professional",
      "Scalable Architecture Design",
      "Security Audits",
      "Multi-environment Setup",
      "Dedicated Support Team",
      "SLA Guarantees"
    ]
  },
]

function PricingCard({ plan, index }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const IconComponent = plan.icon
  
  return (
    <motion.div
      ref={ref}
      variants={cardHoverVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`bg-black/30 backdrop-blur-sm p-8 rounded-xl border ${
        plan.popular ? "border-[#4CD787] ring-2 ring-[#4CD787]/20" : "border-white/10"
      } flex flex-col h-full group hover:border-[#4CD787]/50 transition-all duration-300 relative overflow-hidden`}
      whileHover={shouldReduceMotion ? {} : cardHoverVariants.hover}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4CD787] text-black px-6 py-1 rounded-full text-sm font-medium z-20 shadow-lg">
          Most Popular
        </div>
      )}
      
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4CD787]/5 to-[#4834D4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#4CD787]/20 flex items-center justify-center group-hover:bg-[#4CD787]/30 transition-colors duration-300">
            <IconComponent className="w-6 h-6 text-[#4CD787]" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#4CD787] group-hover:text-white transition-colors duration-300">{plan.name}</h3>
            {plan.popular && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-[#CFB53B] fill-[#CFB53B]" />
                <span className="text-xs text-[#CFB53B]">Recommended</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-3xl font-bold mb-2 text-white">{plan.price}</div>
        <p className="text-foreground/80 font-light mb-6 group-hover:text-white/90 transition-colors duration-300">{plan.description}</p>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[#4CD787] mb-3 uppercase tracking-wide">Features Included</h4>
          <ul className="space-y-2 mb-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start text-sm text-foreground/70 font-light group-hover:text-white/80 transition-colors duration-300">
                <Check className="w-4 h-4 text-[#4CD787] mr-2 mt-0.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-8 flex-grow">
          <h4 className="text-sm font-semibold text-[#CFB53B] mb-3 uppercase tracking-wide">What&apos;s Included</h4>
          <ul className="space-y-2">
            {plan.included.map((item) => (
              <li key={item} className="flex items-start text-sm text-foreground/60 font-light group-hover:text-white/70 transition-colors duration-300">
                <ArrowRight className="w-4 h-4 text-[#CFB53B] mr-2 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <motion.div
          variants={buttonHoverVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            href="/contact"
            className={`inline-block w-full text-center ${
              plan.popular ? "bg-robinhood text-black hover:bg-robinhood-90" : "bg-white/10 text-white hover:bg-white/20"
            } px-6 py-3 rounded-lg font-medium border border-robinhood transition-all duration-300 hover:shadow-[0_5px_15px_rgba(204,255,0,0.3)]`}
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function PricingPage() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-[500px] h-[500px] bg-[#4CD787]/20 rounded-full blur-3xl -top-48 -left-24"
            animate={shouldReduceMotion ? {} : {
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute w-[400px] h-[400px] bg-[#4834D4]/20 rounded-full blur-3xl top-96 -right-24"
            animate={shouldReduceMotion ? {} : {
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <BlurText 
                text="Pricing"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-[#CFB53B]"
                delay={120}
                animateBy="words"
                direction="top"
              />
            </div>
            <motion.p 
              variants={fadeInUpVariants}
              className="text-xl text-foreground/80 font-light mb-4"
            >
              Transparent hourly rates tailored to your specific needs and project requirements.
            </motion.p>
            <motion.div
              variants={fadeInUpVariants}
              className="inline-flex items-center gap-2 bg-[#4CD787]/10 text-[#4CD787] px-4 py-2 rounded-full text-sm font-medium"
            >
              <Star className="w-4 h-4" />
              No hidden fees • Flexible contracts • 100% satisfaction guarantee
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {pricingPlans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/20 to-black" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Need a Custom Solution?</h2>
            <p className="text-lg text-foreground/80 font-light mb-8">
              We understand that every project is unique. Contact us to discuss your specific requirements and get a
              tailored quote.
            </p>
            <motion.div
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg font-medium border-robinhood hover:shadow-[0_5px_15px_rgba(204,255,0,0.3)] transition-all duration-300"
              >
                Get a Custom Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Remove Footer component at the bottom */}
    </div>
  )
}
