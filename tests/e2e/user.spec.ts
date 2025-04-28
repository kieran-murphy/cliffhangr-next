import { test, expect } from '@playwright/test';
import { login } from './utils/login';
import { testUser } from './data/testuser';

test.describe('User Related Tests', () => {
  test('Username Change Test', async ({ page }) => {
    
    const originalUsername = testUser.username;
    const updatedUsername = testUser.username + '1';

    await login(page);
    await page.getByRole('button', { name: 'testuser' }).click();

    await page.getByRole('button', { name: 'Edit my profile' }).click();
    await page.getByRole('textbox').first().fill(updatedUsername);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('heading', { name: updatedUsername, exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: updatedUsername, exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Edit my profile' }).click();
    await page.getByRole('textbox').first().fill(originalUsername);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('heading', { name: originalUsername, exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: originalUsername, exact: true })).toBeVisible();
  });
});