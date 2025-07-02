/**
 * Unified Subscription Types for Archivus
 * Aligned with Stripe's architecture and backend schema
 */

// Stripe subscription statuses
export type StripeStatus = 
  | 'active' 
  | 'trialing' 
  | 'past_due' 
  | 'canceled' 
  | 'incomplete' 
  | 'incomplete_expired'
  | 'unpaid'

// Plan tiers
export type PlanTier = 'individual' | 'starter' | 'professional' | 'enterprise'

// Stripe-aligned subscription response from backend
export interface StripeSubscription {
  // Stripe data
  id: string
  customer: string
  status: StripeStatus
  current_period_start: number
  current_period_end: number
  trial_start?: number
  trial_end?: number
  cancel_at_period_end: boolean
  canceled_at?: number
  
  // Plan data
  items: {
    data: [{
      price: {
        id: string
        product: string
        nickname: string
        unit_amount: number
        currency: string
        recurring: {
          interval: 'month' | 'year'
          interval_count: number
        }
        lookup_key?: string
        metadata?: Record<string, string>
      }
    }]
  }
  
  // Metadata
  metadata?: Record<string, string>
}

// Simplified subscription status for frontend
export interface SubscriptionStatus {
  // Core status
  hasSubscription: boolean
  status: StripeStatus | null
  isActive: boolean
  isTrialing: boolean
  
  // Plan details
  plan?: {
    id: string
    name: string
    tier: PlanTier
    amount: number
    currency: string
    interval: 'month' | 'year'
    lookupKey: string
  }
  
  // Dates
  currentPeriodEnd?: Date
  trialEndsAt?: Date
  cancelAt?: Date
  
  // Stripe references
  customerId?: string
  subscriptionId?: string
}

// Quota/Entitlement check response
export interface QuotaCheck {
  feature: string
  allowed: boolean
  limit?: number
  used?: number
  remaining?: number
  percentage?: number
}

// Feature names aligned with Stripe Entitlements
export type FeatureName = 
  | 'documents'
  | 'storage' 
  | 'ai_credits'
  | 'api_calls'
  | 'advanced_search'
  | 'custom_workflows'
  | 'api_access'
  | 'premium_support'
  | 'sso'
  | 'custom_integrations'

// Plan definition for pricing display
export interface PricingPlan {
  // Identity
  id: string
  tier: PlanTier
  name: string
  description?: string
  
  // Pricing
  monthlyPrice: number
  yearlyPrice: number
  currency: string
  
  // Stripe references
  monthlyPriceId?: string
  yearlyPriceId?: string
  monthlyLookupKey: string
  yearlyLookupKey: string
  
  // Limits & Features
  limits: {
    documents: number
    storage: number // GB
    aiCredits: number
    users: number
  }
  
  features: {
    core: string[] // Always included features
    premium?: string[] // Additional features for this tier
  }
  
  // UI hints
  isPopular?: boolean
  badge?: string
}

// API Request/Response types
export interface CreateCheckoutRequest {
  lookupKey: string
  successUrl?: string
  cancelUrl?: string
  customerEmail?: string
  metadata?: Record<string, string>
}

export interface CreateCheckoutResponse {
  url: string
  sessionId: string
}

export interface CreatePortalRequest {
  returnUrl?: string
}

export interface CreatePortalResponse {
  url: string
}

export interface ReportUsageRequest {
  metric: 'documents' | 'storage' | 'ai_credits' | 'api_calls'
  value: number
  timestamp?: number
}

// Usage tracking for display
export interface UsageMetrics {
  documents: UsageMetric
  storage: UsageMetric
  aiCredits: UsageMetric
  apiCalls: UsageMetric
}

export interface UsageMetric {
  used: number
  limit: number
  unit: string
  percentage: number
  isUnlimited: boolean
  displayValue: string
  displayLimit: string
}

// Helper functions
export function isSubscriptionActive(status: StripeStatus | null): boolean {
  return status === 'active' || status === 'trialing'
}

export function formatPrice(cents: number, currency = 'cad'): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

