import { Metadata } from 'next'
import PricingPage from './PricingPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'
import StructuredData from '@/components/seo/StructuredData'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/pricing'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Pricing',
    title: 'Flexible Engagements for High-Velocity Teams',
    subtitle: 'Rapid MVP • Growth Accelerator • Enterprise Delivery',
    focus: ['Dedicated Squads', 'Fractional Leadership', 'Support Retainers'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Pricing',
    title: 'Flexible Engagements for High-Velocity Teams',
    subtitle: 'Rapid MVP • Growth Accelerator • Enterprise Delivery',
    focus: ['Dedicated Squads', 'Fractional Leadership', 'Support Retainers'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Software Development Pricing | Custom Solutions & Enterprise Packages',
  description:
    'Transparent pricing for professional software development services. Choose from Rapid MVP, Growth Accelerator, or Enterprise packages. Custom quotes available for complex projects.',
  keywords: [
    'software development pricing',
    'custom solutions pricing',
    'enterprise packages',
    'mvp development cost',
    'transparent pricing',
    'software development rates',
  ],
  openGraph: {
    title: 'Software Development Pricing | Custom Solutions & Enterprise Packages',
    description:
      'Transparent pricing for professional software development services. Choose from Rapid MVP, Growth Accelerator, or Enterprise packages.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Software Development Pricing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Development Pricing',
    description:
      'Transparent pricing for professional software development services. Rapid MVP, Growth Accelerator, and Enterprise packages.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Pricing() {
  return (
    <>
      <StructuredData
        type="faq"
        faqs={[
          {
            question: 'What pricing models do you offer?',
            answer:
              'We offer flexible engagement models including Rapid MVP for startups (8-12 weeks), Growth Accelerator for scaling companies (3-6 months), and Enterprise packages for large-scale projects. All packages include transparent pricing with no hidden fees.',
          },
          {
            question: 'How quickly can you start a project?',
            answer:
              'For Rapid MVP engagements, we can typically begin within 1-2 weeks after contract signing. Larger engagements may require 2-4 weeks for proper planning and team allocation. We prioritize quick onboarding without compromising quality.',
          },
          {
            question: 'Do you offer custom pricing for unique requirements?',
            answer:
              'Yes, we provide custom quotes for projects with specialized requirements, ongoing support retainers, or enterprise-level engagements. Contact us to discuss your specific needs and receive a tailored proposal.',
          },
          {
            question: 'What is included in your software development services?',
            answer:
              'Our services include full-stack development, UI/UX design, AI/ML integration, cloud infrastructure setup, testing, deployment, and ongoing support. Each package is customized based on your project requirements and business goals.',
          },
          {
            question: 'Do you provide ongoing maintenance and support?',
            answer:
              'Yes, we offer support retainers and maintenance packages post-launch. This includes bug fixes, security updates, feature enhancements, and technical support. Support terms can be customized based on your needs.',
          },
          {
            question: 'What payment terms do you accept?',
            answer:
              'We accept milestone-based payments, monthly retainers, or project-based billing depending on the engagement type. Payment methods include credit card, bank transfer, and cryptocurrency. Specific terms are outlined in the contract.',
          },
        ]}
      />
      <PricingPage />
    </>
  )
}
