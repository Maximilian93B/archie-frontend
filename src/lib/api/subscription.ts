import { apiClient } from './client'
import type {
  SubscriptionStatus,
  CreateCheckoutRequest,
  CreateCheckoutResponse,
  CreatePortalRequest,
  CreatePortalResponse,
  QuotaCheck,
  PricingPlan
} from '@/types/subscription'

// Track whether we've already shown the 404 message
let hasShown404Message = false

export class SubscriptionAPI {
  /**
   * Get current subscription status from the summary endpoint
   * This endpoint returns both status and usage information
   */
  async getStatus(): Promise<SubscriptionStatus> {
    try {
      // Try the summary endpoint first (preferred as it combines status + usage)
      try {
        const response = await apiClient.get('/api/v1/subscription/summary')
        
        // Backend returns { tenant_id, status: {...}, usage: {...} }
        if (response.status && response.usage) {
          // Transform backend format to our frontend format
          return {
            hasSubscription: response.status.status === 'active' || response.status.status === 'trialing',
            isActive: response.status.status === 'active',
            isCanceled: response.status.cancel_at_period_end,
            isTrialing: response.status.status === 'trialing',
            canTrial: false, // Determined by backend
            plan: {
              id: response.status.tier,
              name: response.status.plan_name,
              tier: response.status.tier,
              lookupKey: response.status.tier // Will be updated when we have price info
            },
            usage: {
              documents: { 
                used: response.usage.documents.used, 
                included: response.usage.documents.limit,
                limit: response.usage.documents.limit
              },
              storage: { 
                used: response.usage.storage.used, 
                included: response.usage.storage.limit,
                limit: response.usage.storage.limit
              },
              ai_credits: { 
                used: response.usage.ai_credits.used, 
                included: response.usage.ai_credits.limit,
                limit: response.usage.ai_credits.limit
              },
              users: {
                used: response.usage.users.used,
                included: response.usage.users.limit,
                limit: response.usage.users.limit
              }
            },
            features: response.status.features,
            trialEnd: response.status.trial_end_date,
            currentPeriodEnd: response.status.current_period_end,
            status: response.status.status
          }
        }
        
        // Fallback parsing if structure is different
        return response
      } catch (summaryError: any) {
        // If summary endpoint doesn't exist (404), try individual endpoints
        if (summaryError.response?.status === 404) {
          console.info('Summary endpoint not available, trying individual endpoints')
          
          // Try to get status from individual endpoint
          try {
            const statusResponse = await apiClient.get('/api/v1/subscription/status')
            // Try to get usage separately
            let usageData = null
            try {
              const usageResponse = await apiClient.get('/api/v1/subscription/usage')
              usageData = usageResponse.usage || usageResponse
            } catch (usageError) {
              console.info('Usage endpoint not available')
            }
            
            // Combine the responses
            return this.transformStatusResponse(statusResponse, usageData)
          } catch (statusError: any) {
            if (statusError.response?.status === 404) {
              throw statusError // Will be caught by outer catch
            }
          }
        }
        throw summaryError
      }
    } catch (error: any) {
      // If all endpoints fail with 404, return a default subscription status
      if (error.response?.status === 404) {
        // Only show message once to avoid console spam
        if (!hasShown404Message) {
          console.info('Subscription endpoints not found, using default status')
          hasShown404Message = true
        }
        return {
          hasSubscription: false,
          isActive: false,
          isCanceled: false,
          isTrialing: false,
          canTrial: true,
          plan: null,
          usage: {
            documents: { used: 0, included: 100, limit: 100 },
            storage: { used: 0, included: 1073741824, limit: 1073741824 }, // 1GB in bytes
            ai_credits: { used: 0, included: 50, limit: 50 },
            users: { used: 1, included: 1, limit: 1 }
          },
          features: {},
          trialEnd: null,
          currentPeriodEnd: null,
          status: 'inactive'
        }
      }
      throw error
    }
  }

