"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
// Remove Footer import
const pricingPlans = [
  {
    name: "Basic",
    price: "Custom",
    description: "For small businesses and startups",
    features: ["Custom software development", "Basic project management", "Email support", "1 revision round"],
  },
  {
    name: "Professional",
    price: "Custom",
    description: "For growing businesses and enterprises",
    features: [
      "Advanced custom software development",
      "Dedicated project manager",
      "Priority email and phone support",
      "3 revision rounds",
      "Basic integrations",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with complex needs",
    features: [
      "Comprehensive software solutions",
      "Full-suite project management",
      "24/7 priority support",
      "Unlimited revisions",
      "Advanced integrations",
      "Ongoing maintenance and support",
    ],
  },
]

function PricingCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-black/30 backdrop-blur-sm p-8 rounded-xl border ${
        index === 1 ? "border-[#4CD787]" : "border-white/10"
      } flex flex-col h-full`}
    >
      <h3 className="text-2xl font-semibold text-[#4CD787] mb-2">{plan.name}</h3>
      <div className="text-3xl font-bold mb-4">{plan.price}</div>
      <p className="text-foreground/80 font-light mb-6">{plan.description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-foreground/70 font-light">
            <Check className="w-5 h-5 text-[#4CD787] mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="/contact"
        className={`inline-block text-center ${
          index === 1 ? "bg-robinhood text-black hover:bg-robinhood-90" : "bg-white/10 text-white hover:bg-white/20"
        } px-6 py-3 rounded-lg font-light border border-robinhood transition-colors`}
      >
        Get Started
      </a>
    </motion.div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-[#4CD787]/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse" />
          <div className="absolute w-[400px] h-[400px] bg-[#4834D4]/20 rounded-full blur-3xl top-96 -right-24 animate-pulse" />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#CFB53B]">Pricing</h1>
            <p className="text-xl text-foreground/80 font-light">
              Flexible pricing options tailored to your specific needs and project requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>
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
            <a
              href="/contact"
              className="inline-block bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg font-light border-robinhood"
            >
              Get a Custom Quote
            </a>
          </motion.div>
        </div>
      </section>
      {/* Remove Footer component at the bottom */}
    </div>
  )
}
