import { test, expect } from "@playwright/test";
import { getRandomReviewWithComments, getRandomShowToReview } from "./utils/userApi";
import { getRandomReaction, goToProfilePage, login } from "./utils/utils";
import { getRandomShow } from "./utils/showApi";
import { testUser } from './data/testuser';
import { faker } from "@faker-js/faker";

test.describe("Review Related Tests", () => {
  test("Create Review Test", async ({ request, page }) => {
    const showToSearch = await getRandomShowToReview(request);

    await login(page);
    await page.getByRole("link", { name: "See Shows" }).click();
    await page.getByRole("textbox", { name: "Search" }).fill(showToSearch);
    await page.getByRole("textbox", { name: "Search" }).press("Enter");
    await page.getByRole("link", { name: showToSearch }).click();
    await page.getByText('Write a Review').click();

    await page.getByRole('textbox', { name: 'Your review here' }).fill('Test Review');
    await page.getByText('★').nth(4).click();
    await page.getByText('Create', { exact: true }).click();
    await goToProfilePage(page);
    await page.locator('#user-tabs').locator('#reviews').click();
    await expect(page.getByRole("link", { name: showToSearch })).toBeVisible();
  });

  test("Comment On Review Test", async ({ request, page }) => {
    const commentText = faker.word.words(10);
    const commentUsername = testUser.username;
    const reviewId = await getRandomReviewWithComments(request);

    await login(page);
    await page.goto(`/review/${reviewId}`);
    await page.getByRole('textbox', { name: 'Your comment here' }).click();
    await page.getByRole('textbox', { name: 'Your comment here' }).fill(commentText);
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('#comment').getByText(commentUsername)).toBeVisible();
    await expect(page.locator('#comment').getByText(commentText)).toBeVisible();
  });

  test("React On Review Test", async ({ request, page }) => {
    const reaction = getRandomReaction();
    const reactUsername = testUser.username;
    const reviewId = await getRandomReviewWithComments(request);

    await login(page);
    await page.goto(`/review/${reviewId}`);
    await page.getByRole('button', { name: reaction }).click();
    await page.locator('#see-reacts').click();
    await expect(page.getByText(`${reaction} - ${reactUsername}`)).toBeVisible();
  });
});
