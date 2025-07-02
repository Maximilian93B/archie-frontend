# 🧪 Stripe Integration Testing Guide

## Overview
This guide helps verify that the frontend Stripe integration correctly communicates with the backend API.

## Prerequisites
- Backend API running with Stripe configured
- Stripe test mode enabled
- Test API keys configured

## Test Scenarios

### 1. Subscription Status Check
```typescript
// Test in browser console
const response = await fetch('/api/v1/subscription/status', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'X-Tenant-ID': tenantId
  }
})
const data = await response.json()

// Expected response structure:
{
  subscription: {
    id: "uuid",
    tenant_id: "uuid",
    stripe_customer_id: "cus_xxx",
    stripe_subscription_id: "sub_xxx",
    stripe_price_id: "price_xxx",
    stripe_product_id: "prod_xxx",
    status: "active" | "trialing",
    tier: "starter" | "professional" | "enterprise",
    plan_name: "Professional Monthly",
    amount: 10900, // cents
    currency: "cad",
    interval: "month",
    interval_count: 1,
    current_period_start: "2024-01-01T00:00:00Z",
    current_period_end: "2024-02-01T00:00:00Z",
    trial_start: null,
    trial_end: "2024-01-08T00:00:00Z", // 7-day trial
    documents_included: 10000,
    documents_used: 0,
    storage_included: 53687091200,
    storage_used: 0,
    ai_credits_included: 1000,
    ai_credits_used: 0,
    users_included: 25,
    features: {}
  },
  tenant: {
    id: "uuid",
    name: "Test Company",
    subscription_tier: "professional",
    trial_ends_at: "2024-01-08T00:00:00Z"
  }
}
```

### 2. Available Plans
```typescript
// Test endpoint
GET /api/v1/subscription/plans

// Expected response:
{
  plans: [
    {
      id: "starter",
      name: "starter",
      display_name: "Starter",
      price: 3900,
      currency: "cad",
      interval: "month",
      stripe_product_id: "prod_xxx",
      stripe_price_id: "price_xxx",
      limits: {
        documents: 1000,
        storage: 5368709120,
        ai_credits: 100,
        users: 5
      },
      features: [...]
    },
    // ... other plans
  ]
}
```

### 3. Checkout Session Creation
```typescript
// Test request
POST /api/v1/subscription/checkout
{
  price_id: "price_professional_monthly",
  success_url: "http://localhost:3000/subscription/success",
  cancel_url: "http://localhost:3000/pricing?canceled=true",
  promo_code: "TESTCODE" // Optional
}

// Expected response:
{
  session_id: "cs_test_xxx",
  checkout_url: "https://checkout.stripe.com/c/pay/cs_test_xxx"
}
```

### 4. Customer Portal
```typescript
// Test request
POST /api/v1/subscription/portal
{
  return_url: "http://localhost:3000/dashboard/billing"
}

// Expected response:
{
  portal_url: "https://billing.stripe.com/p/session/test_xxx"
}
```

### 5. Usage Tracking
```typescript
// Test endpoint
GET /api/v1/subscription/usage

// Expected response:
{
  usage: {
    documents: { used: 150, limit: 10000, percentage: 1.5 },
    storage: { used: 1073741824, limit: 53687091200, percentage: 2 },
    ai_credits: { used: 25, limit: 1000, percentage: 2.5 },
    users: { used: 3, limit: 25, percentage: 12 }
  },
  records: [
    {
      id: "uuid",
      metric_type: "documents",
      quantity: 150,
      unit: "count",
      period_start: "2024-01-01T00:00:00Z",
      period_end: "2024-02-01T00:00:00Z"
    }
  ]
}
```

## Test Cards

Use these Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Insufficient Funds**: 4000 0000 0000 9995
- **3D Secure**: 4000 0025 0000 3155

## Webhook Testing

### Expected Webhook Events
1. `customer.subscription.created` - New subscription
2. `customer.subscription.updated` - Plan changes
3. `customer.subscription.deleted` - Cancellation
4. `invoice.payment_succeeded` - Successful payment
5. `invoice.payment_failed` - Failed payment

### Webhook Payload Structure
```json
{
  "id": "evt_xxx",
  "object": "event",
  "type": "customer.subscription.updated",
  "data": {
    "object": {
      "id": "sub_xxx",
      "customer": "cus_xxx",
      "status": "active",
      "items": {
        "data": [{
          "price": {
            "id": "price_xxx",
            "product": "prod_xxx"
          }
        }]
      }
    }
  }
}
```

## Testing Promo Codes

### Valid Bypass Code Test
```typescript
// Apply promo code for free access
POST /api/v1/subscription/promo
{
  promo_code: "ARCHIVUS_TEAM" // Or configured bypass code
}

// Expected: Subscription activated without payment
```

## Error Scenarios to Test

1. **No Subscription**
   - New user without subscription
   - Expected: 404 or empty response

2. **Expired Trial**
   - User with expired trial
   - Expected: status = "canceled" or "incomplete"

3. **Payment Failed**
   - Card declined during checkout
   - Expected: Redirect back with error

4. **Past Due**
   - Failed renewal payment
   - Expected: status = "past_due"

## Frontend State Verification

```typescript
// Check Zustand store state
import { useSubscriptionStore } from '@/store/subscription-store'

const store = useSubscriptionStore.getState()
console.log({
  subscription: store.subscription,
  tier: store.getTier(),
  isActive: store.isActive(),
  canUseDocuments: store.canUse('documents'),
  hasWorkflows: store.checkFeature('workflows')
})
```

## Common Issues

1. **Date Format Mismatch**
   - Backend: ISO 8601 strings
   - Frontend: Convert to Date objects

2. **Amount Units**
   - Backend: Cents (10900 = $109.00)
   - Frontend: Display as dollars

3. **Unlimited Values**
   - Backend: -1 for unlimited
   - Frontend: Check for -1 and display "Unlimited"

4. **Tenant Headers**
   - Always include X-Tenant-ID header
   - Get from auth context

## Integration Checklist

- [ ] Status endpoint returns correct structure
- [ ] Plans endpoint lists all tiers
- [ ] Checkout creates Stripe session
- [ ] Portal creates billing session
- [ ] Usage tracks correctly
- [ ] Webhooks update subscription
- [ ] Promo codes apply correctly
- [ ] Error states handled gracefully
- [ ] Trial period enforced (7 days)
- [ ] No free tier access