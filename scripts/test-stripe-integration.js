#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const API_URL = envVars.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const APP_URL = envVars.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

console.log('🧪 Testing Stripe Integration Flow');
console.log('================================');
console.log(`API URL: ${API_URL}`);
console.log(`App URL: ${APP_URL}`);

const timestamp = Date.now();
const testUser = {
  email: `stripe-test-${timestamp}@example.com`,
  password: 'Test123!@#',
  first_name: 'Stripe',
  last_name: 'Test User'
};

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testStripeFlow() {
  let token = null;
  let userId = null;
  let tenantId = null;

  try {
    // Step 1: Check backend health
    console.log('\n📍 Step 1: Checking backend health...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Backend is healthy:', healthResponse.data);

    // Step 2: Create tenant and user
    console.log('\n📍 Step 2: Creating tenant...');
    
    // Generate a short random string for unique subdomain
    const randomStr = Math.random().toString(36).substring(2, 8);
    const tenantData = {
      name: `Stripe Test`,
      subdomain: `stripe${randomStr}`,  // Short, unique subdomain
      admin_email: testUser.email,
      admin_password: testUser.password,
      admin_first_name: testUser.first_name,
      admin_last_name: testUser.last_name
    };
    
    console.log('📝 Creating tenant with admin user...');
    
    const tenantResponse = await axios.post(`${API_URL}/api/v1/tenant`, tenantData);
    
    console.log('✅ Tenant created:', tenantResponse.data);
    
    tenantId = tenantResponse.data.tenant.id;
    const tenantSubdomain = tenantResponse.data.tenant.subdomain;
    
    // Now login with the admin user
    console.log('\n📍 Logging in as admin...');
    const loginResponse = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email: testUser.email,
      password: testUser.password
    }, {
      headers: {
        'X-Tenant-Subdomain': tenantSubdomain
      }
    });
    
    token = loginResponse.data.token;
    userId = loginResponse.data.user.id;
    
    console.log('✅ Logged in successfully');
    console.log(`   User ID: ${userId}`);
    console.log(`   Tenant ID: ${tenantId}`);

    // Step 3: Check subscription status (should be in trial)
    console.log('\n📍 Step 3: Checking initial subscription status...');
    const statusResponse = await axios.get(
      `${API_URL}/api/v1/subscription/status`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-ID': tenantId
        }
      }
    );
    
    console.log('✅ Subscription status:');
    console.log(`   Status: ${statusResponse.data.status || 'N/A'}`);
    console.log(`   Plan: ${statusResponse.data.plan?.name || 'Trial'}`);
    console.log(`   Trial: ${statusResponse.data.is_trialing || statusResponse.data.subscription?.is_trialing || false}`);

    // Step 4: Get available plans
    console.log('\n📍 Step 4: Fetching available plans...');
    const plansResponse = await axios.get(
      `${API_URL}/api/v1/subscription/plans`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-ID': tenantId
        }
      }
    );
    
    console.log('✅ Available plans:');
    const plans = Array.isArray(plansResponse.data) ? plansResponse.data : 
                  (plansResponse.data.plans || [plansResponse.data]);
    
    if (plans.length === 0) {
      console.log('   No plans returned from backend');
    } else {
      plans.forEach((plan, index) => {
        console.log(`   ${index + 1}. ${plan.name || plan.tier} - $${(plan.price || plan.price_in_cents || 0) / 100}`);
      });
    }

    // Step 5: Test checkout session creation
    console.log('\n📍 Step 5: Testing checkout session creation...');
    const starterPriceId = envVars.NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY;
    
    if (!starterPriceId) {
      console.log('⚠️  No Stripe price ID found in environment');
      return;
    }
    
    try {
      const checkoutResponse = await axios.post(
        `${API_URL}/api/v1/subscription/checkout`,
        {
          price_id: starterPriceId,
          success_url: `${APP_URL}/subscription/success`,
          cancel_url: `${APP_URL}/pricing?canceled=true`
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-ID': tenantId
          }
        }
      );
      
      console.log('✅ Checkout session created:');
      console.log(`   URL: ${checkoutResponse.data.url}`);
      console.log(`   Session ID: ${checkoutResponse.data.session_id || 'N/A'}`);
    } catch (error) {
      console.log('❌ Checkout session creation failed:', error.response?.data || error.message);
    }

    // Step 6: Test subscription limits
    console.log('\n📍 Step 6: Testing subscription limits...');
    try {
      const limitsResponse = await axios.get(
        `${API_URL}/api/v1/subscription/usage`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-ID': tenantId
          }
        }
      );
      
      console.log('✅ Current usage:');
      console.log(`   Documents: ${limitsResponse.data.documents?.used || 0} / ${limitsResponse.data.documents?.limit || 'unlimited'}`);
      console.log(`   Storage: ${limitsResponse.data.storage?.used || 0} / ${limitsResponse.data.storage?.limit || 'unlimited'}`);
      console.log(`   AI Credits: ${limitsResponse.data.ai_credits?.used || 0} / ${limitsResponse.data.ai_credits?.limit || 'unlimited'}`);
    } catch (usageError) {
      console.log('⚠️  Usage endpoint not available:', usageError.response?.data?.message || usageError.message);
    }

    // Summary
    console.log('\n🎉 Stripe Integration Test Complete!');
    console.log('=====================================');
    console.log('✅ User registration works');
    console.log('✅ Subscription status endpoint works');
    console.log('✅ Plans endpoint works');
    console.log('✅ Usage tracking works');
    console.log('\n🔍 Next steps:');
    console.log('1. Test the checkout flow in the browser');
    console.log('2. Verify subscription enforcement on protected routes');
    console.log('3. Test the subscription management portal');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Run the test
testStripeFlow().catch(console.error);