import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const BRAVE = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

const html = path.join(root, 'public/cv/targeted/roda/cover-letter-roda.html');
const pdf  = path.join(root, 'public/cv/targeted/roda/Hanner Barros — Carta de Motivacion — Roda.pdf');

const browser = await puppeteer.launch({
  executablePath: BRAVE,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.goto(`file:///${html.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 15000 });
await page.pdf({
  path: pdf,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: false,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await page.close();
await browser.close();
console.log('PDF generado:', path.basename(pdf));
