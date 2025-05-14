import { test, expect } from '../fixtures';
import { goToProfilePage, login } from "./utils/utils";
import { getRandomUserToFollow, getRandomUserToUnfollow } from "./utils/userApi";

test.describe("Follow Related Tests", () => {
  test("Follow User Test", async ({ authRequest, page }) => {
    const searchUser = await getRandomUserToFollow(authRequest);

    await login(page);
    await page.getByRole("link", { name: "See Users" }).click();
    await page.getByRole("textbox", { name: "Search" }).fill(searchUser);
    await page.getByRole("textbox", { name: "Search" }).press("Enter");
    await page.getByRole("link", { name: searchUser }).click();
    await page.getByRole("button", { name: "Follow +", exact: true }).click();

    await goToProfilePage(page);
    await page.locator("#following").click();
    await expect(page.getByRole("link", { name: searchUser, exact: true })).toBeVisible();
  });

  test("Unfollow User Test", async ({ authRequest, page }) => {
    const searchUser = await getRandomUserToUnfollow(authRequest);
    await login(page);
    await goToProfilePage(page);
    await page.locator("#following").click();
    await page.getByRole("link", { name: searchUser, exact: true }).click();
    await page.getByRole("button", { name: "Following", exact: true }).click();

    await goToProfilePage(page);
    await page.locator("#following").click();
    await expect(page.getByRole("link", { name: searchUser, exact: true })).not.toBeVisible();
  });
});
