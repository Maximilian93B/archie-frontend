'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { LoginForm } from '@/components/auth/login-form';
import { FullScreenLoading } from '@/components/ui/loading';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Show loading while checking auth status
  if (isLoading) {
    return <FullScreenLoading />;
  }

  // Don't render if authenticated (prevents flash)
  if (isAuthenticated) {
    return null;
  }

  const handleAuthSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Archivus
          </h1>
          <p className="text-gray-600">
            AI-Powered Document Management
          </p>
        </div>

        {/* Authentication Form */}
        {authMode === 'login' ? (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Registration coming soon...</p>
            <button
              onClick={() => setAuthMode('login')}
              className="text-blue-600 hover:text-blue-500 hover:underline"
            >
              Back to Login
            </button>
          </div>
        )}

        {/* Features Preview */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What you can do with Archivus
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <span>🤖</span>
              <span>AI-powered document analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>💬</span>
              <span>Chat with your documents using Claude AI</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>🔍</span>
              <span>Advanced hybrid search capabilities</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>📊</span>
              <span>Comprehensive analytics dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 