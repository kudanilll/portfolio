import { expect, test } from "@playwright/test";

// The about photo appears through RevealImage's WebGL pixel grid, then the
// <img> takes over again: CSS scales the canvas bitmap (blurry), while the
// browser draws the <img> sharp. No WebGL error may be thrown (a lost
// context after a StrictMode remount used to throw on every frame).
test("about photo reveals through WebGL, then shows the sharp original", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByTestId("intro-curtain")).toBeHidden();

  const photo = page.locator("#about img:visible");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo.locator("xpath=following-sibling::canvas[1]")).toHaveCSS("opacity", "0");
  await expect(photo).toHaveCSS("opacity", "1");
  // Served as is, not compressed a second time by the image optimizer
  expect(await photo.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(
    /\/assets\/images\/achmad-daniel\.webp$/,
  );
  expect(errors).toEqual([]);
});

test("the dots near the pointer swell", async ({ page, isMobile }) => {
  test.skip(isMobile, "hover only");
  await page.goto("/");
  await expect(page.getByTestId("intro-curtain")).toBeHidden();

  const dots = page.locator("#about svg:visible:has(circle)");
  await dots.scrollIntoViewIfNeeded();
  const box = (await dots.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 });

  // The radius grows from 0.9 for the dots nearest the pointer
  const swollen = () =>
    dots
      .locator("circle")
      .evaluateAll((circles) => circles.filter((c) => Number(c.getAttribute("r")) > 1.5).length);
  await expect.poll(swollen).toBeGreaterThan(0);
  await page.mouse.move(0, 0, { steps: 3 });
  await expect.poll(swollen).toBe(0);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("about photo stays a plain image", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("intro-curtain")).toBeHidden();
    const photo = page.locator("#about img:visible");
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toHaveCSS("opacity", "1");
  });
});
