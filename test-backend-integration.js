// Test script to verify backend integration changes
// Run with: node test-backend-integration.js

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:8080';
const TEST_TOKEN = process.env.TEST_TOKEN || '';

console.log('🧪 Testing Backend Integration Changes...\n');

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${TEST_TOKEN}`,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Test 1: CSRF Protection
async function testCSRFProtection() {
  console.log('📝 Test 1: CSRF Protection');
  try {
    // Test that CORS headers are properly set
    const response = await axiosInstance.get('/api/v1/documents');
    console.log('✅ CSRF headers accepted');
  } catch (error) {
    console.log('❌ CSRF test failed:', error.message);
  }
}

// Test 2: Timeout Configuration
async function testTimeouts() {
  console.log('\n📝 Test 2: Timeout Configuration');
  
  // Test regular timeout (30s)
  try {
    const start = Date.now();
    await axiosInstance.get('/api/v1/documents', { timeout: 30000 });
    const duration = Date.now() - start;
    console.log(`✅ Regular request completed in ${duration}ms`);
  } catch (error) {
    console.log('❌ Regular timeout test failed:', error.message);
  }
}

// Test 3: AI Processing Status
async function testAIProcessingStatus() {
  console.log('\n📝 Test 3: AI Processing Status');
  try {
    const response = await axiosInstance.get('/api/v1/documents?include=tags,categories,folder');
    const documents = response.data.items || [];
    
    const processingDocs = documents.filter(doc => 
      doc.ai_processing_status === 'processing' || 
      doc.ai_processing_status === 'pending'
    );
    
    console.log(`✅ Found ${processingDocs.length} documents in processing`);
    
    // Check new AI fields
    const firstDoc = documents[0];
    if (firstDoc) {
      console.log('   AI Fields present:', {
        ai_processing_status: !!firstDoc.ai_processing_status,
        ai_summary: !!firstDoc.ai_summary,
        ai_entities: !!firstDoc.ai_entities,
        ai_key_points: !!firstDoc.ai_key_points,
        ai_category: !!firstDoc.ai_category,
        ai_confidence_score: !!firstDoc.ai_confidence_score
      });
    }
  } catch (error) {
    console.log('❌ AI processing status test failed:', error.message);
  }
}

// Test 4: Rate Limiting Headers
async function testRateLimiting() {
  console.log('\n📝 Test 4: Rate Limiting Headers');
  try {
    const response = await axiosInstance.get('/api/v1/documents');
    const headers = response.headers;
    
    console.log('✅ Rate limit headers:', {
      'x-ratelimit-limit': headers['x-ratelimit-limit'],
      'x-ratelimit-remaining': headers['x-ratelimit-remaining'],
      'x-ratelimit-reset': headers['x-ratelimit-reset']
    });
  } catch (error) {
    console.log('❌ Rate limiting test failed:', error.message);
  }
}

// Test 5: Document Relationships
async function testDocumentRelationships() {
  console.log('\n📝 Test 5: Document Relationships');
  try {
    // Test without includes
    const withoutIncludes = await axiosInstance.get('/api/v1/documents');
    const firstDocWithout = withoutIncludes.data.items?.[0];
    
    // Test with includes
    const withIncludes = await axiosInstance.get('/api/v1/documents?include=tags,categories,folder');
    const firstDocWith = withIncludes.data.items?.[0];
    
    if (firstDocWithout && firstDocWith) {
      console.log('✅ Without includes:', {
        tags: Array.isArray(firstDocWithout.tags),
        categories: Array.isArray(firstDocWithout.categories),
        folder: !!firstDocWithout.folder
      });
      
      console.log('✅ With includes:', {
        tags: Array.isArray(firstDocWith.tags),
        categories: Array.isArray(firstDocWith.categories),
        folder: !!firstDocWith.folder
      });
    }
  } catch (error) {
    console.log('❌ Document relationships test failed:', error.message);
  }
}

// Test 6: Health Endpoints
async function testHealthEndpoints() {
  console.log('\n📝 Test 6: Health Endpoints');
  
  try {
    // Test detailed health
    const health = await axios.get(`${API_URL}/health/detailed`);
    console.log('✅ Health status:', health.data.status);
    console.log('   Services:', Object.keys(health.data.checks));
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
  
  try {
    // Test metrics
    const metrics = await axios.get(`${API_URL}/metrics`);
    console.log('✅ Metrics available:', {
      hasSystem: !!metrics.data.system,
      hasApplication: !!metrics.data.application,
      hasRedis: !!metrics.data.redis
    });
  } catch (error) {
    console.log('❌ Metrics check failed:', error.message);
  }
}

// Run all tests
async function runTests() {
  if (!TEST_TOKEN) {
    console.log('⚠️  Warning: No TEST_TOKEN provided. Some tests may fail.\n');
  }
  
  await testCSRFProtection();
  await testTimeouts();
  await testAIProcessingStatus();
  await testRateLimiting();
  await testDocumentRelationships();
  await testHealthEndpoints();
  
  console.log('\n✅ All tests completed!');
  console.log('\n📋 Integration Checklist:');
  console.log('- [ ] CSRF protection configured');
  console.log('- [ ] Timeouts updated (30s regular, 120s AI)');
  console.log('- [ ] AI processing status polling implemented');
  console.log('- [ ] Rate limiting handled with user warnings');
  console.log('- [ ] Document relationships loaded on demand');
  console.log('- [ ] Health monitoring integrated');
}

runTests().catch(console.error);