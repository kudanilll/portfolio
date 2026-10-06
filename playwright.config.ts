import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL, locale: "en-US" },
  projects: [
    { name: "desktop", use: devices["Desktop Chrome"] },
    { name: "mobile", use: devices["Pixel 7"] },
  ],
  webServer: {
    command: "bun dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
