import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // await page.getByTestId('username').fill('standard_user');              
  // await page.getByTestId('password').fill('secret_sauce');
  // await page.getByTestId('login-button').click();
   await expect(page).toHaveURL('/inventory.html');
   await expect(page.getByText('Products')).toBeVisible();
});
