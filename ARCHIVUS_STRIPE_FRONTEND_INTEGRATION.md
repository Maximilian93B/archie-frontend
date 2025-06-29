# 💳 Archivus Stripe Frontend Integration Plan

## 📋 Overview

The Archivus frontend will integrate with the backend-driven Stripe implementation. The backend handles all sensitive operations while the frontend provides a clean, Apple-like payment experience.

## 🎯 Integration Architecture

### **Backend-Driven Approach**
- ✅ **Security**: All Stripe operations through backend API
- ✅ **Frontend Role**: Display UI, redirect to Stripe, handle callbacks
- ✅ **No Stripe Libraries**: Frontend doesn't need Stripe.js (except for Elements if needed)
- ✅ **Simple Integration**: Just API calls and redirects

### **Subscription Tiers**

| Tier | Price (CAD) | Documents | Storage | AI Credits | Users |
|------|-------------|-----------|---------|------------|-------|
| **Starter** | $39/month | 1,000 | 5 GB | 100 | 5 |
| **Professional** | $109/month | 10,000 | 50 GB | 1,000 | 25 |
| **Enterprise** | $279/month | Unlimited | Unlimited | Unlimited | Unlimited |

## 🛠️ Frontend Implementation Plan

### **Phase 1: Core Subscription UI** (Week 1)

#### 1.1 Subscription State Management
```typescript
// src/store/subscription-store.ts
interface SubscriptionState {
  status: 'active' | 'inactive' | 'past_due' | 'canceled' | 'trialing'
  tier: 'starter' | 'professional' | 'enterprise' | null
  currentPeriodEnd: Date | null
  trialEndsAt: Date | null
  usage: {
    documents: { used: number; limit: number }
    storage: { used: number; limit: number }
    aiCredits: { used: number; limit: number }
    users: { used: number; limit: number }
  }
  
  fetchStatus: () => Promise<void>
  fetchUsage: () => Promise<void>
}
```

#### 1.2 API Client Extensions
```typescript
// src/lib/api/subscription.ts
class SubscriptionAPI {
  async getStatus() {
    return apiClient.get('/api/v1/subscription/status')
  }
  
  async getPlans() {
    return apiClient.get('/api/v1/subscription/plans')
  }
  
  async getUsage() {
    return apiClient.get('/api/v1/subscription/usage')
  }
  
  async createCheckoutSession(priceId: string) {
    return apiClient.post('/api/v1/subscription/checkout', {
      price_id: priceId,
      success_url: `${window.location.origin}/subscription/success`,
      cancel_url: `${window.location.origin}/pricing`
    })
  }
  
  async createPortalSession() {
    return apiClient.post('/api/v1/subscription/portal', {
      return_url: `${window.location.origin}/settings/billing`
    })
  }
}
```

### **Phase 2: Pricing Page** (Week 1)

#### 2.1 Pricing Page Component
```typescript
// src/app/pricing/page.tsx
- Clean, Apple-style pricing cards
- Three-tier comparison
- Feature matrix
- CTA buttons for each tier
- Responsive design
```

#### 2.2 Pricing Card Design
```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│    Starter      │ │  Professional   │ │   Enterprise    │
│                 │ │  Most Popular   │ │                 │
│    $39/mo       │ │    $109/mo      │ │    $279/mo      │
│                 │ │                 │ │                 │
│ ✓ 1,000 docs    │ │ ✓ 10,000 docs   │ │ ✓ Unlimited     │
│ ✓ 5 GB storage  │ │ ✓ 50 GB storage │ │ ✓ Unlimited     │
│ ✓ 100 AI credits│ │ ✓ 1,000 credits │ │ ✓ Unlimited     │
│ ✓ 5 users       │ │ ✓ 25 users      │ │ ✓ Unlimited     │
│ ✓ Email support │ │ ✓ Priority      │ │ ✓ Dedicated     │
│                 │ │ ✓ API access    │ │ ✓ SSO           │
│                 │ │ ✓ Workflows     │ │ ✓ Custom        │
│                 │ │                 │ │                 │
│ [Get Started]   │ │ [Get Started]   │ │ [Contact Sales] │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### **Phase 3: Checkout Flow** (Week 2)

#### 3.1 Checkout Integration
```typescript
// src/components/subscription/checkout-button.tsx
export function CheckoutButton({ priceId, planName }: Props) {
  const [loading, setLoading] = useState(false)
  
  const handleCheckout = async () => {
    setLoading(true)
    try {
      const { checkout_url } = await subscriptionAPI.createCheckoutSession(priceId)
      window.location.href = checkout_url // Redirect to Stripe
    } catch (error) {
      toast.error('Failed to start checkout')
    }
    setLoading(false)
  }
  
  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading}
      className="w-full"
    >
      {loading ? <Spinner /> : `Subscribe to ${planName}`}
    </Button>
  )
}
```

#### 3.2 Success/Cancel Pages
```typescript
// src/app/subscription/success/page.tsx
- Thank you message
- Next steps guide
- Redirect to dashboard after 3 seconds

// src/app/pricing/page.tsx (with cancel param)
- Show "Payment canceled" toast if cancel param present
- Keep user on pricing page
```

### **Phase 4: Usage Dashboard** (Week 2)

#### 4.1 Usage Display Components
```typescript
// src/components/subscription/usage-card.tsx
interface UsageCardProps {
  title: string
  used: number
  limit: number
  type: 'documents' | 'storage' | 'credits' | 'users'
}

