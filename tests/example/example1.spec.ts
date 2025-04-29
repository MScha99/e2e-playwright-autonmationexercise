import { test, expect } from '@playwright/test'
import { AppUrls } from '../../config/urls'
import { SignupLoginPage } from '../../pages/signup-login.page'

test('TESTOWY TEMPORARY', async ({ page }) => {
  const signupLoginPage = new SignupLoginPage(page)

  await page.goto('https://www.automationexercise.com/login')

  await expect(signupLoginPage.loginEmailField).toBeVisible()

  
})
