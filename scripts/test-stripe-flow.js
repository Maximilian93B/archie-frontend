/**
 * Test script for Stripe integration
 * Run with: node scripts/test-stripe-flow.js
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// Test credentials
const TEST_USER = {
  email: 'stripe-test@example.com',
  password: 'TestPassword123!',
  firstName: 'Stripe',
  lastName: 'Tester'
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function testStripeFlow() {
  console.log('🚀 Starting Stripe Integration Test...\n')

  try {
    // 1. Register a test user
    console.log('1️⃣ Registering test user...')
    const registerRes = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_USER.email,
        password: TEST_USER.password,
        first_name: TEST_USER.firstName,
        last_name: TEST_USER.lastName,
        registration_type: 'individual'
      })
    })

    let accessToken
    if (registerRes.ok) {
      const data = await registerRes.json()
      accessToken = data.access_token
      console.log('✅ User registered successfully')
    } else {
      // User might already exist, try login
      console.log('User might exist, trying login...')
      const loginRes = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: TEST_USER.email,
          password: TEST_USER.password
        })
      })
      
      if (loginRes.ok) {
        const data = await loginRes.json()
        accessToken = data.access_token
        console.log('✅ Logged in successfully')
      } else {
        throw new Error('Failed to register or login')
      }
    }

    // 2. Check subscription status
    console.log('\n2️⃣ Checking subscription status...')
    const statusRes = await fetch(`${API_URL}/api/v1/subscription/status`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    
    const statusData = await statusRes.json()
    console.log('Current subscription:', statusData.subscription ? statusData.subscription.tier : 'None')
    console.log('Is trialing:', statusData.isTrialing)
    
    // 3. Get available plans
    console.log('\n3️⃣ Fetching available plans...')
    const plansRes = await fetch(`${API_URL}/api/v1/subscription/plans`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    
    const plansData = await plansRes.json()
    console.log('Available plans:')
    plansData.plans.forEach(plan => {
      console.log(`  - ${plan.name}: $${plan.price}/${plan.interval}`)
    })
    
    // 4. Check usage
    console.log('\n4️⃣ Checking usage limits...')
    const usageRes = await fetch(`${API_URL}/api/v1/subscription/usage`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    
    const usageData = await usageRes.json()
    console.log('Current usage:')
    console.log(`  - Documents: ${usageData.usage.documents.used}/${usageData.usage.documents.limit}`)
    console.log(`  - Storage: ${(usageData.usage.storage.used / (1024**3)).toFixed(2)}GB/${(usageData.usage.storage.limit / (1024**3)).toFixed(0)}GB`)
    console.log(`  - AI Credits: ${usageData.usage.aiCredits.used}/${usageData.usage.aiCredits.limit}`)
    
    // 5. Create checkout session
    console.log('\n5️⃣ Creating checkout session...')
    const checkoutRes = await fetch(`${API_URL}/api/v1/subscription/checkout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_id: 'price_professional_monthly', // This should be your actual price ID
        success_url: 'http://localhost:3000/subscription/success',
        cancel_url: 'http://localhost:3000/pricing'
      })
    })
    
    if (checkoutRes.ok) {
      const checkoutData = await checkoutRes.json()
      console.log('✅ Checkout session created!')
      console.log('Checkout URL:', checkoutData.url)
      console.log('\n📋 Next steps:')
      console.log('1. Open the checkout URL in your browser')
      console.log('2. Use test card: 4242 4242 4242 4242')
      console.log('3. Complete the checkout')
      console.log('4. Watch the Stripe CLI for webhook events')
    } else {
      console.log('❌ Failed to create checkout session:', await checkoutRes.text())
    }
    
    // 6. Test portal session
    console.log('\n6️⃣ Testing customer portal...')
    const portalRes = await fetch(`${API_URL}/api/v1/subscription/portal`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        return_url: 'http://localhost:3000/dashboard/billing'
      })
    })
    
    if (portalRes.ok) {
      const portalData = await portalRes.json()
      console.log('✅ Portal session created!')
      console.log('Portal URL:', portalData.url)
    } else {
      console.log('❌ Failed to create portal session (user might not have a subscription yet)')
    }
    
    console.log('\n✨ Test complete! Check the URLs above to continue testing.')
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
  }
}

// Run the test
testStripeFlow()