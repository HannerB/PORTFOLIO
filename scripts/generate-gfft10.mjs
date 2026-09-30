import puppeteer from 'puppeteer-core';

const BRAVE = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
const html = 'C:/Users/Usuario/Downloads/gfft10-diligenciado-hanner.html';
const pdf = 'C:/Users/Usuario/Downloads/gfft10-diligenciado-hanner.pdf';

const browser = await puppeteer.launch({
  executablePath: BRAVE,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.goto(`file:///${html}`, { waitUntil: 'networkidle0', timeout: 15000 });
await page.pdf({
  path: pdf,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: false,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await page.close();
await browser.close();
console.log('generated:', pdf);
