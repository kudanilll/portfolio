import { expect, test, type Page } from "@playwright/test";

const title = (page: Page) => page.getByRole("heading", { name: "Selected works" });
const fill = (page: Page) =>
  title(page).evaluate((el) => getComputedStyle(el).getPropertyValue("--fill"));

async function openHome(page: Page) {
  await page.goto("/en");
  await expect(page.getByTestId("intro-curtain")).toBeHidden();
}

test("title fills white with the pinned horizontal scroll (desktop)", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "desktop pins the section");
  await openHome(page);

  // The pin lasts as long as the track overflows the viewport
  const { top, distance } = await title(page).evaluate((el) => {
    const section = el.parentElement!;
    const track = section.querySelector("article")!.parentElement!;
    return {
      top: section.getBoundingClientRect().top + scrollY,
      distance: track.scrollWidth - innerWidth,
    };
  });

  await page.evaluate((y) => window.scrollTo(0, y), top);
  await expect.poll(() => fill(page)).toBe("0%");

  await page.evaluate((y) => window.scrollTo(0, y), top + distance);
  await expect.poll(() => fill(page)).toBe("100%");
});

test("title fills white with the horizontal swipe (mobile)", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile swipes the track natively");
  await openHome(page);
  await title(page).scrollIntoViewIfNeeded();
  await expect.poll(() => fill(page)).toBe("0%");

  await title(page).evaluate((el) => {
    const scroller = el.nextElementSibling!;
    scroller.scrollLeft = scroller.scrollWidth;
  });
  await expect.poll(() => fill(page)).toBe("100%");
});
