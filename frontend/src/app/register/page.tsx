'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/store';
import { ArrowRight, Mail, Lock, User, Building, Phone, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    role: 'borrower',
    organization: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Remove confirmPassword before sending
      const { confirmPassword, ...registerData } = formData;
      const response = await api.register(registerData);

      setSuccess(true);

      // Auto-login after successful registration
      setTimeout(async () => {
        try {
          const loginResponse = await api.login(formData.email, formData.password);
          setUser(loginResponse.user);
          setToken(loginResponse.token);
          router.push('/dashboard');
        } catch (err) {
          router.push('/login');
        }
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 bg-crimson rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-2xl">L</span>
              </div>
              <span className="text-3xl font-display font-bold text-gray-900">LMA Edge</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-display font-bold text-gray-900">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join the modern loan management platform
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-crimson p-4 rounded">
              <div className="flex items-center">
                <AlertCircle className="text-crimson mr-2" size={20} />
                <p className="text-sm text-crimson">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={20} />
                <p className="text-sm text-green-700">Account created successfully! Redirecting...</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="label-text">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last_name" className="label-text">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="label-text">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="label-text">
                Account Type
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="borrower">Borrower</option>
                <option value="lender">Lender</option>
                <option value="arranger">Arranger</option>
                <option value="trader">Trader</option>
                <option value="compliance">Compliance Officer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label htmlFor="organization" className="label-text">
                Organization (Optional)
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="label-text">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label-text">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label-text">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Creating account...'
              ) : success ? (
                'Success! Redirecting...'
              ) : (
                <>
                  Create Account
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-crimson hover:text-crimson-dark"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-crimson to-crimson-dark items-center justify-center p-12">
        <div className="max-w-lg text-white space-y-8">
          <h2 className="text-5xl font-display font-bold leading-tight">
            Transform Your Loan Operations
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            Join hundreds of financial institutions streamlining their loan processes
            with cutting-edge technology.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <span>Quick setup in minutes</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <span>24/7 customer support</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <span>Free trial included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
