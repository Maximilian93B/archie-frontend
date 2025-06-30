#!/usr/bin/env node

/**
 * Manual testing script for authentication flow
 * Run this to test against the real backend
 */

const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://172.24.32.1:8080';
const TEST_USER = {
  email: `test-${Date.now()}@example.com`,
  password: 'TestPassword123!',
  first_name: 'Test',
  last_name: 'User',
  company: 'Test Company'
};

let authToken = null;
let refreshToken = null;
let tenantSubdomain = null;
let tenantId = null;

async function testEndpoint(name, fn) {
  console.log(`\n🧪 Testing: ${name}`);
  try {
    const result = await fn();
    console.log(`✅ Success:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed:`, error.response?.data || error.message);
    throw error;
  }
}

async function testAuthFlow() {
  console.log(`\n🚀 Starting Auth Flow Tests against ${API_URL}\n`);

  // Test 1: Health Check
  await testEndpoint('Health Check', async () => {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  });

  // Test 2: Register User (with tenant creation)
  await testEndpoint('Register User', async () => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, TEST_USER);
      authToken = response.data.token;
      refreshToken = response.data.refresh_token;
      return {
        user: response.data.user,
        has_token: !!response.data.token,
        has_refresh_token: !!response.data.refresh_token
      };
    } catch (error) {
      // If tenant error, try creating tenant first
      if (error.response?.data?.message?.includes('tenant')) {
        console.log('📝 Creating tenant first...');
        
        // Try to create a tenant
        const tenantResponse = await axios.post(`${API_URL}/api/v1/tenant`, {
          name: 'Test Company',
          subdomain: `test${Date.now()}`,
          admin_email: TEST_USER.email,
          admin_password: TEST_USER.password,
          admin_first_name: TEST_USER.first_name,
          admin_last_name: TEST_USER.last_name
        });
        
        console.log('✅ Tenant created:', tenantResponse.data);
        
        // Store tenant info
        tenantId = tenantResponse.data.tenant.id;
        tenantSubdomain = tenantResponse.data.tenant.subdomain;
        
        // Now try to login with the admin user
        const loginResponse = await axios.post(`${API_URL}/api/v1/auth/login`, {
          email: TEST_USER.email,
          password: TEST_USER.password
        }, {
          headers: {
            'X-Tenant-Subdomain': tenantSubdomain
          }
        });
        
        authToken = loginResponse.data.token;
        refreshToken = loginResponse.data.refresh_token;
        
        return {
          user: loginResponse.data.user,
          has_token: !!loginResponse.data.token,
          has_refresh_token: !!loginResponse.data.refresh_token,
          note: 'Created tenant and logged in as admin'
        };
      }
      throw error;
    }
  });

  // Test 3: Login with Credentials
  await testEndpoint('Login', async () => {
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    }, {
      headers: {
        'X-Tenant-Subdomain': tenantSubdomain
      }
    });
    authToken = response.data.token;
    refreshToken = response.data.refresh_token;
    return {
      user: response.data.user,
      has_token: !!response.data.token,
      has_refresh_token: !!response.data.refresh_token
    };
  });

  // Test 4: Validate Token
  await testEndpoint('Validate Token', async () => {
    const response = await axios.get(`${API_URL}/api/v1/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  });

  // Test 5: Get User Profile
  await testEndpoint('Get User Profile', async () => {
    const response = await axios.get(`${API_URL}/api/v1/users/profile`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  });

  // Test 6: Refresh Token
  await testEndpoint('Refresh Token', async () => {
    const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
      refresh_token: refreshToken
    }, {
      headers: {
        'X-Tenant-ID': tenantId
      }
    });
    authToken = response.data.token;
    return {
      has_new_token: !!response.data.token,
      has_new_refresh_token: !!response.data.refresh_token
    };
  });

  // Test 7: Logout
  await testEndpoint('Logout', async () => {
    const response = await axios.post(`${API_URL}/api/v1/auth/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'X-Tenant-ID': tenantId
      }
    });
    return response.data;
  });

  // Test 8: Verify Token is Invalid After Logout
  await testEndpoint('Verify Token Invalid After Logout', async () => {
    try {
      await axios.get(`${API_URL}/api/v1/auth/validate`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'X-Tenant-ID': tenantId
        }
      });
      throw new Error('Token should be invalid');
    } catch (error) {
      if (error.response?.status === 401) {
        return { success: true, message: 'Token properly invalidated' };
      }
      throw error;
    }
  });

  console.log('\n🎉 All authentication tests passed!\n');
}

// Run tests
testAuthFlow().catch(error => {
  console.error('\n💥 Test suite failed:', error.message);
  process.exit(1);
});