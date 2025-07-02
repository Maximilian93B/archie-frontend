# Stripe V2 Migration Guide

## Overview

This guide helps you migrate from the old subscription system to the new Stripe-native implementation that leverages Stripe Entitlements and Billing Meters.

## Key Changes

### 1. API Endpoints
- **Removed**: `/api/v1/subscription/plans`, `/api/v1/subscription/usage`, `/api/v1/subscription/invoices`
- **Added**: `/api/v1/subscription/quota`, `/api/v1/subscription/usage` (for reporting)
- **Updated**: `/api/v1/subscription/status` now returns simplified Stripe data

### 2. Data Flow
- **Before**: Backend stored subscription state, calculated quotas locally
- **After**: Stripe is the single source of truth, quotas checked via Entitlements API

### 3. Components
All subscription components have V2 versions that work with the new system:
- `subscription-store-v2.ts` - New Zustand store
- `use-subscription-v2.ts` - New React hook
- `feature-gate-v2.tsx` - New feature gating component
- `document-uploader-v2.tsx` - Upload with quota enforcement
- `page-v2.tsx` files - Updated pages

## Migration Steps

### Step 1: Update Imports

Replace old imports with V2 versions:

```typescript
// Old
import { useSubscription } from '@/hooks/use-subscription'
import { FeatureGate } from '@/components/subscription/feature-gate'
import { subscriptionAPI } from '@/lib/api/subscription'

// New
import { useSubscriptionV2 } from '@/hooks/use-subscription-v2'
import { FeatureGate, QuotaGate } from '@/components/subscription/feature-gate-v2'
import { subscriptionAPI } from '@/lib/api/subscription' // Updated internally
```

### Step 2: Update Component Usage

#### Feature Gating
```typescript
// Old
<FeatureGate feature="Workflow Automation" minimumTier="professional">
  <WorkflowBuilder />
</FeatureGate>

// New - uses Stripe feature names
<FeatureGate feature="custom_workflows">
  <WorkflowBuilder />
</FeatureGate>
```

#### Document Upload
```typescript
// Old
import { DocumentUploader } from '@/components/documents/upload/document-uploader'

// New - includes quota checking
import { DocumentUploaderV2 } from '@/components/documents/upload/document-uploader-v2'
```

#### Usage Checking
```typescript
// Old
const { subscription, usage } = useSubscription()
if (usage.documents.used >= usage.documents.limit) {
  // Show error
}

// New
const { checkQuota } = useSubscriptionV2()
const canUpload = await checkQuota('documents')
if (!canUpload) {
  // Automatically shows toast error
}
```

### Step 3: Update Pages

Replace page components with V2 versions:

```typescript
// In app/pricing/page.tsx
export { default } from './page-v2'

// In app/dashboard/billing/page.tsx
export { default } from './page-v2'
```

### Step 4: Environment Variables

Remove old Stripe price ID environment variables:
```bash
# Remove these
NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY=xxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_MONTHLY=xxx
# etc...
```

The new system uses lookup keys configured in Stripe Dashboard.

### Step 5: Update API Calls

#### Checking Quotas
```typescript
// Old
const { usage } = await subscriptionAPI.getUsage()
if (usage.documents.used < usage.documents.limit) {
  // Can upload
}

// New
const quota = await subscriptionAPI.checkQuota('documents')
if (quota.allowed) {
  // Can upload
}
```

#### Reporting Usage
```typescript
// Old - manual tracking in database
// No explicit usage reporting

// New - report to Stripe Billing Meters
await subscriptionAPI.reportUsage({
  metric: 'documents',
  value: 1
})
```

## Testing Checklist

- [ ] **Subscription Status**: Verify `/dashboard/billing` shows correct plan
- [ ] **Quota Enforcement**: Try uploading when at document limit
- [ ] **Feature Gates**: Verify premium features are locked/unlocked correctly
- [ ] **Checkout Flow**: Test subscription purchase with test card `4242424242424242`
- [ ] **Portal Access**: Test "Manage Billing" opens Stripe portal
- [ ] **Usage Display**: Verify usage meters show correct values
- [ ] **Error Handling**: Test quota exceeded scenarios
- [ ] **Mobile**: Test all features on mobile devices

## Rollback Plan

If you need to rollback:

1. Revert component imports to non-V2 versions
2. Restore old environment variables
3. Switch backend to old endpoints
4. Clear browser localStorage to reset cached data

## Common Issues

### "No subscription found"
- Ensure customer exists in Stripe
- Check if webhook created the subscription record

### Quota always shows 0
- Verify Stripe Entitlements are configured
- Check feature names match exactly

### Usage not updating
- Confirm Billing Meters are active in Stripe
- Check usage reporting calls are successful

## Feature Mapping

| Old Feature Name | New Stripe Feature ID |
|-----------------|---------------------|
| Multi-document analysis | advanced_search |
| Workflow automation | custom_workflows |
| API access | api_access |
| Priority support | premium_support |
| SSO/SAML | sso |
| Custom integrations | custom_integrations |

## Performance Notes

- Quota checks are cached for 1 minute
- Subscription status cached for 5 minutes
- Use `refreshStatus()` to force refresh
- Background usage reporting won't block operations

## Support

For issues:
1. Check browser console for errors
2. Verify Stripe Dashboard configuration
3. Use Stripe CLI to monitor webhooks
4. Check backend logs for API errors