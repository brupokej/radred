import { expect, Locator, Page, test } from "@playwright/test";

const pageScreenshot = { fullPage: true, animations: "disabled" } as const;
const cardScreenshot = { animations: "disabled" } as const;

async function hideNavbar(page: Page) {
  await page.addStyleTag({ content: "nav.navbar { visibility: hidden !important; }" });
}

async function expandAll(within: Locator) {
  for (const button of await within.getByRole("button", { name: "+" }).all()) {
    await button.click();
  }
}

async function scrollAll(within: Locator) {
  await within
    .locator("[data-scroll]")
    .evaluateAll((els) => els.forEach((el) => ((el as HTMLElement).scrollLeft = el.scrollWidth)));
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("highlight-level", "info");
  });
});

test.describe("guide/brock", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/radred/guide/brock");
    await page.waitForLoadState("networkidle");
  });

  test("full", async ({ page }) => {
    await expect(page).toHaveScreenshot(pageScreenshot);
  });

  test("encounter plan", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Route 21 Encounter" });
    const cardContainer = heading.locator("xpath=following-sibling::*[1]");
    await scrollAll(cardContainer);
    await hideNavbar(page);
    await expect(cardContainer).toHaveScreenshot(cardScreenshot);
  });

  test("box change", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Viridian Forest Encounter" });
    const cardContainer = heading.locator("xpath=following-sibling::*[2]");
    await scrollAll(cardContainer);
    await hideNavbar(page);
    await expect(cardContainer).toHaveScreenshot(cardScreenshot);
  });

  test("opponent team", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Route 22 Rival Battle" });
    const cardContainer = heading.locator("xpath=following-sibling::*[1]");
    await expandAll(cardContainer);
    await scrollAll(cardContainer);
    await hideNavbar(page);
    await expect(cardContainer).toHaveScreenshot(cardScreenshot);
  });

  test("player team", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Route 22 Rival Battle" });
    const cardContainer = heading.locator("xpath=following-sibling::*[2]");
    await expandAll(cardContainer);
    await scrollAll(cardContainer);
    await hideNavbar(page);
    await expect(cardContainer).toHaveScreenshot(cardScreenshot);
  });

  test("battle plan", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Route 22 Rival Battle" });
    const cardContainer = heading.locator("xpath=following-sibling::*[3]");
    await expandAll(cardContainer);
    await scrollAll(cardContainer);
    await hideNavbar(page);
    await expect(cardContainer).toHaveScreenshot(cardScreenshot);
  });

  test("branched line", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Pewter City Leader Brock Battle" });
    const cardContainer = heading.locator("xpath=following-sibling::*[3]");
    const branch = cardContainer.getByRole("button", { name: "Kricketune Mega Drain Varoom" });
    await branch.click();
    await scrollAll(cardContainer);
    await hideNavbar(page);
    await expect(cardContainer).toHaveScreenshot(cardScreenshot);
  });
});

test.describe("guide/misty", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/radred/guide/misty");
    await page.waitForLoadState("networkidle");
  });

  test("full", async ({ page }) => {
    await expect(page).toHaveScreenshot(pageScreenshot);
  });

  test("box change", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Cerulean City Encounter" });
    const cardContainer = heading.locator("xpath=following-sibling::*[3]");
    await scrollAll(cardContainer);
    await hideNavbar(page);
    await expect(cardContainer).toHaveScreenshot(cardScreenshot);
  });
});
