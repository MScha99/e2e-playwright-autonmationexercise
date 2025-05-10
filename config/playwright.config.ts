import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for the test suite.
 * See: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: '../tests',
    /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all test projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test */
    trace: 'retain-on-failure',
    testIdAttribute: 'data-qa',
  },

  /* Configure projects for major browsers */
  projects: [
    //setup project for accepting cookies
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    
    /* Test with Chromium */
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './config/.auth/accept-cookies.json',
      },
      dependencies: ['setup'],
    },

    /* Test with Firefox */
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: './config/.auth/accept-cookies.json',
      },
      dependencies: ['setup'],
    },

    /* Test with WebKit */
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: './config/.auth/accept-cookies.json',
      },
      dependencies: ['setup'],
    },
  ],
})
