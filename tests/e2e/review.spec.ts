import { test, expect } from "@playwright/test";
import { getRandomShowToReview } from "./utils/userApi";
import { goToProfilePage, login } from "./utils/utils";

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
});
