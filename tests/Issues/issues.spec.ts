import { test, expect, Page } from '@playwright/test';

import { format } from 'date-fns';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
});


test.describe('create Issue', () => {

  const TestID = Math.floor(Math.random() * 100000).toString()

test('create Issue', async ({ page }) => {

  const toastMsg= page.getByRole("status")

  await page.getByLabel('Issues').click();
  await page.getByLabel('NewIssue').click();
  await page.getByPlaceholder('Task Name').click();
  await page.getByPlaceholder('Task Name').fill(TestID);
  await page.getByPlaceholder('Task Name').press('Tab');
  await page.getByPlaceholder('Description').fill('Test '+format(new Date(),"yyyy-MM-dd"));
  await page.getByLabel('Priority').fill('1');
  await page.getByRole('button', { name: 'Create' }).click();

 //check toast message
 await expect(toastMsg).toBeVisible()
 await expect(toastMsg).toContainText("created")

  //check that the page returns to dashboard
  await expect(page).toHaveURL(/.*pending/);
});
test('modify Issue', async ({ page }) => {

  const toastMsg= page.getByRole("status")
  const rows = page.locator('table tbody tr')

  await page.getByLabel('Issues').click();
  await page.getByLabel('0').getByRole('link').click();
  await page.getByPlaceholder('Notes').click();
  await page.getByPlaceholder('Notes').fill('Updated via Test');
  await page.getByRole('button', { name: 'Change' }).click();


 //check toast message
 await expect(toastMsg).toBeVisible()
 await expect(toastMsg).toContainText("updated")

  //check that the page returns to dashboard
  await expect(page).toHaveURL(/.*issues/);
});

test('complete Issue', async ({ page }) => {
  const toastMsg= page.getByRole("status")
  const rows = page.locator('table tbody tr')
  const initalCount = rows.count 

  await page.getByLabel('Issues').click();
  await page.getByLabel('0').getByRole('link').click();
  await page.getByLabel('Status').selectOption('COMPLETED');
  await page.getByRole('button', { name: 'Change' }).click();

  //check toast message
 await expect(toastMsg).toBeVisible()
 await expect(toastMsg).toContainText("updated")

  //check that the page returns to dashboard
  await expect(page).toHaveURL(/.*issues/);
});



});
