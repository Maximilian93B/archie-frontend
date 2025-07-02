#!/usr/bin/env node

/**
 * Frontend Integration Test
 * Tests the complete flow through the frontend application
 */

const axios = require('axios');

const FRONTEND_URL = 'http://localhost:3000';
const API_URL = 'http://172.24.32.1:8080';

// Test credentials
const TEST_USER = {
  email: 'admin@testdebug123.com',
  password: 'SecurePass123!',
  subdomain: 'testdebug123'
};

let authToken = null;
let cookies = '';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testFrontendPages() {
  console.log('\n🧪 Testing Frontend Pages\n');
  
  const pagesToTest = [
    { path: '/', name: 'Landing Page', expectedText: 'reimagined' },
    { path: '/auth/login', name: 'Login Page', expectedText: 'Welcome back' },
    { path: '/auth/register', name: 'Register Page', expectedText: 'Create' },
    { path: '/dashboard', name: 'Dashboard (redirect)', expectedStatus: 200 }
  ];

  for (const page of pagesToTest) {
    try {
      const response = await axios.get(`${FRONTEND_URL}${page.path}`, {
        validateStatus: () => true, // Accept all status codes
        maxRedirects: 0
      });
      
      const success = page.expectedText 
        ? response.data.includes(page.expectedText)
        : response.status === (page.expectedStatus || 200);
      
      console.log(`${success ? '✅' : '❌'} ${page.name}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${page.name}: ${error.message}`);
    }
  }
}

async function testAPILogin() {
  console.log('\n🧪 Testing API Login\n');
  
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    }, {
      headers: {
        'X-Tenant-Subdomain': TEST_USER.subdomain
      }
    });
    
    authToken = response.data.token;
    console.log('✅ Login successful');
    console.log(`   User: ${response.data.user.email}`);
    console.log(`   Role: ${response.data.user.role}`);
    console.log(`   Token: ${authToken.substring(0, 50)}...`);
    
    return true;
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDocumentAPI() {
  console.log('\n🧪 Testing Document API\n');
  
  if (!authToken) {
    console.log('❌ No auth token available');
    return;
  }
  
  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'X-Tenant-Subdomain': TEST_USER.subdomain
  };
  
  // Test document list
  try {
    const response = await axios.get(`${API_URL}/api/v1/documents`, { headers });
    console.log(`✅ Document list: ${response.data.data.length} documents`);
  } catch (error) {
    console.log('❌ Document list failed:', error.response?.data || error.message);
  }
  
  // Test document search
  try {
    const response = await axios.get(`${API_URL}/api/v1/documents/search?q=test`, { headers });
    console.log(`✅ Document search: ${response.data.data?.length || 0} results`);
  } catch (error) {
    console.log('❌ Document search failed:', error.response?.data || error.message);
  }
}

async function testFrontendAuth() {
  console.log('\n🧪 Testing Frontend Auth Flow\n');
  
  // This would require a headless browser like Puppeteer
  // For now, we'll just verify the endpoints exist
  console.log('⚠️  Frontend auth requires browser automation (Puppeteer/Playwright)');
  console.log('   Manual testing recommended for:');
  console.log('   - Login form submission');
  console.log('   - OAuth buttons (Google/GitHub)');
  console.log('   - Dashboard access after login');
  console.log('   - Search functionality (Cmd+K)');
}

async function main() {
  console.log('🚀 Starting Frontend Integration Tests\n');
  console.log(`Frontend: ${FRONTEND_URL}`);
  console.log(`Backend: ${API_URL}`);
  
  await testFrontendPages();
  
  const loginSuccess = await testAPILogin();
  if (loginSuccess) {
    await testDocumentAPI();
  }
  
  await testFrontendAuth();
  
  console.log('\n✨ Frontend Integration Tests Complete\n');
  console.log('📝 Next Steps:');
  console.log('1. Open browser to http://localhost:3000');
  console.log('2. Login with:', TEST_USER.email);
  console.log('3. Test document upload and search');
  console.log('4. Verify responsive design');
}

main().catch(console.error);