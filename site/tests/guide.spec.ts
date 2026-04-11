import { expect, Locator, Page, test } from "@playwright/test";
import { slugify } from "../src/utils/slugify";

const getFilename = (parts: (string | number)[]) =>
  parts
    .map((p) => (typeof p === "number" ? String(p).padStart(2, "0") : slugify(p)))
    .join("-");

async function waitForRender(loc: Locator) {
  // Wait until the subtree has been DOM-stable for two animation frames.
  // Handles chains of React useEffect re-renders (e.g. auto-selected branches
  // triggering further renders) by resetting the timer on each mutation.
  await loc.evaluate((el) =>
    new Promise<void>((resolve) => {
      let rafId: number;
      const done = () => {
        observer.disconnect();
        resolve();
      };
      const schedule = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => requestAnimationFrame(done));
      };
      const observer = new MutationObserver(schedule);
      observer.observe(el, { childList: true, subtree: true });
      schedule();
    })
  );
}

async function expandAll(loc: Locator) {
  const buttons = loc.getByRole("button", { name: "+" });
  while ((await buttons.count()) > 0) {
    await buttons.first().click();
    await waitForRender(loc);
  }
}

async function getSnapshot(
  card: Locator,
  parts: (string | number)[],
  cardIndex: { value: number }
): Promise<void> {
  for (const branch of await card.locator("[data-branch]").all()) {
    if ((await branch.locator('[aria-pressed="true"]').count()) === 0) {
      const options = await branch.locator("[aria-pressed]").all();
      for (const option of options) {
        await option.click();
        await waitForRender(card);
        await getSnapshot(card, parts, cardIndex);
      }
      await options[options.length - 1].click();
      return;
    }
  }

  const filename = getFilename([...parts, cardIndex.value++]);
  await expect(card).toHaveScreenshot([`${filename}.png`]);
  
  const unsetKeys = await card.evaluate(() => localStorage.getItem("unset-keys"));
  expect(unsetKeys, "All keys must be set in storageDefaults.ts").toBeNull();
}

async function getSnapshots(page: Page, guideIndex: number, guide: string) {
  let headingIndex = 0;
  let heading = "";
  let cardIndex = { value: 1 };

  for (const loc of await page.locator("article").locator("h1, h2, details").all()) {
    const [tag, text] = await loc.evaluate((e) => [e.tagName, e.textContent]);
    if (tag === "H1" || tag === "H2") {
      headingIndex++;
      heading = text?.trim() ?? "";
      cardIndex = { value: 1 };
      continue;
    }

    await expandAll(loc);
    await getSnapshot(loc, [guideIndex, guide, headingIndex, heading], cardIndex);
  }
}

const GUIDES = ["brock", "misty", "surge"];

for (const [guideIndex, guide] of GUIDES.entries()) {
  test.describe(`guide/${guide}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/radred/guide/${guide}`);
      await page.waitForLoadState("networkidle");
      await page.addStyleTag({ content: "nav.navbar { visibility: hidden !important; }" });
    });

    test("snapshots", async ({ page }) => {
      await getSnapshots(page, guideIndex + 1, guide);
    });
  });
}
