'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Server, Eye, FileCheck, Users } from 'lucide-react';

export default function SecurityPage() {
  const certifications = [
    { name: 'SOC 2 Type II', description: 'Annual audit of security controls' },
    { name: 'ISO 27001', description: 'Information security management' },
    { name: 'PCI DSS', description: 'Payment card industry compliance' },
    { name: 'GDPR', description: 'EU data protection compliance' },
  ];

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

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-crimson mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Enterprise-Grade <span className="gradient-text">Security</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data security is our top priority. We employ industry-leading security measures
              to protect your sensitive financial information.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">How We Protect Your Data</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">End-to-End Encryption</h3>
              <p className="text-gray-600">
                All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Server className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Secure Infrastructure</h3>
              <p className="text-gray-600">
                Hosted on AWS with multiple availability zones, automatic failover, and 99.9% uptime SLA.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">24/7 Monitoring</h3>
              <p className="text-gray-600">
                Continuous monitoring for threats, anomalies, and unauthorized access attempts.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Access Controls</h3>
              <p className="text-gray-600">
                Role-based access control, multi-factor authentication, and single sign-on support.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Audit Logging</h3>
              <p className="text-gray-600">
                Complete audit trail of all user actions and system events for compliance and forensics.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Penetration Testing</h3>
              <p className="text-gray-600">
                Regular third-party security assessments and penetration testing to identify vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Certifications & Compliance</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-crimson" size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Our Security Practices</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-lg mb-2">Data Centers</h3>
              <p className="text-gray-600">
                Our infrastructure is hosted in SOC 2 certified data centers with physical security controls,
                including 24/7 security personnel, biometric access, and video surveillance.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-lg mb-2">Employee Security</h3>
              <p className="text-gray-600">
                All employees undergo background checks and security training. Access to customer data
                is strictly limited and logged.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-lg mb-2">Incident Response</h3>
              <p className="text-gray-600">
                We have a dedicated incident response team and documented procedures to quickly address
                any security events. Customers are notified promptly of any incidents affecting their data.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-lg mb-2">Data Backup</h3>
              <p className="text-gray-600">
                Automated daily backups with geographic redundancy ensure your data is protected against
                loss. Backups are encrypted and tested regularly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-crimson to-crimson-dark text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Questions About Security?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our security team is happy to discuss our practices and answer any questions.
          </p>
          <Link href="/contact" className="bg-white text-crimson hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-block transition-all">
            Contact Security Team
          </Link>
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
