'use client'

import { motion } from 'framer-motion'

// Dev-only Features page - not included in production builds
export default function FeaturesPage() {
  if (process.env.NODE_ENV === 'production') {
    return null // Don't render in production
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#9d4edd]">
              Dev Features & Creative Samples
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Development-only page showcasing work-in-progress features and creative samples.
              This page is only visible in development mode.
            </p>
          </motion.div>

          {/* Creative Samples Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Creative Animation Card */}
            <motion.a
              href="/services/creative-animation"
              className="group relative block cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 relative overflow-hidden group-hover:scale-105">
                {/* Background animation effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-2xl">🎨</span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    Motion Graphics & Animation
                  </h4>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Professional motion design and creative animations for brands, featuring fluid transitions, dynamic typography, and engaging visual storytelling.
                  </p>
                  
                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {[
                      'Brand Animation',
                      'Logo Reveals',
                      'UI/UX Animations',
                      'Video Production'
                    ].map((feature, index) => (
                      <motion.li
                        key={feature}
                        className="flex items-center text-white/70 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium group/link"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Creative Work
                    <motion.svg
                      className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </div>
              </div>
            </motion.a>

            {/* Placeholder for future creative samples */}
            <motion.div
              className="group relative opacity-50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-500/20 relative overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="text-xl font-bold text-white/70 mb-4">
                  Interactive Experiences
                </h4>
                <p className="text-white/50 mb-6">
                  Coming soon - immersive web experiences with advanced interactions and real-time animations.
                </p>
                <div className="text-gray-400 text-sm italic">
                  More samples coming soon...
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative opacity-50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-500/20 relative overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🎬</span>
                </div>
                <h4 className="text-xl font-bold text-white/70 mb-4">
                  Video Production
                </h4>
                <p className="text-white/50 mb-6">
                  Coming soon - professional video content, explainer videos, and promotional materials.
                </p>
                <div className="text-gray-400 text-sm italic">
                  More samples coming soon...
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}