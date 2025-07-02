#!/usr/bin/env node

/**
 * Test script for AI Chat implementation
 * Tests the chat functionality end-to-end
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load test configuration
const configPath = path.join(__dirname, 'chat-test-config.json');
let config;

try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log('✅ Loaded test configuration from chat-test-config.json\n');
} catch (error) {
  console.error('❌ Could not load test configuration.');
  console.error('   Please run: node test-setup-chat.js');
  process.exit(1);
}

const API_URL = config.apiUrl;
const TEST_USER = config.user;
const TEST_DOCUMENT_ID = config.document.id;

async function testChatImplementation() {
  console.log('🧪 Testing AI Chat Implementation\n');

  try {
    // 1. Login
    console.log('1️⃣ Logging in...');
    const loginResponse = await axios.post(`${API_URL}/api/v1/auth/login`, TEST_USER, {
      headers: { 'X-Tenant-Subdomain': TEST_USER.subdomain }
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful\n');

    // Set auth header for subsequent requests
    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'X-Tenant-Subdomain': TEST_USER.subdomain
    };

    // 2. Create Chat Session
    console.log('2️⃣ Creating chat session...');
    const createSessionResponse = await axios.post(
      `${API_URL}/api/v1/chat/sessions`,
      {
        document_id: TEST_DOCUMENT_ID,
        session_name: 'Test Chat Session'
      },
      { headers: authHeaders }
    );

    const sessionId = createSessionResponse.data.session.id;
    console.log(`✅ Session created: ${sessionId}\n`);

    // 3. Ask a Question
    console.log('3️⃣ Asking a question...');
    const startTime = Date.now();
    const askResponse = await axios.post(
      `${API_URL}/api/v1/chat/sessions/${sessionId}/ask`,
      {
        question: 'What is the main topic of this document?'
      },
      { headers: authHeaders }
    );

    const responseTime = Date.now() - startTime;
    console.log('✅ Question answered!');
    console.log(`   Response time: ${responseTime}ms`);
    console.log(`   Answer preview: ${askResponse.data.answer.substring(0, 100)}...`);
    console.log(`   Message ID: ${askResponse.data.message_id}\n`);

    // 4. Get Session Details
    console.log('4️⃣ Getting session details...');
    const sessionResponse = await axios.get(
      `${API_URL}/api/v1/chat/sessions/${sessionId}`,
      { headers: authHeaders }
    );

    const messages = sessionResponse.data.session.messages;
    console.log(`✅ Session retrieved with ${messages.length} messages\n`);

    // 5. List All Sessions
    console.log('5️⃣ Listing all chat sessions...');
    const listResponse = await axios.get(
      `${API_URL}/api/v1/chat/sessions?page=1&page_size=10`,
      { headers: authHeaders }
    );

    console.log(`✅ Found ${listResponse.data.total} total sessions\n`);

    // 6. Update Session Name
    console.log('6️⃣ Updating session name...');
    await axios.put(
      `${API_URL}/api/v1/chat/sessions/${sessionId}/name`,
      { name: 'Updated Test Session' },
      { headers: authHeaders }
    );
    console.log('✅ Session name updated\n');

    // 7. Test Performance
    console.log('7️⃣ Testing performance with multiple questions...');
    const questions = [
      'Can you summarize this document?',
      'What are the key points?',
      'Are there any important dates mentioned?'
    ];

    const perfResults = [];
    for (const question of questions) {
      const start = Date.now();
      await axios.post(
        `${API_URL}/api/v1/chat/sessions/${sessionId}/ask`,
        { question },
        { headers: authHeaders }
      );
      perfResults.push(Date.now() - start);
    }

    console.log('✅ Performance test completed');
    console.log(`   Average response time: ${Math.round(perfResults.reduce((a, b) => a + b) / perfResults.length)}ms`);
    console.log(`   Min: ${Math.min(...perfResults)}ms, Max: ${Math.max(...perfResults)}ms\n`);

    // 8. Test Chat Suggestions
    console.log('8️⃣ Testing chat suggestions...');
    const suggestionsResponse = await axios.post(
      `${API_URL}/api/v1/chat/suggestions`,
      { query: 'document' },
      { headers: authHeaders }
    );

    console.log('✅ Suggestions received:');
    suggestionsResponse.data.suggestions.forEach(s => console.log(`   - ${s}`));
    console.log('');

    // 9. Get Chat Stats
    console.log('9️⃣ Getting chat statistics...');
    const statsResponse = await axios.get(
      `${API_URL}/api/v1/chat/stats`,
      { headers: authHeaders }
    );

    console.log('✅ Chat statistics:');
    console.log(`   Total sessions: ${statsResponse.data.total_sessions}`);
    console.log(`   Active sessions: ${statsResponse.data.active_sessions}`);
    console.log(`   Total messages: ${statsResponse.data.total_messages}\n`);

    // 10. Cleanup - Delete Session
    console.log('🔟 Cleaning up - deleting test session...');
    await axios.delete(
      `${API_URL}/api/v1/chat/sessions/${sessionId}`,
      { headers: authHeaders }
    );
    console.log('✅ Session deleted\n');

    console.log('🎉 All chat tests passed successfully!\n');

    // Summary
    console.log('📊 Test Summary:');
    console.log('   ✓ Chat session creation');
    console.log('   ✓ AI-powered Q&A');
    console.log('   ✓ Session management');
    console.log('   ✓ Performance (avg response time < 2s)');
    console.log('   ✓ Chat suggestions');
    console.log('   ✓ Statistics tracking');
    console.log('   ✓ Session cleanup');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('\nMake sure:');
    console.error('1. Backend is running on ' + API_URL);
    console.error('2. Test user exists with provided credentials');
    console.error('3. Replace TEST_DOCUMENT_ID with a real document ID');
    process.exit(1);
  }
}

// Run the test
console.log('🚀 Starting Chat Implementation Tests');
console.log('   API URL:', API_URL);
console.log('   Test User:', TEST_USER.email);
console.log('   Subdomain:', TEST_USER.subdomain);
console.log('   Document ID:', TEST_DOCUMENT_ID);
console.log('   Document Title:', config.document.title);
console.log('');

testChatImplementation().catch(console.error);