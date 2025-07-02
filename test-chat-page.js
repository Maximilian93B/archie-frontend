const puppeteer = require('puppeteer');

async function testChatPage() {
  console.log('🧪 Testing Chat Page...\n');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set auth token
    await page.evaluateOnNewDocument((token) => {
      localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          accessToken: token,
          user: { id: '123', email: 'test@example.com' },
          isAuthenticated: true
        }
      }));
    }, 'test-token');
    
    // Navigate to chat page
    console.log('📍 Navigating to chat page...');
    await page.goto('http://localhost:3000/dashboard/chat', {
      waitUntil: 'networkidle0'
    });
    
    // Wait for page to load
    await page.waitForTimeout(2000);
    
    // Check for empty state
    const emptyStateText = await page.$eval('body', el => el.textContent);
    
    if (emptyStateText.includes('Start a New Chat')) {
      console.log('✅ Empty state displayed correctly');
      
      // Try to click Choose Document button
      const chooseDocButton = await page.$('button:has-text("Choose Document")');
      if (chooseDocButton) {
        console.log('✅ Choose Document button found');
        
        await chooseDocButton.click();
        await page.waitForTimeout(1000);
        
        // Check if dialog opened
        const dialogTitle = await page.$('h2:has-text("Select Document for Chat")');
        if (dialogTitle) {
          console.log('✅ Document picker dialog opened');
        } else {
          console.log('❌ Document picker dialog did not open');
        }
      } else {
        console.log('❌ Choose Document button not found');
      }
    } else {
      console.log('❌ Empty state not displayed');
    }
    
    // Take screenshot
    await page.screenshot({ path: 'chat-page-test.png' });
    console.log('\n📸 Screenshot saved as chat-page-test.png');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
    console.log('\n✨ Test completed');
  }
}

// Check if server is running
fetch('http://localhost:3000')
  .then(() => testChatPage())
  .catch(() => {
    console.error('❌ Server not running. Please run: npm run dev');
    process.exit(1);
  });