import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | DevX Group LLC',
  description: 'Privacy Policy for DevX Group LLC - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-neutral-900">
      <div className="container mx-auto px-4 py-40">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-neutral-100 font-mono">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-neutral-400 mb-8">
              <strong>Last Updated:</strong> January 15, 2025
            </p>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">1. Introduction</h2>
              <p className="text-neutral-300">
                DevX Group LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3 text-neutral-200">Personal Information</h3>
              <p className="text-neutral-300 mb-4">
                We may collect the following types of personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Name, email address, phone number</li>
                <li>Company information and job title</li>
                <li>Project requirements and technical specifications</li>
                <li>Communication preferences</li>
                <li>Payment and billing information</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-neutral-200 mt-6">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>IP address and browser information</li>
                <li>Device type and operating system</li>
                <li>Website usage patterns and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">3. How We Use Your Information</h2>
              <p className="text-neutral-300 mb-4">
                We use your personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Providing and maintaining our software development services</li>
                <li>Communicating about projects, updates, and service improvements</li>
                <li>Processing payments and managing billing</li>
                <li>Improving our website and user experience</li>
                <li>Complying with legal obligations</li>
                <li>Marketing our services (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">4. Information Sharing and Disclosure</h2>
              <p className="text-neutral-300 mb-4">
                We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li><strong>Service Providers:</strong> Third-party vendors who assist in our operations</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                <li><strong>Consent:</strong> With your explicit permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">5. Data Security</h2>
              <p className="text-neutral-300">
                We implement appropriate technical and organizational security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 
                completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">6. Your Rights</h2>
              <p className="text-neutral-300 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li><strong>Access:</strong> Request copies of your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              <p className="text-neutral-300 mt-4">
                To exercise these rights, contact us at support@devxgroup.io.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">7. California Privacy Rights (CCPA)</h2>
              <p className="text-neutral-300 mb-4">
                California residents have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Right to know what personal information we collect</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising CCPA rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">8. Cookies and Tracking Technologies</h2>
              <p className="text-neutral-300">
                We use cookies and similar technologies to enhance your experience on our website. You can control 
                cookie preferences through your browser settings. Some features may not function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">9. Third-Party Services</h2>
              <p className="text-neutral-300">
                Our website may contain links to third-party services such as Calendly for scheduling. These services have 
                their own privacy policies, and we are not responsible for their privacy practices.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">10. Children&apos;s Privacy</h2>
              <p className="text-neutral-300">
                Our services are not intended for children under 13. We do not knowingly collect personal information 
                from children under 13. If we become aware of such collection, we will delete the information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">11. International Data Transfers</h2>
              <p className="text-neutral-300">
                Your information may be transferred to and processed in countries other than your country of residence. 
                We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">12. Changes to This Policy</h2>
              <p className="text-neutral-300">
                We may update this Privacy Policy periodically. We will notify you of material changes by posting 
                the updated policy on our website with a new effective date.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 font-mono">13. Contact Information</h2>
              <div className="text-neutral-300">
                <p className="mb-2">If you have questions about this Privacy Policy, please contact us:</p>
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