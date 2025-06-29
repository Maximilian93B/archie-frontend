# 🔐 Frontend Authentication Implementation Guide

## 📋 **Manual Setup Checklist**

### **1. Supabase Configuration (Required Manual Steps)**

#### **A. Enable Authentication Providers**
```bash
# Navigate to Supabase Dashboard → Authentication → Providers
# Enable the following providers:

1. ✅ Email (Already enabled)
2. ✅ Google OAuth
   - Client ID: [YOUR_GOOGLE_CLIENT_ID]
   - Client Secret: [YOUR_GOOGLE_CLIENT_SECRET]
   - Redirect URL: https://your-project.supabase.co/auth/v1/callback

3. ✅ Apple OAuth (Optional)
   - Service ID: [YOUR_APPLE_SERVICE_ID]
   - Team ID: [YOUR_APPLE_TEAM_ID]
   - Key ID: [YOUR_APPLE_KEY_ID]
   - Private Key: [YOUR_APPLE_PRIVATE_KEY]

4. ✅ GitHub OAuth (Optional)
   - Client ID: [YOUR_GITHUB_CLIENT_ID]
   - Client Secret: [YOUR_GITHUB_CLIENT_SECRET]
```

#### **B. Configure Authentication Settings**
```yaml
# Supabase → Authentication → Settings
Site URL: https://yourdomain.com
Redirect URLs: 
  - https://yourdomain.com/auth/callback
  - https://yourdomain.com/auth/oauth/callback
  - http://localhost:3000/auth/callback (for development)

# JWT Settings
JWT expiry: 3600 (1 hour)
Refresh token expiry: 604800 (7 days)

# Security Settings
Enable email confirmations: true
Enable secure password change: true
Enable anonymous sign-ins: false
```

#### **C. Multi-Factor Authentication Setup**
```sql
-- Enable MFA in Supabase (run in SQL editor)
INSERT INTO auth.mfa_factors (user_id, factor_type, status, secret, phone, created_at, updated_at)
VALUES (
  'user-uuid-here',
  'totp',
  'verified',
  'base32-secret-here',
  NULL,
  NOW(),
  NOW()
);

-- Enable MFA for all users (optional policy)
CREATE POLICY "Enable MFA for authenticated users" ON auth.mfa_factors
FOR ALL USING (auth.uid() = user_id);
```

---

## 🔧 **Frontend Authentication Implementation**

### **1. Authentication Context Setup**

