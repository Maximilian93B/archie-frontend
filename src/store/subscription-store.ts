import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { subscriptionAPI } from '@/lib/api/subscription'
import type { 
  SubscriptionStatus, 
  QuotaCheck,
  PricingPlan,
  FeatureName
} from '@/types/subscription'

interface SubscriptionStore {
  // State
  status: SubscriptionStatus | null
  plans: PricingPlan[]
  quotaCache: Record<string, QuotaCheck>
  isLoading: boolean
  error: string | null
  lastFetched: {
    status: number
    plans: number
    quota: Record<string, number>
  }

  // Actions
  fetchStatus: () => Promise<void>
  fetchPlans: () => Promise<void>
  checkQuota: (feature: 'documents' | 'storage' | 'ai_credits' | 'api_calls') => Promise<QuotaCheck>
  reportUsage: (metric: 'documents' | 'storage' | 'ai_credits' | 'api_calls', value: number) => Promise<void>
  checkFeatureAccess: (feature: FeatureName) => Promise<boolean>
  createCheckoutSession: (lookupKey: string, options?: { successUrl?: string; cancelUrl?: string; customerEmail?: string }) => Promise<string>
  createPortalSession: (returnUrl?: string) => Promise<string>
  clearCache: () => void

  // Computed helpers
  hasActiveSubscription: () => boolean
  isTrialing: () => boolean
  getCurrentPlan: () => PricingPlan | null
  canAccessFeature: (feature: FeatureName) => boolean
}

const CACHE_DURATION = {
  status: 5 * 60 * 1000,    // 5 minutes
  plans: 60 * 60 * 1000,    // 1 hour
  quota: 60 * 1000          // 1 minute
}

