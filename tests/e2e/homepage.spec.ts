import { test, expect } from '@playwright/test';

test('homepage has expected title', async ({ page }) => {
    // Go to your homepage
    await page.goto('/');

    // Check the page title
    await expect(page).toHaveTitle('cliffhangr');
});