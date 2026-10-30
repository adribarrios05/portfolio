import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' });
for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
  if (name === 'desktop') {
    await page.goto('http://127.0.0.1:4321/projects/data-inspector/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'artifacts/case-study.png', fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log('Screenshots saved in artifacts/');
