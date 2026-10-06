import { expect, test } from "@playwright/test";

test("root redirects to the negotiated locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("home page exposes core SEO tags", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/en$/,
  );
  await expect(page.locator('script[type="application/ld+json"]')).not.toHaveCount(0);
});

test("Lenis scrolls the page once the intro finishes", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html.lenis")).toBeAttached();

  // Lenis is stopped while the intro curtain plays, so keep wheeling until it lets go
  await page.mouse.move(400, 400);
  await expect
    .poll(async () => {
      await page.mouse.wheel(0, 400);
      return page.evaluate(() => window.scrollY);
    })
    .toBeGreaterThan(0);
});
