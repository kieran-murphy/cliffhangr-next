import { test, expect } from '../fixtures';
import { goToProfilePage, login } from './utils/utils';
import { testUser } from './data/testuser';
import { faker } from '@faker-js/faker';

test.describe('User Related Tests', () => {
  test('Username Change Test', async ({ page }) => {
    const originalUsername = testUser.username;
    const updatedUsername = testUser.username + '1';

    await login(page);
    await goToProfilePage(page);

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

  test('Register User Test', async ({ page }) => {
    const newUsername = faker.internet.userName();
    const newEmail = newUsername + '@cliffhangr.com';
    const newPassword = faker.internet.password();

    await page.goto('/');

    // Register a new user
    await page.getByRole('link', { name: 'Register' }).click();
    await page.locator('#username').click();
    await page.locator('#username').fill(newUsername);
    await page.locator('#email').click();
    await page.locator('#email').fill(newEmail);
    await page.locator('#password').click();
    await page.locator('#password').fill(newPassword);
    await page.locator('#confirmpassword').click();
    await page.locator('#confirmpassword').fill(newPassword);
    await page.getByRole('button', { name: 'Register' }).click();

    // Login with the new user
    await page.goto('/');
    await page.locator('#email').fill(newEmail);
    await page.locator('#password').fill(newPassword);
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('button', { name: newUsername })).toBeVisible();
  });
});
