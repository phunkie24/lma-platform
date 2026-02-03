'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Briefcase } from 'lucide-react';

export default function CareersPage() {
  const openings = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Build and scale our core platform using React, Node.js, and cloud technologies.'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create intuitive and beautiful user experiences for complex financial workflows.'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Manage our cloud infrastructure and ensure 99.9% uptime for enterprise clients.'
    },
    {
      title: 'Account Executive',
      department: 'Sales',
      location: 'Chicago, IL',
      type: 'Full-time',
      description: 'Drive new business growth by building relationships with financial institutions.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our clients achieve their goals and maximize their ROI with LMA Edge.'
    },
    {
      title: 'Data Scientist',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Build ML models for credit scoring, risk assessment, and fraud detection.'
    }
  ];

  const benefits = [
    'Competitive salary & equity',
    'Health, dental & vision insurance',
    'Unlimited PTO',
    '401(k) matching',
    'Remote work flexibility',
    'Learning & development budget',
    'Home office stipend',
    'Wellness programs'
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
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us transform the loan market. We&apos;re looking for passionate people
              who want to make a real impact in financial technology.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Why Work With Us</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((job, index) => (
              <div key={index} className="card hover:border-crimson cursor-pointer group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold group-hover:text-crimson transition-colors">{job.title}</h3>
                    <p className="text-gray-600 mt-1">{job.description}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Briefcase size={16} className="mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="btn-outline text-center md:ml-4 flex-shrink-0"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-crimson to-crimson-dark text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Don&apos;t See the Right Role?</h2>
          <p className="text-xl mb-8 opacity-90">
            We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind.
          </p>
          <Link href="/contact" className="bg-white text-crimson hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg inline-block transition-all">
            Contact Us
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