export function formatBytes(bytes: number): string {
  if (bytes === -1) return 'Unlimited'
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let value = bytes
  let unitIndex = 0
  
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex++
  }
  
  return `${value.toFixed(value < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`
}

export function formatNumber(value: number): string {
  if (value === -1) return 'Unlimited'
  return value.toLocaleString()
}

export function calculatePercentage(used: number, limit: number): number {
  if (limit === -1 || limit === 0) return 0
  return Math.round((used / limit) * 100)
}

// Plan lookup key helpers
export function buildLookupKey(tier: PlanTier, interval: 'monthly' | 'yearly'): string {
  return `${tier}_${interval}`
}

export function parseLookupKey(lookupKey: string): { tier: PlanTier, interval: 'monthly' | 'yearly' } | null {
  const parts = lookupKey.split('_')
  if (parts.length !== 2) return null
  
  const [tier, interval] = parts
  if (!['individual', 'starter', 'professional', 'enterprise'].includes(tier)) return null
  if (!['monthly', 'yearly'].includes(interval)) return null
  
  return { tier: tier as PlanTier, interval: interval as 'monthly' | 'yearly' }
}

// Type guards
export function hasActiveSubscription(status: SubscriptionStatus): boolean {
  return status.hasSubscription && status.isActive
}

export function isTrialing(status: SubscriptionStatus): boolean {
  return status.hasSubscription && status.isTrialing
}

export function needsPaymentMethod(status: SubscriptionStatus): boolean {
  return status.status === 'past_due' || status.status === 'unpaid'
}

// Default pricing plans (to be replaced by dynamic fetch from backend)
export const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'individual',
    tier: 'individual',
    name: 'Individual',
    description: 'Perfect for personal document management',
    monthlyPrice: 1500,
    yearlyPrice: 15000,
    currency: 'cad',
    monthlyLookupKey: 'individual_monthly',
    yearlyLookupKey: 'individual_yearly',
    limits: {
      documents: 100,
      storage: 1,
      aiCredits: 50,
      users: 1
    },
    features: {
      core: [
        'AI Document Analysis',
        'Smart Search',
        'Document Organization',
        'Basic Support'
      ]
    }
  },
  {
    id: 'starter',
    tier: 'starter',
    name: 'Starter',
    description: 'For small teams and growing businesses',
    monthlyPrice: 3900,
    yearlyPrice: 39000,
    currency: 'cad',
    monthlyLookupKey: 'starter_monthly',
    yearlyLookupKey: 'starter_yearly',
    limits: {
      documents: 1000,
      storage: 5,
      aiCredits: 100,
      users: 5
    },
    features: {
      core: [
        'Everything in Individual',
        'Team Collaboration',
        'Priority Support',
        'Monthly Reports'
      ]
    }
  },
  {
    id: 'professional',
    tier: 'professional',
    name: 'Professional',
    description: 'Advanced features for power users',
    monthlyPrice: 10900,
    yearlyPrice: 109000,
    currency: 'cad',
    monthlyLookupKey: 'professional_monthly',
    yearlyLookupKey: 'professional_yearly',
    limits: {
      documents: 10000,
      storage: 50,
      aiCredits: 1000,
      users: 25
    },
    features: {
      core: [
        'Everything in Starter',
        'Advanced Search',
        'API Access',
        'Custom Workflows',
        'Premium Support'
      ]
    },
    isPopular: true,
    badge: 'Most Popular'
  },
  {
    id: 'enterprise',
    tier: 'enterprise',
    name: 'Enterprise',
    description: 'Unlimited everything for large organizations',
    monthlyPrice: 27900,
    yearlyPrice: 279000,
    currency: 'cad',
    monthlyLookupKey: 'enterprise_monthly',
    yearlyLookupKey: 'enterprise_yearly',
    limits: {
      documents: -1,
      storage: -1,
      aiCredits: -1,
      users: -1
    },
    features: {
      core: [
        'Everything in Professional',
        'Unlimited Usage',
        'SSO/SAML',
        'Custom Integrations',
        'Dedicated Support',
        'SLA Guarantee'
      ]
    }
  }
]