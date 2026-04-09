import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  snapshotDir: "./tests/snapshots",
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
    },
  },
  use: {
    baseURL: "http://localhost:3000",
    colorScheme: "light",
  },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000/radred/",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1600, height: 900 } },
    },
  ],
});
