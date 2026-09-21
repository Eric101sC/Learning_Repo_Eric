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

test('slow user can still login', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('performance_glitch_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // await page.getByTestId('username').fill('standard_user');              
  // await page.getByTestId('password').fill('secret_sauce');
  // await page.getByTestId('login-button').click();
   await expect(page).toHaveURL('/inventory.html');
   await expect(page.getByText('Products')).toBeVisible({timeout: 10000});
});

test('locked user cannot login', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
   await expect(page).not.toHaveURL('/inventory.html');
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();

});