'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/store';
import { api } from '@/lib/api';
import {
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Building,
  LogOut,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch dashboard data
    const fetchData = async () => {
      try {
        setLoading(false);
        // You can add actual API calls here when the endpoints are ready
        // const data = await api.getLoanStatistics();
        // setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, router]);

  const handleLogout = async () => {
    try {
      await api.logout();
    } finally {
      logout();
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crimson mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-crimson rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-display font-bold text-gray-900">LMA Edge</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-crimson/10 rounded-full flex items-center justify-center">
                  <span className="text-crimson font-semibold text-sm">
                    {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-crimson transition-colors"
              >
                <LogOut size={20} />
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            Welcome back, {user.first_name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your loan portfolio today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Loans */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div className="flex items-center text-green-600 text-sm font-semibold">
                <ArrowUpRight size={16} />
                <span>12%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Loans</p>
            <p className="text-3xl font-display font-bold text-gray-900">247</p>
          </div>

          {/* Total Value */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div className="flex items-center text-green-600 text-sm font-semibold">
                <ArrowUpRight size={16} />
                <span>8%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Value</p>
            <p className="text-3xl font-display font-bold text-gray-900">$45.2M</p>
          </div>

          {/* Active Applications */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="text-orange-600" size={24} />
              </div>
              <div className="flex items-center text-red-600 text-sm font-semibold">
                <ArrowDownRight size={16} />
                <span>3%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Active Applications</p>
            <p className="text-3xl font-display font-bold text-gray-900">18</p>
          </div>

          {/* Approval Rate */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="flex items-center text-green-600 text-sm font-semibold">
                <ArrowUpRight size={16} />
                <span>5%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Approval Rate</p>
            <p className="text-3xl font-display font-bold text-gray-900">87%</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-gray-900">
                Recent Activity
              </h2>
              <button className="text-sm text-crimson font-semibold hover:text-crimson-dark">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Loan Application Approved
                  </p>
                  <p className="text-sm text-gray-600">
                    ABC Manufacturing - $500,000 Business Loan
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    New Document Uploaded
                  </p>
                  <p className="text-sm text-gray-600">
                    Tech Startup Inc - Business Plan.pdf
                  </p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-orange-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Application Under Review
                  </p>
                  <p className="text-sm text-gray-600">
                    Global Traders Ltd - $1.2M Working Capital
                  </p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>

              {/* Activity Item 4 */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    ESG Score Updated
                  </p>
                  <p className="text-sm text-gray-600">
                    Green Energy Corp - Score improved to 85/100
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>

            <div className="space-y-3">
              {user.role === 'borrower' && (
                <>
                  <button className="w-full btn-primary text-left flex items-center justify-between">
                    <span>New Loan Application</span>
                    <ArrowUpRight size={18} />
                  </button>
                  <button className="w-full btn-outline text-left flex items-center justify-between">
                    <span>Upload Documents</span>
                    <FileText size={18} />
                  </button>
                  <button className="w-full btn-outline text-left flex items-center justify-between">
                    <span>View My Loans</span>
                    <DollarSign size={18} />
                  </button>
                </>
              )}

              {user.role === 'lender' && (
                <>
                  <button className="w-full btn-primary text-left flex items-center justify-between">
                    <span>Review Applications</span>
                    <ArrowUpRight size={18} />
                  </button>
                  <button className="w-full btn-outline text-left flex items-center justify-between">
                    <span>Create Loan Offer</span>
                    <DollarSign size={18} />
                  </button>
                  <button className="w-full btn-outline text-left flex items-center justify-between">
                    <span>Portfolio Analytics</span>
                    <BarChart3 size={18} />
                  </button>
                </>
              )}

              {user.role === 'admin' && (
                <>
                  <button className="w-full btn-primary text-left flex items-center justify-between">
                    <span>User Management</span>
                    <Users size={18} />
                  </button>
                  <button className="w-full btn-outline text-left flex items-center justify-between">
                    <span>System Analytics</span>
                    <BarChart3 size={18} />
                  </button>
                  <button className="w-full btn-outline text-left flex items-center justify-between">
                    <span>All Loans</span>
                    <FileText size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Platform Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Platform Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Users</span>
                  <span className="text-sm font-semibold text-gray-900">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Loans</span>
                  <span className="text-sm font-semibold text-gray-900">342</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm font-semibold text-green-600">+15.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-1">
                Platform Demo Mode
              </h3>
              <p className="text-blue-800">
                You're currently viewing a demonstration dashboard. In production, this would show
                real-time data from your loan portfolio, applications, and analytics. The full
                platform includes loan origination workflows, document management, trading
                capabilities, and comprehensive ESG analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
