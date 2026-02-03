'use client';

import Link from 'next/link';
import { ArrowLeft, Target, Eye, Heart } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Sarah Chen', role: 'CEO & Co-Founder', image: 'SC' },
    { name: 'Michael Rodriguez', role: 'CTO & Co-Founder', image: 'MR' },
    { name: 'Emily Watson', role: 'VP of Product', image: 'EW' },
    { name: 'David Kim', role: 'VP of Engineering', image: 'DK' },
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
              <Link href="/about" className="text-crimson font-semibold">About</Link>
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
              About <span className="gradient-text">LMA Edge</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re on a mission to modernize the loan market and make financial services
              more efficient, transparent, and accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-8">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2024, LMA Edge was born from a simple observation: the loan market was
              stuck in the past. While other industries embraced digital transformation, lending
              institutions still relied on fragmented systems, manual processes, and outdated technology.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our founders, with decades of combined experience in financial technology and
              enterprise software, set out to build a platform that would bring modern,
              cloud-native technology to the loan market.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, LMA Edge serves hundreds of financial institutions, processing billions
              in loans annually. But we&apos;re just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Innovation First</h3>
              <p className="text-gray-600">
                We constantly push boundaries to deliver cutting-edge solutions that keep our clients ahead.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Transparency</h3>
              <p className="text-gray-600">
                We believe in open communication, honest pricing, and clear expectations with our clients.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-crimson" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Customer Success</h3>
              <p className="text-gray-600">
                Your success is our success. We&apos;re committed to helping you achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-crimson text-2xl font-bold">{member.image}</span>
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-crimson to-crimson-dark text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl mb-8 opacity-90">We&apos;re always looking for talented people to join our team</p>
          <Link href="/careers" className="bg-white text-crimson hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-block transition-all">
            View Open Positions
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
