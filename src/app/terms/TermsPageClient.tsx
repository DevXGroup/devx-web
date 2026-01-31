'use client'

import type { ReactNode } from 'react'
import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import {
  Gavel,
  Handshake,
  Layers,
  Shield,
  Timer,
  NotebookPen,
  Rocket,
  Workflow,
  ArrowRight,
} from 'lucide-react'
import BlurText from '@/components/animations/BlurText'

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const lastUpdated = 'October 22, 2025'

type Section = {
  id: string
  number: string
  title: string
  paragraphs?: ReactNode[]
  bullets?: { label?: string; body: ReactNode }[]
  columns?: { title: string; items: ReactNode[] }[]
}

const highlightCards = [
  {
    title: 'Strategic Partnership',
    description:
      'Every engagement pairs product strategists, designers, and engineers who live inside your roadmap—not a rotating vendor pool.',
    icon: Handshake,
  },
  {
    title: 'Transparent Execution',
    description:
      'Clear budgets, burn-down analytics, and weekly executive summaries keep stakeholders aligned from kickoff to launch.',
    icon: Layers,
  },
  {
    title: 'Security-First Delivery',
    description:
      'Zero-trust infrastructure, SOC 2-friendly policies, and audited supply chains support regulated industries and enterprise procurement.',
    icon: Shield,
  },
]

