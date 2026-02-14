import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("root redirects to default locale (/en)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page).toHaveTitle(/AtlasBuild/i);
  });

  test("localized homepage exposes canonical and hreflang metadata", async ({
    page,
    baseURL,
  }) => {
    await page.goto("/en");

    const seoLinks = await page.evaluate(() => {
      const canonical =
        document.querySelector('link[rel="canonical"]')?.getAttribute("href") ??
        "";
      const hreflangs = Array.from(
        document.querySelectorAll('link[rel="alternate"][hreflang]'),
      ).map((node) => ({
        hreflang: node.getAttribute("hreflang"),
        href: node.getAttribute("href"),
      }));

      return { canonical, hreflangs };
    });

    expect(seoLinks.canonical).toBe(`${baseURL}/en`);
    expect(seoLinks.hreflangs).toEqual(
      expect.arrayContaining([
        { hreflang: "en", href: `${baseURL}/en` },
        { hreflang: "pt", href: `${baseURL}/pt` },
      ]),
    );
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

  test("navigation controls have accessible labels", async ({ page }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("combobox", { name: "Select language" }),
    ).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(
      page.getByRole("button", { name: "Open navigation menu" }),
    ).toBeVisible();
  });
});
