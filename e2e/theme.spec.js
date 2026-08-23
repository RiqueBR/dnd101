import { test, expect } from '@playwright/test';

const getTheme = (page) => page.evaluate(() => document.documentElement.getAttribute('data-theme'));

test('toggling the theme flips the page theme and persists it across a reload', async ({ page }) => {
  await page.goto('/');
  const initialTheme = await getTheme(page);
  const toggle = page.getByRole('button', { name: /Switch to (light|dark) theme/ });

  await toggle.click();

  const toggledTheme = await getTheme(page);
  expect(toggledTheme).not.toBe(initialTheme);
  expect(await page.evaluate(() => localStorage.getItem('dnd101-theme'))).toBe(toggledTheme);

  await page.reload();

  expect(await getTheme(page)).toBe(toggledTheme);
});
