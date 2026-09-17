import { test, expect } from '@playwright/test';

test('search returns Thor Hammer', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByTestId('search-query').fill('hammer');
  await page.getByTestId('search-query').press('Enter');

  const thorHammer = page
    .getByTestId('product-name')
    .filter({ hasText: 'Thor Hammer' })
    .first();

  await expect(thorHammer).toBeVisible();
  await expect(thorHammer).toHaveText('Thor Hammer');
});
