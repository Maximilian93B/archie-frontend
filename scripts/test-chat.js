#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}🧪 Running Chat Feature Tests${colors.reset}\n`);

// Define test suites
const testSuites = [
  {
    name: 'Chat Error Handling',
    path: 'src/lib/__tests__/chat-errors.test.ts'
  },
  {
    name: 'Rate Limit Indicator',
    path: 'src/components/chat/__tests__/rate-limit-indicator.test.tsx'
  },
  {
    name: 'Chat Input Component',
    path: 'src/components/chat/__tests__/chat-input.test.tsx'
  },
  {
    name: 'Chat API Client',
    path: 'src/lib/api/__tests__/chat.test.ts'
  },
  {
    name: 'Message Pagination Hook',
    path: 'src/hooks/__tests__/use-message-pagination.test.ts'
  },
  {
    name: 'Chat Integration',
    path: 'src/__tests__/integration/chat-integration.test.tsx'
  }
];

let totalPassed = 0;
let totalFailed = 0;

// Function to run a single test suite
function runTestSuite(suite, index) {
  return new Promise((resolve) => {
    console.log(`${colors.blue}[${index + 1}/${testSuites.length}] Testing: ${suite.name}${colors.reset}`);
    
    const testProcess = spawn('npm', ['test', '--', '--run', suite.path], {
      stdio: 'pipe',
      shell: true
    });

    let output = '';
    let errorOutput = '';

    testProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    testProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    testProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`${colors.green}✅ ${suite.name} - PASSED${colors.reset}`);
        totalPassed++;
      } else {
        console.log(`${colors.red}❌ ${suite.name} - FAILED${colors.reset}`);
        totalFailed++;
        
        // Show error details
        if (output.includes('FAIL') || errorOutput) {
          console.log(`${colors.yellow}Error details:${colors.reset}`);
          console.log(output.slice(-500)); // Show last 500 chars of output
        }
      }
      console.log(''); // Empty line for readability
      resolve();
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      testProcess.kill();
      console.log(`${colors.red}❌ ${suite.name} - TIMEOUT${colors.reset}\n`);
      totalFailed++;
      resolve();
    }, 30000);
  });
}

// Run all tests sequentially
async function runAllTests() {
  console.log(`Running ${testSuites.length} test suites...\n`);
  
  const startTime = Date.now();
  
  for (let i = 0; i < testSuites.length; i++) {
    await runTestSuite(testSuites[i], i);
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  // Summary
  console.log(`${colors.cyan}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.cyan}Test Summary${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(50)}${colors.reset}`);
  console.log(`Total Suites: ${testSuites.length}`);
  console.log(`${colors.green}Passed: ${totalPassed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${totalFailed}${colors.reset}`);
  console.log(`Duration: ${duration}s`);
  console.log(`${colors.cyan}${'='.repeat(50)}${colors.reset}`);
  
  // Exit with appropriate code
  process.exit(totalFailed > 0 ? 1 : 0);
}

// Alternative: Run specific test suite
const args = process.argv.slice(2);
if (args.length > 0) {
  const suiteName = args[0];
  const suite = testSuites.find(s => 
    s.name.toLowerCase().includes(suiteName.toLowerCase()) ||
    s.path.includes(suiteName)
  );
  
  if (suite) {
    console.log(`Running specific test: ${suite.name}\n`);
    runTestSuite(suite, 0).then(() => {
      process.exit(totalFailed > 0 ? 1 : 0);
    });
  } else {
    console.log(`${colors.red}Test suite not found: ${suiteName}${colors.reset}`);
    console.log('\nAvailable test suites:');
    testSuites.forEach(s => console.log(`  - ${s.name}`));
    process.exit(1);
  }
} else {
  runAllTests();
}