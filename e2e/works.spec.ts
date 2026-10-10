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

test("a work's hover image loads on the first hover only (desktop)", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "hover only");
  await openHome(page);

  await title(page).evaluate((el) => {
    window.scrollTo(0, el.closest("section")!.getBoundingClientRect().top + scrollY);
  });
  const figure = page.locator("article figure").first();
  const canvas = figure.locator("canvas");
  // Nothing set up (no WebGL, no hover image download) before a hover
  await expect(canvas).toHaveCSS("opacity", "0");

  const box = (await figure.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });

  // With a GPU the WebGL reveal takes over; on a software renderer (headless
  // Chrome without a GPU) the effect is skipped and the plain image stays
  const hardware = await page.evaluate(() => {
    const gl = document.createElement("canvas").getContext("webgl");
    const info = gl?.getExtension("WEBGL_debug_renderer_info");
    const name = gl ? String(gl.getParameter(info?.UNMASKED_RENDERER_WEBGL ?? gl.RENDERER)) : "";
    return !!gl && !/swiftshader|llvmpipe|software|basic render/i.test(name);
  });
  if (hardware) await expect(canvas).toHaveCSS("opacity", "1");
  else {
    await page.waitForTimeout(1000);
    await expect(canvas).toHaveCSS("opacity", "0");
    await expect(figure.locator("img")).toBeVisible();
  }
});
