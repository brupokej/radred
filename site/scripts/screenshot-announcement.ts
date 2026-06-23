import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 802, height: 376 } });
  await page.goto("http://localhost:3000/radred/announcement");
  await page.waitForFunction(() => document.fonts.ready);
  await page.locator(".poster").screenshot({
    path: "static/img/announcement.png",
  });
  await browser.close();
  console.log("Saved to static/img/announcement.png");
})();
