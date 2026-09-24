import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('cart is empty after login', async ({ page }) => {
    await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
  });

  test('adds Sauce Labs Backpack to the cart', { tag: '@smoke' }, async ({ page }) => {
    const backpack = page
      .getByTestId('inventory-item')
      .filter({ hasText: 'Sauce Labs Backpack' });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('removes Sauce Labs Backpack from the cart', async ({ page }) => {
    const backpack = page
      .getByTestId('inventory-item')
      .filter({ hasText: 'Sauce Labs Backpack' });

    await test.step('add backpack', async () => {
      await backpack.getByRole('button', { name: 'Add to cart' }).click();
      await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
      await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
    });

    await test.step('remove backpack', async () => {
      await backpack.getByRole('button', { name: 'Remove' }).click();
      await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
      await expect(backpack.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    });
  });
});