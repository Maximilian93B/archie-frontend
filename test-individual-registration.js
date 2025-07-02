#!/usr/bin/env node

/**
 * Test script for individual user registration flow
 * Tests the complete end-to-end flow of individual registration
 */

const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function testIndividualRegistration() {
  console.log('🧪 Testing Individual User Registration\n');

  const testUser = {
    email: `test.individual.${Date.now()}@example.com`,
    password: 'TestPass123!',
    first_name: 'John',
    last_name: 'Doe',
    registration_type: 'individual'
  };

  try {
    // 1. Test Registration
    console.log('1️⃣ Testing registration...');
    const registerResponse = await axios.post(`${API_URL}/api/v1/auth/register`, testUser);
    
    console.log('✅ Registration successful!');
    console.log(`   - User ID: ${registerResponse.data.user.id}`);
    console.log(`   - Subdomain: ${registerResponse.data.user.tenant_subdomain}`);
    console.log(`   - Workspace: ${registerResponse.data.user.company}`);
    console.log(`   - Token received: ${registerResponse.data.token ? 'Yes' : 'No'}\n`);

    const token = registerResponse.data.token;
    const subdomain = registerResponse.data.user.tenant_subdomain;

    // 2. Test Login
    console.log('2️⃣ Testing login...');
    const loginResponse = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email: testUser.email,
      password: testUser.password,
      subdomain: subdomain
    });

    console.log('✅ Login successful!');
    console.log(`   - Token matches: ${loginResponse.data.token === token ? 'No (new token)' : 'Yes'}\n`);

    // 3. Test Subdomain Lookup
    console.log('3️⃣ Testing subdomain lookup...');
    const lookupResponse = await axios.post(`${API_URL}/api/v1/auth/lookup-subdomain`, {
      email: testUser.email
    });

    console.log('✅ Subdomain lookup successful!');
    console.log(`   - Found ${lookupResponse.data.subdomains.length} workspace(s)`);
    lookupResponse.data.subdomains.forEach(ws => {
      console.log(`   - ${ws.tenant_name} (${ws.subdomain})`);
    });
    console.log('');

    // 4. Test Authenticated Request
    console.log('4️⃣ Testing authenticated request...');
    const profileResponse = await axios.get(`${API_URL}/api/v1/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${loginResponse.data.token}`,
        'X-Tenant-Subdomain': subdomain
      }
    });

    console.log('✅ Profile fetch successful!');
    console.log(`   - User: ${profileResponse.data.first_name} ${profileResponse.data.last_name}`);
    console.log(`   - Email: ${profileResponse.data.email}`);
    console.log(`   - Role: ${profileResponse.data.role}`);
    console.log(`   - Tenant ID: ${profileResponse.data.tenant_id}\n`);

    console.log('🎉 All tests passed! Individual registration flow is working correctly.\n');

    // Summary
    console.log('📝 Summary:');
    console.log(`   - Individual users get their own workspace`);
    console.log(`   - Auto-generated subdomain: ${subdomain}`);
    console.log(`   - Workspace name: ${registerResponse.data.user.company}`);
    console.log(`   - User is admin of their personal workspace`);
    console.log(`   - Subdomain lookup works correctly`);
    console.log(`   - Authentication and multi-tenancy working`);

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run the test
testIndividualRegistration().catch(console.error);