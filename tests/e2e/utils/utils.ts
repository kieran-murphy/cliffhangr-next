import { expect, Page } from '@playwright/test';
import { testUser } from '../data/testuser';

export function sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export const goToProfilePage = async (page: Page) => {
    page.getByRole('button', { name: testUser.username }).click()
    await sleep(1);
    await expect(page.getByRole('button', { name: testUser.username })).toBeVisible();
}

export const login = async (page: Page) => {
    await page.goto('/');
    await page.locator('#email').fill(testUser.email);
    await page.locator('#password').fill(testUser.password);
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('button', { name: testUser.username })).toBeVisible();
}