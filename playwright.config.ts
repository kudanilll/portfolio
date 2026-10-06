import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL, locale: "en-US" },
  projects: [{ name: "chromium", use: devices["Desktop Chrome"] }],
  webServer: {
    command: "bun dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
