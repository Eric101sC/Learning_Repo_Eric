import { test, expect } from '@playwright/test';

test('search for hammer', async ({ page }) => {
  await page.goto('/');
  const searchBox = page.getByTestId('search-query');
  await searchBox.fill('hammer');
  await searchBox.press('Enter');

  await expect(page.getByTestId('search-term')).toHaveText('hammer');
 await expect(page.getByTestId('product-name').filter({ hasText: 'Claw Hammer with Shock Reduction Grip' })).toBeVisible();
  await expect(page.getByTestId('product-name').filter({ hasText: 'Thor Hammer' })).toBeVisible();
});