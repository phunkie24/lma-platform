'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, FileText, BarChart3, Shield, Zap, Globe, Lock, Clock } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Digital Loan Origination',
      description: 'Streamline the entire loan application process with automated workflows, KYC verification, credit scoring, and real-time decision engines.',
      benefits: ['Automated credit scoring', 'Real-time decisioning', 'KYC/AML compliance', 'Multi-channel applications']
    },
    {
      icon: FileText,
      title: 'Smart Documentation',
      description: 'Generate compliant loan documents automatically, manage e-signatures, and maintain a complete audit trail with version control.',
      benefits: ['Auto-generated documents', 'E-signature integration', 'Version control', 'Audit trail']
    },
    {
      icon: BarChart3,
      title: 'Secondary Market Trading',
      description: 'Access liquid secondary markets with real-time pricing, automated matching, and instant settlement capabilities.',
      benefits: ['Real-time pricing', 'Automated matching', 'Instant settlement', 'Portfolio analytics']
    },
    {
      icon: Shield,
      title: 'ESG & Compliance',
      description: 'Advanced ESG scoring, risk assessment, and regulatory compliance monitoring with automated reporting and alerts.',
      benefits: ['ESG scoring', 'Risk assessment', 'Regulatory reporting', 'Automated alerts']
    },
    {
      icon: Zap,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboards and reporting tools that provide instant insights into your loan portfolio performance.',
      benefits: ['Live dashboards', 'Custom reports', 'Trend analysis', 'Export capabilities']
    },
    {
      icon: Globe,
      title: 'Multi-Currency Support',
      description: 'Handle loans in multiple currencies with automatic exchange rate updates and cross-border transaction support.',
      benefits: ['50+ currencies', 'Auto FX rates', 'Cross-border support', 'Currency hedging']
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption, role-based access control, and comprehensive audit logging.',
      benefits: ['End-to-end encryption', 'Role-based access', 'SOC 2 compliant', '24/7 monitoring']
    },
    {
      icon: Clock,
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks with customizable workflows, approval chains, and notification triggers.',
      benefits: ['Custom workflows', 'Approval chains', 'Smart notifications', 'Task automation']
    }
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
              <Link href="/features" className="text-crimson font-semibold">Features</Link>
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
              Powerful Features for <span className="gradient-text">Modern Lending</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to originate, manage, and trade loans efficiently.
              Built for enterprise scale with security at its core.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card group hover:border-crimson">
                <div className="w-12 h-12 bg-crimson/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-crimson transition-colors">
                  <feature.icon className="text-crimson group-hover:text-white transition-colors" size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-crimson rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-crimson to-crimson-dark text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Experience all features with a free trial</p>
          <Link href="/register" className="bg-white text-crimson hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-block transition-all">
            Start Free Trial
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
