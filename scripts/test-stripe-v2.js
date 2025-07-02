#!/usr/bin/env node

/**
 * Test script for Stripe V2 integration
 * Tests the new Stripe-native subscription system
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const TEST_USER = {
  email: `stripe-v2-test-${Date.now()}@example.com`,
  password: 'TestPassword123!',
  firstName: 'Stripe',
  lastName: 'V2Tester'
}

// Test scenarios
const tests = {
  auth: { passed: false, error: null },
  status: { passed: false, error: null },
  quotaCheck: { passed: false, error: null },
  checkout: { passed: false, error: null },
  portal: { passed: false, error: null },
  featureCheck: { passed: false, error: null },
  usageReport: { passed: false, error: null }
}

async function runTests() {
  console.log('🚀 Stripe V2 Integration Test Suite\n')
  console.log('Testing with backend:', API_URL)
  console.log('=' .repeat(50) + '\n')

  let accessToken = ''

  // 1. Authentication
  console.log('1️⃣ Testing Authentication...')
  try {
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

    if (registerRes.ok) {
      const data = await registerRes.json()
      accessToken = data.access_token
      tests.auth.passed = true
      console.log('✅ Registration successful')
    } else {
      // Try login if registration fails
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
        tests.auth.passed = true
        console.log('✅ Login successful')
      } else {
        throw new Error('Failed to authenticate')
      }
    }
  } catch (error) {
    tests.auth.error = error.message
    console.log('❌ Authentication failed:', error.message)
  }

  if (!accessToken) {
    console.log('\n⚠️  Cannot continue without authentication')
    printResults()
    return
  }

  // 2. Subscription Status
  console.log('\n2️⃣ Testing Subscription Status...')
  try {
    const res = await fetch(`${API_URL}/api/v1/subscription/status`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    
    if (res.ok) {
      const data = await res.json()
      tests.status.passed = true
      console.log('✅ Status retrieved:')
      console.log('   - Status:', data.status || 'none')
      console.log('   - Trial:', data.trial ? 'Yes' : 'No')
      console.log('   - Plan:', data.plan?.nickname || 'No plan')
    } else {
      throw new Error(`Status ${res.status}: ${res.statusText}`)
    }
  } catch (error) {
    tests.status.error = error.message
    console.log('❌ Status check failed:', error.message)
  }

  // 3. Quota Checking
  console.log('\n3️⃣ Testing Quota Checks...')
  try {
    const features = ['documents', 'storage', 'ai_credits', 'api_calls']
    let allPassed = true
    
    for (const feature of features) {
      const res = await fetch(`${API_URL}/api/v1/subscription/quota?feature=${feature}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      
      if (res.ok) {
        const data = await res.json()
        console.log(`   ✅ ${feature}:`, data.allowed ? 'Allowed' : 'Blocked',
          data.limit ? `(${data.used || 0}/${data.limit})` : '')
      } else {
        allPassed = false
        console.log(`   ❌ ${feature}: Failed to check`)
      }
    }
    
    tests.quotaCheck.passed = allPassed
  } catch (error) {
    tests.quotaCheck.error = error.message
    console.log('❌ Quota check failed:', error.message)
  }

  // 4. Checkout Session
  console.log('\n4️⃣ Testing Checkout Session Creation...')
  try {
    const res = await fetch(`${API_URL}/api/v1/subscription/checkout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lookup_key: 'professional_monthly',
        success_url: 'http://localhost:3000/subscription/success',
        cancel_url: 'http://localhost:3000/pricing'
      })
    })
    
    if (res.ok) {
      const data = await res.json()
      tests.checkout.passed = true
      console.log('✅ Checkout session created')
      console.log('   URL:', data.url.substring(0, 50) + '...')
      console.log('   Session ID:', data.session_id)
    } else {
      throw new Error(`Status ${res.status}: ${res.statusText}`)
    }
  } catch (error) {
    tests.checkout.error = error.message
    console.log('❌ Checkout creation failed:', error.message)
  }

  // 5. Customer Portal
  console.log('\n5️⃣ Testing Customer Portal...')
  try {
    const res = await fetch(`${API_URL}/api/v1/subscription/portal`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        return_url: 'http://localhost:3000/dashboard/billing'
      })
    })
    
    if (res.ok) {
      const data = await res.json()
      tests.portal.passed = true
      console.log('✅ Portal session created')
      console.log('   URL:', data.url.substring(0, 50) + '...')
    } else {
      // Portal might fail if no subscription
      console.log('⚠️  Portal creation failed (might need active subscription)')
    }
  } catch (error) {
    tests.portal.error = error.message
    console.log('❌ Portal creation failed:', error.message)
  }

  // 6. Feature Access Check
  console.log('\n6️⃣ Testing Feature Access...')
  try {
    const features = ['advanced_search', 'api_access', 'custom_workflows']
    let allPassed = true
    
    for (const feature of features) {
      const res = await fetch(`${API_URL}/api/v1/subscription/features/${feature}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      
      if (res.ok) {
        const data = await res.json()
        console.log(`   ${data.allowed ? '✅' : '🔒'} ${feature}:`, data.allowed ? 'Allowed' : 'Blocked')
      } else {
        allPassed = false
        console.log(`   ❌ ${feature}: Failed to check`)
      }
    }
    
    tests.featureCheck.passed = allPassed
  } catch (error) {
    tests.featureCheck.error = error.message
    console.log('❌ Feature check failed:', error.message)
  }

  // 7. Usage Reporting
  console.log('\n7️⃣ Testing Usage Reporting...')
  try {
    const res = await fetch(`${API_URL}/api/v1/subscription/usage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        metric: 'documents',
        value: 1
      })
    })
    
    if (res.ok) {
      tests.usageReport.passed = true
      console.log('✅ Usage reported successfully')
    } else {
      throw new Error(`Status ${res.status}: ${res.statusText}`)
    }
  } catch (error) {
    tests.usageReport.error = error.message
    console.log('❌ Usage reporting failed:', error.message)
  }

  printResults()
}

function printResults() {
  console.log('\n' + '=' .repeat(50))
  console.log('📊 Test Results Summary\n')
  
  let passed = 0
  let failed = 0
  
  for (const [name, result] of Object.entries(tests)) {
    if (result.passed) {
      passed++
      console.log(`✅ ${name.padEnd(15)} PASSED`)
    } else {
      failed++
      console.log(`❌ ${name.padEnd(15)} FAILED ${result.error ? `(${result.error})` : ''}`)
    }
  }
  
  console.log('\n' + '=' .repeat(50))
  console.log(`Total: ${passed} passed, ${failed} failed`)
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! The Stripe V2 integration is working correctly.')
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.')
  }
  
  console.log('\n💡 Next steps:')
  console.log('1. Use Stripe CLI to monitor webhook events')
  console.log('2. Test the checkout flow in the browser')
  console.log('3. Verify quotas are enforced correctly')
  console.log('4. Check feature gates are working')
}

// Run the tests
runTests().catch(error => {
  console.error('\n💥 Test suite crashed:', error)
  process.exit(1)
})