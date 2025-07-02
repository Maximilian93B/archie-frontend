# Stripe Integration Test Checklist

## Prerequisites
- [ ] Stripe CLI installed in WSL (`./scripts/setup-stripe-cli-wsl.sh`)
- [ ] Backend running with test Stripe keys
- [ ] Frontend running (`npm run dev`)
- [ ] Stripe webhook forwarding active (`stripe listen --forward-to localhost:8080/api/v1/webhook/stripe`)

## Test Scenarios

### 1. New User Trial Flow
- [ ] Register new user at `/auth/register`
- [ ] Verify trial status shows in dashboard
- [ ] Check trial countdown in subscription status
- [ ] Verify usage limits match trial tier

### 2. Checkout Flow
- [ ] Navigate to `/pricing`
- [ ] Click "Get Started" on Professional plan
- [ ] Fill checkout with test card `4242 4242 4242 4242`
- [ ] Complete checkout
- [ ] Verify redirect to `/subscription/success`
- [ ] Check subscription status updated in dashboard
- [ ] Verify webhook events in Stripe CLI output

### 3. Usage Tracking
- [ ] Upload documents to test document counter
- [ ] Verify usage overview updates correctly
- [ ] Test approaching limit warnings (80%)
- [ ] Test limit reached blocking (100%)

### 4. Feature Gating
- [ ] Test locked features show upgrade prompt
- [ ] Verify features unlock after subscription
- [ ] Test inline feature gates on buttons
- [ ] Verify tier-specific features work correctly

### 5. Customer Portal
- [ ] Click "Manage Billing" in `/dashboard/billing`
- [ ] Verify portal opens with correct customer
- [ ] Test updating payment method
- [ ] Test downloading invoices
- [ ] Test subscription cancellation

### 6. Webhook Events
Monitor these events in Stripe CLI:
- [ ] `checkout.session.completed`
- [ ] `customer.subscription.created`
- [ ] `customer.subscription.updated`
- [ ] `invoice.payment_succeeded`
- [ ] `customer.subscription.deleted` (on cancel)

### 7. Edge Cases
- [ ] Test with authentication required card: `4000 0025 0000 3155`
- [ ] Test with declined card: `4000 0000 0000 0002`
- [ ] Test subscription upgrade (Starter → Professional)
- [ ] Test subscription downgrade (Professional → Starter)
- [ ] Test reactivating cancelled subscription

### 8. UI/UX Verification
- [ ] Subscription status shows correctly in sidebar
- [ ] Usage warnings appear in header when approaching limits
- [ ] Billing page loads all components properly
- [ ] Mobile responsive layout works
- [ ] Loading states show during API calls
- [ ] Error states handle gracefully

## Common Test Commands

```bash
# Watch webhook events
stripe listen --forward-to localhost:8080/api/v1/webhook/stripe

# Trigger specific events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_failed

# View recent events
stripe events list --limit 5

# Test with specific price ID
curl -X POST http://localhost:8080/api/v1/subscription/checkout \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price_id": "price_1234567890",
    "success_url": "http://localhost:3000/subscription/success",
    "cancel_url": "http://localhost:3000/pricing"
  }'
```

## Expected Behaviors

### Successful Subscription Creation
1. Checkout completed → Redirect to success page
2. Webhook received → Database updated
3. User refresh → New subscription status shown
4. Feature gates → Premium features unlocked
5. Usage limits → Updated to new tier limits

### Failed Payment
1. Payment fails → User stays on checkout
2. Subscription status → Remains unchanged
3. Error message → Shown to user
4. Retry option → Available in checkout

### Subscription Cancellation
1. Cancel in portal → Subscription marked as ending
2. Status shows → "Expires on [date]"
3. End of period → Features locked again
4. Reactivation → Available before expiry

## Debugging Tips

1. **Check webhook secret**: Must match between CLI and backend
2. **Verify API endpoints**: Ensure backend routes are correct
3. **Monitor network tab**: Check API responses in browser
4. **Check console logs**: Both frontend and backend
5. **Stripe Dashboard**: View test mode events and logs

## Test Data Cleanup

After testing, clean up test data:
```bash
# List test customers
stripe customers list --limit 10

# Delete test customer (optional)
stripe customers delete cus_xxxxx
```