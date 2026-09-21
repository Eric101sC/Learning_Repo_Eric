import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});

test('add item to cart', async ({ page }) => {
  // Add item to cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});