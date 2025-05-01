import { test, expect } from "@playwright/test";
import { getRandomShowToFavourite, getRandomShowToUnfavourite } from "./utils/userApi";
import { goToProfilePage, login } from "./utils/utils";

test.describe("Favourite Related Tests", () => {
  test("Favourite Show Test", async ({ request, page }) => {
    const showToSearch = await getRandomShowToFavourite(request);

    await login(page);
    await page.getByRole("link", { name: "See Shows" }).click();
    await page.getByRole("textbox", { name: "Search" }).fill(showToSearch);
    await page.getByRole("textbox", { name: "Search" }).press("Enter");
    await page.getByRole("link", { name: showToSearch }).click();
    await page.getByRole("button", { name: "Favorite", exact: true }).click();

    await goToProfilePage(page);
    await page.getByText('Favourites').click();
    await expect(page.getByRole("link", { name: showToSearch, exact: true })).toBeVisible();
  });

  test("Unfavourite Show Test", async ({ request, page }) => {
      const showToSearch = await getRandomShowToUnfavourite(request);
      await login(page);
      await goToProfilePage(page);
      await page.getByText('Favourites').click();
      await page.getByRole("link", { name: showToSearch, exact: true }).click();
      await page.getByRole("button", { name: "Unfavorite", exact: true }).click();
  
      await goToProfilePage(page);
      await page.getByText('Favourites').click();
      await expect(page.getByRole("link", { name: showToSearch, exact: true })).not.toBeVisible();
    });
});
