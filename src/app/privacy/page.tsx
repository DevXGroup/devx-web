import type { ReactNode } from 'react'
import { Metadata } from 'next'
import { ShieldCheck, Network, Sparkles, UserCheck, FileText, Lock, Globe } from 'lucide-react'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pagePath = '/privacy'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Privacy Policy',
    title: 'Secure & Trusted Product Partnerships',
    subtitle: 'Data stewardship designed for modern AI, 3D, and enterprise builds',
    focus: ['CCPA Compliance', 'Secure Infrastructure', 'Trusted Partnerships'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Privacy Policy',
    title: 'Secure & Trusted Product Partnerships',
    subtitle: 'Data stewardship designed for modern AI, 3D, and enterprise builds',
    focus: ['CCPA Compliance', 'Secure Infrastructure', 'Trusted Partnerships'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Privacy Policy | DevX Group LLC',
  description:
    'How DevX Group LLC collects, protects, and uses information while delivering AI-enabled software, immersive experiences, and enterprise platforms.',
  keywords: [
    'privacy policy',
    'data protection',
    'CCPA compliance',
    'software development privacy',
    'AI privacy',
    'DevX Group',
  ],
  openGraph: {
    title: 'Privacy Policy | DevX Group LLC',
    description:
      'How DevX Group LLC collects, protects, and uses information while delivering AI-enabled software, immersive experiences, and enterprise platforms.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Privacy Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | DevX Group LLC',
    description:
      'Learn how DevX Group protects your product IP, customer data, and collaboration records across every engagement.',
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
    id: 'contact',
    number: '12',
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

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,_215,_135,_0.15),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(66,_153,_225,_0.12),_transparent_60%)]" />

      <div className="relative container mx-auto px-4 pt-36 pb-48">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-slate-300 backdrop-blur">
            <Lock className="h-4 w-4 text-emerald-300" />
            Privacy Policy
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            We protect your product IP with the same rigor we build it.
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">
            From AI copilots to immersive experiences, DevX Group keeps sensitive data, research,
            and customer insights private at every step of delivery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 font-medium text-slate-200">
              <FileText className="h-4 w-4 text-emerald-300" />
              Effective {lastUpdated}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <Network className="h-4 w-4 text-emerald-300" />
              Applies to global engagements
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
              <UserCheck className="h-4 w-4 text-emerald-300" />
              Vendor reviews welcome
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlightCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_45px_-30px_rgba(15,118,110,0.7)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
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
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
    </div>
  )
}
