import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate by UI', async ({ page }) => {
  const email = "uwe.reimer@hotmail.com"
  
    // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill(email);
  await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
//   await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});