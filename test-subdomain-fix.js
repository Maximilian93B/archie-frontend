#!/usr/bin/env node

/**
 * Test script to verify subdomain authentication fix
 */

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://172.24.32.1:8080';

// Test credentials with subdomain
const TEST_USER = {
  email: 'admin@testdebug123.com',
  password: 'SecurePass123!',
  subdomain: 'testdebug123'
};

async function testLogin() {
  console.log('🧪 Testing API Login with Subdomain\n');
  console.log(`API URL: ${API_URL}`);
  console.log(`Email: ${TEST_USER.email}`);
  console.log(`Subdomain: ${TEST_USER.subdomain}\n`);
  
  try {
    // Test with X-Tenant-Subdomain header
    console.log('1. Testing with X-Tenant-Subdomain header...');
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Subdomain': TEST_USER.subdomain
      }
    });
    
    console.log('✅ Login successful!');
    console.log(`   User ID: ${response.data.user.id}`);
    console.log(`   Email: ${response.data.user.email}`);
    console.log(`   Company: ${response.data.user.company || 'N/A'}`);
    console.log(`   Role: ${response.data.user.role}`);
    console.log(`   Token: ${response.data.token.substring(0, 50)}...`);
    
    // Test if subdomain is returned
    if (response.data.user.tenant_subdomain) {
      console.log(`   Tenant Subdomain: ${response.data.user.tenant_subdomain}`);
    }
    
    return response.data.token;
  } catch (error) {
    console.log('❌ Login failed:');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Message: ${error.response.data.message || error.response.data}`);
      console.log(`   Headers sent:`, error.config.headers);
    } else {
      console.log(`   Error: ${error.message}`);
    }
    return null;
  }
}

async function testAuthenticatedRequest(token) {
  if (!token) {
    console.log('\n❌ No token available for authenticated requests');
    return;
  }
  
  console.log('\n2. Testing authenticated request with subdomain...');
  
  try {
    const response = await axios.get(`${API_URL}/api/v1/documents`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-Subdomain': TEST_USER.subdomain
      }
    });
    
    console.log('✅ Document list request successful!');
    console.log(`   Total documents: ${response.data.data.length}`);
  } catch (error) {
    console.log('❌ Document list failed:');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Message: ${error.response.data.message || error.response.data}`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
  }
}

async function main() {
  console.log('=' . repeat(60));
  console.log('Archivus Subdomain Authentication Test');
  console.log('=' . repeat(60));
  console.log();
  
  const token = await testLogin();
  await testAuthenticatedRequest(token);
  
  console.log('\n' + '=' . repeat(60));
  console.log('Test complete!');
  console.log('=' . repeat(60));
}

main().catch(console.error);