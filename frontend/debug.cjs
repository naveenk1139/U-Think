const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  try {
    console.log('Navigating...');
    await page.goto('http://localhost:3000/pathways/after-10th/puc/science', { waitUntil: 'networkidle2' });
    console.log('Loaded.');
    await new Promise(r => setTimeout(r, 2000));
  } catch(e) {
    console.error('FAILED TO LOAD:', e);
  } finally {
    await browser.close();
  }
})();