```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string, mfaCode?: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, userData: UserData) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: 'google' | 'apple' | 'github') => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  enableMFA: () => Promise<MFAEnrollResult>;
  verifyMFA: (code: string) => Promise<boolean>;
  requiresMFA: boolean;
  mfaChallenge: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [mfaChallenge, setMfaChallenge] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle MFA challenge
        if (event === 'MFA_CHALLENGE_REQUIRED') {
          setRequiresMFA(true);
          setMfaChallenge(session?.mfa_challenge_id || null);
        } else {
          setRequiresMFA(false);
          setMfaChallenge(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, mfaCode?: string): Promise<AuthResult> => {
    try {
      if (mfaCode && mfaChallenge) {
        // Verify MFA code
        const { data, error } = await supabase.auth.mfa.verify({
          factorId: mfaChallenge,
          challengeId: mfaChallenge,
          code: mfaCode,
        });

        if (error) throw error;
        return { success: true, data };
      } else {
        // Regular sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        return { success: true, data };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, userData: UserData): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            tenant_id: userData.tenantId,
            role: userData.role,
            department: userData.department,
            job_title: userData.jobTitle,
          },
        },
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'apple' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/oauth/callback`,
        scopes: provider === 'google' ? 'email profile' : undefined,
      },
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  };

  const enableMFA = async (): Promise<MFAEnrollResult> => {
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
    if (error) throw error;
    return data;
  };

  const verifyMFA = async (code: string): Promise<boolean> => {
    if (!mfaChallenge) return false;
    
    const { error } = await supabase.auth.mfa.verify({
      factorId: mfaChallenge,
      challengeId: mfaChallenge,
      code,
    });

    return !error;
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithOAuth,
    resetPassword,
    updatePassword,
    enableMFA,
    verifyMFA,
    requiresMFA,
    mfaChallenge,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### **2. OAuth Callback Handler**

```typescript
// pages/auth/oauth/callback.tsx (Next.js) or components/OAuthCallback.tsx (React)
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('OAuth callback error:', error);
          router.push('/auth/login?error=oauth_error');
          return;
        }

        if (data.session) {
          // Successfully authenticated
          const user = data.session.user;
          
          // Check if user needs to complete profile
          if (!user.user_metadata.profile_complete) {
            router.push('/auth/complete-profile');
          } else {
            // Redirect to dashboard or intended destination
            const returnUrl = sessionStorage.getItem('returnUrl') || '/dashboard';
            sessionStorage.removeItem('returnUrl');
            router.push(returnUrl);
          }
        } else {
          // No session found
          router.push('/auth/login?error=no_session');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        router.push('/auth/login?error=callback_error');
      }
    };

    handleOAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      <p className="ml-4 text-gray-600">Completing authentication...</p>
    </div>
  );
}
```

### **3. Login Component with MFA Support**

```typescript
// components/auth/LoginForm.tsx
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

export const LoginForm = () => {
  const { signIn, signInWithOAuth, requiresMFA } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn(email, password, mfaCode);
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'apple' | 'github') => {
    try {
      setLoading(true);
      await signInWithOAuth(provider);
    } catch (error) {
      setError(`Failed to sign in with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {requiresMFA && (
          <div>
            <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700">
              MFA Code
            </label>
            <Input
              id="mfaCode"
              type="text"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
              disabled={loading}
            />
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthSignIn('google')}
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthSignIn('apple')}
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Apple
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthSignIn('github')}
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};
```

### **4. MFA Setup Component**

```typescript
// components/auth/MFASetup.tsx
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import QRCode from 'qrcode.react';

export const MFASetup = () => {
  const { enableMFA, verifyMFA } = useAuth();
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnableMFA = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await enableMFA();
      setQrCode(result.totp.qr_code);
      setSecret(result.totp.secret);
      setStep('verify');
    } catch (error) {
      setError('Failed to enable MFA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMFA = async () => {
    setLoading(true);
    setError('');

    try {
      const isValid = await verifyMFA(verificationCode);
      if (isValid) {
        // MFA successfully enabled
        setStep('complete');
      } else {
        setError('Invalid verification code');
      }
    } catch (error) {
      setError('Failed to verify MFA code');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'setup') {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Enable Two-Factor Authentication</h2>
        
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            Two-factor authentication adds an extra layer of security to your account.
          </p>
          
          <Button onClick={handleEnableMFA} disabled={loading}>
            {loading ? 'Setting up...' : 'Enable 2FA'}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            {error}
          </Alert>
        )}
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Scan QR Code</h2>
        
        <div className="text-center mb-6">
          <div className="mb-4">
            <QRCode value={qrCode} size={200} />
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
          </p>
          
          <div className="text-xs text-gray-500 mb-4">
            <p>Manual entry key:</p>
            <code className="bg-gray-100 px-2 py-1 rounded">{secret}</code>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
            Enter verification code
          </label>
          <Input
            id="verificationCode"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
            disabled={loading}
          />
        </div>

        <Button 
          onClick={handleVerifyMFA} 
          className="w-full"
          disabled={loading || verificationCode.length !== 6}
        >
          {loading ? 'Verifying...' : 'Verify and Enable'}
        </Button>

        {error && (
          <Alert variant="destructive" className="mt-4">
            {error}
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">MFA Enabled Successfully!</h2>
      
      <div className="text-center">
        <p className="text-green-600 mb-4">
          Two-factor authentication has been enabled for your account.
        </p>
        
        <Button onClick={() => window.location.href = '/dashboard'}>
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};
```

---

## 🔄 **Authentication Flow Patterns**

### **1. Protected Route Component**

```typescript
// components/auth/ProtectedRoute.tsx
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requireMFA?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requireMFA = false,
}) => {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !session) {
    // Save the attempted location for redirecting after login
    sessionStorage.setItem('returnUrl', location.pathname);
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user.user_metadata.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requireMFA && !user.user_metadata.mfa_enabled) {
    return <Navigate to="/auth/setup-mfa" replace />;
  }

  return <>{children}</>;
};
```

### **2. API Client with Auth Integration**

```typescript
// lib/api-client.ts
import { supabase } from './supabase';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    // Add tenant header if available
    const tenantId = session?.user?.user_metadata?.tenant_id;
    if (tenantId) {
      headers['X-Tenant-ID'] = tenantId;
    }

    return headers;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Token expired, attempt to refresh
      const { error } = await supabase.auth.refreshSession();
      if (error) {
        // Refresh failed, redirect to login
        window.location.href = '/auth/login';
        throw new Error('Authentication expired');
      }
      
      // Retry the request with new token
      const newHeaders = await this.getAuthHeaders();
      const retryResponse = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...newHeaders,
          ...options.headers,
        },
      });
      
      if (!retryResponse.ok) {
        throw new Error(`HTTP error! status: ${retryResponse.status}`);
      }
      
      return retryResponse.json();
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Convenience methods
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080');
```

---

## 🚀 **Integration with Your Backend**

### **Token Validation Flow**

```typescript
// hooks/useTokenValidation.ts
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api-client';

