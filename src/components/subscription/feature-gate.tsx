import React from 'react'
import { Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSubscriptionStore } from '@/store/subscription-store'
import type { SubscriptionTier } from '@/types/subscription'

interface FeatureGateProps {
  feature: string
  requiredTier?: SubscriptionTier
  minimumTier?: SubscriptionTier
  children: React.ReactNode
  fallback?: React.ReactNode
}

const tierHierarchy: Record<SubscriptionTier, number> = {
  trial: 0,
  starter: 1,
  professional: 2,
  enterprise: 3
}

export function FeatureGate({ 
  feature, 
  requiredTier, 
  minimumTier,
  children,
  fallback
}: FeatureGateProps) {
  const router = useRouter()
  const { subscription } = useSubscriptionStore()
  
  // Check if user has access to the feature
  const hasAccess = () => {
    if (!subscription) return false
    
    // Check if subscription is active or trialing
    if (!['active', 'trialing'].includes(subscription.status)) return false
    
    const userTier = subscription.tier
    
    // If specific tier is required
    if (requiredTier) {
      return userTier === requiredTier
    }
    
    // If minimum tier is specified
    if (minimumTier) {
      const userTierLevel = tierHierarchy[userTier] ?? 0
      const requiredTierLevel = tierHierarchy[minimumTier] ?? 0
      return userTierLevel >= requiredTierLevel
    }
    
    // Default to true if no tier requirements
    return true
  }
  
  if (hasAccess()) {
    return <>{children}</>
  }
  
  // Custom fallback if provided
  if (fallback) {
    return <>{fallback}</>
  }
  
  // Default upgrade prompt
  const displayTier = requiredTier || minimumTier || 'professional'
  const tierName = displayTier.charAt(0).toUpperCase() + displayTier.slice(1)
  
  return (
    <Card className="border-dashed border-2 border-gray-300">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {feature} is a premium feature
        </h3>
        <p className="text-sm text-gray-600 mb-6 max-w-sm">
          This feature is available on the {tierName} plan
          {minimumTier && ' and above'}
        </p>
        <Button onClick={() => router.push('/pricing')}>
          View Plans
        </Button>
      </CardContent>
    </Card>
  )
}

// Utility component for inline feature gating (e.g., buttons, menu items)
interface InlineFeatureGateProps extends FeatureGateProps {
  showLock?: boolean
  disabled?: boolean
}

export function InlineFeatureGate({
  feature,
  requiredTier,
  minimumTier,
  children,
  showLock = true,
  disabled = true
}: InlineFeatureGateProps) {
  const { subscription } = useSubscriptionStore()
  
  const hasAccess = () => {
    if (!subscription) return false
    if (!['active', 'trialing'].includes(subscription.status)) return false
    
    const userTier = subscription.tier
    
    if (requiredTier) {
      return userTier === requiredTier
    }
    
    if (minimumTier) {
      const userTierLevel = tierHierarchy[userTier] ?? 0
      const requiredTierLevel = tierHierarchy[minimumTier] ?? 0
      return userTierLevel >= requiredTierLevel
    }
    
    return true
  }
  
  if (hasAccess()) {
    return <>{children}</>
  }
  
  // Clone and modify children if they are React elements
  if (disabled && typeof children === 'object' && children !== null && 'props' in children) {
    return (
      <div className="relative inline-block">
        {React.cloneElement(children as React.ReactElement, { 
          disabled: true,
          className: `${(children as React.ReactElement).props.className || ''} opacity-50 cursor-not-allowed`
        })}
        {showLock && (
          <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        )}
      </div>
    )
  }
  
  return null
}