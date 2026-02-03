'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, FileText, BarChart3, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-crimson rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-display font-bold text-gray-900">LMA Edge</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-crimson transition-colors">
                Features
              </Link>
              <Link href="#platform" className="text-gray-600 hover:text-crimson transition-colors">
                Platform
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-crimson transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-crimson transition-colors font-semibold">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-crimson/10 text-crimson rounded-full text-sm font-semibold">
                Hackathon Winner 2026
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black leading-tight">
              <span className="block text-gray-900">Transform Your</span>
              <span className="block gradient-text">Loan Operations</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade platform for loan origination, documentation, trading, and analytics.
              Built for the modern financial institution.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/register" className="btn-primary text-lg group">
                Start Free Trial
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link href="/demo" className="btn-outline text-lg">
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-slide-up animation-delay-200">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-crimson">$25B+</div>
              <div className="text-gray-600 mt-2">Loans Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-crimson">500+</div>
              <div className="text-gray-600 mt-2">Financial Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-crimson">99.9%</div>
              <div className="text-gray-600 mt-2">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-crimson">24/7</div>
              <div className="text-gray-600 mt-2">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools for modern loan management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card group hover:border-crimson cursor-pointer">
              <div className="w-12 h-12 bg-crimson/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-crimson transition-colors">
                <TrendingUp className="text-crimson group-hover:text-white transition-colors" size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Digital Loan Origination
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Streamline the entire loan application process with automated workflows, 
                KYC verification, credit scoring, and real-time decision engines.
              </p>
            </div>

            <div className="card group hover:border-crimson cursor-pointer">
              <div className="w-12 h-12 bg-crimson/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-crimson transition-colors">
                <FileText className="text-crimson group-hover:text-white transition-colors" size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Smart Documentation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate compliant loan documents automatically, manage e-signatures, 
                and maintain a complete audit trail with version control.
              </p>
            </div>

            <div className="card group hover:border-crimson cursor-pointer">
              <div className="w-12 h-12 bg-crimson/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-crimson transition-colors">
                <BarChart3 className="text-crimson group-hover:text-white transition-colors" size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                Secondary Market Trading
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access liquid secondary markets with real-time pricing, automated matching, 
                and instant settlement capabilities.
              </p>
            </div>

            <div className="card group hover:border-crimson cursor-pointer">
              <div className="w-12 h-12 bg-crimson/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-crimson transition-colors">
                <Shield className="text-crimson group-hover:text-white transition-colors" size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                ESG & Compliance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced ESG scoring, risk assessment, and regulatory compliance monitoring 
                with automated reporting and alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-crimson to-crimson-dark text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-5xl font-display font-bold mb-6">
            Ready to Transform Your Loan Operations?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of financial institutions already using LMA Edge
          </p>
          <Link href="/register" className="bg-white text-crimson hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-flex items-center space-x-2 transition-all duration-200 shadow-xl">
            <span>Get Started Today</span>
            <ArrowRight size={20} />
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
              <p className="text-gray-400">
                Enterprise loan management platform
              </p>
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
