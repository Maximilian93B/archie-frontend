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

export class SubscriptionAPI {
  /**
   * Get current subscription status
   * This endpoint returns all needed information including usage, features, etc.
   */
  async getStatus(): Promise<SubscriptionStatus> {
    try {
      const response = await apiClient.getSubscriptionStatus()
      // The API returns { success: true, data: { subscription: {...} } }
      // Handle both possible response formats
      if (response.data && response.data.subscription) {
        return response.data.subscription
      }
      return response.subscription || response
    } catch (error: any) {
      // If the endpoint doesn't exist (404), return a default subscription status
      if (error.response?.status === 404) {
        console.warn('Subscription endpoint not found, using default status')
        return {
          hasSubscription: false,
          isActive: false,
          isCanceled: false,
          isTrialing: false,
          canTrial: true,
          plan: null,
          usage: {
            documents: { used: 0, included: 100 },
            storage: { used: 0, included: 1073741824 }, // 1GB in bytes
            ai_credits: { used: 0, included: 50 }
          },
          trialEnd: null,
          currentPeriodEnd: null
        }
      }
      throw error
    }
  }

  /**
   * Get available pricing plans
   * NOTE: This endpoint doesn't exist in the backend yet, using defaults
   */
  async getPlans(): Promise<PricingPlan[]> {
    // Always use default plans for now since backend doesn't have this endpoint
    const { DEFAULT_PRICING_PLANS } = await import('@/types/subscription')
    return DEFAULT_PRICING_PLANS
  }

  /**
   * Create a Stripe checkout session
   */
  async createCheckoutSession(data: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
    try {
      const response = await apiClient.createCheckoutSession(data)
      // Handle the API response format { success: true, data: { checkout_url, session_id } }
      if (response.data) {
        return {
          url: response.data.checkout_url,
          sessionId: response.data.session_id
        }
      }
      return response
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
      const response = await apiClient.createPortalSession(data || { return_url: window.location.href })
      // Handle the API response format { success: true, data: { portal_url } }
      if (response.data) {
        return {
          url: response.data.portal_url
        }
      }
      return response
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Billing portal is not available yet. Please contact support.')
      }
      throw error
    }
  }

  /**
   * Check quota for a specific feature
   * Uses the /usage endpoint to get current usage statistics
   */
  async checkQuota(feature: 'documents' | 'storage' | 'ai_credits' | 'api_calls'): Promise<QuotaCheck> {
    try {
      // First try to get from subscription status which includes usage
      const subscription = await this.getStatus()
      
      // If subscription has usage data, use it
      if (subscription.usage && subscription.usage[feature]) {
        const usage = subscription.usage[feature]
        const limit = usage.included || usage.limit || 0
        const used = usage.used || 0
        
        return {
          feature,
          used,
          limit,
          allowed: limit === -1 || used < limit,
          remaining: limit === -1 ? -1 : Math.max(0, limit - used)
        }
      }
      
      // Otherwise, try the usage endpoint
      const usageResponse = await apiClient.getSubscriptionUsage()
      
      // Parse usage data based on backend format
      const usageData = usageResponse.usage || usageResponse
      
      if (usageData[feature]) {
        const featureUsage = usageData[feature]
        const limit = featureUsage.limit || featureUsage.included || -1
        const used = featureUsage.used || featureUsage.current || 0
        
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
      
      // For 404 errors, it means the endpoint doesn't exist yet
      if (error.response?.status === 404) {
        console.info('Usage endpoint not available, using permissive defaults')
      }
      
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