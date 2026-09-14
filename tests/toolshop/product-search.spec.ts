import { test, expect } from '@playwright/test';

test('search returns Thor Hammer', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('navigation').filter({ hasText: 'Home Categories Hand' }).click();
  await page.locator('[data-test="search-query"]').fill('hammer');
  await page.locator('[data-test="search-query"]').press('Enter');

  const thorHammer = page
    .locator('[data-test="product-name"]')
    .filter({ hasText: 'Thor Hammer' })
    .first();

  await expect(thorHammer).toBeVisible();
  await expect(thorHammer).toHaveText('Thor Hammer');
});
