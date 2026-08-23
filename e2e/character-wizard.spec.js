import { test, expect } from '@playwright/test';
import { DND_DATA } from '../src/data/dndData.js';

const pairedRaceId = Object.keys(DND_DATA.pairings)[0];
const pairedClassId = Object.keys(DND_DATA.pairings[pairedRaceId])[0];
const pairedRace = DND_DATA.races.find((r) => r.id === pairedRaceId);
const pairedClass = DND_DATA.classes.find((c) => c.id === pairedClassId);
const pairedResult = DND_DATA.pairings[pairedRaceId][pairedClassId];

const selectButton = (page, name) => page.getByRole('button', { name: new RegExp(`Select ${name}`) });

test.describe('character wizard', () => {
  test('walks from race pick through class pick to the synergy review', async ({ page }) => {
    await page.goto('/');

    await page.getByText(pairedRace.name, { exact: true }).click();
    await expect(page.getByRole('heading', { name: pairedRace.name, level: 2 })).toBeVisible();
    await selectButton(page, pairedRace.name).click();

    await expect(page.getByText(pairedClass.name, { exact: true })).toBeVisible();
    await page.getByText(pairedClass.name, { exact: true }).click();
    await selectButton(page, pairedClass.name).click();

    await expect(page.getByText(pairedResult.summary)).toBeVisible();
  });

  test('preserves picks when navigating back to an earlier step', async ({ page }) => {
    await page.goto('/');

    await page.getByText(pairedRace.name, { exact: true }).click();
    await selectButton(page, pairedRace.name).click();
    await page.getByText(pairedClass.name, { exact: true }).click();
    await selectButton(page, pairedClass.name).click();
    await expect(page.getByText(pairedResult.summary)).toBeVisible();

    await page.getByRole('button', { name: 'Race step' }).click();

    await expect(page.getByText(pairedRace.name, { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Review step' })).toBeEnabled();
  });

  test('closes an open card detail on Escape without confirming a pick', async ({ page }) => {
    const race = DND_DATA.races[0];
    await page.goto('/');

    await page.getByText(race.name, { exact: true }).click();
    await expect(page.getByText(race.description)).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.getByText(race.description)).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Class step' })).toBeDisabled();
  });
});
