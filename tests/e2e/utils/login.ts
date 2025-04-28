import { expect, Page } from '@playwright/test';

export const login = async (page: Page) => {
    const userDetails = {
        username: 'testuser',
        email: 'testuser@cliffhangr.com',
        password: 'password',
    }

    await page.goto('/');
    await expect(page).toHaveTitle('cliffhangr');
    
    await page.locator('#email').fill(userDetails.email);
    await page.locator('#password').fill(userDetails.password);
    await page.locator('button[type="submit"]').click();

    await expect(page.getByRole('button', { name: userDetails.username })).toBeVisible();
}