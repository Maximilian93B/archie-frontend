# Stripe CLI Testing Guide

## Installation

1. **Install Stripe CLI**:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows (using scoop)
   scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
   scoop install stripe

   # Linux
   # Download from https://github.com/stripe/stripe-cli/releases
   ```

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

## Testing Webhooks Locally

1. **Forward webhooks to your backend**:
   ```bash
   # Forward to your local backend (adjust port as needed)
   stripe listen --forward-to localhost:8080/api/v1/webhook/stripe
   ```

   This will display your webhook signing secret:
   ```
   Ready! Your webhook signing secret is whsec_xxxxx
   ```

2. **Update your backend's webhook secret** with the one from the CLI output.

## Testing Subscription Flows

### 1. Create a Checkout Session
```bash
# Trigger a checkout session creation
stripe trigger checkout.session.completed
```

### 2. Test Subscription Events
```bash
# Test subscription creation
stripe trigger customer.subscription.created

# Test subscription update
stripe trigger customer.subscription.updated

# Test payment failure
stripe trigger invoice.payment_failed

# Test trial ending
stripe trigger customer.subscription.trial_will_end
```

### 3. Monitor Events
In another terminal, watch all events:
```bash
stripe logs tail
```

## Testing with Frontend

1. **Start your frontend**:
   ```bash
   npm run dev
   ```

2. **Start your backend** with the CLI webhook secret

3. **Forward webhooks**:
   ```bash
   stripe listen --forward-to localhost:8080/api/v1/webhook/stripe
   ```

4. **Create a test subscription**:
   - Go to http://localhost:3000/pricing
   - Click "Get Started" on any plan
   - Use test card: `4242 4242 4242 4242`
   - Complete checkout

5. **Verify webhook events** in the Stripe CLI output

## Useful Commands

### Inspect Recent Events
```bash
# List recent events
stripe events list --limit 10

# Get details of a specific event
stripe events retrieve evt_xxxxx
```

### Test Specific Scenarios

**Successful payment**:
```bash
stripe trigger payment_intent.succeeded
```

**Failed payment (for testing retry logic)**:
```bash
stripe trigger payment_intent.payment_failed
```

**Customer portal access**:
```bash
# Create a test portal session
stripe billing_portal sessions create \
  --customer cus_xxxxx \
  --return-url http://localhost:3000/dashboard/billing
```

### Create Test Data

**Create a test customer**:
```bash
stripe customers create \
  --email test@example.com \
  --name "Test User"
```

**Create a test subscription**:
```bash
stripe subscriptions create \
  --customer cus_xxxxx \
  --items[0][price]=price_xxxxx
```

## Testing Checklist

- [ ] Checkout flow completes successfully
- [ ] Webhook creates/updates subscription in database
- [ ] Customer portal opens correctly
- [ ] Usage limits update after subscription
- [ ] Feature gates unlock after upgrade
- [ ] Trial period shows correct countdown
- [ ] Payment failure shows warning
- [ ] Subscription cancellation handled
- [ ] Reactivation works properly
- [ ] Plan changes process correctly

## Common Issues

1. **Webhook signature verification fails**
   - Make sure you're using the CLI's webhook secret
   - Check that the backend is using the correct secret

2. **Checkout doesn't redirect back**
   - Verify success_url and cancel_url are correct
   - Check that your frontend URL is in Stripe's allowed redirects

3. **Portal session fails**
   - Ensure customer has a valid Stripe customer ID
   - Check portal configuration in Stripe Dashboard

## Environment Variables

For local testing with Stripe CLI:
```bash
# Backend (.env)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # From stripe listen command
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Frontend (.env.local)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Next Steps

1. Test the complete flow with `stripe listen`
2. Verify webhooks update your database
3. Test edge cases (failed payments, cancellations)
4. Monitor the Stripe Dashboard for test events
5. Use `stripe logs tail` to debug any issues