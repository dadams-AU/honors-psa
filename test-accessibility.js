const pa11y = require('pa11y');
const fs = require('fs');
const path = require('path');

async function testAccessibility() {
  const files = ['index.html', 'paa.html', 'psa.html'];
  
  console.log('🔍 Running accessibility tests on HTML files...\n');
  
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    const fileUrl = `file://${filePath}`;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Testing: ${file}`);
    console.log('='.repeat(60));
    
    try {
      const results = await pa11y(fileUrl, {
        standard: 'WCAG2AA',
        includeWarnings: true,
        includeNotices: false
      });
      
      if (results.issues.length === 0) {
        console.log(`✅ No accessibility issues found!`);
      } else {
        console.log(`\n⚠️  Found ${results.issues.length} issue(s):\n`);
        
        results.issues.forEach((issue, index) => {
          const icon = issue.type === 'error' ? '❌' : '⚠️';
          console.log(`${icon} Issue ${index + 1} [${issue.type.toUpperCase()}]`);
          console.log(`   Code: ${issue.code}`);
          console.log(`   Message: ${issue.message}`);
          console.log(`   Context: ${issue.context}`);
          console.log(`   Selector: ${issue.selector}`);
          console.log('');
        });
      }
    } catch (error) {
      console.error(`❌ Error testing ${file}:`, error.message);
    }
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log('✅ Accessibility testing complete!');
  console.log('='.repeat(60));
}

testAccessibility();
