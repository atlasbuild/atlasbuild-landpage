import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("root redirects to default locale (/en)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page).toHaveTitle(/AtlasBuild/i);
  });

  test("localized routes respond with 200", async ({ page }) => {
    const enResponse = await page.goto("/en");
    expect(enResponse?.status()).toBe(200);
    await expect(page).toHaveURL(/\/en\/?$/);

    const ptResponse = await page.goto("/pt");
    expect(ptResponse?.status()).toBe(200);
    await expect(page).toHaveURL(/\/pt\/?$/);
  });

  test("invalid locale-like path shows app 404 page", async ({ page }) => {
    const response = await page.goto("/es");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: "404" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Back to Home|Voltar ao Início/i }),
    ).toBeVisible();
  });
});
