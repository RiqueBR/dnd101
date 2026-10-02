import { test, expect } from '@playwright/test';

test.describe('encounter builder', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByText('Encounter').click();
    await expect(page.getByRole('heading', { name: 'Encounter Builder', level: 2 })).toBeVisible();
  });

  test('adding a monster updates the difficulty meter and the encounter list', async ({ page }) => {
    await expect(page.getByText('No monsters yet')).toBeVisible();

    await page.getByPlaceholder('Search by name or type').fill('Goblin');
    await page.getByRole('button', { name: 'Add Goblin' }).click();

    await expect(page.getByText('No monsters yet')).not.toBeVisible();
    await expect(page.getByText('Trivial')).toBeVisible();
    await expect(page.getByText(/CR 1\/4/)).toBeVisible();

    await page.getByRole('button', { name: 'Clear', exact: true }).click();

    await expect(page.getByText('No monsters yet')).toBeVisible();
    await expect(page.getByText('Add monsters from the list, or roll a random encounter below.')).toBeVisible();
  });

  test('rolling a random encounter fills the encounter list for the chosen difficulty and terrain', async ({ page }) => {
    await page.getByRole('button', { name: 'Easy', exact: true }).click();
    await page.getByLabel('Terrain for random encounter').selectOption('Forest');
    await page.getByRole('button', { name: /Roll/ }).click();

    await expect(page.getByText('No monsters yet')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear', exact: true })).toBeVisible();
  });

  test('persists the party and encounter across a reload', async ({ page }) => {
    await page.getByPlaceholder('Search by name or type').fill('Goblin');
    await page.getByRole('button', { name: 'Add Goblin' }).click();
    await expect(page.getByText(/CR 1\/4/)).toBeVisible();

    await page.reload();

    await expect(page.getByRole('heading', { name: 'Encounter Builder', level: 2 })).toBeVisible();
    await expect(page.getByText(/CR 1\/4/)).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('dnd101-encounter-list'))).toContain('goblin');
  });
});
