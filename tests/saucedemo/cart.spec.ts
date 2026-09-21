import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});

test('adds Sauce Labs Backpack to the cart', async ({ page }) => {
  // Add item to cart

    const backpack = page
     .getByTestId('inventory-item')
     .filter({ hasText: 'Sauce Labs Backpack' });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
});