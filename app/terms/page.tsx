import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Snow Day Calculator",
  description:
    "Read the terms of service for Snow Day Calculator. Learn about user responsibilities, service limitations, and usage guidelines.",
  openGraph: {
    title: "Terms of Service - Snow Day Calculator",
    description: "Terms of service and usage guidelines for Snow Day Calculator.",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> December 2024
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using Snow Day Calculator ("the Service"), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above, please do not use this
              service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of our website located at snowdaycalculator.com and any
              related services provided by Snow Day Calculator.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Snow Day Calculator provides weather-based predictions for school closures and delays. Our service uses
              algorithms that analyze weather data, historical patterns, and other factors to estimate the likelihood of
              snow days.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Important Disclaimer:</strong> Our predictions are estimates only and should not be considered
              official announcements. Always check with your local school district for official closure decisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not
              to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Use the Service in any way that violates applicable federal, state, local, or international law</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
              <li>
                Use automated systems to access the Service in a manner that sends more requests than a human can
                reasonably produce
              </li>
              <li>Interfere with or disrupt the Service or servers connected to the Service</li>
              <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Service without permission</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Accuracy and Reliability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we strive to provide accurate predictions, Snow Day Calculator makes no warranties or
              representations about the accuracy, reliability, completeness, or timeliness of the information provided.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Weather predictions are inherently uncertain, and school closure decisions involve many factors beyond
              weather conditions. Users should always verify information with official sources.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Snow Day Calculator shall not be liable for any direct, indirect, incidental, special, consequential, or
              punitive damages resulting from your use of or inability to use the Service.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other
              intangible losses, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
              information when you use our Service. By using our Service, you agree to the collection and use of
              information in accordance with our Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive
              property of Snow Day Calculator and its licensors. The Service is protected by copyright, trademark, and
              other laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be interpreted and governed by the laws of the United States, without regard to its
              conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be
              considered a waiver of those rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us through our contact page or
              email us at legal@snowdaycalculator.com.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-500">
              These terms of service are effective as of December 2024 and were last updated on December 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
