import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-secondary-700 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-secondary-800">
          <p className="text-sm text-secondary-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Ottri Cleaning Services (&quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;). We are committed to
              protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              2. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create an account</li>
              <li>Book a cleaning service</li>
              <li>Contact us for customer support</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="mt-4">This information may include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Name and contact information (email, phone number, address)
              </li>
              <li>Payment information</li>
              <li>Service preferences and booking history</li>
              <li>Communications with our support team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your bookings and payments</li>
              <li>Send you service updates and confirmations</li>
              <li>Respond to your comments and questions</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Detect and prevent fraud or unauthorized activities</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <p>
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> Third-party companies that
                help us provide our services (e.g., payment processors, cleaning
                professionals)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights and safety
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, sale, or acquisition of our business
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              5. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              6. Your Rights and Choices
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Object to certain processing of your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our website and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li>Email: hello@ottri.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: Serving 6 metro areas</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
