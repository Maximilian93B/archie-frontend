#!/usr/bin/env node

/**
 * Frontend integration test runner
 * Tests the frontend components against the real backend
 */

const { spawn } = require('child_process');
const axios = require('axios');

const FRONTEND_URL = 'http://localhost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://172.24.32.1:8080';

async function waitForService(url, name, maxAttempts = 30) {
  console.log(`⏳ Waiting for ${name} to be ready...`);
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await axios.get(url);
      console.log(`✅ ${name} is ready!`);
      return true;
    } catch (error) {
      process.stdout.write('.');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error(`${name} did not start within ${maxAttempts} seconds`);
}

async function runTests() {
  console.log('🚀 Starting Frontend Integration Tests\n');

  // Check if backend is running
  try {
    await waitForService(`${API_URL}/health`, 'Backend API', 5);
  } catch (error) {
    console.error('❌ Backend is not running!');
    console.log('\nPlease start the backend with: docker-compose up');
    process.exit(1);
  }

  // Check if frontend is running
  try {
    await waitForService(FRONTEND_URL, 'Frontend', 5);
  } catch (error) {
    console.log('⚠️  Frontend is not running, starting it now...');
    
    // Start frontend in background
    const frontend = spawn('npm', ['run', 'dev'], {
      detached: true,
      stdio: 'ignore'
    });
    frontend.unref();
    
    // Wait for frontend to start
    await waitForService(FRONTEND_URL, 'Frontend', 60);
  }

  console.log('\n📋 Running test suites...\n');

  // Run authentication flow tests
  console.log('1️⃣  Testing Authentication Flow');
  try {
    const authTest = spawn('node', ['scripts/test-auth-flow.js'], {
      stdio: 'inherit'
    });
    
    await new Promise((resolve, reject) => {
      authTest.on('close', code => {
        if (code === 0) resolve();
        else reject(new Error(`Auth tests failed with code ${code}`));
      });
    });
  } catch (error) {
    console.error('❌ Authentication tests failed');
    process.exit(1);
  }

  // Run document flow tests
  console.log('\n2️⃣  Testing Document Management Flow');
  try {
    const docTest = spawn('node', ['scripts/test-documents-flow.js'], {
      stdio: 'inherit'
    });
    
    await new Promise((resolve, reject) => {
      docTest.on('close', code => {
        if (code === 0) resolve();
        else reject(new Error(`Document tests failed with code ${code}`));
      });
    });
  } catch (error) {
    console.error('❌ Document tests failed');
    process.exit(1);
  }

  // Run Vitest integration tests
  console.log('\n3️⃣  Running Vitest Integration Tests');
  try {
    const vitest = spawn('npm', ['test', '--', '--run'], {
      stdio: 'inherit'
    });
    
    await new Promise((resolve, reject) => {
      vitest.on('close', code => {
        if (code === 0) resolve();
        else reject(new Error(`Vitest tests failed with code ${code}`));
      });
    });
  } catch (error) {
    console.error('❌ Vitest tests failed');
    process.exit(1);
  }

  console.log('\n🎉 All integration tests passed!\n');
  
  // Test Summary
  console.log('📊 Test Summary:');
  console.log('  ✅ Backend API is healthy');
  console.log('  ✅ Frontend is running');
  console.log('  ✅ Authentication flow works');
  console.log('  ✅ Document management works');
  console.log('  ✅ Component tests pass');
  
  console.log('\n💡 Next steps:');
  console.log('  - Test OAuth login flow manually');
  console.log('  - Test file upload with different file types');
  console.log('  - Test error scenarios (network failures, etc.)');
  console.log('  - Run performance tests');
}

// Run the tests
runTests().catch(error => {
  console.error('\n💥 Test runner failed:', error.message);
  process.exit(1);
});