import { test, expect } from '@playwright/test';

const DESKTOP_SECTIONS = ['Character Builder', 'Encounter', 'Ability Scores', 'Actions', 'Anatomy of a Round', 'Spells'];

test.describe('desktop navigation', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('lists all 6 sections directly in the nav and switches between them', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');

    for (const label of DESKTOP_SECTIONS) {
      await expect(nav.getByText(label)).toBeVisible();
    }
    await expect(nav.getByText('Rules')).not.toBeVisible();

    await nav.getByText('Encounter').click();
    await expect(page.getByRole('heading', { name: 'Encounter Builder', level: 2 })).toBeVisible();

    await nav.getByText('Spells').click();
    await expect(page.getByRole('heading', { name: 'Spells', level: 2 })).toBeVisible();

    await nav.getByText('Actions').click();
    await expect(page.getByRole('heading', { name: 'Actions', level: 2 })).toBeVisible();
  });

  test('keeps the active section after a reload', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByText('Spells').click();
    await expect(page.getByRole('heading', { name: 'Spells', level: 2 })).toBeVisible();

    await page.reload();

    await expect(page.getByRole('heading', { name: 'Spells', level: 2 })).toBeVisible();
  });
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('folds the Rules children under one nav item with a sub-tab bar to switch between them', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');

    await expect(nav.getByText('Rules')).toBeVisible();
    await expect(nav.getByText('Ability Scores')).not.toBeVisible();

    await nav.getByText('Rules').click();
    await expect(page.getByRole('heading', { name: 'Ability Scores', level: 2 })).toBeVisible();

    await page.getByRole('button', { name: 'Actions' }).click();
    await expect(page.getByRole('heading', { name: 'Actions', level: 2 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Anatomy of a Round' })).toBeVisible();
  });
});
