"use client"

import { motion } from "framer-motion"
import { Code, Server, Smartphone, ComputerIcon as Desktop, Database, Cloud, Brain, Cpu, Cog } from "lucide-react"

const technologies = [
  { name: "Web Development", icon: Code },
  { name: "Backend Systems", icon: Server },
  { name: "Mobile Apps", icon: Smartphone },
  { name: "Desktop Applications", icon: Desktop },
  { name: "Database Management", icon: Database },
  { name: "Cloud Solutions", icon: Cloud },
  { name: "AI Development", icon: Brain },
  { name: "AI Integration", icon: Cpu },
  { name: "Automation", icon: Cog },
]

export default function Technologies() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700] font-['IBM_Plex_Mono']">
            Technologies Mastered
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-['IBM_Plex_Mono'] font-light">
            Our expertise spans across multiple technologies and frameworks to deliver the best solutions for your
            needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative group hover:shadow-lg hover:shadow-[#4CD787]/20 transition-all duration-300 overflow-hidden flex flex-col items-center"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#4CD787] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-[#3CC76D] rounded-full group-hover:scale-110 transition-transform aspect-square shrink-0">
                <tech.icon className="w-8 h-8 text-black" />
              </div>
              <p className="text-lg text-foreground/80 font-['IBM_Plex_Mono'] font-light text-center group-hover:text-[#5DE797] transition-colors duration-300">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
