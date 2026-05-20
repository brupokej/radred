import { expect, Locator, Page, test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { slugify } from "../src/utils/slugify";

test.describe.configure({ mode: "serial" });

const SNAPSHOT_DIR = path.join(__dirname, "snapshots/guide.spec.ts-snapshots");
const SNAPSHOT_SUFFIX = `desktop-${process.platform}`;
const secretMode = process.env.SECRET_MODE === "true";
const detailsSelector = secretMode ? "[data-secret] [data-card]" : "[data-card]";
const seenSnapshots = new Set<string>();

async function expectSnapshot(
  target: Locator | Page,
  filename: string,
  options?: Record<string, unknown>
) {
  seenSnapshots.add(filename.replace(/\.png$/, `-${SNAPSHOT_SUFFIX}.png`));
  await expect.soft(target).toHaveScreenshot([filename], { ...options });
}

async function waitForRender(loc: Locator) {
  // Wait until the subtree has been DOM-stable for two animation frames.
  // Handles chains of React useEffect re-renders (e.g. auto-selected branches
  // triggering further renders) by resetting the timer on each mutation.
  await loc.evaluate(
    (el) =>
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
  while (true) {
    let clicked = false;
    for (const btn of await buttons.all()) {
      const clickable = await btn.evaluate(
        (el) => window.getComputedStyle(el).pointerEvents !== "none"
      );
      if (clickable) {
        await btn.click();
        await waitForRender(loc);
        clicked = true;
        break;
      }
    }
    if (!clicked) break;
  }
}

async function getValues(select: Locator): Promise<string[]> {
  return await select
    .locator("option")
    .evaluateAll((options) => options.map((o) => (o as HTMLOptionElement).value));
}

async function getCardSnapshot(
  loc: Locator,
  parts: (string | number)[],
  locIndex: { value: number },
  visited = new Set<string>()
): Promise<void> {
  const page = loc.page();

  const switchBattleKey = await loc.evaluate((e) => {
    const switchBattle = e.closest("[data-switch-battle]");
    return switchBattle?.getAttribute("data-switch-battle") ?? null;
  });
  if (switchBattleKey && !visited.has(switchBattleKey)) {
    visited.add(switchBattleKey);

    const summary = await loc.locator("[data-card-title]").first().textContent();
    const switchBattle = page.locator(`[data-switch-battle="${switchBattleKey}"]`);
    const select = switchBattle.locator("[data-switch-case='active'] select").first();
    const values = await getValues(select);
    const defaultValue = values[0];
    for (const value of values) {
      await select.selectOption(value);
      await waitForRender(switchBattle);

      const reLoc = switchBattle
        .locator("[data-switch-case='active']")
        .locator(detailsSelector)
        .filter({ has: page.locator("[data-card-title]", { hasText: summary }) });
      await expandAll(reLoc);
      await getCardSnapshot(reLoc, parts, locIndex, visited);
    }

    await select.selectOption(defaultValue);
    visited.delete(switchBattleKey);
    return;
  }

  for (const sequence of await loc.locator("[data-sequence]").all()) {
    const key = await sequence.getAttribute("data-sequence");
    if (visited.has(key)) continue;
    visited.add(key);

    const filename = slugify([...parts, locIndex.value++]);
    await expectSnapshot(loc, `${filename}.png`);

    const select = sequence.locator("select");
    const values = await getValues(select);
    const defaultValue = await select.inputValue();
    for (const value of values) {
      if (defaultValue === value) continue;
      await select.selectOption(value);
      await waitForRender(loc);
      await getCardSnapshot(loc, parts, locIndex, visited);
      break;
    }

    await select.selectOption(defaultValue);
    return;
  }

  for (const branch of await loc.locator("[data-branch]").all()) {
    const key = await branch.getAttribute("data-branch");
    if (visited.has(key)) continue;
    visited.add(key);

    const select = branch.locator("select");
    const values = await getValues(select);
    const defaultValue = values[0];
    for (const value of values) {
      await select.selectOption(value);
      await waitForRender(loc);
      await getCardSnapshot(loc, parts, locIndex, visited);
    }

    await select.selectOption(defaultValue);
    visited.delete(key);
    return;
  }

  const filename = slugify([...parts, locIndex.value++]);
  await expectSnapshot(loc, `${filename}.png`);
}

const STATIC_IMG_DIR = path.join(__dirname, "../static/img");

async function getFeatureSnapshot(
  loc: Locator,
  parts: (string | number)[],
  featureIndex: { value: number },
  name: string
): Promise<void> {
  const page = loc.page();

  const styleTag = await page.addStyleTag({
    content: `[data-turn] { min-width: 9999px !important; }`,
  });
  await waitForRender(loc);

  await loc.evaluate((el) => el.scrollIntoView({ block: "start" }));
  const box = await loc.boundingBox();

  for (const theme of ["dark", "light"] as const) {
    await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
    await page.waitForTimeout(100);

    const filename = slugify([...parts, featureIndex.value++]).replace(/battle|table/g, "feature");
    await expectSnapshot(page, `${filename}.png`, {
      clip: { x: box.x + 4, y: box.y + 35, width: 468, height: 314 },
    });

    if (["all", "changed"].includes(test.info().config.updateSnapshots)) {
      const src = path.join(SNAPSHOT_DIR, `${filename}-${SNAPSHOT_SUFFIX}.png`);
      const dest = path.join(STATIC_IMG_DIR, `feature-${name}-${theme}.png`);
      fs.copyFileSync(src, dest);
    }
  }

  await styleTag.evaluate((el) => (el as HTMLElement).remove());
}

const FEATURES: { heading: string; summary: string; name: string }[] = [
  { heading: "Saffron City Leader Sabrina Battle", summary: "Player Team", name: "team" },
  { heading: "Saffron City Leader Sabrina Battle", summary: "Battle Plan", name: "battle" },
  { heading: "Percents Table", summary: "Pokémon Data", name: "stats" },
];

async function getSnapshots(page: Page, pathIndex: number, path: string) {
  let headingIndex = 1;
  let heading = "";
  let featureIndex = { value: 1 };
  let locIndex = { value: 1 };

  for (const loc of await page
    .locator("article")
    .locator(`h1, h2, ${detailsSelector}, a[href*='/overlay']`)
    .all()) {
    const [tag, text] = await loc.evaluate((e) => [e.tagName, e.textContent]);
    if (tag === "H1" || tag === "H2") {
      headingIndex += locIndex.value > 1 ? 1 : 0;
      heading = text?.trim() ?? "";
      featureIndex.value = 1;
      locIndex.value = 1;
      continue;
    }

    await expandAll(loc);
    const parts = [pathIndex, path, headingIndex, heading];
    if (secretMode) parts.splice(0, 0, "secrets-");

    for (const feature of FEATURES.filter((f) => heading.includes(f.heading))) {
      const summary = await loc.locator("[data-card-title]").first().textContent();
      if (summary?.includes(feature.summary)) {
        await getFeatureSnapshot(loc, parts, featureIndex, feature.name);
      }
    }

    await getCardSnapshot(loc, parts, locIndex);
  }
}

const PATHS = secretMode
  ? [
      ["guide", "koga"],
      ["guide", "blaine"],
      ["guide", "clair"],
      ["guide", "victory-road"],
      ["guide", "elite-four"],
    ]
  : [
      ["guide", "brock"],
      ["guide", "misty"],
      ["guide", "surge"],
      ["guide", "erika"],
      ["guide", "sabrina"],
      ["guide", "koga"],
      ["guide", "blaine"],
      ["guide", "clair"],
      ["guide", "victory-road"],
      ["guide", "elite-four"],
      ["data", "box"],
      ["data", "stats"],
      ["data", "timeline"],
      ["overlay", "background"],
      ["overlay", "banner"],
      ["overlay", "camera"],
      ["overlay", "opponent-small"],
      ["overlay", "opponent-medium"],
      ["overlay", "opponent-large"],
      ["overlay", "stats"],
      ["overlay", "title"],
      ["overlay", "controls"],
    ];

for (const [pathIndex, path] of PATHS.entries()) {
  test.describe(`${path[0]}/${path[1]}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/radred/${path[0]}/${path[1]}`);
      await page.waitForLoadState("networkidle");
      await page.addStyleTag({
        content:
          "nav.navbar { visibility: hidden !important; } [class*='skipToContent'] { display: none !important; } *:focus, *:focus-visible { outline: none !important; box-shadow: none !important; }",
      });
      await page.waitForTimeout(1000);
    });

    test("snapshots", async ({ page }) => {
      await getSnapshots(page, pathIndex + 1, path[1]);
    });
  });
}

test.afterAll(() => {
  if (!["all", "changed"].includes(test.info().config.updateSnapshots)) return;
  if (!fs.existsSync(SNAPSHOT_DIR)) return;
  fs.readdirSync(SNAPSHOT_DIR)
    .filter((f) => f.endsWith(".png") && !seenSnapshots.has(f))
    .filter(
      (f) =>
        (secretMode && f.startsWith("secrets--")) || (!secretMode && !f.startsWith("secrets--"))
    )
    .forEach((f) => fs.unlinkSync(path.join(SNAPSHOT_DIR, f)));
});
