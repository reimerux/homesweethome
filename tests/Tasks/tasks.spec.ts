import { test, expect } from '@playwright/test';
import { add, format } from 'date-fns';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
});


test.describe('schedule Task', () => {


  test('schedule Task', async ({ page }) => {

    const toastMsg = page.getByRole("status")

    await page.getByLabel('Tasks').click();
    await page.getByLabel('ScheduleTask').click();
    await page.locator('#startdate').fill(format(add(new Date(), { days: 1 }), "yyyy-MM-dd"));
    await page.getByRole('button', { name: 'Schedule' }).click();


    //check toast message
    await expect(toastMsg).toBeVisible()

    //check that the page returns to dashboard
    await expect(page).toHaveURL(/.*dashboard/);

  });

  test('push Task', async ({ page }) => {
    const toastMsg = page.getByRole("status")

    await page.getByLabel('Tasks').click();
    await page.getByLabel('0').getByLabel('Push').click();
    await page.getByRole('button', { name: 'Push' }).click();

    //check toast message
    await expect(toastMsg).toBeVisible()
    await expect(toastMsg).toContainText("pushed")

    //check that the page returns to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('complete Task', async ({ page }) => {
    const toastMsg = page.getByRole("status")

    await page.getByLabel('Tasks').click();
    await page.getByLabel('0').getByLabel('Complete').click();
    await page.getByRole('button', { name: 'Complete' }).click();

    //check toast message
    await expect(toastMsg).toBeVisible()
    await expect(toastMsg).toContainText("completed")


    //check that the page returns to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
