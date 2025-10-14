import { Metadata } from 'next';
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og';

const siteUrl = getSiteUrl();
const pagePath = '/terms';
const pageUrl = `${siteUrl}${pagePath}`;
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Terms of Service',
    title: 'Partnership Principles for Modern Software Delivery',
    subtitle: 'Clear, transparent agreements that keep teams aligned',
    focus: ['Trusted Collaboration', 'Security & Compliance', 'Product Ownership'],
  },
  siteUrl
);
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Terms of Service',
    title: 'Partnership Principles for Modern Software Delivery',
    subtitle: 'Clear, transparent agreements that keep teams aligned',
    focus: ['Trusted Collaboration', 'Security & Compliance', 'Product Ownership'],
  },
  siteUrl
);

export const metadata: Metadata = {
  title: 'Terms of Service | DevX Group LLC',
  description: 'Terms of Service for DevX Group LLC - Understand the terms and conditions for using our software development services and website.',
  keywords: ['terms of service', 'terms and conditions', 'software development agreement', 'service terms', 'legal terms', 'user agreement'],
  openGraph: {
    title: 'Terms of Service | DevX Group LLC',
    description: 'Terms of Service for DevX Group LLC - Understand the terms and conditions for using our software development services and website.',
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
    description: 'Terms of Service for DevX Group LLC - Legal terms and conditions for our software development services.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-neutral-900">
      <div className="container mx-auto px-4 py-40">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-neutral-100 font-mono">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-neutral-400 mb-8">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">1. Agreement to Terms</h2>
              <p className="text-neutral-300">
                By accessing or using DevX Group LLC&apos;s (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) website and services, 
                you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by these Terms of Service (&quot;Terms&quot;). 
                If you do not agree to these Terms, do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">2. Description of Services</h2>
              <p className="text-neutral-300 mb-4">
                DevX Group LLC provides software development services including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Custom software development</li>
                <li>Web and mobile application development</li>
                <li>AI/ML solutions</li>
                <li>IoT hardware and software integration</li>
                <li>Digital transformation consulting</li>
                <li>Technical consulting and support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">3. Acceptance of Work</h2>
              <p className="text-neutral-300">
                All projects require a signed Statement of Work (SOW) or service agreement. We reserve the right 
                to refuse service to any client for any reason. Project scope, timeline, and deliverables will be 
                defined in separate project agreements.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">4. Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li><strong>Payment Schedule:</strong> As specified in individual project agreements</li>
                <li><strong>Late Payments:</strong> Interest of 1.5% per month may be charged on overdue amounts</li>
                <li><strong>Expenses:</strong> Client responsible for pre-approved third-party costs</li>
                <li><strong>Taxes:</strong> All prices exclude applicable taxes unless stated otherwise</li>
                <li><strong>Refunds:</strong> Refunds are governed by individual project agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">5. Intellectual Property Rights</h2>
              <h3 className="text-xl font-semibold mb-3 text-neutral-200">Client-Owned IP</h3>
              <p className="text-neutral-300 mb-4">
                Upon full payment, Client owns the custom software developed specifically for their project, 
                excluding our proprietary tools, frameworks, and methodologies.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-neutral-200">Company-Owned IP</h3>
              <p className="text-neutral-300 mb-4">
                We retain ownership of:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Pre-existing proprietary tools and frameworks</li>
                <li>General methodologies and processes</li>
                <li>Derivative improvements to our tools</li>
                <li>Know-how and techniques developed during projects</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">6. Confidentiality</h2>
              <p className="text-neutral-300">
                Both parties agree to maintain confidentiality of proprietary information shared during the course 
                of our relationship. This obligation survives termination of our agreement and continues indefinitely.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">7. Warranties and Disclaimers</h2>
              <h3 className="text-xl font-semibold mb-3 text-neutral-200">Limited Warranty</h3>
              <p className="text-neutral-300 mb-4">
                We warrant that services will be performed in a professional manner consistent with industry standards. 
                Software will substantially conform to agreed specifications for 90 days after delivery.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-neutral-200">Disclaimer</h3>
              <p className="text-neutral-300 mb-4">
                EXCEPT AS EXPRESSLY STATED, ALL SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, 
                EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">8. Limitation of Liability</h2>
              <p className="text-neutral-300 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Our total liability shall not exceed the amount paid by Client in the 12 months preceding the claim</li>
                <li>We are not liable for indirect, incidental, special, or consequential damages</li>
                <li>We are not liable for data loss, business interruption, or lost profits</li>
                <li>Client must notify us of any claims within 30 days of discovery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">9. Indemnification</h2>
              <p className="text-neutral-300">
                Client agrees to indemnify and hold harmless DevX Group LLC from claims arising from: 
                (a) Client&apos;s use of deliverables, (b) Client-provided content or data, (c) violation of these Terms, 
                or (d) infringement of third-party rights by Client&apos;s requirements or specifications.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">10. Project Changes and Scope</h2>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li><strong>Change Requests:</strong> Must be submitted in writing and approved by both parties</li>
                <li><strong>Additional Costs:</strong> Changes may result in additional fees and timeline extensions</li>
                <li><strong>Scope Creep:</strong> Work outside agreed scope will be billed separately</li>
                <li><strong>Client Delays:</strong> Client-caused delays may result in additional charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">11. Termination</h2>
              <p className="text-neutral-300 mb-4">
                Either party may terminate with 30 days written notice. Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Client pays for all work completed through termination date</li>
                <li>We deliver all work product completed as of termination</li>
                <li>Confidentiality and IP provisions survive termination</li>
                <li>Outstanding invoices become immediately due</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">12. Force Majeure</h2>
              <p className="text-neutral-300">
                Neither party is liable for delays or failures due to circumstances beyond reasonable control, 
                including natural disasters, government actions, labor disputes, or technical failures.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">13. Dispute Resolution</h2>
              <p className="text-neutral-300 mb-4">
                Disputes will be resolved through:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-neutral-300">
                <li><strong>Negotiation:</strong> Good faith discussions for 30 days</li>
                <li><strong>Mediation:</strong> Binding mediation in San Diego, California</li>
                <li><strong>Arbitration:</strong> Individual arbitration under American Arbitration Association rules</li>
              </ol>
              <p className="text-neutral-300 mt-4">
                <strong>CLASS ACTION WAIVER:</strong> Both parties waive the right to participate in class actions.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">14. Governing Law</h2>
              <p className="text-neutral-300">
                These Terms are governed by California state law without regard to conflict of law principles. 
                Exclusive jurisdiction for any court proceedings is in San Diego County, California.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">15. Data Protection and Security</h2>
              <p className="text-neutral-300">
                We implement reasonable security measures to protect Client data. However, Client is responsible 
                for backing up their data and maintaining appropriate security measures for their systems.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">16. Third-Party Dependencies</h2>
              <p className="text-neutral-300">
                Projects may require third-party software, services, or APIs. Client is responsible for obtaining 
                necessary licenses and compliance with third-party terms. We are not liable for third-party service 
                availability or changes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">17. Website Terms</h2>
              <p className="text-neutral-300 mb-4">
                For website usage:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>You may not use automated systems to access our site</li>
                <li>Do not attempt to interfere with site functionality</li>
                <li>Respect intellectual property rights in site content</li>
                <li>We reserve the right to modify or discontinue the site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">18. Severability</h2>
              <p className="text-neutral-300">
                If any provision of these Terms is found unenforceable, the remainder remains in full force and effect. 
                Unenforceable provisions will be modified to achieve the original intent to the extent possible.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">19. Entire Agreement</h2>
              <p className="text-neutral-300">
                These Terms, together with executed project agreements, constitute the entire agreement between parties. 
                Modifications must be in writing and signed by both parties.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">20. Contact Information</h2>
              <div className="text-neutral-300">
                <p className="mb-2">For questions about these Terms, contact us:</p>
                <p><strong>DevX Group LLC</strong></p>
                <p>Email: support@devxgroup.io</p>
                <p>Phone: +1 (442) 544-0591</p>
                <p>Address: San Diego, California</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Bottom fade-out effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
