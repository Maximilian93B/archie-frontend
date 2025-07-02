# Stripe Integration Guide for Archivus Frontend

## Overview

This guide explains how to integrate Stripe subscription features in the Archivus frontend. The implementation follows a backend-driven approach where all Stripe operations are handled by the backend API.

## Key Components

### 1. Billing Page (`/dashboard/billing`)
- Displays current subscription status
- Shows usage overview with visual progress bars
- Provides quick access to Stripe Customer Portal
- Located at: `/src/app/dashboard/billing/page.tsx`

### 2. Usage Overview Component
- Visual representation of resource usage (documents, storage, AI credits, users)
- Color-coded warnings when approaching limits
- Located at: `/src/components/subscription/usage-overview.tsx`

### 3. Subscription Status Component
- Shows trial countdown, payment issues, or active status
- Provides contextual CTAs (upgrade, manage, reactivate)
- Located at: `/src/components/subscription/subscription-status.tsx`

### 4. Feature Gate Component
- Restricts access to premium features based on subscription tier
- Shows upgrade prompts for locked features
- Located at: `/src/components/subscription/feature-gate.tsx`

### 5. Usage Limit Alerts
- Displays warnings when approaching resource limits
- Blocks actions when limits are reached
- Located at: `/src/components/subscription/usage-limit-alert.tsx`

## Integration Examples

### Basic Feature Gating

```tsx
import { FeatureGate } from '@/components/subscription/feature-gate'

// Gate entire features
<FeatureGate feature="Workflow Automation" minimumTier="professional">
  <WorkflowBuilder />
</FeatureGate>

// Gate individual buttons
<InlineFeatureGate feature="Export Analytics" minimumTier="starter">
  <Button>Export Report</Button>
</InlineFeatureGate>
```

### Usage Checks Before Actions

```tsx
import { useSubscription } from '@/hooks/use-subscription'

function UploadButton() {
  const { hasReachedLimit, getRemainingCredits } = useSubscription()
  
  const handleUpload = () => {
    if (hasReachedLimit('documents')) {
      toast.error('Document limit reached. Please upgrade.')
      return
    }
    // Proceed with upload
  }
  
  return (
    <Button onClick={handleUpload}>
      Upload ({getRemainingCredits('documents')} remaining)
    </Button>
  )
}
```

### Dashboard Integration

```tsx
import { useSubscription } from '@/hooks/use-subscription'
import { SubscriptionStatus } from '@/components/subscription/subscription-status'
import { UsageOverview } from '@/components/subscription/usage-overview'

function Dashboard() {
  const { subscription, usage, isLoading } = useSubscription()
  
  return (
    <>
      {subscription && <SubscriptionStatus subscription={subscription} />}
      <UsageOverview usage={usage} loading={isLoading} />
    </>
  )
}
```

## Environment Variables

Add these to your `.env.local` file:

```bash
# Stripe Price IDs (get from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY=price_xxx
NEXT_PUBLIC_STRIPE_PRICE_STARTER_YEARLY=price_xxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_xxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_YEARLY=price_xxx
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY=price_xxx
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_YEARLY=price_xxx
```

## Subscription Tiers

| Tier | Features | Limits |
|------|----------|--------|
| **Starter** | Basic features | 1,000 docs, 5GB storage, 100 AI credits |
| **Professional** | Advanced features | 10,000 docs, 50GB storage, 1,000 AI credits |
| **Enterprise** | All features | Unlimited everything |

## API Endpoints Used

- `GET /api/v1/subscription/status` - Get current subscription
- `GET /api/v1/subscription/usage` - Get usage statistics
- `GET /api/v1/subscription/plans` - Get available plans
- `POST /api/v1/subscription/checkout` - Create Stripe checkout session
- `POST /api/v1/subscription/portal` - Create customer portal session

## Testing

1. **Test Trial Period**: Create new account to test trial countdown
2. **Test Limits**: Upload documents to approach limits
3. **Test Feature Gates**: Try accessing premium features
4. **Test Payment**: Use Stripe test cards for checkout

## Common Patterns

### 1. Check Before Action
Always check limits before allowing resource-consuming actions:

```tsx
if (hasReachedLimit('aiCredits')) {
  showUpgradePrompt()
  return
}
```

### 2. Show Remaining Resources
Display remaining resources to users:

```tsx
<span>{getRemainingCredits('documents')} documents remaining</span>
```

### 3. Progressive Disclosure
Show upgrade prompts contextually:

```tsx
<FeatureGate 
  feature="Advanced Analytics" 
  minimumTier="professional"
  fallback={<UpgradePrompt feature="analytics" />}
>
  <AnalyticsDashboard />
</FeatureGate>
```

## Troubleshooting

1. **Subscription not loading**: Check if user is authenticated
2. **Feature gates not working**: Verify subscription status is 'active' or 'trialing'
3. **Usage not updating**: Usage is cached for 5 minutes, use `refetch()` to force update
4. **Portal not opening**: Ensure valid Stripe customer ID exists

## Next Steps

1. Configure actual Stripe price IDs in environment variables
2. Test the checkout flow with Stripe test mode
3. Implement webhook handling for subscription events
4. Add more granular feature gates as needed
5. Customize upgrade prompts for better conversion