// Track in-flight requests to prevent duplicates
const inFlightRequests: {
  status: Promise<void> | null
  plans: Promise<void> | null
  quotas: Map<string, Promise<QuotaCheck>>
} = {
  status: null,
  plans: null,
  quotas: new Map()
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      // Initial state
      status: null,
      plans: [],
      quotaCache: {},
      isLoading: false,
      error: null,
      lastFetched: {
        status: 0,
        plans: 0,
        quota: {}
      },

      // Fetch subscription status with request deduplication
      fetchStatus: async () => {
        const now = Date.now()
        const lastChecked = get().lastFetched.status

        // Use cache if fresh
        if (lastChecked && now - lastChecked < CACHE_DURATION.status) {
          return
        }

        // If a request is already in-flight, return the existing promise
        if (inFlightRequests.status) {
          return inFlightRequests.status
        }

        // Create new request
        inFlightRequests.status = (async () => {
          set({ isLoading: true, error: null })
          try {
            const status = await subscriptionAPI.getStatus()
            set({ 
              status, 
              lastFetched: { ...get().lastFetched, status: now },
              isLoading: false 
            })
          } catch (error: any) {
            // Don't show error for 404s as we handle this in the API layer
            if (error.response?.status !== 404) {
              set({ 
                error: error instanceof Error ? error.message : 'Failed to fetch subscription status',
                isLoading: false 
              })
            } else {
              // For 404, we still got a default status from the API layer
              set({ isLoading: false })
            }
          } finally {
            // Clear the promise when done
            inFlightRequests.status = null
          }
        })()

        return inFlightRequests.status
      },

      // Fetch available plans with request deduplication
      fetchPlans: async () => {
        const now = Date.now()
        const lastChecked = get().lastFetched.plans

        // Use cache if fresh
        if (get().plans.length > 0 && lastChecked && now - lastChecked < CACHE_DURATION.plans) {
          return
        }

        // If a request is already in-flight, return the existing promise
        if (inFlightRequests.plans) {
          return inFlightRequests.plans
        }

        // Create new request
        inFlightRequests.plans = (async () => {
          try {
            const plans = await subscriptionAPI.getPlans()
            set({ 
              plans,
              lastFetched: { ...get().lastFetched, plans: now }
            })
          } catch (error) {
            console.error('Failed to fetch plans:', error)
          } finally {
            // Clear the promise when done
            inFlightRequests.plans = null
          }
        })()

        return inFlightRequests.plans
      },

      // Check quota with caching and deduplication
      checkQuota: async (feature) => {
        const now = Date.now()
        const cached = get().quotaCache[feature]
        const lastChecked = get().lastFetched.quota[feature]

        // Use cache if fresh
        if (cached && lastChecked && now - lastChecked < CACHE_DURATION.quota) {
          return cached
        }

        // If a request is already in-flight for this feature, return it
        const existingRequest = inFlightRequests.quotas.get(feature)
        if (existingRequest) {
          return existingRequest
        }

        // Create new request
        const quotaPromise = (async () => {
          try {
            // First ensure we have status
            const status = get().status
            if (!status) {
              await get().fetchStatus()
            }
            
            const quota = await subscriptionAPI.checkQuota(feature)
            
            // Add percentage calculation
            const enhancedQuota: QuotaCheck = {
              ...quota,
              percentage: quota.limit && quota.limit !== -1 && quota.used !== undefined 
                ? Math.round((quota.used / quota.limit) * 100)
                : 0
            }
            
            set(state => ({
              quotaCache: { ...state.quotaCache, [feature]: enhancedQuota },
              lastFetched: {
                ...state.lastFetched,
                quota: { ...state.lastFetched.quota, [feature]: now }
              }
            }))
            
            return enhancedQuota
          } catch (error) {
            console.error('Failed to check quota:', error)
            // Return a permissive default if quota check fails
            return { 
              feature, 
              allowed: true, 
              limit: -1, 
              used: 0, 
              remaining: -1, 
              percentage: 0 
            }
          } finally {
            // Clear the promise when done
            inFlightRequests.quotas.delete(feature)
          }
        })()

        // Store the promise to prevent duplicate requests
        inFlightRequests.quotas.set(feature, quotaPromise)
        return quotaPromise
      },

      // Report usage
      reportUsage: async (metric, value) => {
        try {
          await subscriptionAPI.reportUsage({ metric, value })
          // Invalidate quota cache for this metric
          const { quotaCache, lastFetched } = get()
          delete quotaCache[metric]
          delete lastFetched.quota[metric]
          set({ quotaCache, lastFetched })
        } catch (error) {
          console.error('Failed to report usage:', error)
          // Don't throw - usage reporting shouldn't block operations
        }
      },

      // Check feature access
      checkFeatureAccess: async (feature) => {
        try {
          const { allowed } = await subscriptionAPI.checkFeatureAccess(feature)
          return allowed
        } catch (error) {
          console.error('Failed to check feature access:', error)
          return false
        }
      },

      // Create Stripe checkout session
      createCheckoutSession: async (lookupKey, options = {}) => {
        const { url } = await subscriptionAPI.createCheckoutSession({
          lookupKey,
          successUrl: options.successUrl || `${window.location.origin}/subscription/success`,
          cancelUrl: options.cancelUrl || `${window.location.origin}/pricing?canceled=true`,
          customerEmail: options.customerEmail
        })
        return url
      },

      // Create Stripe customer portal session
      createPortalSession: async (returnUrl) => {
        const { url } = await subscriptionAPI.createPortalSession({
          returnUrl: returnUrl || window.location.href
        })
        return url
      },

      // Clear all caches
      clearCache: () => {
        set({
          quotaCache: {},
          lastFetched: { status: 0, plans: 0, quota: {} }
        })
      },

      // Computed helpers
      hasActiveSubscription: () => {
        const { status } = get()
        return status?.hasSubscription && status?.isActive || false
      },

      isTrialing: () => {
        const { status } = get()
        return status?.hasSubscription && status?.isTrialing || false
      },

      getCurrentPlan: () => {
        const { status, plans } = get()
        if (!status?.plan || plans.length === 0) return null
        
        return plans.find(plan => 
          plan.monthlyLookupKey === status.plan.lookupKey ||
          plan.yearlyLookupKey === status.plan.lookupKey
        ) || null
      },

      canAccessFeature: (feature) => {
        const { status } = get()
        if (!status?.hasSubscription || !status?.isActive) return false
        
        // Check if feature is included in current plan
        const plan = get().getCurrentPlan()
        if (!plan) return false
        
        // Basic features available to all plans
        const basicFeatures: FeatureName[] = ['documents', 'storage', 'ai_credits']
        if (basicFeatures.includes(feature)) return true
        
        // Check premium features
        const premiumFeatures = plan.features.premium || []
        return premiumFeatures.some(f => f.toLowerCase().includes(feature.replace('_', ' ')))
      }
    }),
    {
      name: 'subscription-store',
      // Only persist non-sensitive cached data
      partialize: (state) => ({
        status: state.status,
        plans: state.plans,
        lastFetched: state.lastFetched
      })
    }
  )
)