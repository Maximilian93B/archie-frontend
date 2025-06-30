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
          })

          if (response.token && response.user) {
            // Store tokens
            localStorage.setItem('access_token', response.token)
            localStorage.setItem('refresh_token', response.refresh_token)
            if (response.user.tenant_id) {
              localStorage.setItem('tenant_id', response.user.tenant_id)
            }
            
            // Update auth context
            await setAuth(response.user, response.token)
            
            toast({
              title: 'Success',
              description: 'Successfully logged in!',
            })
            
            router.push('/dashboard')
          } else {
            throw new Error('Invalid response from server')
          }
        } catch (error: any) {
          console.error('OAuth callback error:', error)
          toast({
            title: 'Authentication failed',
            description: error.response?.data?.message || 'Failed to complete OAuth login',
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