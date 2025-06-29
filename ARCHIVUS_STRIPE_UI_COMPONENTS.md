# 💳 Archivus Stripe UI Components Guide

## 📋 Overview

Ready-to-implement React components for Stripe integration following Archivus's Apple-like design system. All components use the established design tokens and patterns.

## 🎨 Pricing Components

### **1. Pricing Card Component**

```tsx
// src/components/pricing/pricing-card.tsx
import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  plan: {
    id: string
    name: string
    price: number
    currency: string
    interval: string
    features: string[]
    limits: {
      documents: number
      storage: number
      aiCredits: number
      users: number
    }
    priceId: string
  }
  highlighted?: boolean
  currentPlan?: boolean
}

export function PricingCard({ plan, highlighted, currentPlan }: PricingCardProps) {
  const formatLimit = (value: number, type: string) => {
    if (value === -1) return 'Unlimited'
    if (type === 'storage') return `${value / (1024 ** 3)} GB`
    return value.toLocaleString()
  }

  return (
    <Card 
      className={cn(
        'relative transition-all',
        highlighted && 'border-black shadow-lg scale-105',
        'hover:shadow-md'
      )}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-black text-white">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-8 pt-6">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold">${plan.price}</span>
          <span className="text-gray-600">/{plan.interval}</span>
        </div>
        {plan.currency !== 'usd' && (
          <p className="text-sm text-gray-500 mt-1">{plan.currency.toUpperCase()}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Limits */}
        <div className="space-y-3 pb-6 border-b">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Documents</span>
            <span className="font-medium">{formatLimit(plan.limits.documents, 'documents')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Storage</span>
            <span className="font-medium">{formatLimit(plan.limits.storage, 'storage')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">AI Credits</span>
            <span className="font-medium">{formatLimit(plan.limits.aiCredits, 'credits')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Team Members</span>
            <span className="font-medium">{formatLimit(plan.limits.users, 'users')}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          {currentPlan ? (
            <Button variant="secondary" className="w-full" disabled>
              Current Plan
            </Button>
          ) : (
            <Button 
              variant={highlighted ? 'primary' : 'secondary'} 
              className="w-full"
              asChild
            >
              <a href={`/api/v1/subscription/checkout?price_id=${plan.priceId}`}>
                Get Started
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

### **2. Pricing Page Layout**

```tsx
// src/app/pricing/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { PricingCard } from '@/components/pricing/pricing-card'
import { Skeleton } from '@/components/ui/skeleton'
import { subscriptionAPI } from '@/lib/api/subscription'

