/**
 * Subscription API Integration Test Script
 * 
 * Run with: npx tsx src/test-utils/subscription-test.ts
 */

import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

// Read .env.local file manually
const envPath = path.join(process.cwd(), '.env.local')
let API_URL = 'http://localhost:8080'

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=')
    if (key && value) {
      acc[key.trim()] = value.trim()
    }
    return acc
  }, {} as Record<string, string>)
  
  API_URL = envVars.NEXT_PUBLIC_API_URL || API_URL
}
const COLORS = {
  success: '\x1b[32m',
  error: '\x1b[31m',
  info: '\x1b[36m',
  warning: '\x1b[33m',
  reset: '\x1b[0m'
}

let authToken: string = ''
let tenantId: string = ''

function log(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
  console.log(`${COLORS[type]}${message}${COLORS.reset}`)
}

async function healthCheck() {
  log('\n🏥 Checking backend health...', 'info')
  try {
    const response = await axios.get(`${API_URL}/health`)
    log('✅ Backend is healthy', 'success')
    log(`   Version: ${response.data.version}`, 'info')
    log(`   Environment: ${response.data.environment}`, 'info')
    return true
  } catch (error) {
    log('❌ Backend is not responding', 'error')
    return false
  }
}

async function createOrLoginTestUser() {
  const timestamp = Date.now()
  const TEST_USER = {
    email: `test-subscription-${timestamp}@example.com`,
    password: 'TestPassword123!',
    first_name: 'Test',
    last_name: 'Subscription',
    company: 'Test Company'
  }

  log('\n🔐 Setting up test user for subscription tests...', 'info')
  
  try {
    // First, try to create a tenant with admin user
    log('📝 Creating new tenant...', 'info')
    
    const tenantResponse = await axios.post(`${API_URL}/api/v1/tenant`, {
      name: 'Test Subscription Company',
      subdomain: `testsub${timestamp}`,
      admin_email: TEST_USER.email,
      admin_password: TEST_USER.password,
      admin_first_name: TEST_USER.first_name,
      admin_last_name: TEST_USER.last_name
    })
    
    log('✅ Tenant created successfully', 'success')
    tenantId = tenantResponse.data.tenant.id
    const tenantSubdomain = tenantResponse.data.tenant.subdomain
    log(`   Tenant ID: ${tenantId}`, 'info')
    log(`   Subdomain: ${tenantSubdomain}`, 'info')
    
    // Now login with the admin user
    const loginResponse = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    }, {
      headers: {
        'X-Tenant-Subdomain': tenantSubdomain
      }
    })
    
    authToken = loginResponse.data.token || loginResponse.data.access_token
    
    log('✅ Logged in as tenant admin', 'success')
    log(`   Email: ${TEST_USER.email}`, 'info')
    log(`   Token: ${authToken.substring(0, 20)}...`, 'info')
    
    return true
  } catch (error: any) {
    // If tenant creation fails, it might already exist
    if (error.response?.data?.message?.includes('already exists')) {
      log('⚠️  Tenant already exists, attempting login...', 'warning')
      
      try {
        const loginResponse = await axios.post(`${API_URL}/api/v1/auth/login`, {
          email: TEST_USER.email,
          password: TEST_USER.password
        })
        
        authToken = loginResponse.data.token || loginResponse.data.access_token
        tenantId = loginResponse.data.user?.tenant_id || loginResponse.data.tenant_id
        
        log('✅ Logged in successfully', 'success')
        return true
      } catch (loginError: any) {
        log(`❌ Login also failed: ${loginError.response?.data?.message || loginError.message}`, 'error')
        return false
      }
    }
    
    log(`❌ Tenant creation failed: ${error.response?.data?.message || error.message}`, 'error')
    if (error.response?.data) {
      log(`   Full error: ${JSON.stringify(error.response.data, null, 2)}`, 'error')
    }
    return false
  }
}

async function testSubscriptionStatus() {
  log('\n📊 Testing subscription status endpoint...', 'info')
  try {
    const response = await axios.get(`${API_URL}/api/v1/subscription/status`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    })
    
    log('✅ Subscription status retrieved', 'success')
    log(`   Status: ${response.data.subscription?.status || 'No subscription'}`, 'info')
    log(`   Tier: ${response.data.subscription?.tier || 'None'}`, 'info')
    
    if (response.data.subscription?.trial_end) {
      log(`   Trial ends: ${new Date(response.data.subscription.trial_end).toLocaleDateString()}`, 'warning')
    }
    
    return response.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      log('⚠️  No subscription found (expected for new users)', 'warning')
      return null
    }
    log(`❌ Failed to get subscription status: ${error.response?.data?.message || error.message}`, 'error')
    return null
  }
}

async function testAvailablePlans() {
  log('\n💳 Testing available plans endpoint...', 'info')
  try {
    const response = await axios.get(`${API_URL}/api/v1/subscription/plans`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    })
    
    log('✅ Plans retrieved successfully', 'success')
    
    // Handle both array and object response
    const plansArray = Array.isArray(response.data) ? response.data : response.data.plans || []
    
    plansArray.forEach((plan: any) => {
      const name = plan.display_name || plan.name || plan.tier || 'Unknown'
      const price = plan.price || plan.amount || 0
      const interval = plan.interval || 'month'
      
      log(`   ${name}: $${price / 100}/${interval}`, 'info')
      
      if (plan.limits) {
        log(`     - Documents: ${plan.limits.documents === -1 ? 'Unlimited' : plan.limits.documents}`, 'info')
        log(`     - Storage: ${plan.limits.storage === -1 ? 'Unlimited' : `${plan.limits.storage / (1024**3)}GB`}`, 'info')
        log(`     - AI Credits: ${plan.limits.ai_credits === -1 ? 'Unlimited' : plan.limits.ai_credits}`, 'info')
      } else if (plan.features) {
        // Some plans might have features instead of limits
        log(`     - Features: ${JSON.stringify(plan.features)}`, 'info')
      }
    })
    
    return response.data.plans
  } catch (error: any) {
    log(`❌ Failed to get plans: ${error.response?.data?.message || error.message}`, 'error')
    return []
  }
}

