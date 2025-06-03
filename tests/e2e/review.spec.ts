import { test, expect } from '../fixtures';
import {
  getRandomReviewWithComments,
  getRandomReviewWithoutComments,
  getRandomShowToReview,
} from './utils/userApi';
import { getRandomReaction, goToProfilePage, login } from './utils/utils';
import { testUser } from './data/testuser';
import { faker } from '@faker-js/faker';

test.describe('Review Related Tests', () => {
  test('Create Review Test', async ({ authRequest, page }) => {
    const showToSearch = await getRandomShowToReview(authRequest);

    await login(page);
    await page.getByRole('link', { name: 'See Shows' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill(showToSearch);
    await page.getByRole('textbox', { name: 'Search' }).press('Enter');
    await page.getByRole('link', { name: showToSearch }).click();
    await page.getByText('Write a Review').click();

    await page.getByRole('textbox', { name: 'Your review here' }).fill('Test Review');
    await page.getByText('★').nth(4).click();
    await page.getByText('Create', { exact: true }).click();
    await goToProfilePage(page);
    await page.locator('#user-tabs').locator('#reviews').click();
    await expect(page.getByRole('link', { name: showToSearch })).toBeVisible();
  });

  test('Comment On Review Test', async ({ authRequest, page }) => {
    const commentText = faker.word.words(10);
    const reviewId = await getRandomReviewWithComments(authRequest);

    await login(page);
    await page.goto(`/review/${reviewId}`);
    await page.getByRole('textbox', { name: 'Your comment here' }).click();
    await page.getByRole('textbox', { name: 'Your comment here' }).fill(commentText);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('#comment').getByText(commentText)).toBeVisible();
  });

  test('React On Review Test', async ({ authRequest, page }) => {
    const reaction = getRandomReaction();
    const reactUsername = testUser.username;
    const reviewId = await getRandomReviewWithComments(authRequest);

    await login(page);
    await page.goto(`/review/${reviewId}`);
    await page.getByRole('button', { name: reaction }).click();
    await page.locator('#see-reacts').click();
    await expect(page.getByText(`${reaction} - ${reactUsername}`)).toBeVisible();
  });

  test('Delete Review Test', async ({ authRequest, page }) => {
    const reviewId = await getRandomReviewWithoutComments(authRequest);
    await login(page);
    await page.goto(`/review/${reviewId}`);
    await page.getByRole('button', { name: 'Delete Review', exact: true }).click();
    await expect(page.getByText('Write a Review')).toBeVisible();
  });
});
