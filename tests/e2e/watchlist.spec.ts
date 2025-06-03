import { test, expect } from '../fixtures';
import { getRandomShowToWatchlist, getRandomShowToUnwatchlist } from './utils/userApi';
import { goToProfilePage, login } from './utils/utils';

test.describe('Watchlist Related Tests', () => {
  test('Add Show To Watchlist Test', async ({ authRequest, page }) => {
    const showToSearch = await getRandomShowToWatchlist(authRequest);

    await login(page);
    await page.getByRole('link', { name: 'See Shows' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill(showToSearch);
    await page.getByRole('textbox', { name: 'Search' }).press('Enter');
    await page.getByRole('link', { name: showToSearch }).click();
    await page.getByRole('button', { name: 'Add to watchlist', exact: true }).click();

    await goToProfilePage(page);
    await page.getByText('Watchlist').click();
    await expect(page.getByRole('link', { name: showToSearch, exact: true })).toBeVisible();
  });

  test('Remove Show From Watchlist Test', async ({ authRequest, page }) => {
    const showToSearch = await getRandomShowToUnwatchlist(authRequest);
    await login(page);
    await goToProfilePage(page);
    await page.getByText('Watchlist').click();
    await page.getByRole('link', { name: showToSearch, exact: true }).click();
    await page.getByRole('button', { name: 'Remove from watchlist', exact: true }).click();

    await goToProfilePage(page);
    await page.getByText('Watchlist').click();
    await expect(page.getByRole('link', { name: showToSearch, exact: true })).not.toBeVisible();
  });
});
