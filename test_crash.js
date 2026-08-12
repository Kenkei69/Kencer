const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  console.log("Navigating to http://localhost:5173/");
  await page.goto('http://localhost:5173/');
  
  console.log("Waiting for View Work button...");
  await page.waitForSelector('a[href="/work"]');
  
  console.log("Clicking View Work...");
  await page.click('a[href="/work"]');
  
  console.log("Waiting 3 seconds...");
  await new Promise(r => setTimeout(r, 3000));
  
  await browser.close();
})();
