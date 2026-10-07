import { expect, test } from "@playwright/test";

// The three roles are sized in vw and must fit on one line at every width
// (on laptops the fixed 12rem indent used to push "CREATIVE DEVELOPER" out).
for (const width of [320, 390, 768, 1280, 1440, 1920]) {
  test(`services lines fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en");
    await expect(page.getByTestId("intro-curtain")).toBeHidden();

    // Measure the settled layout: before the reveal, the characters sit
    // shifted sideways (clipped by the section) and would count as overflow
    await page.evaluate(() => {
      const top = document.getElementById("services")!.getBoundingClientRect().top + scrollY;
      window.scrollTo(0, top + innerHeight / 2);
    });
    await expect
      .poll(() =>
        page
          .locator("#services h2")
          .evaluateAll((lines) => lines.map((line) => line.scrollWidth - line.clientWidth)),
      )
      .toEqual([0, 0, 0]);
  });
}

// Per-character reveal (SplitText): every character must stay hidden until its
// line scrolls into view, including after the ScrollTrigger refresh on load,
// and every character must be fully shown once the section has been passed.
test("services characters reveal on scroll", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByTestId("intro-curtain")).toBeHidden();

  // Transforms (the slide and skew) are ignored on inline boxes
  const displays = await page
    .locator("#services h2 span")
    .evaluateAll((spans) => [
      ...new Set(
        spans
          .filter((span) => span.textContent?.length === 1)
          .map((span) => getComputedStyle(span).display),
      ),
    ]);
  expect(displays).toEqual(["inline-block"]);

  const opacities = () =>
    page
      .locator("#services h2 span")
      .evaluateAll((spans) =>
        spans
          .filter((span) => span.textContent?.length === 1)
          .map((span) => Number(getComputedStyle(span).opacity)),
      );
  const scrollToServices = (screens: number) =>
    page.evaluate((screens) => {
      const top = document.getElementById("services")!.getBoundingClientRect().top + scrollY;
      window.scrollTo(0, top + screens * innerHeight);
    }, screens);

  // Section top at the viewport bottom: no line has reached its start yet
  await scrollToServices(-1);
  await expect.poll(async () => Math.max(...(await opacities()))).toBe(0);

  await scrollToServices(0.5);
  await expect.poll(async () => Math.min(...(await opacities()))).toBe(1);

  // Screen readers get the whole heading, not single letters
  await expect(page.locator("#services h2").first()).toHaveAttribute(
    "aria-label",
    "FRONTEND SPECIALIST",
  );
});
