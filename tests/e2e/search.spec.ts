import { test, expect } from '@playwright/test';
import { login } from './utils/utils';
import { getRandomUser } from './utils/userApi';
import { getRandomShow } from './utils/showApi';

test.describe('Search Related Tests', () => {
  test('Search User Test', async ({ request, page }) => {
    const searchUser = await getRandomUser(request);

    await login(page);
    await page.getByRole('link', { name: 'See Users' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill(searchUser);
    await page.getByRole('textbox', { name: 'Search' }).press('Enter');
    await expect(page.getByRole('link', { name: searchUser })).toBeVisible();
  });

  test('Search Show Test', async ({ request, page }) => {
    const searchShow = await getRandomShow(request);

    await login(page);
    await page.getByRole('link', { name: 'See Shows' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill(searchShow);
    await page.getByRole('textbox', { name: 'Search' }).press('Enter');
    await expect(page.getByRole('link', { name: searchShow })).toBeVisible();
  });
});