export function UsageCard({ title, used, limit, type }: UsageCardProps) {
  const percentage = limit === -1 ? 0 : (used / limit) * 100
  const isUnlimited = limit === -1
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{formatUsage(used, type)}</span>
            <span className="text-gray-500">
              {isUnlimited ? 'Unlimited' : formatUsage(limit, type)}
            </span>
          </div>
          {!isUnlimited && (
            <Progress value={percentage} className="h-2" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

#### 4.2 Subscription Status Banner
```typescript
// src/components/subscription/status-banner.tsx
- Show trial days remaining
- Show past due warning
- Show usage limit warnings
- Upgrade prompts when near limits
```

### **Phase 5: Billing Management** (Week 3)

#### 5.1 Customer Portal Integration
```typescript
// src/app/settings/billing/page.tsx
export function BillingSettings() {
  const { subscription } = useSubscription()
  
  const openCustomerPortal = async () => {
    const { portal_url } = await subscriptionAPI.createPortalSession()
    window.location.href = portal_url
  }
  
  return (
    <div>
      <h2>Billing & Subscription</h2>
      
      <Card>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <h3>{subscription.tier} Plan</h3>
              <p>Next billing date: {formatDate(subscription.currentPeriodEnd)}</p>
            </div>
            <Button onClick={openCustomerPortal}>
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <UsageOverview />
    </div>
  )
}
```

### **Phase 6: Feature Gating** (Week 3)

#### 6.1 Feature Gate Components
```typescript
// src/components/subscription/feature-gate.tsx
interface FeatureGateProps {
  feature: string
  tier?: 'starter' | 'professional' | 'enterprise'
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function FeatureGate({ feature, tier, children, fallback }: Props) {
  const { subscription } = useSubscription()
  
  const hasAccess = checkFeatureAccess(subscription, feature, tier)
  
  if (!hasAccess) {
    return fallback || <UpgradePrompt feature={feature} />
  }
  
  return <>{children}</>
}
```

#### 6.2 Usage Limit Enforcement
```typescript
// src/hooks/useCheckLimit.ts
export function useCheckLimit(resource: 'documents' | 'storage' | 'aiCredits') {
  const { usage } = useSubscription()
  
  const checkLimit = useCallback(() => {
    const { used, limit } = usage[resource]
    
    if (limit !== -1 && used >= limit) {
      toast.error(`You've reached your ${resource} limit`)
      return false
    }
    
    if (limit !== -1 && used >= limit * 0.9) {
      toast.warning(`You're approaching your ${resource} limit`)
    }
    
    return true
  }, [usage, resource])
  
  return { checkLimit, usage: usage[resource] }
}
```

## 🎨 UI Components

### **Pricing Table Component**
```tsx
// src/components/pricing/pricing-table.tsx
export function PricingTable() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    subscriptionAPI.getPlans()
      .then(setPlans)
      .finally(() => setLoading(false))
  }, [])
  
  if (loading) return <PricingTableSkeleton />
  
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <PricingCard 
          key={plan.id}
          plan={plan}
          highlighted={plan.name === 'Professional'}
        />
      ))}
    </div>
  )
}
```

### **Upgrade Prompt Component**
```tsx
// src/components/subscription/upgrade-prompt.tsx
export function UpgradePrompt({ 
  title = "Upgrade to unlock this feature",
  description,
  requiredTier 
}: Props) {
  return (
    <Card className="text-center p-8">
      <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Button onClick={() => router.push('/pricing')}>
        View Plans
      </Button>
    </Card>
  )
}
```

## 📱 Responsive Considerations

### **Mobile Pricing**
- Stack pricing cards vertically
- Highlight most popular plan
- Sticky CTA buttons
- Collapsible feature lists

### **Mobile Billing**
- Full-screen customer portal
- Touch-friendly buttons
- Clear usage visualization
- Easy upgrade path

## 🔒 Security Considerations

1. **No Client-Side Stripe Keys**: All operations through backend
2. **CSRF Protection**: Include CSRF tokens in requests
3. **Secure Redirects**: Validate success/cancel URLs
4. **Session Validation**: Re-verify subscription status regularly

## 🧪 Testing Strategy

### **Development Testing**
```typescript
// Use Stripe test mode
const TEST_CARDS = {
  success: '4242 4242 4242 4242',
  decline: '4000 0000 0000 0002',
  insufficient: '4000 0000 0000 9995'
}
```

### **E2E Test Scenarios**
1. Complete subscription flow
2. Upgrade/downgrade plans
3. Cancel subscription
4. Handle payment failures
5. Test usage limits

## 📊 Analytics Integration

Track key events:
- Pricing page views
- Plan selection clicks
- Checkout initiated
- Subscription completed
- Churn events

## 🚀 Implementation Timeline

### **Week 1**
- [ ] Set up subscription store
- [ ] Create pricing page
- [ ] Implement checkout flow
- [ ] Add success/cancel pages

### **Week 2**
- [ ] Build usage dashboard
- [ ] Add status indicators
- [ ] Create billing settings
- [ ] Implement customer portal

### **Week 3**
- [ ] Add feature gates
- [ ] Build upgrade prompts
- [ ] Test all flows
- [ ] Add analytics

## 📝 Environment Variables

```typescript
// .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... // Only if using Stripe Elements
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## ✅ Success Criteria

1. **Seamless Checkout**: < 3 clicks to subscribe
2. **Clear Pricing**: Obvious value proposition
3. **Usage Visibility**: Always know current usage
4. **Easy Management**: One-click portal access
5. **Graceful Limits**: Clear messaging when hitting limits

---

**The Stripe integration is designed to be simple, secure, and user-friendly - matching Archivus's clean aesthetic!**