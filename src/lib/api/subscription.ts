import { apiClient } from './client'
import type {
  SubscriptionStatus,
  CreateCheckoutRequest,
  CreateCheckoutResponse,
  CreatePortalRequest,
  CreatePortalResponse,
  QuotaCheck,
  ReportUsageRequest,
  PricingPlan
} from '@/types/subscription'

export class SubscriptionAPI {
  private basePath = '/api/v1/subscription'

  /**
   * Get current subscription status from Stripe
   */
  async getStatus(): Promise<SubscriptionStatus> {
    const response = await apiClient.get<SubscriptionStatus>(`${this.basePath}/status`)
    return response.data
  }

  /**
   * Check quota for a specific feature
   */
  async checkQuota(feature: 'documents' | 'storage' | 'ai_credits' | 'api_calls'): Promise<QuotaCheck> {
    const response = await apiClient.get<QuotaCheck>(`${this.basePath}/quota`, {
      params: { feature }
    })
    return response.data
  }

  /**
   * Report usage to Stripe Billing Meters
   */
  async reportUsage(data: ReportUsageRequest): Promise<void> {
    await apiClient.post(`${this.basePath}/usage`, data)
  }

  /**
   * Create a Stripe checkout session
   */
  async createCheckoutSession(data: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
    const response = await apiClient.post<CreateCheckoutResponse>(
      `${this.basePath}/checkout`,
      data
    )
    return response.data
  }

  /**
   * Create a Stripe customer portal session
   */
  async createPortalSession(data: CreatePortalRequest): Promise<CreatePortalResponse> {
    const response = await apiClient.post<CreatePortalResponse>(
      `${this.basePath}/portal`,
      data
    )
    return response.data
  }
  
  /**
   * Get available pricing plans from backend (future implementation)
   */
  async getPlans(): Promise<PricingPlan[]> {
    try {
      const response = await apiClient.get<{ plans: PricingPlan[] }>(`${this.basePath}/plans`)
      return response.data.plans
    } catch (error) {
      // Fallback to default plans if endpoint not available yet
      const { DEFAULT_PRICING_PLANS } = await import('@/types/subscription')
      return DEFAULT_PRICING_PLANS
    }
  }

  /**
   * Check feature access
   */
  async checkFeatureAccess(feature: string): Promise<{ allowed: boolean }> {
    const response = await apiClient.get<{ allowed: boolean }>(`${this.basePath}/features/${feature}`)
    return response.data
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