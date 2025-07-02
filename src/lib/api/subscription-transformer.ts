/**
 * Transformation layer to convert backend subscription responses
 * to the format expected by the frontend
 */

import type {
  Subscription,
  SubscriptionSummary,
  SubscriptionPlan,
  SubscriptionUsage,
  SubscriptionTier,
  SubscriptionStatus
} from '@/types/subscription'

/**
 * Parse storage string like "5 GB" to bytes
 */
function parseStorageString(storage: string | number): number {
  if (typeof storage === 'number') return storage
  
  const match = storage.match(/^(\d+(?:\.\d+)?)\s*(GB|MB|TB)?$/i)
  if (!match) return 0
  
  const value = parseFloat(match[1])
  const unit = match[2]?.toUpperCase() || 'GB'
  
  switch (unit) {
    case 'TB': return value * 1024 * 1024 * 1024 * 1024
    case 'GB': return value * 1024 * 1024 * 1024
    case 'MB': return value * 1024 * 1024
    default: return value
  }
}

/**
 * Transform backend plan format to frontend format
 */
interface BackendPlan {
  id?: string
  tier?: string
  name?: string
  display_name?: string
  price?: number
  amount?: number
  currency?: string
  interval?: string
  stripe_product_id?: string
  stripeProductId?: string
  stripe_price_id?: string
  stripePriceId?: string
  features?: Record<string, unknown>
  description?: string
}

export function transformBackendPlan(backendPlan: BackendPlan): SubscriptionPlan {
  // Handle different plan structures from backend
  const tier = (backendPlan.tier || backendPlan.name || 'unknown').toLowerCase()
  const isUnlimited = tier === 'enterprise'
  
  // Extract limits from features object or use defaults
  const features = backendPlan.features || {}
  
  return {
    id: backendPlan.id || tier,
    name: tier as SubscriptionTier,
    displayName: backendPlan.display_name || backendPlan.tier || tier.charAt(0).toUpperCase() + tier.slice(1),
    price: backendPlan.price || backendPlan.amount || 0,
    currency: backendPlan.currency || 'cad',
    interval: backendPlan.interval || 'month',
    stripeProductId: backendPlan.stripe_product_id || backendPlan.stripeProductId || '',
    stripePriceId: backendPlan.stripe_price_id || backendPlan.stripePriceId || '',
    limits: {
      documents: isUnlimited ? -1 : (typeof features.documents === 'number' ? features.documents : parseInt(features.documents) || 1000),
      storage: isUnlimited ? -1 : parseStorageString(features.storage || '5 GB'),
      aiCredits: isUnlimited ? -1 : (features.ai_credits || features.aiCredits || 100),
      users: isUnlimited ? -1 : (features.users || 5)
    },
    features: extractFeaturesList(features, tier),
    highlighted: tier === 'professional',
    description: backendPlan.description
  }
}

/**
 * Extract features list from backend features object
 */
interface Features {
  support?: string
  documents?: number | string
  storage?: number | string
  ai_credits?: number
  aiCredits?: number
  users?: number
}

function extractFeaturesList(features: Features, tier: string): string[] {
  const baseFeatures = [
    'AI-powered document analysis',
    'Smart search and retrieval',
    'Document organization',
    features.support ? `${features.support} support` : 'Email support'
  ]
  
  if (tier === 'trial') {
    return baseFeatures
  }
  
  if (tier === 'starter') {
    return [
      ...baseFeatures,
      'Basic integrations',
      'Mobile access'
    ]
  }
  
  if (tier === 'professional') {
    return [
      'Everything in Starter',
      'Multi-document analysis',
      'Workflow automation',
      'API access',
      'Advanced search',
      'Priority support'
    ]
  }
  
  if (tier === 'enterprise') {
    return [
      'Everything in Professional',
      'Unlimited everything',
      'Custom integrations',
      'SSO/SAML',
      'Dedicated support',
      'SLA guarantee'
    ]
  }
  
  return baseFeatures
}

/**
 * Transform backend subscription to frontend format
 */
