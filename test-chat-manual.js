#!/usr/bin/env node

/**
 * Manual chat test with existing credentials
 */

const axios = require('axios');

async function testChatManually() {
  console.log('🧪 Manual Chat Test\n');
  console.log('Please provide your existing Archivus credentials:\n');

  const API_URL = 'http://172.24.32.1:8080';
  
  // You need to update these with your actual test credentials
  const TEST_USER = {
    email: 'maxgodwin5@gmail.com',  // Update with your email
    password: 'Maxy0@llah',          // Update with your password
    subdomain: 'maxgodwin5'          // Update with your subdomain
  };

  try {
    // 1. Login
    console.log('1️⃣ Logging in...');
    const loginRes = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    }, {
      headers: {
        'X-Tenant-Subdomain': TEST_USER.subdomain
      }
    });
    
    const token = loginRes.data.token;
    console.log('✅ Login successful');
    console.log('');

    // 2. Get documents
    console.log('2️⃣ Getting documents...');
    const docsRes = await axios.get(`${API_URL}/api/v1/documents?page=1&page_size=10`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-Subdomain': TEST_USER.subdomain
      }
    });
    
    if (docsRes.data.data && docsRes.data.data.length > 0) {
      console.log('✅ Found', docsRes.data.data.length, 'documents\n');
      
      // Use first document for chat test
      const testDoc = docsRes.data.data[0];
      const documentId = testDoc.id;
      
      console.log('3️⃣ Using document for chat test:');
      console.log('   ID:', documentId);
      console.log('   Title:', testDoc.title || testDoc.file_name);
      console.log('   Status:', testDoc.status);
      console.log('');
      
      // 3. Create chat session
      console.log('4️⃣ Creating chat session...');
      const sessionRes = await axios.post(
        `${API_URL}/api/v1/chat/sessions`,
        {
          document_id: documentId,
          session_name: 'Test Chat - ' + new Date().toISOString()
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-Subdomain': TEST_USER.subdomain
          }
        }
      );
      
      const sessionId = sessionRes.data.session.id;
      console.log('✅ Chat session created:', sessionId);
      console.log('');
      
      // 4. Ask a question
      console.log('5️⃣ Asking a test question...');
      const startTime = Date.now();
      const questionRes = await axios.post(
        `${API_URL}/api/v1/chat/sessions/${sessionId}/ask`,
        {
          question: 'What is the main topic or purpose of this document?'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-Subdomain': TEST_USER.subdomain
          }
        }
      );
      
      const responseTime = Date.now() - startTime;
      console.log('✅ AI Response received!');
      console.log('   Response time:', responseTime, 'ms');
      console.log('   Answer preview:', questionRes.data.answer.substring(0, 200) + '...');
      console.log('');
      
      // 5. Test instructions
      console.log('📋 NEXT STEPS:');
      console.log('═══════════════');
      console.log('');
      console.log('1. Open the chat test UI:');
      console.log('   http://localhost:3000/dashboard/chat/test');
      console.log('');
      console.log('2. Login with:');
      console.log('   Email:', TEST_USER.email);
      console.log('   Password:', TEST_USER.password);
      console.log('   Subdomain:', TEST_USER.subdomain);
      console.log('');
      console.log('3. Use this document ID in the test interface:');
      console.log('   ', documentId);
      console.log('');
      console.log('4. Or load this existing session:');
      console.log('   ', sessionId);
      console.log('');
      console.log('✅ Chat API is working correctly!');
      
    } else {
      console.log('❌ No documents found. Please upload a document first.');
      console.log('');
      console.log('To test chat, you need at least one document:');
      console.log('1. Login to Archivus');
      console.log('2. Upload a document with AI processing enabled');
      console.log('3. Wait for processing to complete');
      console.log('4. Run this test again');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   URL:', error.config?.url);
    }
    
    console.log('\nTroubleshooting:');
    console.log('1. Make sure backend is running');
    console.log('2. Update the TEST_USER credentials in this script');
    console.log('3. Verify the subdomain is correct');
  }
}

// Run test
testChatManually().catch(console.error);