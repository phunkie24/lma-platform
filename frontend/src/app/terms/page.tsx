'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-crimson rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-display font-bold text-gray-900">LMA Edge</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-crimson transition-colors">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-crimson transition-colors">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-crimson transition-colors">About</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-crimson transition-colors font-semibold">Login</Link>
              <Link href="/register" className="btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-crimson mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>

          <h1 className="text-5xl font-display font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: January 1, 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing or using the LMA Edge platform (&quot;Service&quot;), you agree to be bound by these Terms of Service
                (&quot;Terms&quot;). If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">
                LMA Edge provides a cloud-based loan management platform that enables financial institutions to
                originate, process, manage, and trade loans. The Service includes loan origination tools,
                document management, analytics, and secondary market trading capabilities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">3. User Accounts</h2>
              <p className="text-gray-600 mb-4">To use the Service, you must:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Create an account with accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">4. Acceptable Use</h2>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Use the Service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Upload malicious code or content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">5. Subscription and Payments</h2>
              <p className="text-gray-600 mb-4">
                Some features of the Service require a paid subscription. By subscribing, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Pay all fees associated with your subscription plan</li>
                <li>Provide accurate billing information</li>
                <li>Accept automatic renewal unless cancelled</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                The Service and its original content, features, and functionality are owned by LMA Edge and
                are protected by international copyright, trademark, patent, trade secret, and other
                intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">7. Data and Privacy</h2>
              <p className="text-gray-600 mb-4">
                Your use of the Service is also governed by our <Link href="/privacy" className="text-crimson hover:underline">Privacy Policy</Link>.
                By using the Service, you consent to the collection and use of information as described therein.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by law, LMA Edge shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
                whether incurred directly or indirectly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">9. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account and access to the Service immediately, without
                prior notice, for conduct that we believe violates these Terms or is harmful to other users,
                us, or third parties, or for any other reason.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of significant
                changes through the Service or via email. Your continued use after changes constitutes acceptance
                of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">11. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-600">
                Email: legal@lmaedge.com<br />
                Address: 123 Financial District, New York, NY 10004
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-crimson rounded-lg flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">L</span>
                </div>
                <span className="text-xl font-display font-bold">LMA Edge</span>
              </div>
              <p className="text-gray-400">Enterprise loan management platform</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-crimson transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-crimson transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-crimson transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-crimson transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-crimson transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-crimson transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-crimson transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-crimson transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-crimson transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2026 LMA Edge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
