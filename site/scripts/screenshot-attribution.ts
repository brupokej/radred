import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000/radred/attribution");
  await page.locator(".mockup-body").screenshot({
    path: "static/img/attribution.png",
  });
  await browser.close();
  console.log("Saved to static/img/attribution.png");
})();
