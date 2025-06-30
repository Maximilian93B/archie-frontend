#!/usr/bin/env node

const axios = require('axios');

// Get Windows host IP from /etc/resolv.conf
const fs = require('fs');
const resolv = fs.readFileSync('/etc/resolv.conf', 'utf8');
const match = resolv.match(/nameserver\s+(\d+\.\d+\.\d+\.\d+)/);
const windowsHostIP = match ? match[1] : '172.24.32.1';

// Possible backend URLs to try
const urls = [
  `http://${windowsHostIP}:8080`,  // Windows host IP from WSL2
  'http://host.docker.internal:8080',  // Docker Desktop special hostname
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://[::1]:8080',  // IPv6 localhost
];

async function testConnection() {
  console.log('🔍 Testing backend connectivity...\n');
  
  for (const url of urls) {
    try {
      console.log(`Testing ${url}/health...`);
      const response = await axios.get(`${url}/health`, { timeout: 5000 });
      console.log(`✅ SUCCESS: ${url} is reachable!`);
      console.log(`Response:`, response.data);
      console.log(`\n🎉 Backend API is accessible at: ${url}`);
      console.log(`\nUpdate your .env.local file:`);
      console.log(`NEXT_PUBLIC_API_URL=${url}`);
      return;
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
    }
  }
  
  console.log('\n❌ Could not connect to backend API');
  console.log('\nPossible solutions:');
  console.log('1. Check if Docker containers are running: docker ps');
  console.log('2. Check Docker logs: docker logs archivus-api');
  console.log('3. Try accessing from Windows browser: http://localhost:8080/health');
  console.log('4. If using WSL2, you may need to use the Windows host IP');
}

testConnection();