const sections: Section[] = [
  {
    id: 'engagement-overview',
    number: '01',
    title: 'Engagement Overview',
    paragraphs: [
      <>
        DevX Group LLC (<strong>&quot;DevX Group&quot;</strong> or <strong>&quot;we&quot;</strong>)
        designs, builds, and scales digital products, AI platforms, immersive experiences, and
        connected hardware for clients across the globe. These Terms of Service (
        <strong>&quot;Terms&quot;</strong>) govern how we work with you (
        <strong>&quot;Client&quot;</strong>) when you access our website, participate in discovery,
        or execute a statement of work (<strong>SOW</strong>).
      </>,
      <>
        When a Master Services Agreement, SOW, or Order Form conflicts with these Terms, the
        negotiated document controls for that engagement.
      </>,
    ],
  },
  {
    id: 'scope-deliverables',
    number: '02',
    title: 'Scope & Deliverables',
    columns: [
      {
        title: 'Included in Typical Engagements',
        items: [
          <>Product strategy workshops, customer research synthesis, and KPI alignment.</>,
          <>
            Experience design, design systems, interactive prototypes, and accessibility reviews.
          </>,
          <>
            Full-stack engineering for web, mobile, 3D/immersive, AI/ML, automation, and IoT
            workloads.
          </>,
          <>
            QA automation, security hardening, performance optimization, and observability
            instrumentation.
          </>,
        ],
      },
      {
        title: 'What We Need from Client Teams',
        items: [
          <>
            Timely access to subject matter experts, stakeholders, and sandbox data or environments.
          </>,
          <>
            Design feedback and approvals within mutually agreed service-level targets (typically
            2–3 business days).
          </>,
          <>
            Decision-making authority for prioritization, risk acceptance, and production release
            approvals.
          </>,
        ],
      },
    ],
    paragraphs: [
      <>
        Additional services (e.g., managed hosting, 24/7 support) are offered through addenda. DevX
        Group does not provide legal, payroll, or tax advisory services.
      </>,
    ],
  },
  {
    id: 'engagement-models',
    number: '03',
    title: 'Engagement Models & Fees',
    paragraphs: [
      <>
        Pricing, invoicing cadence, and payment terms are detailed in each SOW. Typical models
        include:
      </>,
    ],
    bullets: [
      {
        label: 'Discovery & Strategy Sprints',
        body: (
          <>
            Fixed fee, billed 50% on kickoff and 50% on delivery of the agreed playbook or roadmap.
          </>
        ),
      },
      {
        label: 'Product Delivery Pods',
        body: (
          <>
            Monthly retainer for cross-functional teams (strategy, design, engineering). Invoices
            issued in advance; overages or additional squads require written approval.
          </>
        ),
      },
      {
        label: 'Specialized Projects or Audits',
        body: (
          <>
            Time-and-materials with weekly burn reporting, payable Net 15 unless otherwise
            negotiated.
          </>
        ),
      },
      {
        label: 'Late Payments',
        body: (
          <>
            Late payments may accrue 1.5% interest per month or the highest amount allowed by law,
            whichever is less.
          </>
        ),
      },
    ],
  },
  {
    id: 'intellectual-property',
    number: '04',
    title: 'Intellectual Property & Licensing',
    paragraphs: [
      <>
        Once Client pays all fees due under an applicable SOW, Client owns the bespoke software,
        designs, models, and documentation created specifically for the project (
        <strong>&quot;Deliverables&quot;</strong>).
      </>,
      <>
        DevX Group retains ownership of pre-existing or generalized tools, component libraries,
        scripts, templates, and internal frameworks (<strong>&quot;DevX Materials&quot;</strong>).
        We license DevX Materials to Client on a perpetual, non-exclusive basis for use within the
        Deliverables.
      </>,
    ],
  },
  {
    id: 'confidentiality-security',
    number: '05',
    title: 'Confidentiality & Security',
    bullets: [
      {
        label: 'Mutual Protection',
        body: (
          <>
            Both parties agree to keep proprietary or non-public information confidential, restrict
            access to authorized personnel, and use it solely for the engagement.
          </>
        ),
      },
      {
        label: 'Security Program',
        body: (
          <>
            DevX Group maintains access controls, audit logging, vulnerability management, and
            incident response playbooks that align with SOC 2 and ISO 27001 best practices.
          </>
        ),
      },
      {
        label: 'Incident Response',
        body: (
          <>
            We will notify Client within 48 hours of confirming a security incident impacting Client
            data and collaborate on remediation.
          </>
        ),
      },
    ],
  },
  {
    id: 'open-source-third-party',
    number: '06',
    title: 'Open Source & Third-Party Services',
    paragraphs: [
      <>
        Modern products leverage open source and commercial services. DevX Group will document key
        dependencies and their licenses in project repositories or release notes.
      </>,
    ],
    bullets: [
      {
        label: 'Client Responsibility',
        body: (
          <>Maintain compliance with third-party license terms once Deliverables are transferred.</>
        ),
      },
      {
        label: 'Subprocessors',
        body: (
          <>
            We may engage vetted partners (e.g., data scientists, accessibility specialists) to
            support the engagement. DevX Group remains responsible for their performance.
          </>
        ),
      },
      {
        label: 'Service Availability',
        body: (
          <>We are not liable for outages or policy changes by third-party platforms or APIs.</>
        ),
      },
    ],
  },
  {
    id: 'ai-usage',
    number: '07',
    title: 'AI, Generative Tools & Training Data',
    paragraphs: [
      <>
        AI accelerators and copilots help us ship faster, but they are always governed by
        client-approved policies.
      </>,
    ],
    bullets: [
      {
        label: 'Opt-In Approach',
        body: (
          <>
            We only connect client repositories, datasets, or prompts to AI tooling with written
            consent.
          </>
        ),
      },
      {
        label: 'Model Governance',
        body: (
          <>
            Third-party models (OpenAI, Anthropic, Vertex, Bedrock, etc.) are configured to disable
            provider retention. Self-hosted models follow Client&apos;s infrastructure policies.
          </>
        ),
      },
      {
        label: 'Traceability',
        body: (
          <>
            Prompts, fine-tuning data, and evaluation metrics are logged for audit and compliance
            reviews.
          </>
        ),
      },
    ],
  },
  {
    id: 'change-management',
    number: '08',
    title: 'Change Management & Governance',
    paragraphs: [
      <>
        Scope and priorities evolve. Change requests must be documented through backlog grooming,
        change orders, or sprint planning sessions with an authorized Client representative.
      </>,
    ],
    bullets: [
      {
        label: 'Impact Assessment',
        body: (
          <>
            DevX Group will provide timeline, cost, and risk implications for each requested change.
          </>
        ),
      },
      {
        label: 'Approval Workflow',
        body: (
          <>
            Work begins after written approval via email, project workspace, or signature, depending
            on the SOW.
          </>
        ),
      },
      {
        label: 'Client Delays',
        body: (
          <>Missed reviews or blocked dependencies may adjust timelines and budget in good faith.</>
        ),
      },
    ],
  },
  {
    id: 'acceptance-warranty',
    number: '09',
    title: 'Acceptance, Warranty & Support',
    columns: [
      {
        title: 'Acceptance',
        items: [
          <>
            Each milestone includes a review window defined in the SOW (usually 5 business days).
          </>,
          <>
            Absence of written rejection with specific defects equals acceptance of that
            deliverable.
          </>,
          <>Defects must be reproducible and materially deviate from agreed requirements.</>,
        ],
      },
      {
        title: 'Warranty',
        items: [
          <>
            For 60 days after acceptance we will remediate defects caused by our code at no
            additional cost.
          </>,
          <>
            Warranty excludes issues caused by third-party updates, unsupported environments, or
            Client changes.
          </>,
        ],
      },
      {
        title: 'Post-Launch Support',
        items: [
          <>
            Extended support windows, DevOps, or growth experiments are available as separate
            retainers.
          </>,
        ],
      },
    ],
  },
  {
    id: 'payments-taxes',
    number: '10',
    title: 'Payments, Expenses & Taxes',
    bullets: [
      {
        label: 'Invoicing',
        body: (
          <>
            Invoices are issued electronically. Client agrees to remit payment via ACH, wire, or
            credit card.
          </>
        ),
      },
      {
        label: 'Expenses',
        body: (
          <>
            Travel or specialty software costs require pre-approval and are billed at actual cost.
          </>
        ),
      },
      {
        label: 'Taxes',
        body: (
          <>
            Fees exclude taxes. Client is responsible for withholding or paying applicable taxes
            unless exempt.
          </>
        ),
      },
    ],
  },
  {
    id: 'term-termination',
    number: '11',
    title: 'Term & Termination',
    bullets: [
      {
        label: 'Term',
        body: <>These Terms remain in effect while any SOW, order, or subscription is active.</>,
      },
      {
        label: 'Termination for Convenience',
        body: (
          <>
            Either party may terminate an SOW with 30 days written notice unless otherwise
            specified.
          </>
        ),
      },
      {
        label: 'Termination for Cause',
        body: (
          <>
            Immediate termination applies for material breach not cured within 15 days after written
            notice.
          </>
        ),
      },
      {
        label: 'Effect of Termination',
        body: (
          <>
            Client pays for work performed through the termination date. DevX Group delivers
            accepted work in progress once outstanding invoices are settled. Confidentiality and IP
            obligations survive termination.
          </>
        ),
      },
    ],
  },
  {
    id: 'liability',
    number: '12',
    title: 'Liability & Indemnity',
    bullets: [
      {
        label: 'Limitation of Liability',
        body: (
          <>
            Our aggregate liability is capped at the fees paid to DevX Group in the 12 months
            preceding the claim. Neither party is liable for indirect, incidental, or consequential
            damages.
          </>
        ),
      },
      {
        label: 'Client Indemnity',
        body: (
          <>
            Client will indemnify DevX Group for claims arising from Client-provided materials,
            direction, or misuse of Deliverables.
          </>
        ),
      },
      {
        label: 'DevX Group Indemnity',
        body: (
          <>
            We will indemnify Client against third-party IP infringement claims alleging
            Deliverables (excluding Client content) violate their rights, subject to limitations in
            the SOW.
          </>
        ),
      },
    ],
  },
  {
    id: 'disputes-law',
    number: '13',
    title: 'Dispute Resolution & Governing Law',
    paragraphs: [
      <>
        We prioritize direct collaboration to resolve issues quickly. If we cannot resolve a dispute
        within 30 days, the parties will participate in mediation in San Diego County, California
        before proceeding to binding arbitration under the American Arbitration Association’s
        commercial rules.
      </>,
      <>
        These Terms are governed by the laws of the State of California, excluding conflict of law
        principles. Both parties waive the right to participate in class or consolidated actions.
      </>,
    ],
  },
  {
    id: 'acronyms',
    number: '14',
    title: 'Acronym Reference',
    paragraphs: [
      <>
        For your convenience, here are definitions of technical and business acronyms used
        throughout these terms:
      </>,
    ],
    columns: [
      {
        title: 'Technical Terms',
        items: [
          <>
            <strong>AI</strong> — Artificial Intelligence
          </>,
          <>
            <strong>API</strong> — Application Programming Interface
          </>,
          <>
            <strong>AWS</strong> — Amazon Web Services
          </>,
          <>
            <strong>DevOps</strong> — Development and Operations
          </>,
          <>
            <strong>IoT</strong> — Internet of Things
          </>,
          <>
            <strong>IP</strong> — Intellectual Property
          </>,
          <>
            <strong>ML</strong> — Machine Learning
          </>,
          <>
            <strong>QA</strong> — Quality Assurance
          </>,
          <>
            <strong>3D</strong> — Three-Dimensional
          </>,
        ],
      },
      {
        title: 'Business & Legal',
        items: [
          <>
            <strong>ACH</strong> — Automated Clearing House
          </>,
          <>
            <strong>ISO 27001</strong> — International Organization for Standardization 27001
          </>,
          <>
            <strong>KPI</strong> — Key Performance Indicator
          </>,
          <>
            <strong>LLC</strong> — Limited Liability Company
          </>,
          <>
            <strong>SaaS</strong> — Software as a Service
          </>,
          <>
            <strong>SOC 2</strong> — Service Organization Control 2
          </>,
          <>
            <strong>SOW</strong> — Statement of Work
          </>,
        ],
      },
    ],
  },
  {
    id: 'contact',
    number: '15',
    title: 'Contact & Notices',
    paragraphs: [
      <>
        Notices must be delivered by email to the contacts listed below or via the notification
        method in the applicable SOW. Administrative questions are welcome anytime.
      </>,
    ],
    bullets: [
      {
        body: (
          <>
            Email:{' '}
            <a
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              href="mailto:support@devxgroup.io"
            >
              support@devxgroup.io
            </a>
          </>
        ),
      },
      { body: <>Phone: +1 (442) 544-0591</> },
      { body: <>Mailing Address: DevX Group LLC, San Diego, California, USA</> },
    ],
  },
]

