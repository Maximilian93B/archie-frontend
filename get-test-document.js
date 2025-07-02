const axios = require('axios');

async function getTestDocument() {
  try {
    // Login first
    const loginRes = await axios.post('http://localhost:8080/api/v1/auth/login', {
      email: 'maxgodwin5@gmail.com',
      password: 'Maxy0@llah'
    }, {
      headers: {
        'X-Tenant-Subdomain': 'test'
      }
    });
    
    const token = loginRes.data.token;
    console.log('✓ Login successful');
    
    // Get documents
    const docsRes = await axios.get('http://localhost:8080/api/v1/documents?page=1&page_size=5', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-Subdomain': 'test'
      }
    });
    
    if (docsRes.data.data && docsRes.data.data.length > 0) {
      console.log('\n📄 Available Documents:');
      docsRes.data.data.forEach(doc => {
        console.log(`- ID: ${doc.id}`);
        console.log(`  Title: ${doc.title || doc.file_name}`);
        console.log(`  Status: ${doc.status}`);
        console.log('');
      });
      
      console.log(`\n✅ Use one of these document IDs for chat testing!`);
      console.log(`Example: ${docsRes.data.data[0].id}`);
    } else {
      console.log('No documents found. Please upload a document first.');
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

getTestDocument();