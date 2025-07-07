'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useSubscriptionStore } from '@/store/subscription-store'

interface SubscriptionProviderState {
  isInitialized: boolean
  isInitializing: boolean
  error: Error | null
}

const SubscriptionContext = createContext<SubscriptionProviderState>({
  isInitialized: false,
  isInitializing: false,
  error: null
})

interface SubscriptionProviderProps {
  children: ReactNode
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { user, isAuthenticated } = useAuth()
  const subscriptionStore = useSubscriptionStore()
  
  const [state, setState] = useState<SubscriptionProviderState>({
    isInitialized: false,
    isInitializing: false,
    error: null
  })

  useEffect(() => {
    let mounted = true

    const initializeSubscription = async () => {
      // Skip if not authenticated or already initializing/initialized
      if (!isAuthenticated || state.isInitializing || state.isInitialized) {
        return
      }

      setState(prev => ({ ...prev, isInitializing: true, error: null }))

      try {
        // Log initialization in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[SubscriptionProvider] Initializing subscription data...')
        }
        
        // Fetch both status and plans in parallel for efficiency
        await Promise.all([
          subscriptionStore.fetchStatus(),
          subscriptionStore.fetchPlans()
        ])

        if (mounted) {
          if (process.env.NODE_ENV === 'development') {
            console.log('[SubscriptionProvider] Subscription initialized successfully')
          }
          setState({
            isInitialized: true,
            isInitializing: false,
            error: null
          })
        }
      } catch (error) {
        console.error('[SubscriptionProvider] Failed to initialize subscription:', error)
        if (mounted) {
          setState({
            isInitialized: false,
            isInitializing: false,
            error: error instanceof Error ? error : new Error('Failed to initialize subscription')
          })
        }
      }
    }

    if (isAuthenticated && user) {
      initializeSubscription()
    } else if (!isAuthenticated) {
      // Reset state when user logs out
      setState({
        isInitialized: false,
        isInitializing: false,
        error: null
      })
    }

    return () => {
      mounted = false
    }
  }, [isAuthenticated, user?.id]) // Only re-run if auth state or user ID changes

  return (
    <SubscriptionContext.Provider value={state}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscriptionProvider() {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscriptionProvider must be used within a SubscriptionProvider')
  }
  return context
}