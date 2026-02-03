'use client';

import Link from 'next/link';
import { ArrowLeft, Play, Monitor, Users, Clock } from 'lucide-react';

export default function DemoPage() {
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
              See LMA Edge <span className="gradient-text">In Action</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch our product demo or try it yourself with our interactive sandbox environment.
            </p>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="card p-0 overflow-hidden">
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 to-transparent"></div>
              <div className="w-20 h-20 bg-crimson rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="text-white ml-1" size={32} fill="white" />
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-75">Product Overview</p>
                <p className="text-xl font-semibold">Complete Platform Walkthrough</p>
              </div>
              <div className="absolute bottom-6 right-6 text-white opacity-75">
                <span className="flex items-center"><Clock size={16} className="mr-1" /> 12 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Options */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Choose Your Demo Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Monitor className="text-crimson" size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Interactive Sandbox</h3>
              <p className="text-gray-600 mb-6">
                Try LMA Edge yourself with our fully-functional demo environment.
                Pre-loaded with sample data so you can explore all features.
              </p>
              <Link href="/login" className="btn-primary inline-block">
                Access Demo Account
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Use credentials: demo@lma.com / demo123456
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-crimson" size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Live Demo with Sales</h3>
              <p className="text-gray-600 mb-6">
                Schedule a personalized demo with our team. We&apos;ll walk you through
                the platform and answer all your questions.
              </p>
              <Link href="/contact" className="btn-outline inline-block">
                Schedule Demo
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                30-minute session with a product specialist
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">What You&apos;ll See</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-crimson mb-2">01</div>
              <h3 className="font-semibold text-lg mb-2">Loan Origination</h3>
              <p className="text-gray-600">Watch how easily loans are created and processed through automated workflows.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-crimson mb-2">02</div>
              <h3 className="font-semibold text-lg mb-2">Document Management</h3>
              <p className="text-gray-600">See intelligent document generation and e-signature workflows in action.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-crimson mb-2">03</div>
              <h3 className="font-semibold text-lg mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Explore real-time reporting and portfolio insights.</p>
            </div>
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