async function testCheckoutSession(priceId: string) {
  log('\n🛒 Testing checkout session creation...', 'info')
  try {
    const response = await axios.post(`${API_URL}/api/v1/subscription/checkout`, {
      price_id: priceId,
      success_url: 'http://localhost:3000/subscription/success',
      cancel_url: 'http://localhost:3000/pricing?canceled=true'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    })
    
    log('✅ Checkout session created', 'success')
    log(`   Session ID: ${response.data.session_id}`, 'info')
    log(`   Checkout URL: ${response.data.checkout_url}`, 'info')
    
    return response.data
  } catch (error: any) {
    log(`❌ Failed to create checkout session: ${error.response?.data?.message || error.message}`, 'error')
    return null
  }
}

async function testCustomerPortal() {
  log('\n🔧 Testing customer portal session...', 'info')
  try {
    const response = await axios.post(`${API_URL}/api/v1/subscription/portal`, {
      return_url: 'http://localhost:3000/dashboard/billing'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    })
    
    log('✅ Portal session created', 'success')
    log(`   Portal URL: ${response.data.portal_url}`, 'info')
    
    return response.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      log('⚠️  No subscription found to manage', 'warning')
    } else {
      log(`❌ Failed to create portal session: ${error.response?.data?.message || error.message}`, 'error')
    }
    return null
  }
}

async function testUsageEndpoint() {
  log('\n📈 Testing usage tracking endpoint...', 'info')
  try {
    const response = await axios.get(`${API_URL}/api/v1/subscription/usage`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    })
    
    log('✅ Usage data retrieved', 'success')
    const usage = response.data.usage
    if (usage) {
      log(`   Documents: ${usage.documents.used}/${usage.documents.limit === -1 ? '∞' : usage.documents.limit}`, 'info')
      
      const storageUsedGB = usage.storage.used ? (usage.storage.used / (1024**3)).toFixed(2) : '0'
      const storageLimitGB = usage.storage.limit === -1 ? '∞' : 
        usage.storage.limit ? `${(usage.storage.limit / (1024**3)).toFixed(0)}GB` : 'Unknown'
      log(`   Storage: ${storageUsedGB}GB/${storageLimitGB}`, 'info')
      
      log(`   AI Credits: ${usage.ai_credits?.used || 0}/${usage.ai_credits?.limit === -1 ? '∞' : usage.ai_credits?.limit || 'Unknown'}`, 'info')
    }
    
    return response.data
  } catch (error: any) {
    log(`❌ Failed to get usage data: ${error.response?.data?.message || error.message}`, 'error')
    return null
  }
}

async function testPromoCode(code: string) {
  log(`\n🎟️  Testing promo code: ${code}...`, 'info')
  try {
    const response = await axios.post(`${API_URL}/api/v1/subscription/promo`, {
      promo_code: code
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    })
    
    if (response.data.success) {
      log('✅ Promo code applied successfully', 'success')
      log(`   Message: ${response.data.message}`, 'info')
    } else {
      log(`⚠️  Promo code not applied: ${response.data.message}`, 'warning')
    }
    
    return response.data
  } catch (error: any) {
    log(`❌ Failed to apply promo code: ${error.response?.data?.message || error.message}`, 'error')
    return null
  }
}

async function runAllTests() {
  log('\n🚀 Starting Archivus Subscription API Tests', 'info')
  log('=========================================', 'info')
  
  // Check backend health
  const isHealthy = await healthCheck()
  if (!isHealthy) {
    log('\n❌ Backend is not running. Please start the backend first.', 'error')
    process.exit(1)
  }
  
  // Create or login test user
  const loginSuccess = await createOrLoginTestUser()
  if (!loginSuccess) {
    log('\n❌ Cannot proceed without authentication', 'error')
    process.exit(1)
  }
  
  // Test subscription endpoints
  const subscriptionStatus = await testSubscriptionStatus()
  const plans = await testAvailablePlans()
  
  // Only test checkout if no active subscription
  if (!subscriptionStatus?.subscription || subscriptionStatus.subscription.status === 'canceled') {
    if (plans && plans.length > 0) {
      const starterPlan = plans.find((p: any) => p.name === 'starter')
      if (starterPlan) {
        await testCheckoutSession(starterPlan.stripe_price_id || starterPlan.stripePriceId)
      }
    }
  } else {
    log('\n⚠️  Skipping checkout test - subscription already active', 'warning')
  }
  
  // Test portal (only if subscription exists)
  if (subscriptionStatus?.subscription) {
    await testCustomerPortal()
  }
  
  // Test usage
  await testUsageEndpoint()
  
  // Test promo code (commented out - endpoint not implemented yet)
  // await testPromoCode('TESTCODE')
  
  log('\n✅ All subscription tests completed!', 'success')
  log('=====================================\n', 'info')
}

// Run tests
runAllTests().catch(error => {
  log(`\n❌ Test suite failed: ${error.message}`, 'error')
  process.exit(1)
})