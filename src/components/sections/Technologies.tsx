'use client'

import { motion } from 'framer-motion'
import {
  Code,
  Server,
  Smartphone,
  ComputerIcon as Desktop,
  Database,
  Cloud,
  Brain,
  Cpu,
  Cog,
} from 'lucide-react'
import BlurText from '@animations/BlurText'

const technologies = [
  { name: 'Web Development', icon: Code },
  { name: 'Backend Systems', icon: Server },
  { name: 'Mobile Apps', icon: Smartphone },
  { name: 'Desktop Applications', icon: Desktop },
  { name: 'Database Management', icon: Database },
  { name: 'Cloud Solutions', icon: Cloud },
  { name: 'AI Development', icon: Brain },
  { name: 'AI Integration', icon: Cpu },
  { name: 'Automation', icon: Cog },
]

export default function Technologies() {
  return (
    <section className="relative w-full py-20 sm:py-28 md:py-32 mt-20 sm:mt-28 md:mt-32 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>

      <div className="relative container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="section-title-hero text-white mb-6 tracking-tight font-editorial">
            Technologies Mastered
          </h2>
          <BlurText
            text="Our expertise spans across multiple technologies and frameworks to deliver the best solutions for your needs."
            className="section-subtitle max-w-2xl mx-auto px-4 text-zinc-400 font-light justify-center"
            delay={150}
            once={true}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0A0A0B]/60 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-2xl border border-white/[0.08] relative group hover:bg-[#0A0A0B] hover:border-white/[0.15] transition-all duration-300 overflow-hidden flex flex-col items-center min-h-[130px] sm:min-h-[140px] md:min-h-[160px] cursor-default"
            >
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#4CD787] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></div>

              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] rounded-xl group-hover:bg-[#4CD787]/10 group-hover:border-[#4CD787]/30 transition-all duration-300 aspect-square shrink-0">
                <tech.icon
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-zinc-400 group-hover:text-[#4CD787] transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>

              <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-medium text-center group-hover:text-zinc-200 transition-colors duration-300 leading-snug">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
