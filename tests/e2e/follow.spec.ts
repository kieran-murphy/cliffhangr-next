import { test, expect } from "@playwright/test";
import { login } from "./utils/login";
import { testUser } from "./data/testuser";
import { getRandomUser, getRandomUserToFollow } from "./utils/userApi";

test.describe("Follow Related Tests", () => {
  test("Follow User Test", async ({ request, page }) => {
    const searchUser = await getRandomUserToFollow(request);

    await login(page);
    await page.getByRole("link", { name: "See Users" }).click();
    await page.getByRole("textbox", { name: "Search" }).fill(searchUser);
    await page.getByRole("textbox", { name: "Search" }).press("Enter");
    await page.getByRole("link", { name: searchUser }).click();
    await page.getByRole("button", { name: "Follow +", exact: true }).click();

    await page.getByRole("button", { name: testUser.username }).click();
    await page.locator("#following").click();
    await expect(page.getByRole("link", { name: searchUser, exact: true })).toBeVisible();
  });
});
