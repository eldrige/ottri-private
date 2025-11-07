import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-secondary-700 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-secondary-800">
          <p className="text-sm text-secondary-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Ottri Cleaning Services
              (&quot;Service&quot;), you accept and agree to be bound by the
              terms and provisions of this agreement. If you do not agree to
              abide by the above, please do not use this Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              2. Services Description
            </h2>
            <p>
              Ottri provides professional cleaning services for residential and
              commercial properties. Our services include, but are not limited
              to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Regular home cleaning</li>
              <li>Deep cleaning services</li>
              <li>Move-in/move-out cleaning</li>
              <li>Office and commercial cleaning</li>
              <li>Specialized cleaning services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              3. Booking and Scheduling
            </h2>
            <p>
              <strong>3.1 Booking:</strong> All service bookings must be made
              through our website, mobile app, or by contacting our customer
              service team.
            </p>
            <p>
              <strong>3.2 Scheduling:</strong> We will make every effort to
              accommodate your preferred service date and time. However, we
              reserve the right to suggest alternative times if your preferred
              slot is unavailable.
            </p>
            <p>
              <strong>3.3 Cancellations:</strong> Cancellations must be made at
              least 24 hours before the scheduled service time to avoid
              cancellation fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              4. Pricing and Payment
            </h2>
            <p>
              <strong>4.1 Pricing:</strong> Prices for our services are listed
              on our website and may vary based on service type, property size,
              and location.
            </p>
            <p>
              <strong>4.2 Payment:</strong> Payment is due at the time of
              service completion unless otherwise agreed upon. We accept various
              payment methods including credit cards, debit cards, and digital
              payments.
            </p>
            <p>
              <strong>4.3 Price Changes:</strong> We reserve the right to adjust
              our pricing at any time. Any changes will be communicated in
              advance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              5. Client Responsibilities
            </h2>
            <p>As a client, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide accurate information about your property and cleaning
                needs
              </li>
              <li>Ensure safe access to the property at the scheduled time</li>
              <li>Secure or remove valuable, fragile, or personal items</li>
              <li>
                Inform us of any special requirements or concerns before service
              </li>
              <li>
                Provide a safe working environment for our cleaning
                professionals
              </li>
              <li>Pay for services as agreed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              6. Our Responsibilities
            </h2>
            <p>Ottri agrees to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide professional and reliable cleaning services</li>
              <li>Use appropriate cleaning products and equipment</li>
              <li>Respect your property and privacy</li>
              <li>Maintain insurance coverage for our services</li>
              <li>Address any service-related concerns promptly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              7. Satisfaction Guarantee
            </h2>
            <p>
              We strive for 100% customer satisfaction. If you are not satisfied
              with our service, please contact us within 24 hours of service
              completion. We will work with you to address any concerns and, if
              necessary, re-clean the affected areas at no additional charge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              8. Liability and Damages
            </h2>
            <p>
              <strong>8.1 Insurance:</strong> We carry liability insurance to
              cover damages that may occur during service.
            </p>
            <p>
              <strong>8.2 Claims:</strong> Any damage claims must be reported
              within 24 hours of service completion. Claims should include
              photographic evidence when possible.
            </p>
            <p>
              <strong>8.3 Limitations:</strong> We are not responsible for
              damage to items that are inherently fragile, previously damaged,
              or not properly secured as requested.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              9. Privacy and Confidentiality
            </h2>
            <p>
              We respect your privacy and maintain strict confidentiality
              regarding your property and personal information. Please refer to
              our Privacy Policy for detailed information on how we collect,
              use, and protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              10. Termination
            </h2>
            <p>
              Either party may terminate this agreement at any time. Clients
              must provide notice of termination and settle any outstanding
              payments. We reserve the right to refuse service to any client who
              violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              11. Dispute Resolution
            </h2>
            <p>
              Any disputes arising from these Terms of Service will first be
              addressed through good-faith negotiation. If a resolution cannot
              be reached, disputes will be resolved through binding arbitration
              in accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              12. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting to our website.
              Your continued use of our services after changes are posted
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-700 mt-8 mb-4">
              13. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li>Email: hello@ottri.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: Serving 6 metro areas</li>
            </ul>
          </section>

          <section className="mt-12 pt-8 border-t border-surface-300">
            <p className="text-sm text-secondary-600">
              By using Ottri Cleaning Services, you acknowledge that you have
              read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