  /**
   * Transform status response from various formats
   */
  private transformStatusResponse(statusData: any, usageData: any = null): SubscriptionStatus {
    // Handle various possible response formats
    const status = statusData.subscription || statusData.data?.subscription || statusData
    
    // Default usage if not provided
    const defaultUsage = {
      documents: { used: 0, included: 100, limit: 100 },
      storage: { used: 0, included: 1073741824, limit: 1073741824 },
      ai_credits: { used: 0, included: 50, limit: 50 },
      users: { used: 1, included: 1, limit: 1 }
    }
    
    const usage = usageData || status.usage || defaultUsage
    
    return {
      hasSubscription: !!status.status && status.status !== 'inactive',
      isActive: status.status === 'active',
      isCanceled: status.cancel_at_period_end || false,
      isTrialing: status.status === 'trialing',
      canTrial: status.can_trial || false,
      plan: status.plan ? {
        id: status.plan.id || status.tier,
        name: status.plan.name || status.plan_name,
        tier: status.tier,
        lookupKey: status.plan.lookup_key || status.tier
      } : null,
      usage: {
        documents: {
          used: usage.documents?.used || 0,
          included: usage.documents?.limit || usage.documents?.included || 100,
          limit: usage.documents?.limit || usage.documents?.included || 100
        },
        storage: {
          used: usage.storage?.used || 0,
          included: usage.storage?.limit || usage.storage?.included || 1073741824,
          limit: usage.storage?.limit || usage.storage?.included || 1073741824
        },
        ai_credits: {
          used: usage.ai_credits?.used || 0,
          included: usage.ai_credits?.limit || usage.ai_credits?.included || 50,
          limit: usage.ai_credits?.limit || usage.ai_credits?.included || 50
        },
        users: {
          used: usage.users?.used || 1,
          included: usage.users?.limit || usage.users?.included || 1,
          limit: usage.users?.limit || usage.users?.included || 1
        }
      },
      features: status.features || {},
      trialEnd: status.trial_end || status.trial_end_date,
      currentPeriodEnd: status.current_period_end,
      status: status.status || 'inactive'
    }
  }

  /**
   * Get available pricing plans
   */
  async getPlans(): Promise<PricingPlan[]> {
    try {
      const response = await apiClient.get('/api/v1/subscription/plans')
      
      // Backend returns { plans: [...] }
      if (response.data?.plans) {
        // Transform backend format to our frontend format
        return response.data.plans.map((plan: any) => ({
          id: plan.id,
          name: plan.name,
          monthlyPrice: plan.price,
          yearlyPrice: plan.price * 10, // Backend should provide yearly prices
          currency: plan.currency,
          monthlyLookupKey: plan.stripe_price_id,
          yearlyLookupKey: plan.stripe_price_id + '_yearly', // Backend should provide this
          features: {
            documents: plan.documents,
            storage: plan.storage,
            aiCredits: plan.ai_credits,
            users: plan.users,
            premium: plan.features || []
          },
          description: plan.description,
          popular: plan.popular || false
        }))
      }
      
      // Fallback to defaults if endpoint fails
      const { DEFAULT_PRICING_PLANS } = await import('@/types/subscription')
      return DEFAULT_PRICING_PLANS
    } catch (error: any) {
      // If endpoint doesn't exist, use defaults
      const { DEFAULT_PRICING_PLANS } = await import('@/types/subscription')
      return DEFAULT_PRICING_PLANS
    }
  }

