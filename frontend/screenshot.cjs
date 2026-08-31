const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    console.log('Navigating...');
    await page.goto('http://localhost:3000/pathways/after-10th/puc/science', { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('Loaded.');
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot saved to screenshot.png');
  } catch(e) {
    console.error('FAILED TO LOAD:', e);
  } finally {
    await browser.close();
  }
})();
