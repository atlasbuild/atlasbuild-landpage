import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("home page loads and can navigate to login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Boilerplate/i);

    await page.getByRole("link", { name: /log in/i }).click();

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText("Enter your credentials")).toBeVisible();
  });
});
