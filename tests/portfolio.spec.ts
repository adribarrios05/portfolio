import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('home, contact and project case studies are navigable', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Adrián');
  await expect(page.locator('main section[data-section]')).toHaveCount(5);
  await expect(page.locator('a[href="mailto:adribarrios3205@gmail.com"]').first()).toHaveAttribute('href', 'mailto:adribarrios3205@gmail.com');
  for (const slug of ['analytio', 'simple-calendar', 'parkify']) {
    await page.goto(`/projects/${slug}/`);
    await expect(page.getByRole('heading', { name: 'Qué permite hacer', exact: true })).toBeVisible();
    await expect(page.locator('.architecture-flow li')).toHaveCount(4);
    await expect(page.locator('figcaption')).toContainText(slug === 'simple-calendar' ? 'Captura del proyecto' : 'ilustrativa');
    await page.getByRole('link', { name: '← VOLVER A PROYECTOS' }).click();
    await expect(page).toHaveURL(/\/#projects$/);
  }
  expect(errors).toEqual([]);
});

test('navigation follows sections and mobile menu supports keyboard', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const menu = page.locator('.menu-toggle');
  if (isMobile) {
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await page.locator('#primary-nav').getByRole('link', { name: 'Formación', exact: true }).click();
  await expect(page).toHaveURL(/#education$/);
  await expect(page.locator('[data-nav="education"]')).toHaveAttribute('aria-current', 'location');
  if (isMobile) await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('all pages fit narrow viewports and respect reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/projects/analytio/', '/projects/simple-calendar/', '/projects/parkify/']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');
      expect(await page.locator('h1').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
    }
  }
});

test('pages meet automated WCAG A and AA checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/', '/projects/analytio/', '/projects/simple-calendar/', '/projects/parkify/', '/404.html']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
});

test('progressive enhancement keeps content and navigation usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.locator('#primary-nav')).toBeVisible();
  await expect(page.locator('#projects h2')).toBeVisible();
  await page.locator('#primary-nav').getByRole('link', { name: 'Proyectos', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await context.close();
});

test('scroll reveals content and changing motion preference makes it visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const heading = page.locator('#projects .section-heading');
  await expect(heading).toHaveClass(/will-reveal/);
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toHaveClass(/is-visible/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#contact [data-reveal]').first()).toHaveCSS('opacity', '1');
});

test('SEO assets and sitemap exist', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Adrián Barrios/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /https:\/\//);
  for (const asset of ['/favicon.svg', '/og.png', '/sitemap.xml', '/robots.txt']) {
    expect((await request.get(asset)).ok()).toBe(true);
  }
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/projects/analytio/');
});

test('CV download serves the original PDF and education and work are completed', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#experience')).toContainText('Cosmic Futures');
  await expect(page.locator('#experience')).toContainText('Marzo 2025 – agosto 2025');
  await expect(page.locator('#education')).toContainText('CPIFP Alan Turing');
  await expect(page.locator('#education')).toContainText('Digitech FP');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Descargar CV', exact: true }).first().click();
  const download = await downloadPromise;
  expect(await download.failure()).toBeNull();
  const path = await download.path();
  expect(path).not.toBeNull();
  const served = await readFile(path!);
  const original = await readFile('public/cv.pdf');
  expect(served.subarray(0, 5).toString()).toBe('%PDF-');
  expect(createHash('sha256').update(served).digest('hex')).toBe(createHash('sha256').update(original).digest('hex'));
});
