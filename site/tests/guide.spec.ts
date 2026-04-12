import { expect, Locator, Page, test } from "@playwright/test";
import { slugify } from "../src/utils/slugify";

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

async function getValues(select: Locator): Promise<string[]> {
  return await select.locator("option").evaluateAll(
    (options) => options.map((o) => (o as HTMLOptionElement).value)
  );
}

async function getSnapshot(
  card: Locator,
  parts: (string | number)[],
  cardIndex: { value: number },
  visited = new Set<string>()
): Promise<void> {
  for (const sequence of await card.locator("[data-sequence]").all()) {
    const key = await sequence.getAttribute("data-sequence");
    if (visited.has(key)) continue;
    visited.add(key);

    const filename = slugify([...parts, cardIndex.value++]);
    await expect.soft(card).toHaveScreenshot([`${filename}.png`]);

    const select = sequence.locator("select");
    const values = await getValues(select);
    const defaultValue = await select.inputValue();
    for (const value of values) {
      if (defaultValue === value) continue;
      await select.selectOption(value);
      await waitForRender(card);
      await getSnapshot(card, parts, cardIndex, visited);
      break;
    }

    await select.selectOption(defaultValue);
    return;
  }

  for (const branch of await card.locator("[data-branch]").all()) {
    const key = await branch.getAttribute("data-branch");
    if (visited.has(key)) continue;
    visited.add(key);

    const select = branch.locator("select");
    const values = await getValues(select);
    const defaultValue = values[0];
    for (const value of values) {
      await select.selectOption(value);
      await waitForRender(card);
      await getSnapshot(card, parts, cardIndex, visited);
    }

    await select.selectOption(defaultValue);
    visited.delete(key);
    return;
  }

  const filename = slugify([...parts, cardIndex.value++]);
  await expect.soft(card).toHaveScreenshot([`${filename}.png`]);
  
  const unsetKeys = await card.evaluate(() => localStorage.getItem("unset-keys"));
  expect(unsetKeys, "All keys must be set in storageDefaults.ts").toBeNull();
}

async function getSnapshots(page: Page, guideIndex: number, guide: string) {
  let headingIndex = 1;
  let heading = "";
  let cardIndex = { value: 1 };

  for (const loc of await page.locator("article").locator("h1, h2, details").all()) {
    const [tag, text] = await loc.evaluate((e) => [e.tagName, e.textContent]);
    if (tag === "H1" || tag === "H2") {
      headingIndex += cardIndex.value > 1 ? 1 : 0;
      heading = text?.trim() ?? "";
      cardIndex.value = 1;
      continue;
    }

    await expandAll(loc);
    await getSnapshot(loc, [guideIndex, guide, headingIndex, heading], cardIndex);
  }
}

const GUIDES = ["brock", "misty", "surge", "erika", "sabrina", "koga"];

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
