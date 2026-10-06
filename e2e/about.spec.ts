import { expect, test } from "@playwright/test";

// The about photo is drawn by RevealImage's WebGL canvas: once in view the
// canvas covers the <img>, which is hidden, and no WebGL error is thrown
// (a lost context after a StrictMode remount used to throw on every frame).
test("about photo reveals through its WebGL canvas", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/en");
  await expect(page.getByTestId("intro-curtain")).toBeHidden();

  const photo = page.locator("#about img:visible");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveCSS("opacity", "0");
  await expect(photo.locator("xpath=following-sibling::canvas[1]")).toHaveCSS("opacity", "1");
  expect(errors).toEqual([]);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("about photo stays a plain image", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByTestId("intro-curtain")).toBeHidden();
    const photo = page.locator("#about img:visible");
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toHaveCSS("opacity", "1");
  });
});
