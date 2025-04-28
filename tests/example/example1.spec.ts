import { test, expect } from '@playwright/test'
import { AppUrls } from '../../config/urls'

test('click accept cookies', async ({ page }) => {
  await page.goto(AppUrls.BASE_URL)

  await page.getByRole('link').filter({ hasText: /Polo/ }).click()
})
