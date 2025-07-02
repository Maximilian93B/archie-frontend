#!/usr/bin/env node

/**
 * Setup script for testing chat implementation
 * This will help us get proper test data for the chat feature
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://172.24.32.1:8080';

// Test data for individual registration
const TEST_USER = {
  email: 'chattest@example.com',
  password: 'ChatTest123!',
  first_name: 'Chat',
  last_name: 'TestUser',
  company: '', // Empty for individual users
  registration_type: 'individual'
};

async function setupChatTest() {
  console.log('🚀 Setting up Chat Test Environment\n');
  
  try {
    // 1. Check backend health
    console.log('1️⃣ Checking backend health...');
    const healthRes = await axios.get(`${API_URL}/health`);
    console.log('✅ Backend is healthy:', healthRes.data.status);
    console.log('   Version:', healthRes.data.version);
    console.log('');

    // 2. Register test user (individual)
    console.log('2️⃣ Registering individual test user...');
    let subdomain;
    let token;
    
    try {
      const registerRes = await axios.post(`${API_URL}/api/v1/auth/register`, TEST_USER);
      subdomain = registerRes.data.tenant.subdomain;
      token = registerRes.data.token;
      console.log('✅ User registered successfully');
      console.log('   Subdomain:', subdomain);
      console.log('   User ID:', registerRes.data.user.id);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('⚠️  User already exists, attempting login...');
        
        // Get subdomain first
        const lookupRes = await axios.post(`${API_URL}/api/v1/auth/lookup-subdomain`, {
          email: TEST_USER.email
        });
        
        if (lookupRes.data.subdomains.length > 0) {
          subdomain = lookupRes.data.subdomains[0].subdomain;
          console.log('   Found subdomain:', subdomain);
          
          // Login with subdomain
          const loginRes = await axios.post(`${API_URL}/api/v1/auth/login`, {
            email: TEST_USER.email,
            password: TEST_USER.password
          }, {
            headers: {
              'X-Tenant-Subdomain': subdomain
            }
          });
          
          token = loginRes.data.token;
          console.log('✅ Login successful');
        } else {
          throw new Error('No subdomain found for user');
        }
      } else {
        throw error;
      }
    }
    
    console.log('');

    // 3. Create a test document
    console.log('3️⃣ Creating test document...');
    
    // Create a simple text file
    const testContent = `
# Test Document for Chat

This is a test document for the Archivus chat feature.

## Key Information
- Document created for testing AI chat functionality
- Contains sample content for Q&A testing
- Created on: ${new Date().toISOString()}

## Sample Content
The Archivus platform provides intelligent document management with AI-powered features including:
1. Automatic document processing
2. AI-generated summaries and insights
3. Intelligent search capabilities
4. Conversational AI for document Q&A

## Test Questions
You can ask questions like:
- What is this document about?
- What are the key features mentioned?
- When was this document created?
- Summarize the main points
    `.trim();

    // Create FormData for file upload
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('file', Buffer.from(testContent), {
      filename: 'test-document.md',
      contentType: 'text/markdown'
    });
    formData.append('enable_ai_processing', 'true');

    const uploadRes = await axios.post(
      `${API_URL}/api/v1/documents/upload`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': subdomain,
          ...formData.getHeaders()
        }
      }
    );

    const documentId = uploadRes.data.document.id;
    console.log('✅ Document uploaded successfully');
    console.log('   Document ID:', documentId);
    console.log('   Processing status:', uploadRes.data.document.status);
    console.log('');

    // 4. Wait for AI processing
    console.log('4️⃣ Waiting for AI processing...');
    let processingComplete = false;
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max

    while (!processingComplete && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const docRes = await axios.get(
        `${API_URL}/api/v1/documents/${documentId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-Subdomain': subdomain
          }
        }
      );
      
      if (docRes.data.document.status === 'processed') {
        processingComplete = true;
        console.log('✅ Document processing complete');
        console.log('   AI Summary:', docRes.data.document.ai_summary?.substring(0, 100) + '...');
      } else {
        process.stdout.write('.');
        attempts++;
      }
    }
    
    if (!processingComplete) {
      console.log('\n⚠️  Document processing timed out, but you can still test chat');
    }
    console.log('');

    // 5. Save test configuration
    console.log('5️⃣ Saving test configuration...');
    const testConfig = {
      apiUrl: API_URL,
      user: {
        email: TEST_USER.email,
        password: TEST_USER.password,
        subdomain: subdomain
      },
      document: {
        id: documentId,
        title: 'test-document.md'
      },
      token: token,
      createdAt: new Date().toISOString()
    };

    fs.writeFileSync(
      path.join(__dirname, 'chat-test-config.json'),
      JSON.stringify(testConfig, null, 2)
    );
    
    console.log('✅ Test configuration saved to chat-test-config.json');
    console.log('');

    // 6. Display test instructions
    console.log('📋 TEST INSTRUCTIONS:');
    console.log('═══════════════════');
    console.log('');
    console.log('1. Open the chat test page:');
    console.log('   http://localhost:3000/dashboard/chat/test');
    console.log('');
    console.log('2. Use these credentials:');
    console.log('   Email:', TEST_USER.email);
    console.log('   Password:', TEST_USER.password);
    console.log('   Subdomain:', subdomain);
    console.log('');
    console.log('3. In the test interface, use:');
    console.log('   Document ID:', documentId);
    console.log('');
    console.log('4. Test these chat features:');
    console.log('   ✓ Ask "What is this document about?"');
    console.log('   ✓ Ask "What are the key features?"');
    console.log('   ✓ Test markdown responses');
    console.log('   ✓ Test rate limiting (send 11 messages quickly)');
    console.log('   ✓ Test draft saving (type and refresh)');
    console.log('   ✓ Test virtual scrolling (send many messages)');
    console.log('');
    console.log('5. Automated test script:');
    console.log('   Update TEST_DOCUMENT_ID in test-chat-implementation.js');
    console.log('   Then run: node test-chat-implementation.js');
    console.log('');

  } catch (error) {
    console.error('❌ Setup failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   URL:', error.config?.url);
    }
    process.exit(1);
  }
}

// Run setup
setupChatTest().catch(console.error);