import { useEffect, useCallback } from 'react'
import { useSubscriptionStore } from '@/store/subscription-store'
import { useAuth } from '@/contexts/auth-context'
import { toast } from 'react-hot-toast'
import type { QuotaCheck, FeatureName } from '@/types/subscription'

/**
 * Unified hook for subscription management
 * Handles quota checking, feature gating, and checkout flows
 */
export function useSubscription() {
  const store = useSubscriptionStore()
  const { user } = useAuth()

  // Fetch status on mount and when user changes
  useEffect(() => {
    if (user) {
      store.fetchStatus()
      store.fetchPlans()
    }
  }, [user?.id])

  // Check quota with user-friendly error handling
  const checkQuota = useCallback(async (
    feature: 'documents' | 'storage' | 'ai_credits' | 'api_calls',
    options?: { 
      showError?: boolean
      showWarning?: boolean 
    }
  ): Promise<boolean> => {
    const { showError = true, showWarning = true } = options || {}
    const quota = await store.checkQuota(feature)
    
    if (!quota.allowed) {
      if (showError) {
        const featureNames = {
          documents: 'document',
          storage: 'storage',
          ai_credits: 'AI credit',
          api_calls: 'API call'
        }
        
        if (quota.limit === 0) {
          toast.error(
            `Your plan doesn't include ${featureNames[feature]}s. Please upgrade to continue.`,
            { id: `quota-${feature}` }
          )
        } else if (quota.remaining === 0) {
          toast.error(
            `You've reached your ${featureNames[feature]} limit. Please upgrade for more.`,
            { id: `quota-${feature}` }
          )
        }
      }
      return false
    }
    
    // Show warning if approaching limit
    if (showWarning && quota.percentage && quota.percentage >= 80 && quota.remaining && quota.remaining > 0) {
      toast(`Only ${quota.remaining} ${feature.replace('_', ' ')} remaining`, {
        icon: '⚠️',
        id: `quota-warning-${feature}`
      })
    }
    
    return true
  }, [store])

  // Report usage (fire-and-forget)
  const reportUsage = useCallback((
    metric: 'documents' | 'storage' | 'ai_credits' | 'api_calls',
    value: number
  ) => {
    // Report in background, don't await
    store.reportUsage(metric, value).catch(console.error)
  }, [store])

  // Check feature access
  const canAccessFeature = useCallback(async (feature: FeatureName): Promise<boolean> => {
    if (!store.hasActiveSubscription()) return false
    return store.canAccessFeature(feature)
  }, [store])

  // Start checkout with prefilled email
  const startCheckout = useCallback(async (
    lookupKey: string,
    options?: { 
      successUrl?: string
      cancelUrl?: string 
    }
  ) => {
    try {
      const url = await store.createCheckoutSession(lookupKey, {
        ...options,
        customerEmail: user?.email
      })
      window.location.href = url
    } catch (error) {
      toast.error('Failed to start checkout. Please try again.')
      console.error('Checkout error:', error)
    }
  }, [store, user])

  // Open customer portal
  const openBillingPortal = useCallback(async (returnUrl?: string) => {
    try {
      const url = await store.createPortalSession(returnUrl)
      window.location.href = url
    } catch (error) {
      toast.error('Failed to open billing portal. Please try again.')
      console.error('Portal error:', error)
    }
  }, [store])

  // Get remaining quota for display
  const getRemainingQuota = useCallback((feature: 'documents' | 'storage' | 'ai_credits' | 'api_calls') => {
    const quota = store.quotaCache[feature]
    if (!quota) return null
    
    return {
      used: quota.used || 0,
      limit: quota.limit || 0,
      remaining: quota.remaining || 0,
      percentage: quota.percentage || 0,
      isUnlimited: quota.limit === -1
    }
  }, [store.quotaCache])

  return {
    // State
    status: store.status,
    plans: store.plans,
    currentPlan: store.getCurrentPlan(),
    isLoading: store.isLoading,
    error: store.error,
    
    // Computed
    hasActiveSubscription: store.hasActiveSubscription(),
    isTrialing: store.isTrialing(),
    
    // Actions
    checkQuota,
    reportUsage,
    canAccessFeature,
    startCheckout,
    openBillingPortal,
    refreshStatus: store.fetchStatus,
    
    // Helpers
    getRemainingQuota
  }
}

// Higher-order function to wrap async operations with quota checking
export function withQuotaCheck<T extends any[], R>(
  feature: 'documents' | 'storage' | 'ai_credits' | 'api_calls',
  fn: (...args: T) => Promise<R>,
  options?: {
    reportUsage?: boolean
    usageValue?: number
  }
) {
  return async (...args: T): Promise<R | null> => {
    const store = useSubscriptionStore.getState()
    
    // Check quota first
    const quota = await store.checkQuota(feature)
    if (!quota.allowed) {
      const featureNames = {
        documents: 'document',
        storage: 'storage',
        ai_credits: 'AI credit',
        api_calls: 'API call'
      }
      
      toast.error(
        quota.limit === 0
          ? `Your plan doesn't include ${featureNames[feature]}s.`
          : `You've reached your ${featureNames[feature]} limit.`
      )
      return null
    }
    
    // Execute the operation
    try {
      const result = await fn(...args)
      
      // Report usage if requested
      if (options?.reportUsage) {
        store.reportUsage(feature, options.usageValue || 1)
      }
      
      return result
    } catch (error) {
      // If operation fails, don't report usage
      throw error
    }
  }
}