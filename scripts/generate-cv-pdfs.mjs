import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const BRAVE = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

const CVS = [
  {
    html: path.join(root, 'public/cv/general/Hanner-Barros-CV-EN.html'),
    pdf:  path.join(root, 'public/cv/general/Hanner Barros — Full Stack Developer.pdf'),
  },
  {
    html: path.join(root, 'public/cv/general/Hanner-Barros-CV-ES.html'),
    pdf:  path.join(root, 'public/cv/general/Hanner Barros — Desarrollador Full Stack.pdf'),
  },
];

const browser = await puppeteer.launch({
  executablePath: BRAVE,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const { html, pdf } of CVS) {
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
  console.log('generated:', path.basename(pdf));
}

await browser.close();
