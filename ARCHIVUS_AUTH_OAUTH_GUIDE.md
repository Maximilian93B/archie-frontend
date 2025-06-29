# 🔐 Archivus OAuth Authentication Guide

## 📋 Overview

Archivus supports OAuth authentication through **Google** and **GitHub** only. The OAuth flow is handled by the Archivus backend, which integrates with Supabase Auth.

## 🎯 OAuth Providers

### **Supported Providers**
- ✅ **Google OAuth** - For general users and enterprise accounts
- ✅ **GitHub OAuth** - For developer-focused teams

### **Not Supported**
- ❌ Apple Sign In
- ❌ Microsoft/Azure AD
- ❌ Other OAuth providers

## 🔧 Implementation Details

### **1. OAuth Flow Architecture**
```typescript
// The OAuth flow:
1. User clicks "Sign in with Google/GitHub"
2. Frontend redirects to backend OAuth endpoint
3. Backend handles OAuth through Supabase
4. Backend returns JWT tokens
5. Frontend stores tokens and redirects to dashboard
```

### **2. Frontend OAuth Components**

#### **OAuth Button Component**
```typescript
// src/components/auth/oauth-buttons.tsx
import { Button } from '@/components/ui/button'
import { IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react'

export function OAuthButtons() {
  const handleOAuth = (provider: 'google' | 'github') => {
    // Redirect to backend OAuth endpoint
    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/oauth/${provider}`
    window.location.href = redirectUrl
  }

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuth('google')}
      >
        <IconBrandGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuth('github')}
      >
        <IconBrandGithub className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  )
}
```

#### **OAuth Callback Handler**
```typescript
// src/app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { toast } from 'react-hot-toast'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const handleCallback = async () => {
      const error = searchParams.get('error')
      const code = searchParams.get('code')
      
      if (error) {
        toast.error('Authentication failed: ' + error)
        router.push('/auth/login')
        return
      }

      if (code) {
        try {
          // Exchange code for tokens via backend
          const response = await fetch('/api/v1/auth/oauth/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
          })

          if (response.ok) {
            const data = await response.json()
            setAuth(data.user, data.access_token, data.refresh_token)
            toast.success('Successfully logged in!')
            router.push('/dashboard')
          } else {
            throw new Error('Failed to exchange code')
          }
        } catch (error) {
          toast.error('Authentication failed')
          router.push('/auth/login')
        }
      }
    }

    handleCallback()
  }, [searchParams, router, setAuth])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we log you in.</p>
      </div>
    </div>
  )
}
```

### **3. Login Page Integration**

```typescript
// src/app/auth/login/page.tsx
import { LoginForm } from '@/components/auth/login-form'
import { OAuthButtons } from '@/components/auth/oauth-buttons'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sign in to Archivus</h1>
      
      {/* OAuth Options */}
      <div className="mb-6">
        <OAuthButtons />
      </div>
      
      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>
      
      {/* Email/Password Form */}
      <LoginForm />
    </div>
  )
}
```

### **4. Backend OAuth Endpoints**

The backend handles these OAuth endpoints:
```typescript
// Backend OAuth endpoints (already implemented)
GET  /api/v1/auth/oauth/google    - Initiates Google OAuth
GET  /api/v1/auth/oauth/github    - Initiates GitHub OAuth
POST /api/v1/auth/oauth/callback  - Handles OAuth callback
```

### **5. Environment Configuration**

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Backend needs these (configured in backend):
# GOOGLE_CLIENT_ID=xxx
# GOOGLE_CLIENT_SECRET=xxx
# GITHUB_CLIENT_ID=xxx
# GITHUB_CLIENT_SECRET=xxx
```

### **6. Auth Store Integration**

```typescript
// src/store/auth-store.ts
interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  
  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      
      setAuth: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true
        })
        // Set token in API client
        apiClient.setToken(accessToken)
      },
      
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false
        })
        apiClient.setToken(null)
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
```

## 🔒 Security Considerations

1. **HTTPS Required**: OAuth redirects must use HTTPS in production
2. **State Parameter**: Backend includes state parameter to prevent CSRF
3. **Secure Token Storage**: Tokens stored in httpOnly cookies (optional)
4. **Token Refresh**: Automatic refresh token rotation

## 🎨 UI/UX Best Practices

1. **Clear Provider Branding**: Use official Google/GitHub colors and icons
2. **Loading States**: Show loading during OAuth redirect
3. **Error Handling**: Clear error messages for failed auth
4. **Mobile Friendly**: OAuth buttons work on all devices

## 🧪 Testing OAuth

### **Development Testing**
1. Configure OAuth apps in Google/GitHub developer consoles
2. Add `http://localhost:3000/auth/callback` as redirect URI
3. Test both success and failure scenarios

### **Production Setup**
1. Create production OAuth apps
2. Add production domain to redirect URIs
3. Update environment variables
4. Test with real accounts

## 📝 Implementation Checklist

- [ ] Create OAuthButtons component
- [ ] Implement auth callback page
- [ ] Update login/register pages
- [ ] Configure environment variables
- [ ] Test Google OAuth flow
- [ ] Test GitHub OAuth flow
- [ ] Handle OAuth errors gracefully
- [ ] Add loading states
- [ ] Implement token storage
- [ ] Test on mobile devices

## 🚨 Common Issues

1. **Redirect URI Mismatch**: Ensure callback URL matches OAuth app config
2. **CORS Issues**: Backend should handle CORS for OAuth endpoints
3. **Token Storage**: Decide between localStorage vs httpOnly cookies
4. **Mobile Browsers**: Test OAuth on various mobile browsers

---

**OAuth implementation is straightforward since the backend handles the complexity!**