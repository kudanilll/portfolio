import { expect, test, type Page } from "@playwright/test";

const title = (page: Page) => page.getByRole("heading", { name: "Selected works" });
const fill = (page: Page) =>
  title(page).evaluate((el) => getComputedStyle(el).getPropertyValue("--fill"));

async function openHome(page: Page) {
  await page.goto("/");
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
    const section = el.closest("section")!;
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

  // One extra screen of scroll holds the finished row in place (still pinned)
  const titleTop = async () => Math.round((await title(page).boundingBox())!.y);
  const pinnedTop = await titleTop();
  await page.evaluate((y) => window.scrollTo(0, y + innerHeight * 0.9), top + distance);
  await expect.poll(titleTop).toBe(pinnedTop);
});

test("works stack vertically and reveal lime first (mobile)", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile lists the works vertically");
  await openHome(page);

  // Plain white title (no scroll fill on mobile)
  expect(await fill(page)).toBe("100%");

  // Cards follow each other down the page, nothing scrolls sideways
  const cardTops = await page
    .locator("article")
    .evaluateAll((cards) => cards.map((card) => card.getBoundingClientRect().top));
  expect(cardTops).toEqual([...cardTops].sort((a, b) => a - b));
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);

  // Mid-reveal, the lime panel is ahead of the image (less of it is clipped)
  const card = page.locator("article").first();
  await card.evaluate((el) => {
    window.scrollTo(0, el.getBoundingClientRect().top + scrollY - innerHeight * 0.65);
  });
  await expect
    .poll(() =>
      card.evaluate((el) => {
        const panel = el.querySelector("[data-reveal-panel]")!;
        const inset = (node: Element) =>
          parseFloat(getComputedStyle(node).clipPath.replace("inset(", "")) || 0;
        return inset(panel) < inset(panel.nextElementSibling!);
      }),
    )
    .toBe(true);
});