export default function TermsPageClient() {
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#000B14] text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(circle_at_60%_0%,_rgba(251,191,36,0.06),_transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_0%_100%,_rgba(6,182,212,0.05),_transparent_60%)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 pt-32 pb-40">
        {/* Header Section */}
        <AnimatedSection className="max-w-4xl mx-auto mb-20 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-400 backdrop-blur-sm mb-8"
          >
            <Gavel className="h-3.5 w-3.5" />
            Terms of Service
          </motion.div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            <BlurText
              text="Clear guardrails for elite product delivery."
              className="inline-block"
              delay={50}
              startDelay={200}
              stepDuration={0.4}
              once={true}
            />
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Every DevX Group partnership is built on transparency, rigorous execution, and mutual
            accountability. These terms outline how we collaborate from discovery through scale.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-400 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/5 px-3 py-1.5 font-medium text-slate-300">
              <NotebookPen className="h-4 w-4 text-emerald-500" />
              Last updated {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/5 px-3 py-1.5">
              <Timer className="h-4 w-4 text-emerald-500" />
              Rapid onboarding (2-week average)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/5 px-3 py-1.5">
              <Workflow className="h-4 w-4 text-emerald-500" />
              Suited for SaaS, AI, and IoT programs
            </span>
          </div>
        </AnimatedSection>

        {/* Highlights Grid */}
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-3 mb-32">
          {highlightCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <AnimatedSection key={card.title} delay={0.1 * idx}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="mb-6 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-400">{card.description}</p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-12 lg:gap-20 lg:flex-row max-w-7xl mx-auto">
          {/* Sticky Sidebar */}
          <aside className="lg:w-72 flex-none">
            <div className="sticky top-32 rounded-2xl border border-white/10 bg-[#0A0F13]/80 p-6 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-6">
                Contents
              </p>
              <nav>
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          document
                            .getElementById(section.id)
                            ?.scrollIntoView({ behavior: 'smooth' })
                          setActiveSection(section.id)
                        }}
                        className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate mr-4">{section.title}</span>
                        <span
                          className={`text-[10px] font-mono transition-colors ${
                            activeSection === section.id
                              ? 'text-emerald-400'
                              : 'text-slate-600 group-hover:text-slate-500'
                          }`}
                        >
                          {section.number}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Scrolling Content */}
          <div className="flex-1 min-w-0 space-y-24">
            {sections.map((section, idx) => (
              <AnimatedSection key={section.id} delay={0}>
                <section id={section.id} className="scroll-mt-32 group">
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="font-mono text-emerald-500 text-sm font-semibold tracking-wider opacity-60">
                      {section.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight group-hover:text-emerald-50">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-6 text-slate-300/90 text-base sm:text-lg leading-relaxed">
                    {section.paragraphs?.map((paragraph, index) => (
                      <p key={index} className="max-w-3xl">
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets && (
                      <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 transition-colors">
                        <ul className="space-y-4">
                          {section.bullets.map((item, index) => (
                            <li
                              key={index}
                              className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-slate-300"
                            >
                              {item.label && (
                                <span className="text-sm font-semibold uppercase tracking-wide text-emerald-400/90 sm:w-48 sm:flex-none">
                                  {item.label}
                                </span>
                              )}
                              <span className="text-slate-300">{item.body}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.columns && (
                      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {section.columns.map((column) => (
                          <div
                            key={column.title}
                            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:from-white/[0.05] transition-colors"
                          >
                            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              {column.title}
                            </h3>
                            <ul className="space-y-3">
                              {column.items.map((item, index) => (
                                <li
                                  key={index}
                                  className="flex gap-3 text-sm text-slate-400 leading-normal"
                                >
                                  <span className="text-emerald-500/50 mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
                <div className="h-px bg-white/5 mt-16 w-full max-w-3xl" />
              </AnimatedSection>
            ))}

            {/* Bottom CTA */}
            <AnimatedSection>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-16 text-center shadow-[0_40px_80px_-40px_rgba(16,185,129,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-950/20" />
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <Rocket className="mx-auto h-12 w-12 text-emerald-400 mb-4" />
                  <h2 className="text-3xl font-bold text-white">
                    Ready to scope your next product initiative?
                  </h2>
                  <p className="text-slate-400 text-lg">
                    Share your roadmap, procurement requirements, or security questionnaire and
                    we&apos;ll get your team onboarded in days, not months.
                  </p>
                  <div className="pt-4 flex justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-black px-6 py-3 font-semibold hover:bg-emerald-400 transition-colors"
                    >
                      Start a Conversation
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
