import type { ReactNode } from 'react'
import { Metadata } from 'next'
import {
  Gavel,
  Handshake,
  Layers,
  Shield,
  Timer,
  NotebookPen,
  Rocket,
  Workflow,
} from 'lucide-react'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pagePath = '/terms'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Terms of Service',
    title: 'Partnership Principles for Modern Product Delivery',
    subtitle: 'Clear guardrails that keep teams aligned from strategy to scale',
    focus: ['Trusted Collaboration', 'Security & Compliance', 'Product Ownership'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Terms of Service',
    title: 'Partnership Principles for Modern Product Delivery',
    subtitle: 'Clear guardrails that keep teams aligned from strategy to scale',
    focus: ['Trusted Collaboration', 'Security & Compliance', 'Product Ownership'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Terms of Service | DevX Group LLC',
  description:
    'Understand the engagement, payment, IP, and governance standards that guide every DevX Group software partnership.',
  keywords: [
    'terms of service',
    'software development agreement',
    'professional services terms',
    'DevX Group',
    'product development',
    'AI software contract',
  ],
  openGraph: {
    title: 'Terms of Service | DevX Group LLC',
    description:
      'Understand the engagement, payment, IP, and governance standards that guide every DevX Group software partnership.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Terms of Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | DevX Group LLC',
    description:
      'Review DevX Group’s partnership commitments across discovery, delivery, testing, and ongoing support.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
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
              className="text-emerald-300 hover:text-emerald-200"
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

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(252,_211,_77,_0.12),_transparent_60%),_radial-gradient(circle_at_bottom_right,_rgba(14,_165,_233,_0.1),_transparent_55%)]" />

      <div className="relative container mx-auto px-4 pt-36 pb-48">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-slate-300 backdrop-blur">
            <Gavel className="h-4 w-4 text-emerald-300" />
            Terms of Service
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Clear guardrails for elite product delivery.
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">
            Every DevX Group partnership is built on transparency, rigorous execution, and mutual
            accountability. These terms outline how we collaborate from discovery through scale.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 font-medium text-slate-200">
              <NotebookPen className="h-4 w-4 text-emerald-300" />
              Last updated {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <Timer className="h-4 w-4 text-emerald-300" />
              Rapid onboarding (2-week average)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <Workflow className="h-4 w-4 text-emerald-300" />
              Suited for SaaS, AI, and IoT programs
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlightCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_45px_-30px_rgba(255,196,54,0.6)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex rounded-full bg-emerald-400/10 p-3 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{card.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 flex flex-col gap-10 lg:flex-row">
          <aside className="lg:w-64">
            <div className="sticky top-32 space-y-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Quick Navigation
              </p>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <span>{section.title}</span>
                      <span className="text-xs font-semibold text-emerald-300/80 group-hover:text-emerald-200">
                        {section.number}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1 space-y-20">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-emerald-300">
                    {section.number}
                  </span>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">{section.title}</h2>
                </div>

                <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                  {section.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="text-slate-200/90">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-4 rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                      {section.bullets.map((item, index) => (
                        <li key={index} className="flex flex-col gap-1 text-slate-200/90">
                          {item.label ? (
                            <span className="text-sm font-semibold uppercase tracking-wide text-emerald-300/90">
                              {item.label}
                            </span>
                          ) : null}
                          <span className="text-base text-slate-200">{item.body}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.columns && (
                    <div className="grid gap-6 lg:grid-cols-3">
                      {section.columns.map((column) => (
                        <div
                          key={column.title}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                        >
                          <h3 className="text-base font-semibold text-white">{column.title}</h3>
                          <ul className="mt-3 space-y-3 text-sm text-slate-200/90">
                            {column.items.map((item, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" />
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
            ))}
          </div>
        </div>

        <div className="relative z-30 mt-20 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur shadow-[0_25px_60px_-35px_rgba(34,197,94,0.5)]">
          <div className="mx-auto max-w-3xl space-y-4">
            <Rocket className="mx-auto h-10 w-10 text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">
              Ready to scope your next product initiative?
            </h2>
            <p className="text-slate-300">
              Share your roadmap, procurement requirements, or security questionnaire and we&apos;ll
              assemble the right pod for launch.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              Talk with DevX Group
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
    </div>
  )
}
