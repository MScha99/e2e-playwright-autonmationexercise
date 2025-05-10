import { test as setup, expect } from '@playwright/test'
import path from 'path'
import { AppUrls } from '../config/urls'

/**
 * Path to the file storing accepted cookies state.
 * This state is reused across tests to avoid repeatedly accepting cookies.
 */
const acceptCookiesFile = path.join(
  __dirname,
  '../config/.auth/accept-cookies.json'
)

/**
 * Setup test that accepts cookies once and saves the state.
 * This saved state is then reused by other tests to avoid cookie popups.
 */
setup('click accept cookies', async ({ page }) => {
  await page.goto(AppUrls.BASE_URL)

  const acceptCookiesButton = page.locator(
    'css=button.fc-cta-consent.fc-primary-button'
  )
  await acceptCookiesButton.click()
  await expect(acceptCookiesButton).not.toBeVisible()

  await page.context().storageState({ path: acceptCookiesFile })
})