  /**
   * Create a Stripe checkout session
   */
  async createCheckoutSession(data: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
    try {
      // Transform to backend expected format
      const requestData = {
        price_id: data.lookupKey, // Frontend uses lookupKey, backend expects price_id
        success_url: data.successUrl || `${window.location.origin}/subscription/success`,
        cancel_url: data.cancelUrl || `${window.location.origin}/pricing?canceled=true`
      }
      
      const response = await apiClient.post('/api/v1/subscription/checkout', requestData)
      
      // Backend returns { tenant_id, checkout_url, price_id }
      if (response.data) {
        return {
          url: response.data.checkout_url,
          sessionId: response.data.session_id || 'checkout_session'
        }
      }
      
      throw new Error('Invalid checkout response')
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Subscription checkout is not available yet. Please contact support.')
      }
      throw error
    }
  }

  /**
   * Create a Stripe customer portal session
   */
  async createPortalSession(data?: CreatePortalRequest): Promise<CreatePortalResponse> {
    try {
      const requestData = {
        return_url: data?.returnUrl || window.location.href
      }
      
      const response = await apiClient.post('/api/v1/subscription/portal', requestData)
      
      // Backend returns { tenant_id, portal_url }
      if (response.data) {
        return {
          url: response.data.portal_url
        }
      }
      
      throw new Error('Invalid portal response')
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Billing portal is not available yet. Please contact support.')
      }
      throw error
    }
  }

  /**
   * Check quota for a specific feature
   * Uses the cached usage data from subscription summary
   */
  async checkQuota(feature: 'documents' | 'storage' | 'ai_credits' | 'api_calls'): Promise<QuotaCheck> {
    try {
      // Try to get fresh usage data
      const response = await apiClient.get('/api/v1/subscription/usage')
      
      // Backend returns { tenant_id, usage: { documents: {...}, storage: {...}, ... } }
      if (response.data?.usage && response.data.usage[feature]) {
        const featureUsage = response.data.usage[feature]
        const limit = featureUsage.limit
        const used = featureUsage.used
        
        return {
          feature,
          used,
          limit,
          allowed: limit === -1 || used < limit,
          remaining: limit === -1 ? -1 : Math.max(0, limit - used)
        }
      }
      
      // Fallback to cached subscription data
      const subscription = await this.getStatus()
      
      if (subscription.usage && subscription.usage[feature]) {
        const usage = subscription.usage[feature]
        const limit = usage.limit || usage.included || 0
        const used = usage.used || 0
        
        return {
          feature,
          used,
          limit,
          allowed: limit === -1 || used < limit,
          remaining: limit === -1 ? -1 : Math.max(0, limit - used)
        }
      }
      
      // If no data found, return permissive defaults
      return {
        feature,
        used: 0,
        limit: -1,
        allowed: true,
        remaining: -1
      }
    } catch (error: any) {
      // If we can't get quota, return a permissive response
      console.warn(`Failed to check quota for ${feature}:`, error)
      
      return {
        feature,
        used: 0,
        limit: -1,
        allowed: true,
        remaining: -1
      }
    }
  }

  /**
   * Check feature access based on subscription plan
   * NOTE: The backend doesn't have a specific endpoint for this, derive from plan
   */
  async checkFeatureAccess(feature: string): Promise<{ allowed: boolean }> {
    try {
      const subscription = await this.getStatus()
      
      // Map plan names to feature sets
      const planFeatures: Record<string, string[]> = {
        individual: ['basic_upload', 'basic_search', 'basic_ai'],
        starter: ['basic_upload', 'basic_search', 'basic_ai', 'folders', 'tags'],
        professional: ['basic_upload', 'basic_search', 'basic_ai', 'folders', 'tags', 
                      'advanced_search', 'workflows', 'multi_document_analysis'],
        enterprise: ['all'] // All features
      }
      
      const planName = subscription.plan?.id?.toLowerCase() || 'individual'
      const features = planFeatures[planName] || []
      const allowed = features.includes('all') || features.includes(feature)
      
      return { allowed }
    } catch (error) {
      // If we can't check, default to allowing the feature
      return { allowed: true }
    }
  }

  /**
   * Report usage metrics
   * NOTE: The backend doesn't have a specific endpoint for usage reporting yet
   * This is a placeholder that can be implemented when the endpoint is available
   */
  async reportUsage(data: { metric: string; value: number }): Promise<void> {
    // TODO: Implement when backend endpoint is available
    // For now, just log the usage locally
    console.log('Usage reported:', data)
    
    // In the future, this would be something like:
    // await apiClient.post('/api/v1/subscription/usage', data)
  }
}

// Export singleton instance
export const subscriptionAPI = new SubscriptionAPI()

// Helper function to handle subscription-related errors
export function handleSubscriptionError(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message
  }

  switch (error.response?.status) {
    case 402:
      return 'Payment required. Please update your payment method.'
    case 403:
      return 'You do not have permission to perform this action.'
    case 404:
      return 'No active subscription found.'
    case 422:
      return 'Invalid subscription operation.'
    default:
      return 'An error occurred with your subscription. Please try again.'
  }
}