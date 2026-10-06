import { expect, test } from "@playwright/test";

// The three roles are sized in vw and must fit on one line at every width
// (on laptops the fixed 12rem indent used to push "CREATIVE DEVELOPER" out).
for (const width of [320, 390, 768, 1280, 1440, 1920]) {
  test(`services lines fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");
    await expect(page.getByTestId("intro-curtain")).toBeHidden();

    const overflow = await page
      .locator("#services h2")
      .evaluateAll((lines) => lines.map((line) => line.scrollWidth - line.clientWidth));
    expect(overflow).toEqual([0, 0, 0]);
  });
}
