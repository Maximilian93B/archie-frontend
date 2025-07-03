'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      const error = searchParams.get('error')
      const code = searchParams.get('code')
      
      if (error) {
        toast({
          title: 'Authentication failed',
          description: error,
          variant: 'destructive',
        })
        router.push('/auth/login')
        return
      }

      if (code) {
        try {
          // Exchange code for tokens via backend
          const response = await apiClient.post('/api/v1/auth/oauth/callback', { 
            code,
            redirect_uri: `${window.location.origin}/auth/callback`
          }, {
            requestConfig: {
              skipAuth: true,
            }
          })

          if (response.token && response.user) {
            // Store tokens in localStorage first
            localStorage.setItem('access_token', response.token)
            localStorage.setItem('refresh_token', response.refresh_token)
            
            // Store subdomain consistently
            if (response.user.tenant_subdomain || response.user.company) {
              const subdomain = response.user.tenant_subdomain || 
                               response.user.company?.toLowerCase().replace(/[^a-z0-9]/g, '-');
              if (subdomain) {
                localStorage.setItem('tenant_subdomain', subdomain);
              }
            }
            
            // Update auth context with proper expiration
            await setAuth(response.user, response.token, response.expires_in)
            
            // Let auth context handle subscription status fetch
            
            toast({
              title: 'Success',
              description: 'Successfully logged in!',
            })
            
            router.push('/dashboard')
          } else {
            throw new Error('Invalid response from server')
          }
        } catch (error) {
          console.error('OAuth callback error:', error)
          const errorMessage = error instanceof Error 
            ? error.message 
            : 'Failed to complete OAuth login'
          toast({
            title: 'Authentication failed',
            description: errorMessage,
            variant: 'destructive',
          })
          router.push('/auth/login')
        }
      } else {
        // No code or error, redirect to login
        router.push('/auth/login')
      }
    }

    handleCallback()
  }, [searchParams, router, setAuth])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we log you in.</p>
      </div>
    </div>
  )
}