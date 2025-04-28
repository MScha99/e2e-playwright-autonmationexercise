import { test as setup, expect } from '@playwright/test'
import path from 'path'
import { AppUrls } from '../config/urls' 

const acceptCookiesFile = path.join(
  __dirname,
  '../config/.auth/accept-cookies.json'
)

setup('click accept cookies', async ({ page }) => {
  await page.goto(AppUrls.BASE_URL)

  const acceptCookiesButton = page.locator(
    'css=button.fc-cta-consent.fc-primary-button'
  )
  await acceptCookiesButton.click()
  await expect(acceptCookiesButton).not.toBeVisible()

  await page.context().storageState({ path: acceptCookiesFile })
})
