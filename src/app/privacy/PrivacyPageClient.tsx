'use client'

import type { ReactNode } from 'react'
import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import {
  ShieldCheck,
  Network,
  Sparkles,
  UserCheck,
  FileText,
  Lock,
  Globe,
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
  eyebrow?: string
  paragraphs?: ReactNode[]
  bullets?: { label?: string; body: ReactNode }[]
  columns?: { title: string; items: ReactNode[] }[]
}

const highlightCards = [
  {
    title: 'Confidential by Design',
    description:
      'Dedicated squads, private repos, and encrypted pipelines engineered for high-stakes SaaS, fintech, health, and IoT builds.',
    icon: ShieldCheck,
  },
  {
    title: 'Responsible AI Practices',
    description:
      'We never train external models on client data without written approval and route all AI usage through audited, access-controlled tooling.',
    icon: Sparkles,
  },
  {
    title: 'Global Compliance Ready',
    description:
      'Aligned to GDPR, CCPA, SOC2 expectations, and enterprise governance requirements so procurement moves fast.',
    icon: Globe,
  },
]

const sections: Section[] = [
  {
    id: 'introduction',
    number: '01',
    title: 'Who We Are',
    paragraphs: [
      <>
        DevX Group LLC (<strong>&quot;DevX Group&quot;</strong>, <strong>&quot;we&quot;</strong>, or{' '}
        <strong>&quot;us&quot;</strong>) builds custom software, immersive experiences, AI-enabled
        platforms, and connected hardware for clients across finance, health, media, and emerging
        tech. This Privacy Policy explains how we safeguard personal data and product IP when you
        visit our site, schedule time, or engage our team.
      </>,
      <>
        By accessing our website or services you acknowledge that you understand this policy. We
        deliver projects from the United States with globally distributed talent and apply the same
        controls across every region in which we operate.
      </>,
    ],
  },
  {
    id: 'information-we-collect',
    number: '02',
    title: 'Information We Collect',
    paragraphs: [
      <>
        We only collect the data needed to scope engagements, manage delivery, and support your
        team. This information falls into the categories below.
      </>,
    ],
    columns: [
      {
        title: 'Business Contact Data',
        items: [
          <>
            Identity details such as name, role, company, and preferred contact channels gathered
            via our forms, Calendly scheduling, or live events.
          </>,
          <>
            Conversation history, project briefs, and feedback shared during discovery or delivery.
          </>,
        ],
      },
      {
        title: 'Engagement Operations',
        items: [
          <>
            Agreements, statements of work, invoicing records, and payment confirmations processed
            through secure third-party providers.
          </>,
          <>
            Access logs, version control metadata, design artifacts, and QA evidence created while
            delivering your solution.
          </>,
        ],
      },
      {
        title: 'Analytics & Telemetry',
        items: [
          <>
            Device/browser data, IP address, locale, pages viewed, scroll depth, and campaign source
            captured with privacy-aware analytics (Google Analytics 4, Segment).
          </>,
          <>
            Product performance metrics (e.g., Sentry, LogRocket) only when expressly authorized in
            a project agreement.
          </>,
        ],
      },
    ],
  },
  {
    id: 'how-we-use-information',
    number: '03',
    title: 'How We Use Information',
    paragraphs: [
      <>
        We process personal information to deliver world-class software while preserving the
        confidentiality of sensitive business data.
      </>,
    ],
    bullets: [
      {
        label: 'Collaboration & Delivery',
        body: (
          <>
            Coordinate project teams, manage sprint rituals, share prototypes, and provide ongoing
            success support.
          </>
        ),
      },
      {
        label: 'Product Research & Improvement',
        body: (
          <>
            Analyze aggregated usage to improve our methodologies, design systems, and accelerators
            without exposing individual client details.
          </>
        ),
      },
      {
        label: 'Security Monitoring',
        body: (
          <>
            Detect unauthorized access, enforce zero-trust policies, and maintain audit trails
            required by enterprise procurement.
          </>
        ),
      },
      {
        label: 'Legal & Compliance',
        body: (
          <>
            Meet regulatory obligations, respond to lawful requests, and maintain accurate tax
            records.
          </>
        ),
      },
      {
        label: 'Consent-Based Marketing',
        body: (
          <>
            Send thought leadership or event updates only when you opt in. You can unsubscribe from
            any non-essential communication at any time.
          </>
        ),
      },
    ],
  },
  {
    id: 'legal-basis',
    number: '04',
    title: 'Legal Basis for Processing',
    paragraphs: [
      <>
        When required by applicable law (including GDPR), we rely on the following legal bases to
        process personal data:
      </>,
    ],
    bullets: [
      {
        label: 'Contractual necessity',
        body: <>To deliver services defined in mutual agreements.</>,
      },
      {
        label: 'Legitimate interests',
        body: <>To secure our systems, improve the platform, and grow our practice.</>,
      },
      {
        label: 'Consent',
        body: <>For optional uses like marketing communications or user research recordings.</>,
      },
      {
        label: 'Legal obligation',
        body: <>To comply with tax, accounting, export control, and other legal requirements.</>,
      },
    ],
  },
  {
    id: 'data-security',
    number: '05',
    title: 'Data Security & Retention',
    paragraphs: [
      <>
        Security is built into every DevX Group engagement. We maintain layered safeguards and audit
        trails appropriate for large enterprise programs.
      </>,
    ],
    columns: [
      {
        title: 'Controls We Maintain',
        items: [
          <>
            Encrypted storage, MFA, and role-based access for all collaboration tools and
            infrastructure.
          </>,
          <>
            Code and design repositories isolated per client with continuous vulnerability scanning.
          </>,
          <>
            Background-checked talent, confidentiality agreements, and secure device management for
            every contributor.
          </>,
        ],
      },
      {
        title: 'Retention Approach',
        items: [
          <>
            Project data retained for the term of our engagement plus the period required to meet
            legal, accounting, or audit obligations.
          </>,
          <>
            Marketing contact data retained until you unsubscribe or request deletion. Logs and
            telemetry are minimized and rotated.
          </>,
        ],
      },
    ],
  },
  {
    id: 'third-parties',
    number: '06',
    title: 'How We Work with Third Parties',
    paragraphs: [
      <>
        We partner with specialized platforms to streamline delivery. Each vendor is vetted for
        security and contractual compliance, and only the minimum required data is shared.
      </>,
    ],
    bullets: [
      {
        label: 'Scheduling & Communication',
        body: (
          <>
            Calendly, Google Workspace, Slack, Zoom — used for meetings, notifications, and
            collaboration with your consent.
          </>
        ),
      },
      {
        label: 'Product Development Tools',
        body: (
          <>
            Linear, Notion, Jira, GitHub, Figma, Webflow, and similar systems that support agile
            delivery and design reviews.
          </>
        ),
      },
      {
        label: 'Operations & Finance',
        body: (
          <>
            Stripe, QuickBooks, Gusto, and other processors that enable invoicing, payments, and
            compliance reporting.
          </>
        ),
      },
      {
        label: 'Analytics & Quality',
        body: (
          <>
            Google Analytics 4, Segment, Sentry, LogRocket, and Playwright audit tooling —
            configured with IP anonymization and data minimization wherever available.
          </>
        ),
      },
    ],
  },
  {
    id: 'ai-usage',
    number: '07',
    title: 'Responsible AI & Model Usage',
    paragraphs: [
      <>
        Many engagements include AI co-pilots, generative models, or predictive analytics. We apply
        a strict governance framework to keep your proprietary data secure.
      </>,
    ],
    bullets: [
      {
        label: 'Client Control',
        body: (
          <>
            AI-assisted features are configured in private tenants or self-hosted environments.
            Training on your datasets happens only with explicit approval.
          </>
        ),
      },
      {
        label: 'Model Providers',
        body: (
          <>
            When we leverage third-party models (OpenAI, Anthropic, Google Vertex, AWS Bedrock,
            etc.) we ensure the provider contractually prohibits data retention for model
            improvement.
          </>
        ),
      },
      {
        label: 'Explainability & Audit',
        body: (
          <>
            We document prompts, model versions, and evaluation metrics inside project workspaces so
            your legal, compliance, and product teams maintain oversight.
          </>
        ),
      },
    ],
  },
  {
    id: 'rights',
    number: '08',
    title: 'Your Rights & Choices',
    paragraphs: [
      <>
        Depending on where you reside, you may have rights to access, correct, export, or delete
        your personal information. DevX Group responds to requests within the timelines defined by
        law.
      </>,
    ],
    bullets: [
      {
        label: 'Access & Portability',
        body: <>Request a copy of the information we hold about you.</>,
      },
      { label: 'Rectification', body: <>Correct or update inaccurate or incomplete details.</> },
      {
        label: 'Deletion',
        body: <>Ask us to delete personal data when it is no longer required.</>,
      },
      {
        label: 'Restriction & Objection',
        body: <>Limit how we process data or object to processing based on legitimate interests.</>,
      },
      {
        label: 'Marketing Preferences',
        body: (
          <>Opt out of promotional messages directly from any email footer or by contacting us.</>
        ),
      },
    ],
  },
  {
    id: 'regional-rights',
    number: '09',
    title: 'Regional Disclosures',
    paragraphs: [
      <>
        <strong>California (CCPA/CPRA):</strong> California residents can request disclosure of data
        categories we collect, request deletion, and opt out of data sharing. We do not sell
        personal data.
      </>,
      <>
        <strong>European Union & United Kingdom (GDPR/UK GDPR):</strong> DevX Group acts as a data
        controller for marketing operations and as a data processor when delivering software on
        behalf of clients. You may file a complaint with your local supervisory authority if you
        believe we have improperly handled your data.
      </>,
    ],
  },
  {
    id: 'cookies',
    number: '10',
    title: 'Cookies & Similar Technologies',
    paragraphs: [
      <>
        We use essential cookies to keep the website secure and remember form progress. Optional
        analytics cookies help us understand the types of services visitors explore most — such as
        AI automation, immersive 3D experiences, or platform modernization.
      </>,
      <>
        You can adjust cookie preferences in your browser. Rejecting optional cookies will not block
        access to our site.
      </>,
    ],
  },
  {
    id: 'policy-updates',
    number: '11',
    title: 'Policy Updates',
    paragraphs: [
      <>
        We update this policy when we add new offerings, integrate critical tools, or respond to
        regulatory changes. We will post the revised policy with a new effective date and, when
        material, notify subscribed clients.
      </>,
    ],
  },
  {
    id: 'acronyms',
    number: '12',
    title: 'Acronym Reference',
    paragraphs: [
      <>
        For your convenience, here are definitions of technical and legal acronyms used throughout
        this policy:
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
            <strong>IoT</strong> — Internet of Things
          </>,
          <>
            <strong>IP</strong> — Internet Protocol or Intellectual Property (context dependent)
          </>,
          <>
            <strong>MFA</strong> — Multi-Factor Authentication
          </>,
          <>
            <strong>ML</strong> — Machine Learning
          </>,
          <>
            <strong>QA</strong> — Quality Assurance
          </>,
        ],
      },
      {
        title: 'Legal & Compliance',
        items: [
          <>
            <strong>CCPA</strong> — California Consumer Privacy Act
          </>,
          <>
            <strong>CPRA</strong> — California Privacy Rights Act
          </>,
          <>
            <strong>GDPR</strong> — General Data Protection Regulation
          </>,
          <>
            <strong>SOC 2</strong> — Service Organization Control 2
          </>,
          <>
            <strong>UK GDPR</strong> — United Kingdom General Data Protection Regulation
          </>,
        ],
      },
      {
        title: 'Business Terms',
        items: [
          <>
            <strong>LLC</strong> — Limited Liability Company
          </>,
          <>
            <strong>SaaS</strong> — Software as a Service
          </>,
        ],
      },
    ],
  },
  {
    id: 'contact',
    number: '13',
    title: 'Talk to Our Privacy Team',
    paragraphs: [
      <>
        We are happy to discuss security reviews, vendor questionnaires, or custom data processing
        agreements. Reach us through any of the channels below:
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

export default function PrivacyPageClient() {
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#000B14] text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,_rgba(76,215,135,0.08),_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_100%_100%,_rgba(66,153,225,0.05),_transparent_60%)]" />
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
            <Lock className="h-3.5 w-3.5" />
            Privacy Policy
          </motion.div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            <BlurText
              text="Secure & Trusted Product Partnerships"
              className="inline-block"
              delay={200}
            />
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            From AI copilots to immersive experiences, DevX Group keeps sensitive data, research,
            and customer insights private at every step of delivery.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-400 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/5 px-3 py-1.5 font-medium text-slate-300">
              <FileText className="h-4 w-4 text-emerald-500" />
              Effective {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/5 px-3 py-1.5">
              <Network className="h-4 w-4 text-emerald-500" />
              Applies to global engagements
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/5 px-3 py-1.5">
              <UserCheck className="h-4 w-4 text-emerald-500" />
              Vendor reviews welcome
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
          </div>
        </div>
      </div>
    </div>
  )
}
