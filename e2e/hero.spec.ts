import { expect, test, type Page } from "@playwright/test";

/** Scroll to a multiple of the viewport height. */
async function scrollToScreens(page: Page, screens: number) {
  await expect
    .poll(() =>
      page.evaluate((screens) => {
        const y = Math.round(screens * window.innerHeight);
        window.scrollTo(0, y);
        return Math.abs(window.scrollY - y);
      }, screens),
    )
    .toBeLessThan(2);
}

/** Bounding box of "CREATIVE ✦" + "DEVELOPER", relative to the viewport. */
function mergedTitle(page: Page) {
  return page.getByTestId("hero-title").evaluate((el) => {
    const rects = [...el.children].map((child) => child.getBoundingClientRect());
    const left = Math.min(...rects.map((r) => r.left));
    const right = Math.max(...rects.map((r) => r.right));
    const top = Math.min(...rects.map((r) => r.top));
    const bottom = Math.max(...rects.map((r) => r.bottom));

    return {
      offCenterX: Math.round(Math.abs((left + right) / 2 - window.innerWidth / 2)),
      offCenterY: Math.round(Math.abs((top + bottom) / 2 - window.innerHeight / 2)),
      overflow: Math.round(Math.max(0, right - left - window.innerWidth)),
    };
  });
}

const centeredAndFits = { offCenterX: 0, offCenterY: 0, overflow: 0 };
const roughly = (box: Awaited<ReturnType<typeof mergedTitle>>) => ({
  offCenterX: box.offCenterX <= 4 ? 0 : box.offCenterX,
  offCenterY: box.offCenterY <= 8 ? 0 : box.offCenterY,
  overflow: box.overflow,
});

test("hero title merges into one centered line that fits the screen", async ({
  page,
}) => {
  await page.goto("/en");
  // The intro resets scroll to the top on mount and locks Lenis until it finishes
  await expect(page.getByTestId("intro-curtain")).toBeHidden();

  // 1.5 screens = end of the footer pin, where the merge animation completes
  await scrollToScreens(page, 1.5);
  await expect.poll(async () => roughly(await mergedTitle(page))).toEqual(centeredAndFits);
});

test("hero title stays centered after a resize mid-animation", async ({
  page,
  isMobile,
}) => {
  // Mobile emulation keeps innerWidth fixed on resize, so no resize event fires there
  test.skip(isMobile, "needs a desktop context to emulate a real resize");

  await page.goto("/en");
  await expect(page.getByTestId("intro-curtain")).toBeHidden();

  // Resizing triggers a ScrollTrigger refresh while the merge is half done.
  // Shrinking to phone width also crosses the md breakpoint (different font sizes).
  await scrollToScreens(page, 0.75);
  await page.setViewportSize({ width: 390, height: page.viewportSize()!.height });
  await page.waitForTimeout(500);
  await scrollToScreens(page, 1.5);
  await expect.poll(async () => roughly(await mergedTitle(page))).toEqual(centeredAndFits);
});

test("hero has no horizontal overflow", async ({ page }) => {
  await page.goto("/en");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBe(0);
});
