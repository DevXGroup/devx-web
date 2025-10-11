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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#FFD700] font-['IBM_Plex_Mono']">
            Technologies Mastered
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-['IBM_Plex_Mono'] font-light leading-relaxed px-4">
            Our expertise spans across multiple technologies and frameworks to deliver the best
            solutions for your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black/30 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl border border-white/10 relative group hover:shadow-lg hover:shadow-[#4CD787]/20 active:shadow-lg active:shadow-[#4CD787]/20 transition-all duration-200 overflow-hidden flex flex-col items-center min-h-[130px] sm:min-h-[140px] md:min-h-[160px]"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#4CD787] transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-200 ease-in-out"></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-3.5 md:mb-4 flex items-center justify-center bg-[#3CC76D] rounded-full group-hover:scale-110 group-active:scale-110 group-hover:bg-[#4CD787] group-active:bg-[#4CD787] transition-all duration-200 aspect-square shrink-0">
                <tech.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 font-['IBM_Plex_Mono'] font-light text-center group-hover:text-[#5DE797] group-active:text-[#5DE797] transition-colors duration-200 leading-snug">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