export const useTokenValidation = () => {
  const { session, signOut } = useAuth();

  useEffect(() => {
    const validateToken = async () => {
      if (!session?.access_token) return;

      try {
        // Call your backend's token validation endpoint
        await apiClient.get('/auth/validate');
      } catch (error) {
        console.error('Token validation failed:', error);
        // Token is invalid, sign out user
        await signOut();
      }
    };

    // Validate token on mount and every 5 minutes
    validateToken();
    const interval = setInterval(validateToken, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [session?.access_token, signOut]);
};
```

### **Backend Integration Points**

```typescript
// Your backend should handle these endpoints:

// 1. Token validation
GET /auth/validate
Headers: Authorization: Bearer <supabase_token>
Response: { user_id, tenant_id, role, is_active }

// 2. OAuth callback (if using server-side OAuth)
GET /auth/oauth/callback?provider=google&code=...
Response: { token, refresh_token, user, expires_at }

// 3. User sync (webhook or manual)
POST /auth/sync-user
Body: { user_id, email, metadata }
Response: { success: true }

// 4. MFA validation
POST /auth/mfa/verify
Body: { challenge_id, code }
Response: { valid: true, backup_codes?: string[] }
```

---

## 🔒 **Security Best Practices**

### **1. Token Management**
- Store tokens securely (httpOnly cookies for SSR, secure localStorage for SPA)
- Implement automatic token refresh
- Clear tokens on logout
- Set appropriate token expiration times

### **2. MFA Implementation**
- Always verify MFA codes server-side
- Store backup codes securely
- Implement rate limiting for MFA attempts
- Provide clear recovery options

### **3. OAuth Security**
- Validate OAuth state parameter
- Use PKCE for public clients
- Implement proper CSRF protection
- Validate redirect URLs

### **4. Error Handling**
- Don't expose sensitive information in error messages
- Log security events for monitoring
- Implement proper fallback mechanisms
- Provide clear user feedback

---

## 📚 **Required Dependencies**

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0",
    "qrcode.react": "^3.1.0",
    "react": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@types/qrcode.react": "^1.0.2"
  }
}
```

---

**🎯 This guide provides a complete frontend authentication implementation that integrates seamlessly with your Supabase-backed Go backend, including OAuth flows, MFA support, and secure token management!** 