export function transformBackendSubscription(backendData: any): Subscription | null {
  if (!backendData) return null
  
  const sub = backendData.subscription || backendData
  if (!sub || !sub.id) return null
  
  // Map tier names
  let tier = (sub.tier || sub.plan_name || 'starter').toLowerCase() as SubscriptionTier
  if (tier === 'trial') tier = 'starter' // Treat trial as starter tier
  
  return {
    id: sub.id,
    tenantId: sub.tenant_id || sub.tenantId,
    stripeCustomerId: sub.stripe_customer_id || sub.stripeCustomerId || '',
    stripeSubscriptionId: sub.stripe_subscription_id || sub.stripeSubscriptionId || '',
    stripePriceId: sub.stripe_price_id || sub.stripePriceId || '',
    stripeProductId: sub.stripe_product_id || sub.stripeProductId || '',
    status: (sub.status || 'active') as SubscriptionStatus,
    tier,
    planName: sub.plan_name || sub.planName || tier,
    amount: sub.amount || 0,
    currency: sub.currency || 'cad',
    interval: sub.interval || 'month',
    intervalCount: sub.interval_count || sub.intervalCount || 1,
    currentPeriodStart: sub.current_period_start || sub.currentPeriodStart || new Date().toISOString(),
    currentPeriodEnd: sub.current_period_end || sub.currentPeriodEnd || new Date().toISOString(),
    trialStart: sub.trial_start || sub.trialStart,
    trialEnd: sub.trial_end || sub.trialEnd,
    canceledAt: sub.canceled_at || sub.canceledAt,
    cancelAtPeriodEnd: sub.cancel_at_period_end || sub.cancelAtPeriodEnd || false,
    documentsIncluded: sub.documents_included || sub.documentsIncluded || 1000,
    documentsUsed: sub.documents_used || sub.documentsUsed || 0,
    storageIncluded: sub.storage_included || sub.storageIncluded || 5368709120, // 5GB
    storageUsed: sub.storage_used || sub.storageUsed || 0,
    aiCreditsIncluded: sub.ai_credits_included || sub.aiCreditsIncluded || 100,
    aiCreditsUsed: sub.ai_credits_used || sub.aiCreditsUsed || 0,
    usersIncluded: sub.users_included || sub.usersIncluded || 5,
    features: sub.features || {},
    createdAt: sub.created_at || sub.createdAt || new Date().toISOString(),
    updatedAt: sub.updated_at || sub.updatedAt || new Date().toISOString()
  }
}

/**
 * Transform backend usage data
 */
export function transformBackendUsage(backendUsage: any): SubscriptionUsage {
  const usage = backendUsage.usage || backendUsage || {}
  
  // Safely extract values with defaults
  const documents = usage.documents || { used: 0, limit: 1000 }
  const storage = usage.storage || { used: 0, limit: 5368709120 }
  const aiCredits = usage.ai_credits || usage.aiCredits || { used: 0, limit: 100 }
  const users = usage.users || { used: 1, limit: 5 }
  
  return {
    documents: {
      used: documents.used || 0,
      limit: documents.limit || 1000,
      percentage: documents.limit === -1 ? 0 : Math.round((documents.used / documents.limit) * 100)
    },
    storage: {
      used: storage.used || 0,
      limit: storage.limit || 5368709120,
      percentage: storage.limit === -1 ? 0 : Math.round((storage.used / storage.limit) * 100)
    },
    aiCredits: {
      used: aiCredits.used || 0,
      limit: aiCredits.limit || 100,
      percentage: aiCredits.limit === -1 ? 0 : Math.round((aiCredits.used / aiCredits.limit) * 100)
    },
    users: {
      used: users.used || 1,
      limit: users.limit || 5,
      percentage: users.limit === -1 ? 0 : Math.round((users.used / users.limit) * 100)
    }
  }
}

/**
 * Transform subscription status response from backend
 */
export function transformSubscriptionStatus(backendResponse: any): {
  subscription: Subscription | null
  isTrialing: boolean
  requiresSubscription: boolean
} {
  // Handle no subscription case (new user)
  if (!backendResponse || !backendResponse.subscription) {
    return {
      subscription: null,
      isTrialing: false,
      requiresSubscription: true
    }
  }
  
  // Check if it's a trial
  const isTrialPlan = backendResponse.subscription?.tier === 'Trial' || 
                     backendResponse.subscription?.status === 'trialing'
  
  // For trial users, create a proper subscription object
  if (isTrialPlan) {
    const tenant = backendResponse.tenant || {}
    const trialEnd = tenant.trial_ends_at || backendResponse.subscription?.trial_end
    
    return {
      subscription: {
        ...transformBackendSubscription(backendResponse.subscription)!,
        status: 'trialing' as SubscriptionStatus,
        tier: 'starter' as SubscriptionTier, // Default trial to starter tier
        trialEnd: trialEnd || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      },
      isTrialing: true,
      requiresSubscription: false // Trial users have access
    }
  }
  
  // Regular subscription
  const subscription = transformBackendSubscription(backendResponse.subscription)
  
  return {
    subscription,
    isTrialing: false,
    requiresSubscription: !subscription || subscription.status === 'canceled'
  }
}

/**
 * Map pricing plans to Stripe price IDs
 * These should be updated with your actual Stripe price IDs
 */
export const STRIPE_PRICE_IDS = {
  starter_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY || '',
  starter_yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_YEARLY || '',
  professional_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_MONTHLY || '',
  professional_yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_YEARLY || '',
  enterprise_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY || '',
  enterprise_yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_YEARLY || ''
}