export default function PricingPage() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPlan, setCurrentPlan] = useState(null)

  useEffect(() => {
    Promise.all([
      subscriptionAPI.getPlans(),
      subscriptionAPI.getStatus()
    ]).then(([plansData, statusData]) => {
      setPlans(plansData.plans)
      setCurrentPlan(statusData.subscription?.tier)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-600">
          Choose the perfect plan for your document management needs
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[600px] rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                highlighted={plan.name === 'Professional'}
                currentPlan={currentPlan === plan.name.toLowerCase()}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Frequently asked questions
          </h2>
          <FAQ />
        </div>
      </div>
    </div>
  )
}
```

## 📊 Usage & Billing Components

### **3. Usage Overview Component**

```tsx
// src/components/subscription/usage-overview.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FileText, HardDrive, Sparkles, Users } from 'lucide-react'

interface UsageData {
  documents: { used: number; limit: number }
  storage: { used: number; limit: number }
  aiCredits: { used: number; limit: number }
  users: { used: number; limit: number }
}

export function UsageOverview({ usage }: { usage: UsageData }) {
  const items = [
    {
      name: 'Documents',
      icon: FileText,
      data: usage.documents,
      format: (val: number) => val.toLocaleString()
    },
    {
      name: 'Storage',
      icon: HardDrive,
      data: usage.storage,
      format: (val: number) => `${(val / (1024 ** 3)).toFixed(1)} GB`
    },
    {
      name: 'AI Credits',
      icon: Sparkles,
      data: usage.aiCredits,
      format: (val: number) => val.toLocaleString()
    },
    {
      name: 'Team Members',
      icon: Users,
      data: usage.users,
      format: (val: number) => val.toString()
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const percentage = item.data.limit === -1 
          ? 0 
          : (item.data.used / item.data.limit) * 100
        const isUnlimited = item.data.limit === -1
        const isNearLimit = percentage > 80

        return (
          <Card key={item.name} className={isNearLimit ? 'border-amber-500' : ''}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>{item.name}</span>
                <item.icon className="w-4 h-4 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-semibold">
                    {item.format(item.data.used)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {isUnlimited ? '∞' : `of ${item.format(item.data.limit)}`}
                  </span>
                </div>
                {!isUnlimited && (
                  <>
                    <Progress 
                      value={percentage} 
                      className={cn(
                        'h-2',
                        isNearLimit && 'bg-amber-100'
                      )}
                    />
                    {isNearLimit && (
                      <p className="text-xs text-amber-600 mt-1">
                        {Math.round(100 - percentage)}% remaining
                      </p>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
```

### **4. Subscription Status Component**

```tsx
// src/components/subscription/subscription-status.tsx
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'

interface SubscriptionStatusProps {
  subscription: {
    status: string
    tier: string
    currentPeriodEnd: string
    trialEndsAt?: string
    cancelAtPeriodEnd: boolean
  }
}

export function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
  const getStatusConfig = () => {
    switch (subscription.status) {
      case 'trialing':
        return {
          icon: Clock,
          variant: 'default' as const,
          title: 'Trial Period',
          description: `Your trial ends ${formatDistanceToNow(new Date(subscription.trialEndsAt!), { addSuffix: true })}`
        }
      case 'active':
        return {
          icon: CheckCircle,
          variant: 'default' as const,
          title: subscription.cancelAtPeriodEnd ? 'Subscription Ending' : 'Active Subscription',
          description: subscription.cancelAtPeriodEnd 
            ? `Your ${subscription.tier} plan will end ${formatDistanceToNow(new Date(subscription.currentPeriodEnd), { addSuffix: true })}`
            : `Your ${subscription.tier} plan renews ${formatDistanceToNow(new Date(subscription.currentPeriodEnd), { addSuffix: true })}`
        }
      case 'past_due':
        return {
          icon: AlertCircle,
          variant: 'destructive' as const,
          title: 'Payment Failed',
          description: 'Please update your payment method to continue using Archivus'
        }
      case 'canceled':
        return {
          icon: XCircle,
          variant: 'destructive' as const,
          title: 'Subscription Canceled',
          description: 'Your subscription has ended. Upgrade to continue using Archivus'
        }
      default:
        return null
    }
  }

  const config = getStatusConfig()
  if (!config) return null

  return (
    <Alert variant={config.variant}>
      <config.icon className="h-4 w-4" />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription className="mt-2 flex items-center justify-between">
        <span>{config.description}</span>
        {(subscription.status === 'past_due' || subscription.status === 'canceled') && (
          <Button size="sm" variant="outline" asChild>
            <a href="/settings/billing">Manage Billing</a>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
```

### **5. Billing Settings Component**

```tsx
// src/components/settings/billing-settings.tsx
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, ExternalLink, CreditCard } from 'lucide-react'
import { subscriptionAPI } from '@/lib/api/subscription'
import { formatDate } from '@/lib/utils'

export function BillingSettings({ subscription }) {
  const [loading, setLoading] = useState(false)

  const openCustomerPortal = async () => {
    setLoading(true)
    try {
      const { portal_url } = await subscriptionAPI.createPortalSession()
      window.location.href = portal_url
    } catch (error) {
      toast.error('Failed to open billing portal')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">
                  {subscription.tier} Plan
                </h3>
                <Badge variant={subscription.status === 'active' ? 'success' : 'warning'}>
                  {subscription.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {subscription.status === 'active' 
                  ? `Renews on ${formatDate(subscription.currentPeriodEnd)}`
                  : `Expires on ${formatDate(subscription.currentPeriodEnd)}`
                }
              </p>
            </div>
            
            <Button 
              onClick={openCustomerPortal}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Billing
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">View Invoices</p>
                <p className="text-sm text-gray-600">Download past invoices</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Method</p>
                <p className="text-sm text-gray-600">Update card details</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Billing Address</p>
                <p className="text-sm text-gray-600">Update billing info</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

## 🚧 Limit & Upgrade Components

### **6. Feature Gate Component**

```tsx
// src/components/subscription/feature-gate.tsx
import { Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface FeatureGateProps {
  feature: string
  requiredTier?: 'starter' | 'professional' | 'enterprise'
  children: React.ReactNode
}

export function FeatureGate({ feature, requiredTier, children }: FeatureGateProps) {
  const router = useRouter()
  const { subscription } = useSubscription()
  
  const hasAccess = checkFeatureAccess(subscription, feature, requiredTier)
  
  if (!hasAccess) {
    return (
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Upgrade to unlock {feature}
          </h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm">
            This feature is available on the {requiredTier || 'Professional'} plan and above
          </p>
          <Button onClick={() => router.push('/pricing')}>
            View Plans
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  return <>{children}</>
}
```

### **7. Usage Limit Alert**

```tsx
// src/components/subscription/usage-limit-alert.tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UsageLimitAlertProps {
  resource: string
  used: number
  limit: number
  onUpgrade: () => void
}

export function UsageLimitAlert({ resource, used, limit, onUpgrade }: UsageLimitAlertProps) {
  const percentage = (used / limit) * 100
  
  if (percentage < 80) return null
  
  const isExceeded = used >= limit
  
  return (
    <Alert variant={isExceeded ? 'destructive' : 'warning'}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>
        {isExceeded ? `${resource} limit reached` : `Approaching ${resource} limit`}
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">
          You've used {used.toLocaleString()} of {limit.toLocaleString()} {resource.toLowerCase()}.
          {!isExceeded && ` Only ${(limit - used).toLocaleString()} remaining.`}
        </p>
        <Button size="sm" variant="outline" onClick={onUpgrade}>
          Upgrade Plan
        </Button>
      </AlertDescription>
    </Alert>
  )
}
```

## 🎯 Checkout Flow Components

### **8. Checkout Success Page**

```tsx
// src/app/subscription/success/page.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Refresh subscription status
    subscriptionStore.fetchStatus()
    
    // Redirect after delay
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-semibold mb-2">
            Welcome to Archivus!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your subscription is now active. You'll be redirected to your dashboard in a few seconds.
          </p>
          
          <div className="space-y-3">
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => router.push('/docs/getting-started')}
              className="w-full"
            >
              View Getting Started Guide
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            You'll receive a confirmation email shortly
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 🛠️ Utility Hooks

### **9. Subscription Hook**

```tsx
// src/hooks/useSubscription.ts
import { useSubscriptionStore } from '@/store/subscription-store'
import { useEffect } from 'react'

export function useSubscription() {
  const store = useSubscriptionStore()
  
  useEffect(() => {
    // Fetch status on mount
    if (!store.lastFetched || Date.now() - store.lastFetched > 5 * 60 * 1000) {
      store.fetchStatus()
      store.fetchUsage()
    }
  }, [])
  
  return {
    subscription: store,
    isLoading: store.isLoading,
    refetch: () => {
      store.fetchStatus()
      store.fetchUsage()
    }
  }
}
```

---

**These components provide a complete UI kit for Stripe integration that matches Archivus's clean, Apple-like design aesthetic!**