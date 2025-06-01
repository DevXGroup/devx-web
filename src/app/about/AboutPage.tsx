"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Users, Zap, Award, Globe, Shield } from "lucide-react"

// Animated section component for reuse
const AnimatedSection = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

// Team member card component
const TeamMemberCard = ({ name, role, image, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group"
  >
    <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <h3 className="text-xl font-semibold text-white">{name}</h3>
    <p className="text-[#4CD787]">{role}</p>
  </motion.div>
)

// Value card component
const ValueCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-colors group"
  >
    <div className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center mb-4 group-hover:bg-[#4CD787]/20 transition-colors">
      <Icon className="w-6 h-6 text-[#4CD787]" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-foreground/70 text-sm">{description}</p>
  </motion.div>
)

// Stat counter with animation
const StatCounter = ({ number, label, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const targetNumber = Number.parseInt(number.replace(/\D/g, ""))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const duration = 2000 // ms
          const step = Math.ceil(targetNumber / (duration / 16)) // 60fps

          const timer = setInterval(() => {
            start += step
            if (start > targetNumber) {
              setCount(targetNumber)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [targetNumber])

  return (
    <motion.div
      ref={countRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-white mb-1 font-['IBM_Plex_Mono']">
        {number.includes("+") ? `${count}+` : count}
      </div>
      <div className="text-sm text-white/80 font-['IBM_Plex_Mono']">{label}</div>
    </motion.div>
  )
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#000B14]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[#4CD787]/10 to-[#4834D4]/10 rounded-full blur-3xl -top-48 -left-24"
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
            className="absolute w-[500px] h-[500px] bg-gradient-to-l from-[#4834D4]/10 to-[#4CD787]/10 rounded-full blur-3xl top-96 -right-24"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  About <span className="text-[#4CD787]">DevX Group</span>
                </h1>
                <p className="text-xl text-foreground/80 mb-8">
                  A California-based software and IoT development powerhouse built on decades of industry experience and
                  a passion for solving complex challenges.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="bg-[#4CD787] text-black hover:bg-[#4CD787]/90 px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    Get in Touch
                  </Link>
                  <a
                    href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent text-white hover:bg-white/10 px-6 py-3 rounded-lg transition-colors font-medium border border-white/30"
                    onClick={(e) => {
                      window.open(
                        "https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05",
                        "_blank",
                      )
                      e.preventDefault()
                    }}
                  >
                    Schedule a Call
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="relative">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
                  <Image src="/images/about/testimonial-background.png" alt="DevX Team" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-white text-sm italic">
                      "DevX Group delivered our project ahead of schedule and exceeded our expectations. Their team's
                      expertise and communication made the entire process seamless."
                    </p>
                    <div className="mt-3 text-white/80 text-sm">— Michael R., CTO at TechVentures</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCounter number="100+" label="Happy Clients" delay={0.1} />
              <StatCounter number="20+" label="Years Experience" delay={0.2} />
              <StatCounter number="500+" label="Projects Completed" delay={0.3} />
              <StatCounter number="15+" label="Team Members" delay={0.4} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Our Story</h2>
            <p className="text-foreground/80">
              DevX Group LLC was founded with a simple mission: to deliver exceptional software solutions that drive
              real business results.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="space-y-6 text-foreground/90">
                <p className="text-base leading-relaxed">
                  DevX Group LLC is a California-based software and IoT development powerhouse built on decades of
                  industry experience and a passion for solving complex challenges. Our team is a hand-selected group of
                  elite professionals chosen not just for their technical expertise but also for their ability to
                  operate with precision, efficiency, and excellence—much like a commando unit. We are the team to call
                  when you need results fast and at the highest standard.
                </p>
                <p className="text-base leading-relaxed">
                  What sets us apart is our unique approach. We don't just work; we deliver solutions. Whether you're a
                  startup looking to bring an idea to life or an established company with lingering projects or
                  challenging problems, we step in and get the job done. From concept to implementation, we specialize
                  in turning visions into reality with unmatched speed and quality.
                </p>
                <p className="text-base leading-relaxed">
                  At DevX Group LLC, flexibility is key. We can partner with you on a project basis or seamlessly
                  integrate into your team as hourly specialists to tackle your most pressing challenges. Our mission is
                  simple: to provide exceptional results that exceed expectations while making the process as smooth and
                  efficient as possible.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="order-1 lg:order-2" delay={0.2}>
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <Image src="/images/about/devx-office.jpg" alt="DevX Group Office" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#4CD787] text-black p-4 rounded-lg shadow-xl">
                  <p className="font-bold">Founded 2024</p>
                  <p className="text-sm">San Diego, California</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        id="our-values"
        className="py-20 relative bg-gradient-to-b from-transparent via-[#0a0a1a] to-transparent"
      >
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Our Values</h2>
            <p className="text-foreground/80">
              Our core values guide everything we do and define how we work with our clients and each other.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={Users}
              title="Customer Obsession"
              description="Our customers are always first in everything we do. We provide support after delivery and build long-term relationships."
              delay={0.1}
            />
            <ValueCard
              icon={Shield}
              title="Responsible & Accountable"
              description="We build long-term relationships with our customers and operate based on the USA standards."
              delay={0.2}
            />
            <ValueCard
              icon={Check}
              title="Vetted Professionals"
              description="Our team is a handpicked group of vetted software development experts, chosen for their skill and efficiency."
              delay={0.3}
            />
            <ValueCard
              icon={Globe}
              title="Versatile and Adaptable"
              description="We embrace remote work to enable rapid execution and provide seamless, global services ensuring flexibility."
              delay={0.4}
            />
            <ValueCard
              icon={Zap}
              title="Inventors & Simplifiers"
              description="We prioritize streamlined solutions that ensure rapid delivery while supporting long-term maintainability."
              delay={0.5}
            />
            <ValueCard
              icon={Award}
              title="Highest Standards"
              description="We leverage cutting-edge technology and adhere to the best practices to deliver exceptional customer satisfaction."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#4CD787]/10 rounded-full blur-3xl z-0"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-6 text-[#4CD787]">Our Vision</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To revolutionize software development by delivering innovative, efficient, and scalable solutions that
                  empower businesses worldwide to thrive in a digital-first future.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection
              className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative overflow-hidden"
              delay={0.2}
            >
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4834D4]/10 rounded-full blur-3xl z-0"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-6 text-[#4CD787]">Our Mission</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We aim to simplify the software development journey through a streamlined, result-first process, from
                  free consultation to seamless onboarding and rapid delivery—ensuring our clients' exceptional quality,
                  adaptability, and long-term success.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Our Process</h2>
            <p className="text-foreground/80">
              We follow a proven methodology to ensure successful project delivery every time.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Process timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4CD787]/0 via-[#4CD787] to-[#4CD787]/0 transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-16">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description: "We begin by exploring your goals, challenges, and vision through deep consultation.",
                  image: "/images/about/process-discovery.png",
                },
                {
                  number: "02",
                  title: "Planning",
                  description: "We create a detailed roadmap with timelines, milestones, and resource allocation.",
                  image: "/images/about/process-planning.png",
                },
                {
                  number: "03",
                  title: "Development",
                  description: "Our engineers bring your vision to life — fast, scalable, and future-ready.",
                  image: "/images/about/process-development.png",
                },
                {
                  number: "04",
                  title: "Testing & Launch",
                  description: "We rigorously test and deploy your solution, ensuring a smooth launch.",
                  image: "/images/about/process-testing.png",
                },
                {
                  number: "05",
                  title: "Support & Growth",
                  description: "We provide ongoing maintenance and identify opportunities for enhancement.",
                  image: "/images/about/process-support.png",
                },
              ].map((step, index) => (
                <AnimatedSection key={step.number} delay={index * 0.1}>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className={`${index % 2 === 1 ? "md:text-right" : ""}`}>
                      <div className="inline-block bg-[#4CD787]/10 text-[#4CD787] text-xl font-bold px-4 py-2 rounded-lg mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                      <p className="text-foreground/80 leading-relaxed">{step.description}</p>
                    </div>

                    <div className="relative">
                      <div className="aspect-video rounded-xl overflow-hidden">
                        <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                      </div>

                      {/* Timeline dot for desktop */}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-[calc(50%+12px)] w-6 h-6 bg-[#4CD787] rounded-full border-4 border-black hidden md:block"></div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Our Leadership</h2>
            <p className="text-foreground/80">
              Meet the experienced professionals who lead our team and drive our success.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMemberCard
              name="Alex Sheikhizadeh"
              role="Founder & CEO"
              image="/images/about/ceo-headshot.png"
              delay={0.1}
            />
            <TeamMemberCard name="Sarah Johnson" role="CTO" image="/images/about/cto-headshot.png" delay={0.2} />
            <TeamMemberCard
              name="David Chen"
              role="Lead Developer"
              image="/images/about/lead-dev-headshot.png"
              delay={0.3}
            />
            <TeamMemberCard
              name="Maria Rodriguez"
              role="Project Manager"
              image="/images/about/pm-headshot.png"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#4CD787]/5 to-[#0a0a1a]"></div>
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <a
              href="#our-values"
              className="inline-block mb-8 bg-[#8A4FFF]/20 hover:bg-[#8A4FFF]/30 text-white border border-[#8A4FFF]/50 px-6 py-2 rounded-full text-sm font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("our-values")?.scrollIntoView({
                  behavior: "smooth",
                })
              }}
            >
              Discover why clients choose us
            </a>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Your Project?</h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your goals with our expert software development services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#4CD787] text-black hover:bg-[#4CD787]/90 px-8 py-3 rounded-lg transition-colors font-medium"
              >
                Get in Touch
              </Link>
              <a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg transition-colors font-medium border border-white/30"
                onClick={(e) => {
                  window.open(
                    "https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05",
                    "_blank",
                  )
                  e.preventDefault()
                }}
              >
                Schedule a Call
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
