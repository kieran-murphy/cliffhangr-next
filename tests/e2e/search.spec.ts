import { test, expect } from '../fixtures';
import { login } from './utils/utils';
import { getRandomUser } from './utils/userApi';
import { getRandomShow } from './utils/showApi';

test.describe('Search Related Tests', () => {
  test('Search User Test', async ({ authRequest, page }) => {
    const searchUser = await getRandomUser(authRequest);

    await login(page);
    await page.getByRole('link', { name: 'See Users' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill(searchUser);
    await page.getByRole('textbox', { name: 'Search' }).press('Enter');
    await expect(page.getByRole('link', { name: searchUser })).toBeVisible();
  });

  test('Search Show Test', async ({ authRequest, page }) => {
    const searchShow = await getRandomShow(authRequest);

    await login(page);
    await page.getByRole('link', { name: 'See Shows' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill(searchShow);
    await page.getByRole('textbox', { name: 'Search' }).press('Enter');
    await expect(page.getByRole('link', { name: searchShow })).toBeVisible();
  });
});