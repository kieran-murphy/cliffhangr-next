import { expect, Page } from '@playwright/test';
import { testUser } from '../data/testuser';

export const goToProfilePage = async (page: Page) => {
    page.getByRole('button', { name: testUser.username }).click()
    await expect(page.getByRole('button', { name: testUser.username })).toBeVisible();
}

export const login = async (page: Page) => {
    await page.goto('/');
    await page.locator('#email').fill(testUser.email);
    await page.locator('#password').fill(testUser.password);
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('button', { name: testUser.username })).toBeVisible();
}