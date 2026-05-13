import { defineConfig, devices } from "@playwright/test";

const secretMode = process.env.SECRET_MODE === "true";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  snapshotDir: "./tests/snapshots",
  timeout: 120_000,
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
    command: secretMode ? "npm run start:secret" : "npm run start",
    url: "http://localhost:3000/radred/",
    reuseExistingServer: false,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1600, height: 900 } },
    },
  ],
});
