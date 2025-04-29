import { test, expect, type Page } from '@playwright/test'

import { AccountInformation, generateUniqueEmail } from '../../config/test_data'
import { HeaderComponent } from '../../components/header.component'
import { AppUrls } from '../../config/urls'
import { SignupLoginPage } from '../../pages/signup-login.page'
import { AccountCreatedPage } from '../../pages/account-created.page'
import { AccountDeletedPage } from '../../pages/account-deleted.page'
//TC-001: Register User, TC-005: Register User with existing email

test.describe('Register user', () => {
  let signupLoginPage: SignupLoginPage
  let headerComponent: HeaderComponent

  test.beforeEach(async ({ page }) => {
    await page.goto(AppUrls.BASE_URL)
    headerComponent = new HeaderComponent(page)
    signupLoginPage = await headerComponent.openSignupLoginPage()
  })

  test('TC001 Register User', async ({ page }) => {
    await test.step('go to signup/login page, fill out the registration form and proceed', async () => {
      await expect(signupLoginPage.signupHeading).toBeVisible()

      await signupLoginPage.fillNameEmailFields(
        AccountInformation.valid.name,
        generateUniqueEmail()
      )
    })
    await test.step('fill out account information and address information forms, then proceed', async () => {
      await expect(signupLoginPage.enterAccountInformationHeading).toBeVisible()

      await signupLoginPage.fillAccountInformation(
        AccountInformation.valid.title,
        AccountInformation.valid.name,
        AccountInformation.valid.password,
        AccountInformation.valid.dateOfBirth.day,
        AccountInformation.valid.dateOfBirth.month,
        AccountInformation.valid.dateOfBirth.year,
        AccountInformation.valid.newsletter,
        AccountInformation.valid.specialOffers
      )

      await signupLoginPage.fillAddressInformation(
        AccountInformation.valid.address.firstName,
        AccountInformation.valid.address.lastName,
        AccountInformation.valid.address.company,
        AccountInformation.valid.address.address1,
        AccountInformation.valid.address.address2,
        AccountInformation.valid.address.country,
        AccountInformation.valid.address.state,
        AccountInformation.valid.address.city,
        AccountInformation.valid.address.zipcode,
        AccountInformation.valid.address.mobileNumber
      )

      await signupLoginPage.createAccountButton.click()
    })

    await test.step('verify account creation, logged-in status and delete this account', async () => {
      const accountCreatedPage = new AccountCreatedPage(page)
      const accountDeletedPage = new AccountDeletedPage(page)

      await expect(accountCreatedPage.accountCreatedConfirmation).toBeVisible()
      await accountCreatedPage.continueButton.click()
      await expect(headerComponent.loggedInAsUsername).toBeVisible()
      await headerComponent.deleteAccountButton.click()
      await expect(accountDeletedPage.accountDeletedConfirmation).toBeVisible()
      await accountDeletedPage.continueButton.click()
    })
  })
})
